require('./BoxGeometry.scss')
var $ = require("jquery");
var THREE=require('three')


$('.sanjiaozhui').each(function(){
    var _self=$(this)[0];
    //渲染器
    var renderer;
    function initRender() {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha:true
        });
        //设置canvas尺寸
        renderer.setSize(100, 100);
        //设置背景
        renderer.setClearColor(0x000000, 0);
        //设置设备像素比
        renderer.setPixelRatio( window.devicePixelRatio );
        //添加到dom
        _self.appendChild(renderer.domElement);

        /* document.getElementsByClassName('sanjiaozhui').appendChild(renderer.domElement);*/
    }

//相机
    var camera;
    function initCamera() {
        camera = new THREE.PerspectiveCamera( 45, 1, 1, 500 );
        camera.position.z = 1000;
    }

//场景
    var scene;
    function initScene() {
        scene = new THREE.Scene();
    }

//光源
    var light;
    function initLight() {
        //添加环境光
        scene.add(new THREE.AmbientLight( 0x404040));

        //添加平衡光
        light = new THREE.DirectionalLight( 0xffffff );
        light.position.set(0,1,0);
        scene.add(light);
    }

//模型
    function initModel() {
        //通过加载图片生成一个纹理
        /*
            var map = new THREE.TextureLoader().load("UV_Grid_Sm.jpg");
            //定义纹理在水平和垂直方向简单的重复到无穷大。
            map.wrapS = map.wrapT = THREE.RepeatWrapping;
            //定义纹理的各向异性
            map.anisotropy = 16;

            //定义兰伯特网孔材质
            var material = new THREE.MeshLambertMaterial({map:map,side:THREE.DoubleSide});
        */

        //四面体（图形大小半径，大于零将不是四面体，越大越圆滑）
        var sphereMaterial=new THREE.MeshLambertMaterial({
            color:0x19fabe,
            opacity:.7,
            transparent:true
        });//材质对象


        //立方体 （x轴宽度，y轴高度，z轴深度，沿宽面分段数，沿高度面分段数，沿深度面分段数）
        /*  object = new THREE.Mesh( new THREE.BoxGeometry( 15, 15, 15, 1, 1, 1 ), sphereMaterial );

          scene.add( object );
          edges = new THREE.EdgesHelper( object, 0x08e4f2 );//设置边框，可以旋转
          scene.add( edges );*/

        object = new THREE.Mesh( new THREE.ConeGeometry( 13, 22, 4), sphereMaterial );
        scene.add( object );
        edges = new THREE.EdgesHelper( object, 0x08e4f2 );//设置边框，可以旋转
        scene.add( edges );
    }

    function animate() {
        requestAnimationFrame( animate );
        render();
        //stats.update();
    }

    function render() {

        var timer = Date.now() * 0.0001;

        /*camera.position.x = Math.cos( timer ) * 800;
        camera.position.z = Math.sin( timer ) * 800;*/
        camera.position.set(40,30,30);//设置相机位置
        camera.lookAt( scene.position );

        for ( var i = 0, l = scene.children.length; i < l; i ++ ) {

            var object = scene.children[ i ];

            /*object.rotation.x = timer * 5;*/
            object.rotation.y+= 0.01;

        }

        renderer.render( scene, camera );

    }

//窗口变动触发的函数
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
//绘制
    function draw() {
        initRender();          //初始渲染器
        initCamera();           //初始相机
        initScene();            //初始场景
        initLight();             //初始光源
        initModel();            //初始模型
        animate();
       /* window.addEventListener( 'resize', onWindowResize, false );*/
    }
    draw();
})
