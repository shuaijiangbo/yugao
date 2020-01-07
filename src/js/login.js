//在pathmap.json 里面配置了commons.css的alias别名 commonCss
var $ = require("jquery");
var _=require('_');
var　earthBg=require('@/img/log.jpg');
/*var　yuzou=require('../../static/imgs/blinblin.png');*/

var particlesJS=require('../js/lib/particles.min.js');
import '../js/lib/particles.min.js'
import 'flexible'
import URL from '@/api/serviceAPI.config.js'
require('commonCss');
require('../iconfont/iconfont.css');
require('../css/login.scss');
/*require('@/components/header/center.js')//引入header组件
require('@/components/footer/popBox.js')//引入footer组件*/
/*$("<div>这是jquery生成的</div>").appendTo("body");*/

/*
particlesJS('particles-js',

    {
        "particles": {
            "number": {
                "value": 160,//数量
                "density": {
                    "enable": true, //启用粒子的稀密程度
                    "value_area": 800 //区域散布密度大小
                }
            },
            "color": {
                "value": "#00aeff" //原子的颜色
            },
            "shape": {
                "type": "circle", //原子的形状 "circle" ,"edge" ,"triangle" ,"polygon" ,"star" ,"image" ,["circle", "triangle", "image"]
                "stroke": {
                    "width": 0, //原子的宽度
                    "color": "#362cff" //原子颜色
                },
                "polygon": {
                    "nb_sides": 5 // 原子的多边形边数
                },
                "image": {
                    "src": "img/github.svg", // 原子的图片可以使用自定义图片 "assets/img/yop.svg" , "http://mywebsite.com/assets/img/yop.png"
                    "width": 100, //图片宽度
                    "height": 100 //图片高度
                }
            },
            "opacity": {
                "value": 1, //不透明度
                "random": true, //随机不透明度
                "anim": {
                    "enable": true, //渐变动画
                    "speed": 1, // 渐变动画速度
                    "opacity_min": 0, //渐变动画不透明度
                    "sync": true
                }
            },
            "size": {
                "value": 3, //原子大小
                "random": true, // 原子大小随机
                "anim": {
                    "enable": false, // 原子渐变
                    "speed": 4, //原子渐变速度
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false, //连接线
                "distance": 150, //连接线距离
                "color": "#ffffff", //连接线颜色
                "opacity": 0.4, //连接线不透明度
                "width": 1 //连接线的宽度
            },
            "move": {
                "enable": true, //原子移动
                "speed": 1, //原子移动速度
                "direction": "none", //原子移动方向   "none" ,"top" ,"top-right" ,"right" ,"bottom-right" ,"bottom" ,"bottom-left" ,"left" ,"top-left"
                "random": true, //移动随机方向
                "straight": false, //直接移动
                "out_mode": "out", //是否移动出画布
                "bounce": false, //是否跳动移动
                "attract": {
                    "enable": false, // 原子之间吸引
                    "rotateX": 600, //原子之间吸引X水平距离
                    "rotateY": 600  //原子之间吸引Y水平距离
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas", //原子之间互动检测 "canvas", "window"
            "events": {
                "onhover": {
                    "enable": true, //悬停
                    "mode": "bubble" //悬停模式      "grab"抓取临近的,"bubble"泡沫球效果,"repulse"击退效果,["grab", "bubble"]
                },
                "onclick": {
                    "enable": false,  //点击效果
                    "mode": "repulse"  //点击效果模式   "push" ,"remove" ,"bubble" ,"repulse" ,["push", "repulse"]
                },
                "resize": true // 互动事件调整
            },
            "modes": {
                "grab": {
                    "distance": 100, //原子互动抓取距离
                    "line_linked": {
                        "opacity": 0.8  //原子互动抓取距离连线不透明度
                    }
                },
                "bubble": {
                    "distance": 250, //原子抓取泡沫效果之间的距离
                    "size": 4, // 原子抓取泡沫效果之间的大小
                    "duration": 2, //原子抓取泡沫效果之间的持续事件
                    "opacity": 1, //原子抓取泡沫效果透明度
                    "speed": 3
                },
                "repulse": {
                    "distance": 400, //击退效果距离
                    "duration": 0.4 //击退效果持续事件
                },
                "push": {
                    "particles_nb": 4 //粒子推出的数量
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    }

);
*/


var canvasBox = document.getElementById("canvasBox");
var W = $("#canvasBox").width();
var H = $("#canvasBox").height();
//随浏览器窗口变化而变化
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

$(window).on("resize", function() {
   /* onWindowResize();*/
})
var num = 0;
var scene, camera, renderer, light;

function intScene() {
    scene = new THREE.Scene();
}

function intCamera() {
    camera = new THREE.PerspectiveCamera(45, W / H, 1, 1000);
    camera.position.set(0, 0, 270);
    camera.up.set(0, 1, 0);
    camera.lookAt({
        x: 0,
        y: 0,
        z: 0
    })
}


function intRender() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,   //是否开启反锯齿，设置为true开启反锯齿。
        alpha:true          //：是否可以设置背景色透明
    });

    //设置背景
    renderer.setClearColor(0x000000, .1);
    renderer.setSize(W, H);
    canvasBox.appendChild(renderer.domElement);
}

function intLight() {
    light = new THREE.DirectionalLight(0xffffff, 0.6);
    light.position.set(0, 0, 400);
    scene.add(light);
}
var xkbg, earth, texts;

function intModels() {
    /* 宇宙背景 */
/*    var yz_geometry = new THREE.SphereGeometry(500, 500, 50);
    var yz_material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(yuzou),
        side: THREE.DoubleSide
    });
    earth = new THREE.Mesh(yz_geometry, yz_material);
    earth.position.set(0, 0, 0);
    scene.add(earth);*/
    //地球
    var earth_geometry = new THREE.SphereGeometry(100, 50, 50);
    var earth_material = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(earthBg),
        side: THREE.DoubleSide
    });
    xkbg = new THREE.Mesh(earth_geometry, earth_material);
    xkbg.position.set(0, 0, 0);
    scene.add(xkbg);

    /*//通过加载图片生成一个纹理
    var map = new THREE.TextureLoader().load(earthBg);
    //定义纹理在水平和垂直方向简单的重复到无穷大。
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    //定义纹理的各向异性
    map.anisotropy = 16;

    //定义兰伯特网孔材质
    var material = new THREE.MeshLambertMaterial({map:map,side:THREE.DoubleSide});

    //材质加背景颜色
    var sphereMaterial=new THREE.MeshLambertMaterial({
        color:0x19fabe,
        opacity:.7,
        transparent:true
    });//材质对象


    //立方体 （x轴宽度，y轴高度，z轴深度，沿宽面分段数，沿高度面分段数，沿深度面分段数）
    xkbg = new THREE.Mesh( new THREE.SphereGeometry( 15,20,50 ), material );

    scene.add( xkbg );*/
}
var mouseX, mouseY, isMove = true;
//自转
function zizhuan() {
    if (isMove) {
        requestAnimationFrame(zizhuan);
        xkbg.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
}
//拖拽
document.onmousedown = function(e) {
    isMove = false;
    mouseX = e.pageX;
    mouseY = e.pageY;
}
document.onmousemove = function rt(e) {
    if (!isMove) {
        var disX = e.pageX - mouseX;
        var disY = e.pageY - mouseY;
        requestAnimationFrame(zizhuan);
        xkbg.rotation.x = xkbg.rotation.x > 0.8 ? 0.8 : xkbg.rotation.x;
        xkbg.rotation.x = xkbg.rotation.x < -0.8 ? -0.8 : xkbg.rotation.x;
        xkbg.rotation.x += disY * 0.00005 * Math.PI;
        xkbg.rotation.y += disX * 0.0001 * Math.PI;
        renderer.render(scene, camera);
    }
}
document.onmouseup = function() {
    isMove = true;
    setTimeout(function() {
        zizhuan();
    }, 2000)
}

//滑动鼠标让地球放大缩小
function intsScale() {
    $(document).on('mousewheel DOMMouseScroll', function(ev) {
        var e = ev || event;
        e.preventDefault();
        var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        var delta = Math.max(-1, Math.min(1, value));
        if (delta == 1) {
            num++;
            num = num > 10 ? 10 : num;
        } else {
            num--;
            num = num < -15 ? -15 : num;
        }
        camera.position.set(0, 0, 400 + num * 10);
    });
}

function intStart() {
    intScene();
    intCamera();
    intRender();
    intLight();
    intModels();
    zizhuan();
    intsScale();
    renderer.render(scene, camera);
}

intStart();
