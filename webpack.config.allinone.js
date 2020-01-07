

var webpack = require("webpack");
var path = require("path");
var glob = require('glob')

//路径定义
var srcDir = path.resolve(process.cwd(), 'src');
var distDir = path.resolve(process.cwd(), 'dist');
var nodeModPath = path.resolve(__dirname, './node_modules');
var publicPath = '';//发布到服务器的文件夹
//插件定义
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;         //单独分离出第三方库、自定义公共模块、webpack运行文件
var HtmlWebpackPlugin = require('html-webpack-plugin');             //html插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');      //该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象，如果不用，css会被打包到js中，浏览器里会在html的head内联样式里面
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin                //压缩js文件
var cleanWebpackPlugin = require('clean-webpack-plugin');             //清除打包文件

//入口文件定义
var entries = function () {
    var jsDir = path.resolve(srcDir, 'js')
    var entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
}
//html_webpack_plugins 定义
var html_plugins = function () {
    var jsDir = path.resolve(srcDir, 'html')
    var entryHtml = glob.sync(jsDir + '/*.ejs')
    var r = []
    var entriesFiles = entries()
    for (var i = 0; i < entryHtml.length; i++) {
        var filePath = entryHtml[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        var conf = {
            template:filePath,
            filename: filename + '.html'
        }
        //如果和入口js文件同名
        if (filename in entriesFiles) {
            conf.inject = 'body'                        //注入到哪儿，将生成的js放body或者head里面
            conf.chunks = ['vendor', filename]        //添加和html名字一样的chunks和公共的chunks:vendor，chunks就是打包生成的js标识
        }
        //跨页面引用，如pageA,pageB 共同引用了common-a-b.js，那么可以在这单独处理
        //if(pageA|pageB.test(filename)) conf.chunks.splice(1,0,'common-a-b')
        r.push(new HtmlWebpackPlugin(conf))
    }
    return r
}
module.exports = function(options){
    options = options || {}
    var debug = options.debug !==undefined ? options.debug :true;

    var plugins = [];

    var extractCSS;
    var cssLoader;
    var sassLoader;

    plugins.push(new CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
    }),
    new webpack.ProvidePlugin({
        _: "js/lib/loadsh.js"
    })
  );

    if(debug){                                          //调试模式
        //1.filename:定义文件的名称。如果有多个入口文件时，应该定义为：[name].css。
        // 2.allChunks:当使用 `CommonsChunkPlugin` 并且在公共 chunk 中有提取的 chunk（来自`ExtractTextPlugin.extract`）时，`allChunks` **必须设置为 `true`。
        extractCSS = new ExtractTextPlugin({filename:'css/[name].[contenthash].css',allChunks: true})
        cssLoader = extractCSS.extract({use:['css-loader','autoprefixer-loader']})                          //loader中使用
        sassLoader = extractCSS.extract({use:['css-loader','autoprefixer-loader','sass-loader']})           //loader中使用
        plugins.push(extractCSS,
            new webpack.DefinePlugin({   //配置环境变量  开发环境变量
            DEVELEPMENT: JSON.stringify(true)
        }))
    }else{
        extractCSS = new ExtractTextPlugin({filename:'css/[contenthash:8].[name].min.css',
            // 当allChunks指定为false时，css loader必须指定怎么处理
            allChunks:true
        })
        cssLoader = extractCSS.extract({use:[{
                loader: 'css-loader',
                options: {
                    // If you are having trouble with urls not resolving add this setting.
                    // See https://github.com/webpack-contrib/css-loader#url
                    url: false,
                    minimize: true,
                }
            },{
              loader:'autoprefixer-loader'                 //autoprefixer-loader为我们自动添加，有些情况下需要加样式前缀以兼容不同的浏览器
            }]
          })
        sassLoader = extractCSS.extract({use:[{
                loader: 'css-loader',
                options: {
                    // If you are having trouble with urls not resolving add this setting.
                    // See https://github.com/webpack-contrib/css-loader#url
                    url: false,
                    minimize: true,
                }
            },
            'autoprefixer-loader',
            'sass-loader']
         })
        plugins.push(
            extractCSS,
            new cleanWebpackPlugin(['dist/*'], {
              root: path.resolve(__dirname)
            }),
            new UglifyJsPlugin({                    //压缩js文件
              uglifyOptions:{
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                mangle: {
                    except: ['$','_','exports', 'require']
                }
              }
            }),
            new webpack.NoEmitOnErrorsPlugin(),  //在编译出现错误时， 跳过输出阶段。这样可以确保输出资源不会包含错误,
            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(true),//配置环境变量 生产环境变量
                DEVELEPMENT: JSON.stringify(false)
            })
        )
    }

    //config
    var config = {
        entry: Object.assign(entries(), {
            // 用到什么公共lib（例如jquery.js），就把它加进vendor去，目的是将公用库单独提取打包
            'vendor': ['jquery','_','flexible']
        }),
        output: {
            path: path.join(__dirname, "dist"),
            filename: "js/[name].[hash].js",
            chunkFilename: '[chunkhash:8].chunk.js',
            publicPath: publicPath
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    // include: [srcDir]
                },

              /*  {
                    test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                    use: 'url-loader?limit=50000&name=fonts/[hash:8].[name].[ext]'
                },*/
                {test: /\.(tpl|ejs)$/,use: 'ejs-loader'},
                {test: /\.css$/,use:cssLoader},
                {test:/\.scss$/,use:sassLoader},
                {
                    test: /\.(jpg|jpeg|png|gif|svg)$/,
                    loader: 'url-loader',
                    options: {
                        name: 'images/[name].[ext]',
                        path: path.resolve(__dirname, 'img'),
                        /*limit:5000*/
                    }
                },
                // .woff | .woff2 | .eot | .ttf | .otf 文件处理
                {
                    test: /\.(woff|woff2|eot|otf|ttf)$/,
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        path: path.resolve(__dirname, 'iconfont')
                    }
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.css', '.scss', '.tpl', '.png', '.jpg'],
            modules:[srcDir, nodeModPath],
            alias:{
              "_":"js/lib/loadsh.js",
              "zepto": "js/lib/zepto.js",
              "jquery": "js/lib/jquery-1.12.4.js",
              "flexible": "js/lib/flexible.js",
              'common':'js/lib/common.js',
              "commonCss":"css/common.css",
              '@':path.join(__dirname,'src')
            }
        },
        devServer: {
            host: 'localhost',
        },
        plugins: plugins.concat(html_plugins())
    }
    return config;
}
