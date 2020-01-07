var $ = require("jquery");
var win = {
		/**
		 * 获取窗口高度
		 */
		"windowheight" : function() {
			return document.documentElement.clientHeight;
		},
		"currentTimeMillis":function(){
			return new Date().getTime();
		}
	};
	$("#cesiumContainer").height(win.windowheight);
	$(window).resize(function(e) {
		$("#cesiumContainer").height(win.windowheight);
	});

	var superMap = {
		"scene":null,
		"cesium":null,
		"viewer":null,
		"camera":null,
		"layers":null,
		"lastUpdateTime":win.currentTimeMillis(),
		/**
		 * 初始化地图
		 */
		"init" : function(Cesium) {
			// 初始化viewer部件
			var viewer = new Cesium.Viewer("cesiumContainer");
			var scene = viewer.scene;
			superMap.scene=scene;
			superMap.cesium=Cesium;
			superMap.viewer=viewer;
			var provider = new Cesium.MapboxImageryProvider({
		        mapId:"mapbox.dark",
		        accessToken:"pk.eyJ1IjoiYW5hbHl0aWNhbGdyYXBoaWNzIiwiYSI6ImNpd204Zm4wejAwNzYyeW5uNjYyZmFwdWEifQ.7i-VIZZWX8pd1bTfxIVj9g"
		    });
			viewer.imageryLayers.addImageryProvider(provider);
			viewer.scene.skyAtmosphere.show=false;
			viewer.imageryLayers._layers[0].brightness=0;
			viewer.scene.fog.enabled=false;
			scene.lightSource.ambientLightColor = new Cesium.Color(0.8, 0.8, 0.8, 0.8);
			
			viewer.scene.sun.show = false;
			viewer.scene.moon.show = false;
			viewer.scene.skyBox.show = false;
			viewer.scene.skyAtmosphere.show = false;

			viewer.scene.fxaa = true;
			viewer.scene.bloomEffect.show = false; //启用泛光效果
			viewer.scene.bloomEffect.bloomIntensity =0.0005;
			try {
				// 打开所发布三维服务下的所有图层
				var promise = scene
						.open(SUPER_MAP_REST_URL);
				Cesium.when.all(promise, function(layers) {
					layers.forEach(function(item, index) {
			            item.ignoreNormal = true; // 获取或者设置是否在GPU中自动计算法线
			            item.clearMemoryImmediately = true; // 是否及时释放内存
			            // 设置图层分层设色属性
						var layer = scene.layers.find(item.name);
						var hyp = new Cesium.HypsometricSetting();
						hyp.emissionTextureUrl = "static/image/speed.png";
						hyp.emissionTexCoordUSpeed = 0.25;
						layer.hypsometricSetting = {
								hypsometricSetting: hyp
						}

						item.style3D.fillForeColor.alpha=0.95;
						item.saturation = 0.3;
						superMap.setLayer(scene,item);
			        });		
					console.log(layers);
					viewer.customInfobox=$(".msg-info")[0];
					var camera=scene.camera;
					// 设置相机位置、视角，便于观察场景
					camera.flyTo({
						destination : new Cesium.Cartesian3.fromDegrees(106.495612,29.521631,958.807648),
						orientation : {
							heading : 6.000644792630607,
							pitch : -0.15074246723375007,
							roll : 6.281842456812987
						},
						duration:5
					});	
					camera.flyCircleLoop = true;
					camera.percentageChanged = 0.01;
					superMap.camera=camera;
					superMap.layers=layers;
					//加载线数据
					var promiseroute11 = Cesium.GeoJsonDataSource.load('static/Build/SampleData/json/lineback_1.json');
					promiseroute11.then(function(dataSource) {
						viewer.dataSources.add(dataSource);
						Routes11 = dataSource.entities.values;

						for(var i = 0; i < Routes11.length; i++) {
							var line = Routes11[i];
							if(i < 100) {
								line.polyline.material = new Cesium.PolylineGlowMaterialProperty({ //设置Glow材质
									glowPower: 0.06,
									color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.7).withAlpha(0.9)
								});
								line.polyline.width = 10;

							} else {
								line.polyline.material = new Cesium.PolylineGlowMaterialProperty({ //设置Glow材质
									glowPower: 0.1,
									color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.7).withAlpha(0.9)
								})
								line.polyline.width = 1;

							}
						}

					}).otherwise(function(error) {

						window.alert(error);
					});

					var promiseroute2 = Cesium.GeoJsonDataSource.load('static/Build/SampleData/json/lineback2_1.json');
					promiseroute2.then(function(dataSource) {
						viewer.dataSources.add(dataSource);
						Routes2 = dataSource.entities.values;

						for(var i = 0; i < Routes2.length; i++) {
							var line = Routes2[i];

							if(i < 0) {
								line.polyline.material = new Cesium.PolylineGlowMaterialProperty({ //设置Glow材质
									glowPower: 0.06,
									color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.7).withAlpha(0.9)
								});
								line.polyline.width = 10;

							} else {
								line.polyline.material = new Cesium.PolylineGlowMaterialProperty({ //设置Glow材质
									glowPower: 0.1,
									color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.7).withAlpha(0.9)
								})
								line.polyline.width = 1;

							}

						}
					}).otherwise(function(error) {

						window.alert(error);
					});
					var promiseroute3 = Cesium.GeoJsonDataSource.load('static/Build/SampleData/json/lineback3_1.json');
					promiseroute3.then(function(dataSource) {
						viewer.dataSources.add(dataSource);
						Routes3 = dataSource.entities.values;

						for(var i = 0; i < Routes3.length; i++) {
							var line = Routes3[i];
							if(i < 0) {
								line.polyline.material = new Cesium.PolylineGlowMaterialProperty({ //设置Glow材质
									glowPower: 0.06,
									color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.7).withAlpha(0.9)
								});
								line.polyline.width = 10;

							} else {
								line.polyline.material = new Cesium.PolylineGlowMaterialProperty({ //设置Glow材质
									glowPower: 0.1,
									color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.7).withAlpha(0.9)
								})
								line.polyline.width = 1;

							}
						}

					}).otherwise(function(error) {

						window.alert(error);
					});
					
					/**
					 * 初始化沿线飞行
					 */
					var routes = new Cesium.RouteCollection(viewer.entities);
			        // 添加fpf飞行文件，fpf由SuperMap iDesktop生成
			        routes.fromFile('static/Build/SampleData/pfp/test1.fpf');
			        // 初始化飞行管理
			        var flyManager = new Cesium.FlyManager({
			            scene: scene,
			            routes: routes
			        });
			        flyManager.readyPromise.then(function () {
			        	superMap.flyManager=flyManager;
			        	// 到站事件
			        	flyManager.stopArrived.addEventListener(superMap.flyStopArrived);
			        	// 重复飞行
			    		superMap.flyManager.currentRoute.isFlyLoop=true;
			    		// 隐藏路线
			    		superMap.flyManager.currentRoute.isLineVisible=false;
			    		// 隐藏站点
			    		superMap.flyManager.currentRoute.isStopVisible=false;
			        });
			        
			        // 初始化加载地标信息
					superMap.loadmark(Cesium, viewer);
					
				});
				
				
				/**
				 * 事件 Cesium.ScreenSpaceEventType LEFT_CLICK: 2 LEFT_DOUBLE_CLICK: 3
				 * LEFT_DOWN: 0 LEFT_UP: 1 MIDDLE_CLICK: 12 MIDDLE_DOWN: 10
				 * MIDDLE_UP:11 MOUSE_MOVE: 15 PINCH_END: 18 PINCH_MOVE: 19
				 * PINCH_START: 17 RIGHT_CLICK: 7 RIGHT_DOWN: 5 RIGHT_UP: 6 WHEEL:
				 * 16
				 */
				var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
				// 添加场景鼠标事件
			    handler.setInputAction(function(e){
			    	if(superMap.siFly){
			    		//如果正在飞行，就停止飞行
			    		superMap.stopFly();
			    	}
			    	var pickedObject = scene.pick(e.position);
			    	//图层建筑物的点击事件
		            if (Cesium.defined(pickedObject) && (pickedObject.id instanceof Cesium.Entity)) {
		                console.log(pickedObject.id);
		            }
		            superMap.leftClick(e);
			    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
			    
			    // 注册鼠标点击事件
		        viewer.pickEvent.addEventListener(function(e){
		        	$(".msg-info .text").html(e.SMID+" "+e.NAME+"");
		        });
				
				// 画线
				setTimeout(function(){
					superMap.setLine();
					//扫描线
//					var initialScanColor = new superMap.cesium.Color(1.0, 1.0, 1.0, 1.0);
//					superMap.scene.scanEffect.color = initialScanColor;
//					superMap.scene.scanEffect.period = 3.0;
//					superMap.scene.scanEffect.show = true;
//					var startPosition = new superMap.cesium.Cartesian3.fromDegrees(106.52794565233658, 29.58028898919543, 150.69571872311568);
//					superMap.scene.scanEffect.centerPostion = startPosition;
				},2000);
				
			} catch (e) {
				console.log(e);
			}
		   
		},
		"htmlMark":[
			{
				id:"h1",
				text:"重庆悦来国际博览中心",
				english:"chongqing",
				fontSize:24,
				fontColor:"#67F5BC",
				lon:106.52323500811349,
				lat:29.578291104917838,
				height:83.01672898435622,
				animate:true
			}
		],
		/**
		 * 初始化加载地标信息
		 */
		"loadmark":function(Cesium, viewer){
			viewer.entities.removeAll();
			viewer.entities.add({
	            position : Cesium.Cartesian3.fromDegrees(106.530825, 29.454711, 100),
	            billboard :{
	                image : "static/image/camera.png",
	                width:30,
	                height:40,
	                scaleByDistance:new Cesium.NearFarScalar(1500, 1, 5000, 0.1)
	            }, 
	            name : "地标信息one",
	            description: "这是一个描述",
	            show:true
	        });
			
			var data=[{
				lon:106.530825,
				lat:29.579711,
				height:150,
				text:"智能出行生活体验馆-M4\nIntellent Mobility House"
			},{
				lon:106.53199026066163,
				lat:29.581477915427318,
				height:150.75255043737111,
				text:"智能出行生活体验馆-M5\nIntellent Mobility House"
			},
			{
				lon:106.52794565233658,
				lat:29.58028898919543,
				height:150.69571872311568,
				text:"智能出行生活体验馆-M6\nIntellent Mobility House"
			}];
			
			
			
			var color=Cesium.Color.FUCHSIA;
			$(data).each(function(i,e){
				viewer.entities.add({
					position : Cesium.Cartesian3.fromDegrees(e.lon,e.lat,e.height),
					label :{
						text : e.text,
						fillColor:color,
						style:Cesium.LabelStyle.FILL_AND_OUTLINE,
						outlineColor:color,
						outlineWidth:1,
						font:BILLBOARD_FONT,
						scaleByDistance:new Cesium.NearFarScalar(1500, 1, 5000, 0.1)
					},
					show:true
				});
				
			});
			
			
			$(superMap.htmlMark).each(function(i,e){
				if($("#marks-all").find("#mark_"+e.id).length==0){
					var po=superMap.pointToPixel({"lng":e.lon,"lat":e.lat});
					var html='<div id="mark_'+e.id+'" class="marks '+(e.animate?"upAnddown":"")+'" style="top: '+po.x+'px; left: '+po.y+'px;min-width: 100px;">';
					html+='<h1 style="color:'+e.fontColor+';font-size:'+e.fontSize+';">'+e.text+'</h1>';
					html+='<h3 style="color:'+e.fontColor+';font-size:'+(e.fontSize-3)+';">'+e.english+'</h3>';
					html+='</div>';
					$("#marks-all").append(html);
				}
			});
			
//			var objs=[{
//				ids:[],
//				color:Cesium.Color.fromAlpha(Cesium.Color.GOLDENROD, 0.7)
//			}];
//			for(var i=14420;i<14835;i++){
//				objs[0].ids.push(i);
//			}
			// 设置建筑物高亮
			//superMap.layers[0].setObjsColor(objs[0].ids,objs[0].color);
			
		},
		"loadPolygonData":function(Cesium,viewer){
			
		},
		/**
		 * 点光源
		 */
		"points":[],
		/**
		 * 建筑物
		 */
		"objs":[],
		/**
		 * 鼠标左键点击
		 */
		"leftClick":function(e){
			// 获取点击位置笛卡尔坐标
	        var position = superMap.scene.pickPosition(e.position);
	        // 将笛卡尔坐标转化为经纬度坐标
	        var cartographic = superMap.cesium.Cartographic.fromCartesian(position);
	        var longitude = superMap.cesium.Math.toDegrees(cartographic.longitude);
	        var latitude = superMap.cesium.Math.toDegrees(cartographic.latitude);
	        var height = cartographic.height;
	        if(height < 0) {
	            height = 0;
	        }
	        console.log(longitude+","+latitude+","+height);
	        // 设置点光源
			var position = superMap.cesium.Cartesian3.fromDegrees(longitude, latitude, 500);
			var options={
					color:new superMap.cesium.Color(200/255,223/255,233/255, 1),
					distance:500,
					decay:0,
					intensity:10
			}
			var targetPosition = new superMap.cesium.Cartesian3(longitude, latitude, 100);
			var point=new superMap.cesium.SpotLight(position,targetPosition, options);
			for(var p of superMap.points){
				superMap.scene.removeLightSource(p);
				superMap.points.remove(p);
			}
			superMap.points.push(point);
			superMap.scene.addLightSource(point);
			// 获取被选中的建筑物
			var id=superMap.layers[0].getSelection();
			// 发送给大屏选中建筑物信息
			var msg={"id":id,"color":superMap.cesium.Color.AQUA,"position":position,"options":options};
			superMap.send("map-objs-click",msg);
		},
		/**
		 * 图层建筑物点击查询相关
		 */
		"setLayer":function(scene,item){
			var layer1 = scene.layers.find(item.name);
			layer1.style3D._fillForeColor.alpha = 1; // 矢量图层填充前景色透明
			layer1.selectedColor = superMap.cesium.Color.AQUA; // 选中时给一个可见颜色
			layer1.selectedColor.alpha=1;
			layer1.selectColorType = 1; // 选中颜色的显示类型为替换色
			layer1.selectEnabled = true; // 矢量图层可选
	        // 设置属性查询参数
	        layer1.setQueryParameter({
	            url: BASE_URL+'api/main',
	            dataSourceName: 'data',
	            dataSetName: 'data',
	            keyWord: 'SmID'
	        });
		},
		"pointToPixel":function(location){
			var position = superMap.cesium.Cartesian3.fromDegrees(location.lng, location.lat, 100);
			var cartesian=new superMap.cesium.Cartesian2();
			superMap.scene.cartesianToCanvasCoordinates(position,cartesian);
			return cartesian;
		},
		/**
		 * 线型动画，圆形散布特效相关
		 */
		"setLine":function(){
			var data = [
				{
		        	from: {
		                city: '启点',
		                lnglat: [106.491825, 29.525711],
		                speed:1.5,
		                color:"#10C2DA",
		                max:50,
			            type:'ellipse'
		            },
		            to: {
		                city: '建筑1',
		                lnglat: [106.530825, 29.554711],
		                speed:1.5,
		                color:"#10C2DA",
		                max:50,
			            type:'ellipse'
		            }
		        },
				{
	            from: {
	                city: '建筑1',
	                lnglat: [106.530825, 29.554711],
	                speed:1.5,
	                color:"#10C2DA",
	                max:50,
		            type:'ellipse'
	            },
	            to: {
	                city: '建筑0',
	                lnglat: [106.530825, 29.579711],
	                speed:1.5,
	                color:"#10C2DA",
	                max:50,
		            type:'ellipse'
	            }
	        },
	        {
	        	from: {
	                city: '建筑1',
	                lnglat: [106.530825, 29.554711],
	                speed:1.5,
	                color:"#10C2DA",
	                max:50,
		            type:'ellipse'
	            },
	            to: {
	                city: '建筑2',
	                lnglat: [106.525825, 29.515711],
	                speed:1.5,
	                color:"#10C2DA",
	                max:50,
		            type:'ellipse'
	            }
	        },
	        {
	        	from: {
	                city: '建筑1',
	                lnglat: [106.530825, 29.554711],
	                speed:1.5,
	                color:"#10C2DA",
	                max:50,
		            type:'ellipse'
	            },
	            to: {
	                city: '建筑3',
	                lnglat: [106.579825, 29.558711],
	                speed:1.5,
	                color:"#10C2DA",
	                max:50,
		            type:'ellipse'
	            }
	        },
	        {
	        	from: {
	                city: '建筑1',
	                lnglat: [106.530825, 29.554711],
	                speed:1.5,
	                color:"#10C2DA",
	                max:50,
		            type:'ellipse'
	            },
	            to: {
	                city: '建筑4',
	                lnglat: [106.511825, 29.551711],
	                speed:1.5,
	                color:"#10C2DA",
	                max:50,
		            type:'ellipse'
	            }
	        },
	        {
	        	from: {
	                city: '建筑1',
	                lnglat: [106.530825, 29.554711],
	                speed:1.5,
	                color:"#10C2DA",
	                max:50,
		            type:'ellipse'
	            },
	            to: {
	                city: '建筑5',
	                lnglat: [106.549825, 29.536711],
		            speed:1.5,
		            color:"#10C2DA",
		            max:50,
		            type:'ellipse'     
	            }
	        }];
			var map={
					"camera":superMap.scene.camera,
					"getSize":function(){
						return {"width":superMap.scene.canvas.width,"height":superMap.scene.canvas.height};
					},
					"pointToPixel":function(location){
						return superMap.pointToPixel(location);
					},
					"getCenter":function(){
						
					},
					"addPoint":function(location){
						var position = superMap.cesium.Cartesian3.fromDegrees(location.lng, location.lat, 500);
						var options={
								color:new superMap.cesium.Color(200/255,223/255,233/255, 1),
								distance:1000,
								decay:0.5,
								intensity:10
						}
						var targetPosition = new superMap.cesium.Cartesian3(location.lng, location.lat, 100);
						var point=new superMap.cesium.PointLight(position,targetPosition, options);
						map.points.push(point);
						superMap.scene.addLightSource(point);
					},
					"points":[],
					"clear":function(){
						 for(var p of map.points){
							superMap.scene.removeLightSource(p);
							map.points.remove(p);
						 }
					}
			}
	        var moveLine = new MoveLine(map, {
	            // marker点半径
	            markerRadius: 3,
	            // marker点颜色,为空或null则默认取线条颜色
	            markerColor: "#BCFFFE",
	            // 线条类型 solid、dashed、dotted
	            lineType: 'dashed',
	            // 线条宽度
	            lineWidth: 1,
	            // 线条颜色
	            colors: ['#C1515D','#C1515D','#C1515D','#C1515D','#C1515D','#C1515D','#C1515D'],
	            // 移动点半径
	            moveRadius: 5,
	            // 移动点颜色
	            fillColor: '#BCFFFE',
	            // 移动点阴影颜色
	            shadowColor: '#BCFFFE',
	            // 移动点阴影大小
	            shadowBlur: 1,

	            data: data
	        });
		},
		/**
		 * 鼠标按键按下事件
		 */
		"mousedown":function(e){
			superMap.timer = setInterval(superMap.timerFunction,100);
		},
		/**
		 * 发送相机位置属性的定时器
		 */
		"timer":null,
		/**
		 * 发送相机位置属性相关
		 */
		"timerFunction":function(){
			superMap.lastUpdateTime=win.currentTimeMillis();
			if(superMap.siFly){
				return;
			}
			if(!APP_CONSOLE){
				return;
			}
			if(superMap.camera!=null){
				// 获取相机位置信息
				var position=superMap.camera.position;
				var pitch=superMap.camera.pitch;
				var heading=superMap.camera.heading;
				var roll=superMap.camera.roll;
				var msg={"roll":roll,"heading":heading,"pitch":pitch,"position":position};
				superMap.send("map-control",msg);
			}
		},
		/**
		 * 鼠标按键松开事件
		 */
		"mouseup":function(e){
			clearInterval(superMap.timer);
		},
		/**
		 * 鼠标滚轮事件
		 */
		"wheel":function(e){
			superMap.timerFunction();
		},
		/**
		 * 上一个发送的相机位置
		 */
		"prev":{
			"position":{"x":0,"y":0,"z":0},
			"pitch":0,
			"heading":0,
			"roll":0
		},
		/**
		 * websocket链接成功后触发 这里订阅控制相关
		 */
		"websocketConnectionSuccess":function(websocket){
			websocket.subscribe(CONFIG_SUBSCRIBE_TOPIC, function(m) {
				if(superMap.siFly){
		    		superMap.stopFly();
		    	}
				// 收到消息
				var data=JSON.parse(m.body);
				switch(data.command){
					case "map-control":
						// 地图控制
						socketMsg.mapControl(data);
						break;
					case "map-objs-click":
						// 选中控制
						socketMsg.mapObjsClick(data);
						break;
					case "map-startFly":
						superMap.startFly();
						break;
				}	
			});
		},
		/**
		 * 发送消息
		 */
		"send":function(com,msg){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message(com,"地图控制指令",msg));
			}else{
				console.log("WebSocket未连接");
			}
		},
		"siFly":false,
		/**
		 * 沿线飞行
		 */
		"flyManager":null,
		"flyStopArrived":function(routeStop){
			var date=new Date();
			// 在每个站点处停留1s
			// routeStop.waitTime = 1;
		},
		"startFly":function(){
			superMap.siFly=true;
			// 飞行速度
			superMap.flyManager.playRate=10;
			superMap.flyManager.currentStopIndex=0;
			superMap.flyManager.play();
		},
		"stopFly":function(){
			superMap.lastUpdateTime=win.currentTimeMillis();
			superMap.siFly=false;
    		superMap.flyManager.stop();
		}
	}

	var socketMsg={
			"mapControl":function(msg){
				superMap.camera.flyTo({destination:msg.data.position,
					orientation : {
						heading : msg.data.heading,
						pitch : msg.data.pitch,
						roll : msg.data.roll
					},
					duration:0
				});
			},
			"mapObjsClick":function(msg){
				var point=new superMap.cesium.PointLight(msg.data.position, msg.data.options);
				// 清除点光源
				for(var p of superMap.points){
					superMap.scene.removeLightSource(p);
					superMap.points.remove(p);
				}
				// 清除建筑物高亮

				superMap.layers[0].removeAllObjectsOperation();
				// 设置点光源
				superMap.points.push(point);
				superMap.scene.addLightSource(point);
				// 设置建筑物高亮
				superMap.layers[0].setObjsColor(msg.data.id,msg.data.color);
			}
	}

if(APP_CONSOLE){
	setInterval(function(){
		var curr=win.currentTimeMillis();
		var time=superMap.lastUpdateTime;
		// 秒数
		var t1 = (curr - time) / 1000;
		if ((t1 / 60) >= MINUTES_MAP_STARTFLY) {
			superMap.startFly();
			superMap.send("map-startFly");
		}
	},1000*60);
}

export {superMap}