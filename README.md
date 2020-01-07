# webpack-jQuery #
## 环境 ##

- Node.js

## 安装依赖 ##

  $ cd webpack-jquery
	$ npm install

## 开发要求 ##

约定/src/*.html为应用的入口文件，在/src/js/ 一级目录下需有一个同名的js文件作为该文件的入口。

## 编译（测试/dev环境） ##

    $ npm run dev

## 编译（生产环境） ##

生产环境会对js混淆压缩，对css、html进行压缩，字符替换等处理

    $ npm run build
