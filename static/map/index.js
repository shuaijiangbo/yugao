
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
			//加载二维地图数据
			var provider = new Cesium.MapboxImageryProvider({
		        mapId:"mapbox.dark",
		        accessToken:"pk.eyJ1IjoiYW5hbHl0aWNhbGdyYXBoaWNzIiwiYSI6ImNpd204Zm4wejAwNzYyeW5uNjYyZmFwdWEifQ.7i-VIZZWX8pd1bTfxIVj9g"
		    });
			viewer.imageryLayers.addImageryProvider(provider);
			viewer.scene.skyAtmosphere.show = false;
			viewer.scene.fog.enabled = false;

			viewer.scene.lightSource.ambientLightColor = new Cesium.Color(
		        0.8,
		        0.8,
		        0.8,
		        0.8
		      );
		      //开启颜色校正
			viewer.scene.colorCorrection.show = true;
			viewer.scene.colorCorrection.saturation = 1;
			viewer.scene.colorCorrection.brightness = 0.8;
			viewer.scene.colorCorrection.contrast = 1;
			viewer.scene.colorCorrection.hue = 0;
		      //开启泛光和HDR
			viewer.scene.fxaa = true;
			viewer.scene.bloomEffect.show = true;
			viewer.scene.bloomEffect.threshold = 0.1;
			viewer.scene.bloomEffect.bloomIntensity = 0.8;
			viewer.scene.hdrEnabled = true;

			viewer.scene.scanEffect.show = false;
			viewer.scene.scanEffect.centerPostion = Cesium.Cartesian3.fromDegrees(
		        106.531307,
		        29.565657,
		        0
		      );
			viewer.scene.scanEffect.mode = Cesium.ScanEffectMode.CIRCLE;
			viewer.scene.scanEffect.color = new Cesium.Color(
		        8 / 255,
		        215 / 255,
		        237 / 255,
		        0.7
		      );
			viewer.scene.scanEffect.period = 20;
			try {
				// 打开所发布三维服务下的所有图层
				var promise = scene
						.open(SUPER_MAP_REST_URL);
				Cesium.when.all(promise, function(layers) {
					layers.forEach(function(item, index) {
			            item.ignoreNormal = true; // 获取或者设置是否在GPU中自动计算法线
			            item.clearMemoryImmediately = true; // 是否及时释放内存
			            if(item.name=="cq_Model"){
							superMap.setLayer(scene,item);
			            }else{
			            
			            	item.selectEnabled =false;
			            }
			        });		
					//viewer.customInfobox=$(".msg-info")[0];
					var camera=scene.camera;
					// 设置相机位置、视角，便于观察场景
					var indexPosition=CAMERA_POSITION["index"].camera;
					camera.flyTo({
						destination : indexPosition.position,
						orientation : {
							heading : indexPosition.heading,
							pitch : indexPosition.pitch,
							roll : indexPosition.roll
						},
						duration:indexPosition.duration
					});
					camera.flyCircleLoop = true;
					camera.percentageChanged = 0.001;
					superMap.camera=camera;
					superMap.layers=layers;
					// 加载线数据
					superMap.addRoad();
					
					
					/**
					 * 初始化沿线飞行
					 */
					var routes = new Cesium.RouteCollection(viewer.entities);
			        // 添加fpf飞行文件，fpf由SuperMap iDesktop生成
			        routes.fromFile('static/map/Build/SampleData/pfp/lj.fpf');
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
			        
			        setTimeout(function(){
						superMap.setLine();
						
						// 初始化加载地标信息
						superMap.loadmark(Cesium, viewer);
						// 扫描线
						var promise =superMap.scene.outputSceneToFile();
						superMap.cesium.when(promise,function(base64data){
						   $("#fb_map").prop("src",base64data);
						});
						
						window.imageBlob=new Map();
						
					},3000);
			        
				});

			} catch (e) {
				console.log(e);
			}
		},
		"htmlMark":[],
		"loadmark":function(Cesium, viewer){
			var line=[{"lnglat":[106.52633962465981,29.565441415776974,700]},{"lnglat":[106.52585657451024,29.56479540246192,700]},{"lnglat":[106.52427294171025,29.565275395519148,700]},{"lnglat":[106.52336165540277,29.565647962355133,700]},{"lnglat":[106.52367353295895,29.56674153798851,700]},{"lnglat":[106.52590109936736,29.567141493961284,700]},{"lnglat":[106.52509609288109,29.567414241266405,700]},{"lnglat":[106.52644485991156,29.568238665539525,700]},{"lnglat":[106.5268247344461,29.569105675705664,700]},{"lnglat":[106.52785489660413,29.569152049109224,700]},{"lnglat":[106.52826131192819,29.569580719763252,700]},{"lnglat":[106.5272665279692,29.57003250811121,700]},{"lnglat":[106.52553523861857,29.569877927916863,700]},{"lnglat":[106.52479327822695,29.57030925876556,700]},{"lnglat":[106.52384519362167,29.57064182588144,700]},{"lnglat":[106.52431485288432,29.570150023866287,700]},{"lnglat":[106.52355881077209,29.567711084992844,700]},{"lnglat":[106.52243176909435,29.56847724740514,700]},{"lnglat":[106.52250398084016,29.568048451012537,700]},{"lnglat":[106.52051970209227,29.567093513921048,700]},{"lnglat":[106.5209317572495,29.56654678301611,700]},{"lnglat":[106.52088495119625,29.56575525879274,700]},{"lnglat":[106.52162534099996,29.565837729235174,700]},{"lnglat":[106.52553786758097,29.563396192055663,700]},{"lnglat":[106.52533703545853,29.562382541780337,700]},{"lnglat":[106.52517245600751,29.56139069060756,700]},{"lnglat":[106.52523608355766,29.56034282218682,700]},{"lnglat":[106.52682343210307,29.56148047287964,700]},{"lnglat":[106.52743207531718,29.56233557990148,700]},{"lnglat":[106.52836239537802,29.56268581668801,700]},{"lnglat":[106.53072901782912,29.5623340129646,700]},{"lnglat":[106.53085878218937,29.563084611142813,700]},{"lnglat":[106.52899492307179,29.564604572472582,700]},{"lnglat":[106.52893657660677,29.56496071179712,700]},{"lnglat":[106.52945638667458,29.565265460567687,700]},{"lnglat":[106.52966092746993,29.565456096962883,700]},{"lnglat":[106.5297620252045,29.566010037473728,700]},{"lnglat":[106.53034499875398,29.56634210401903,700]},{"lnglat":[106.52888409464259,29.566532709610573,700]},{"lnglat":[106.52798528286456,29.567009894367484,700]},{"lnglat":[106.52770354140146,29.566570078230367,700]},{"lnglat":[106.52699969945819,29.56710463131789,700]},{"lnglat":[106.52905008749522,29.568112551356002,700]},{"lnglat":[106.52838434169374,29.568153111609536,700]},{"lnglat":[106.52799686560041,29.569431443444003,700]},{"lnglat":[106.52944267465516,29.569561220921315,700]},{"lnglat":[106.52983933612354,29.56882683773416,700]},{"lnglat":[106.53114488763418,29.56923558857246,700]},{"lnglat":[106.5316942938632,29.56946890154729,700]},{"lnglat":[106.53116684844863,29.567786902422213,700]},{"lnglat":[106.53156536283507,29.567600381256156,700]},{"lnglat":[106.53190227249152,29.567777814735297,700]},{"lnglat":[106.53181056058523,29.5673747990585,700]},{"lnglat":[106.53260141804415,29.566562232788733,700]},{"lnglat":[106.53300955843635,29.566360615777462,700]},{"lnglat":[106.53299287785171,29.566072317187018,700]},{"lnglat":[106.53268383637304,29.564340475719423,700]},{"lnglat":[106.53242608143742,29.56452477615658,700]},{"lnglat":[106.53221297392241,29.56381778385591,700]},{"lnglat":[106.5317380351092,29.563449385199686,700]},{"lnglat":[106.53066968626969,29.562786032533605,700]},{"lnglat":[106.5319329740939,29.56256971351253,700]},{"lnglat":[106.53228679519499,29.562122273669434,700]},{"lnglat":[106.53174619409782,29.56136462345748,700]},{"lnglat":[106.52978141198483,29.5604270164348,700]},{"lnglat":[106.52013693607671,29.560552680814645,700]},{"lnglat":[106.51958797161356,29.561329354701698,700]},{"lnglat":[106.51964129549452,29.562106302623423,700]},{"lnglat":[106.52118238357643,29.56356375360448,700]},{"lnglat":[106.52011660607737,29.563492392756192,700]},{"lnglat":[106.52165588165688,29.563693791958787,700]},{"lnglat":[106.52172953237887,29.56595175869441,700]},{"lnglat":[106.52088319662974,29.565921194746345,700]},{"lnglat":[106.52356866881013,29.566375225095854,700]},{"lnglat":[106.52094484255993,29.56766817022156,700]},{"lnglat":[106.52100260130351,29.568382034980154,700]},{"lnglat":[106.52222070605676,29.569573720036356,700]},{"lnglat":[106.523337913774,29.570658335721774,700]},{"lnglat":[106.52397263099148,29.570443021972608,700]},{"lnglat":[106.52454799340292,29.570603608128337,700]},{"lnglat":[106.52264699196297,29.572083923793688,700]},{"lnglat":[106.5226249652833,29.572797925774328,700]},{"lnglat":[106.52482865797116,29.572322535404627,700]},{"lnglat":[106.52640218514006,29.57161120351996,700]},{"lnglat":[106.52706020562498,29.57229190345205,700]},{"lnglat":[106.52642768536823,29.573161726839107,700]},{"lnglat":[106.52563617792237,29.573070458070802,700]},{"lnglat":[106.5260659308679,29.573261509139307,700]},{"lnglat":[106.52590692641873,29.574112221235247,700]},{"lnglat":[106.52699319101386,29.574313328888316,700]},{"lnglat":[106.52751418760243,29.574404840533298,700]},{"lnglat":[106.52685661218419,29.575371691213945,700]},{"lnglat":[106.526906321107,29.576616845302933,700]},{"lnglat":[106.52611530744005,29.576492612319473,700]},{"lnglat":[106.52638737866312,29.575862748319814,700]},{"lnglat":[106.52786062520138,29.575864277434185,700]},{"lnglat":[106.52974899449279,29.57559237974197,700]},{"lnglat":[106.53081940253217,29.57621960982587,700]},{"lnglat":[106.53012791328594,29.575156835763867,700]}];
			for(var s of line){
				viewer.entities.add({
		            polyline : {
		                positions : Cesium.Cartesian3.fromDegreesArrayHeights([s.lnglat[0],s.lnglat[1],0,
		                	s.lnglat[0],s.lnglat[1],parseInt(Math.random() * (500 - 300 + 1) + 300)]),
		                width : 1,
		                material : new Cesium.PolylineTrailMaterialProperty({ //设置Glow材质
							trailLength: 0.4,
							color: Cesium.Color.AQUA.withAlpha(0.1),
							constantSpeed:100
						})
		            }
		        });
			}
			
		},
		/**
		 * 点光源
		 */
		"points":[],
		/**
		 * 建筑物
		 */
		"objs":[],
		"addRoad":function(){
		      let promiseroute11 = Cesium.GeoJsonDataSource.load(
		        "static/map/Build/SampleData/json/lineback_1.json"
		      );
		      promiseroute11
		        .then(function(dataSource) {
		          superMap.viewer.dataSources.add(dataSource);
		          let Routes11 = dataSource.entities.values;
		          for (let i = 0; i < Routes11.length; i++) {
		            let line = Routes11[i];
		            let period = Math.random() * 10;
		            if (period < 1) {
		              period += 1;
		            }

		            if (i < 100) {
		              line.polyline.material = new Cesium.PolylineTrailMaterialProperty(
		                {
		                  // 尾迹线材质
		                  color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.3),
		                  trailLength: 0.8,
		                  period: period
		                }
		              );
		              line.polyline.width = 3;
		            } else {
		              line.polyline.material = new Cesium.PolylineTrailMaterialProperty(
		                {
		                  // 尾迹线材质
		                  color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.7),
		                  trailLength: 0.8,
		                  period: period
		                }
		              );
		              line.polyline.width = 3;
		            }
		          }
		        })
		        .otherwise(function(error) {
		          window.alert(error);
		        });

		      let promiseroute12 = Cesium.GeoJsonDataSource.load(
		        "static/map/Build/SampleData/json/lineback_1.json"
		      );
		      promiseroute12
		        .then(function(dataSource) {
		          superMap.viewer.dataSources.add(dataSource);
		          let Routes2 = dataSource.entities.values;

		          for (let i = 0; i < Routes2.length; i++) {
		            let line = Routes2[i];
		            line.polyline.material = new Cesium.Color(
		              118 / 255,
		              233 / 255,
		              241 / 255,
		              0.1
		            );
		            line.polyline.width = 1;
		          }
		        })
		        .otherwise(function(error) {
		          window.alert(error);
		        });
		      let promiseroute21 = Cesium.GeoJsonDataSource.load(
		        "static/map/Build/SampleData/json/lineback2_1.json"
		      );
		      promiseroute21
		        .then(function(dataSource) {
		          superMap.viewer.dataSources.add(dataSource);
		          let Routes11 = dataSource.entities.values;
		          for (let i = 0; i < Routes11.length; i++) {
		            let line = Routes11[i];
		            let period = Math.random() * 10;
		            if (period < 1) {
		              period += 1;
		            }

		            if (i < 100) {
		              line.polyline.material = new Cesium.PolylineTrailMaterialProperty(
		                {
		                  // 尾迹线材质
		                  color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.3),
		                  trailLength: 0.8,
		                  period: period
		                }
		              );
		              line.polyline.width = 3;
		            } else {
		              line.polyline.material = new Cesium.PolylineTrailMaterialProperty(
		                {
		                  // 尾迹线材质
		                  color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.7),
		                  trailLength: 0.8,
		                  period: period
		                }
		              );
		              line.polyline.width = 3;
		            }
		          }
		        })
		        .otherwise(function(error) {
		          window.alert(error);
		        });

		      let promiseroute22 = Cesium.GeoJsonDataSource.load(
		        "static/map/Build/SampleData/json/lineback2_1.json"
		      );
		      promiseroute22
		        .then(function(dataSource) {
		          superMap.viewer.dataSources.add(dataSource);
		          let Routes2 = dataSource.entities.values;

		          for (let i = 0; i < Routes2.length; i++) {
		            let line = Routes2[i];
		            line.polyline.material = new Cesium.Color(
		              118 / 255,
		              233 / 255,
		              241 / 255,
		              0.1
		            );
		            line.polyline.width = 1;
		          }
		        })
		        .otherwise(function(error) {
		          window.alert(error);
		        });
		      let promiseroute31 = Cesium.GeoJsonDataSource.load(
		        "static/map/Build/SampleData/json/lineback3_1.json"
		      );
		      promiseroute31
		        .then(function(dataSource) {
		          superMap.viewer.dataSources.add(dataSource);
		          let Routes11 = dataSource.entities.values;
		          for (let i = 0; i < Routes11.length; i++) {
		            let line = Routes11[i];
		            let period = Math.random() * 10;
		            if (period < 1) {
		              period += 1;
		            }

		            if (i < 100) {
		              line.polyline.material = new Cesium.PolylineTrailMaterialProperty(
		                {
		                  // 尾迹线材质
		                  color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.3),
		                  trailLength: 0.8,
		                  period: period
		                }
		              );
		              line.polyline.width = 3;
		            } else {
		              line.polyline.material = new Cesium.PolylineTrailMaterialProperty(
		                {
		                  // 尾迹线材质
		                  color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.7),
		                  trailLength: 0.8,
		                  period: period
		                }
		              );
		              line.polyline.width = 3;
		            }
		          }
		        })
		        .otherwise(function(error) {
		          window.alert(error);
		        });

		      let promiseroute32 = Cesium.GeoJsonDataSource.load(
		        "static/map/Build/SampleData/json/lineback3_1.json"
		      );
		      promiseroute32
		        .then(function(dataSource) {
		          superMap.viewer.dataSources.add(dataSource);
		          let Routes2 = dataSource.entities.values;

		          for (let i = 0; i < Routes2.length; i++) {
		            let line = Routes2[i];
		            line.polyline.material = new Cesium.Color(
		              118 / 255,
		              233 / 255,
		              241 / 255,
		              0.1
		            );
		            line.polyline.width = 1;
		          }
		        })
		        .otherwise(function(error) {
		          window.alert(error);
		        });
		        let promiseroute41 = Cesium.GeoJsonDataSource.load(
		        "static/map/Build/SampleData/json/xinquroad.json"
		      );
		      promiseroute41
		        .then(function(dataSource) {
		          superMap.viewer.dataSources.add(dataSource);
		          let Routes11 = dataSource.entities.values;
		          for (let i = 0; i < Routes11.length; i++) {
		            let line = Routes11[i];
		            let period = Math.random() * 10;
		            if (period < 1) {
		              period += 1;
		            }

		            if (i < 100) {
		              line.polyline.material = new Cesium.PolylineTrailMaterialProperty(
		                {
		                  // 尾迹线材质
		                  color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.3),
		                  trailLength: 0.8,
		                  period: period
		                }
		              );
		              line.polyline.width = 3;
		            } else {
		              line.polyline.material = new Cesium.PolylineTrailMaterialProperty(
		                {
		                  // 尾迹线材质
		                  color: new Cesium.Color(8 / 255, 215 / 255, 237 / 255, 0.7),
		                  trailLength: 0.8,
		                  period: period
		                }
		              );
		              line.polyline.width = 3;
		            }
		          }
		        })
		        .otherwise(function(error) {
		          window.alert(error);
		        });

		      let promiseroute42 = Cesium.GeoJsonDataSource.load(
		        "static/map/Build/SampleData/json/xinquroad.json"
		      );
		      promiseroute42
		        .then(function(dataSource) {
		          superMap.viewer.dataSources.add(dataSource);
		          let Routes2 = dataSource.entities.values;

		          for (let i = 0; i < Routes2.length; i++) {
		            let line = Routes2[i];
		            line.polyline.material = new Cesium.Color(
		              118 / 255,
		              233 / 255,
		              241 / 255,
		              0.1
		            );
		            line.polyline.width = 1;
		          }
		        })
		        .otherwise(function(error) {
		          window.alert(error);
		        });
		      
		      var promiseroute4 = Cesium.GeoJsonDataSource.load('static/map/Build/SampleData/json/line4.json');
				promiseroute4.then(function(dataSource) {
					superMap.viewer.dataSources.add(dataSource);
					var routes4 = dataSource.entities.values;

					for(var i = 0; i < routes4.length; i++) {
						var line = routes4[i];
						line.polyline.material = new Cesium.PolylineTrailMaterialProperty({ //设置Glow材质
							trailLength: 0.5,
							color: new Cesium.Color(245/255,76/255,24/255,0.9),
							period:5
						})
						line.polyline.width = 5;
					}
				}).otherwise(function(error) {
					console.log(error);
				});
				
				var promiseroute5 = Cesium.GeoJsonDataSource.load('static/map/Build/SampleData/json/line_min.json');
				promiseroute5.then(function(dataSource) {
					superMap.viewer.dataSources.add(dataSource);
					var routes5 = dataSource.entities.values;

					for(var i = 0; i < routes5.length; i++) {
						var line = routes5[i];
						line.polyline.material = new Cesium.PolylineTrailMaterialProperty({ //设置Glow材质
							trailLength: 0.2,
							color: new Cesium.Color(142/255,23/255,199/255,0.9),
							period:1
						})
						line.polyline.width = 3;
					}
				}).otherwise(function(error) {
					console.log(error);
				});
		},
		"computelength":function(linepoints){
			if(linepoints.length>2)
          {
            let pointx=[]
            let pointy=[]
            linepoints.forEach(point=>{
              pointx.push(point.x)
              pointy.push(point.y)
            })
            let xmax=Math.max(...pointx)
            let xmin=Math.min(...pointx)
            let ymax=Math.max(...pointy)
            let ymin=Math.min(...pointy)
            let centerpoint={
              x:(xmax+xmin)/2,
              y:(ymax+ymin)/2
            }
            let distance = superMap.cesium.Cartesian3.distance(
          		  superMap.cesium.Cartesian3.fromDegrees(
                xmax,
                ymax,
                0
              ),
              superMap.cesium.Cartesian3.fromDegrees(xmin, ymin, 0)
            );
            let circleObj={
              center:centerpoint,
              distance:distance/2
            }
            return circleObj;

          }
		},
		"bacolor":function(id){
				var result={"stringID":null,"fieldNames":["SMID","SMSDRIW","SMSDRIN","SMSDRIE","SMSDRIS","SMUSERID","SMAREA","SMPERIMETER","SMGEOMETRYSIZE","SMGEOPOSITION","HEIGHT","FIELD_SMUSERID","MODELID","VOLUME","BOTTOMATTITUDE","HEIGHT_1"],"geometry":{"center":{"x":106.54557645477195,"y":29.584524515825493},"parts":[5],"style":null,"prjCoordSys":null,"id":13361,"type":"REGION","partTopo":[1],"points":[{"x":106.54583979992536,"y":29.584487748856656},{"x":106.54582904497941,"y":29.58459965419133},{"x":106.54531310803539,"y":29.58456128279433},{"x":106.54532386407791,"y":29.584449377459656},{"x":106.54583979992536,"y":29.584487748856656}]},"fieldValues":["13361","106.54531","29.5846","106.54584","29.58445","0","624.4788631259819","125.23007092826211","92","1872652","9.0","0","","5639.7413930045295","4.06801700592041E-6","8.999999907799065"],"ID":13361};
				let linepoints = result.geometry.points;
	            let centerObjback = superMap.computelength(linepoints);
	            let centerpoint=centerObjback.center;
	            let length=centerObjback.distance;
	            length = length * 1.2;
//	            if (!superMap.seletedSpLightsoure) {
//	              let seletedSpLightsoure = new superMap.cesium.SpotLight(
//	            		  superMap.cesium.Cartesian3.fromDegrees(
//	                  centerpoint.x,
//	                  centerpoint.y,
//	                  500
//	                ),
//	                superMap.cesium.Cartesian3.fromDegrees(
//	                  centerpoint.x,
//	                  centerpoint.y,
//	                  0
//	                ),
//	                {
//	                  color: new superMap.cesium.Color(1, 1, 1, 1),
//	                  distance: 600,
//	                  decay: 0,
//	                  intensity: 3
//	                }
//	              );
//	              superMap.seletedSpLightsoure=seletedSpLightsoure;
//	              superMap.scene.addLightSource(
//	            		  superMap.seletedSpLightsoure
//	              );
//	              let DlightN = new superMap.cesium.DirectionalLight(
//	            		  superMap.cesium.Cartesian3.fromDegrees(
//	                  centerpoint.x,
//	                  centerpoint.y,
//	                  100
//	                ),
//	                {
//	                  color: new superMap.cesium.Color(1, 1, 1, 1),
//	                  decay: 0,
//	                  intensity: 2,
//	                  targetPosition: superMap.cesium.Cartesian3.fromDegrees(
//	                    centerpoint.x,
//	                    centerpoint.y - 1,
//	                    100
//	                  )
//	                }
//	              );
//	              superMap.DlightN=DlightN;
//	              superMap.scene.addLightSource(superMap.DlightN);
//	              let DlightS = new superMap.cesium.DirectionalLight(
//	            		  superMap.cesium.Cartesian3.fromDegrees(
//	                  centerpoint.x,
//	                  centerpoint.y,
//	                  100
//	                ),
//	                {
//	                  color: new superMap.cesium.Color(1, 1, 1, 1),
//	                  decay: 0,
//	                  intensity: 2,
//	                  targetPosition: superMap.cesium.Cartesian3.fromDegrees(
//	                    centerpoint.x,
//	                    centerpoint.y + 1,
//	                    100
//	                  )
//	                }
//	              );
//	              superMap.DlightS=DlightS;
//	              superMap.scene.addLightSource(superMap.DlightS);
//	              let DlightE = new superMap.cesium.DirectionalLight(
//	            		  superMap.cesium.Cartesian3.fromDegrees(
//	                  centerpoint.x,
//	                  centerpoint.y,
//	                  100
//	                ),
//	                {
//	                  color: new superMap.cesium.Color(1, 1, 1, 1),
//	                  decay: 0,
//	                  intensity: 2,
//	                  targetPosition: superMap.cesium.Cartesian3.fromDegrees(
//	                    centerpoint.x - 1,
//	                    centerpoint.y,
//	                    100
//	                  )
//	                }
//	              );
//	              superMap.DlightE=DlightE;
//	              superMap.scene.addLightSource(superMap.DlightE);
//	              let DlightW = new superMap.cesium.DirectionalLight(
//	            		  superMap.cesium.Cartesian3.fromDegrees(
//	                  centerpoint.x,
//	                  centerpoint.y,
//	                  100
//	                ),
//	                {
//	                  color: new superMap.cesium.Color(1, 1, 1, 1),
//	                  decay: 0,
//	                  intensity: 2,
//	                  targetPosition: superMap.cesium.Cartesian3.fromDegrees(
//	                    centerpoint.x + 1,
//	                    centerpoint.y,
//	                    100
//	                  )
//	                }
//	              );
//	              superMap.DlightW=DlightW;
//	              superMap.scene.addLightSource(superMap.DlightW);
//	            } else {
//	            	superMap.seletedSpLightsoure.position = superMap.cesium.Cartesian3.fromDegrees(
//	                centerpoint.x,
//	                centerpoint.y,
//	                500
//	              );
//	            	superMap.seletedSpLightsoure.targetPosition = superMap.cesium.Cartesian3.fromDegrees(
//	                centerpoint.x,
//	                centerpoint.y,
//	                0
//	              );
//	            }
	            superMap.buildinglayer.brightness = 0.05;
		},
		"removeBgColor":function(){
			if(true){
//				superMap.scene.removeLightSource(superMap.seletedSpLightsoure);
//				superMap.seletedSpLightsoure = undefined;
//				superMap.scene.removeLightSource(superMap.DlightN);
//				superMap.DlightN=undefined;
//				superMap.scene.removeLightSource(superMap.DlightS);
//				superMap.DlightS=undefined;
//				superMap.scene.removeLightSource(superMap.DlightE);
//				superMap.DlightE=undefined;
//				superMap.scene.removeLightSource(superMap.DlightW);
//				superMap.DlightW=undefined;
				superMap.buildinglayer.brightness = 0.8;
				if(superMap.selectCircle){
					superMap.selectCircle.visible(false);
				}
			}
			superMap.buildinglayer.removeAllObjsColor();	
		},
		"selectLayer":function(result){
			if("none"!=result){
				superMap.viewer.entities.add({
					position:superMap.cesium.Cartesian3.fromDegrees(parseFloat(result.fieldValues[1]),parseFloat(result.fieldValues[2]),parseInt(result.fieldValues[10])+20),
					show:true,
					label : {
						text:result.fieldNames[0]+":"+result.fieldValues[0]+"\n"+result.fieldNames[1]+":"+result.fieldValues[1]+"\n"+result.fieldNames[2]+":"+result.fieldValues[2]+"\n"+result.fieldNames[10]+":"+result.fieldValues[10],
						font:BILLBOARD_FONT,
						fillColor:new superMap.cesium.Color(249/255,171/255,19/255,1),
						style:superMap.cesium.LabelStyle.FILL,
		                scaleByDistance:new superMap.cesium.NearFarScalar(100, 1, 5000, 0.01)
		            }
		        });
            	let linepoints = result.geometry.points;
                let centerObjback = superMap.computelength(linepoints);
                let centerpoint=centerObjback.center;
                let length=centerObjback.distance;
                length = length * 1.2;
                if (!superMap.selectCircle) {
                  //添加旋转圆
                  let roll =new rollcircle(
                		  superMap.viewer,
                		  superMap.cesium.Cartesian3.fromDegrees(
                      centerpoint.x,
                      centerpoint.y,
                      2
                    ),
                    length,
                    superMap.cesium
                  );
                  superMap.selectCircle=roll;
                } else {
                	superMap.selectCircle.changeposition(
                		  superMap.cesium.Cartesian3.fromDegrees(
                      centerpoint.x,
                      centerpoint.y,
                      2
                    )
                  );
                  superMap.selectCircle.changeR(length);
                  superMap.selectCircle.visible(true);
                }
//                if (!superMap.seletedSpLightsoure) {
//                  let seletedSpLightsoure = new superMap.cesium.SpotLight(
//                		  superMap.cesium.Cartesian3.fromDegrees(
//                      centerpoint.x,
//                      centerpoint.y,
//                      500
//                    ),
//                    superMap.cesium.Cartesian3.fromDegrees(
//                      centerpoint.x,
//                      centerpoint.y,
//                      0
//                    ),
//                    {
//                      color: new superMap.cesium.Color(1, 1, 1, 1),
//                      distance: 600,
//                      decay: 0,
//                      intensity: 3
//                    }
//                  );
//                  superMap.seletedSpLightsoure=seletedSpLightsoure;
//                  superMap.scene.addLightSource(
//                		  superMap.seletedSpLightsoure
//                  );
//                  let DlightN = new superMap.cesium.DirectionalLight(
//                		  superMap.cesium.Cartesian3.fromDegrees(
//                      centerpoint.x,
//                      centerpoint.y,
//                      100
//                    ),
//                    {
//                      color: new superMap.cesium.Color(1, 1, 1, 1),
//                      decay: 0,
//                      intensity: 2,
//                      targetPosition: superMap.cesium.Cartesian3.fromDegrees(
//                        centerpoint.x,
//                        centerpoint.y - 1,
//                        100
//                      )
//                    }
//                  );
//                  superMap.DlightN=DlightN;
//                  superMap.scene.addLightSource(superMap.DlightN);
//                  let DlightS = new superMap.cesium.DirectionalLight(
//                		  superMap.cesium.Cartesian3.fromDegrees(
//                      centerpoint.x,
//                      centerpoint.y,
//                      100
//                    ),
//                    {
//                      color: new superMap.cesium.Color(1, 1, 1, 1),
//                      decay: 0,
//                      intensity: 2,
//                      targetPosition: superMap.cesium.Cartesian3.fromDegrees(
//                        centerpoint.x,
//                        centerpoint.y + 1,
//                        100
//                      )
//                    }
//                  );
//                  superMap.DlightS=DlightS;
//                  superMap.scene.addLightSource(superMap.DlightS);
//                  let DlightE = new superMap.cesium.DirectionalLight(
//                		  superMap.cesium.Cartesian3.fromDegrees(
//                      centerpoint.x,
//                      centerpoint.y,
//                      100
//                    ),
//                    {
//                      color: new superMap.cesium.Color(1, 1, 1, 1),
//                      decay: 0,
//                      intensity: 2,
//                      targetPosition: superMap.cesium.Cartesian3.fromDegrees(
//                        centerpoint.x - 1,
//                        centerpoint.y,
//                        100
//                      )
//                    }
//                  );
//                  superMap.DlightE=DlightE;
//                  superMap.scene.addLightSource(superMap.DlightE);
//                  let DlightW = new superMap.cesium.DirectionalLight(
//                		  superMap.cesium.Cartesian3.fromDegrees(
//                      centerpoint.x,
//                      centerpoint.y,
//                      100
//                    ),
//                    {
//                      color: new superMap.cesium.Color(1, 1, 1, 1),
//                      decay: 0,
//                      intensity: 2,
//                      targetPosition: superMap.cesium.Cartesian3.fromDegrees(
//                        centerpoint.x + 1,
//                        centerpoint.y,
//                        100
//                      )
//                    }
//                  );
//                  superMap.DlightW=DlightW;
//                  superMap.scene.addLightSource(superMap.DlightW);
//                } else {
//                	superMap.seletedSpLightsoure.position = superMap.cesium.Cartesian3.fromDegrees(
//                    centerpoint.x,
//                    centerpoint.y,
//                    500
//                  );
//                	superMap.seletedSpLightsoure.targetPosition = superMap.cesium.Cartesian3.fromDegrees(
//                    centerpoint.x,
//                    centerpoint.y,
//                    0
//                  );
//                }
                superMap.buildinglayer.brightness = 0.05;
			}else{
				$(".left").hide();
				$(".right").hide();
				$("#type1").hide();
				$("#type2").hide();
				$(".fenbo").hide();
				$(".fenbo_form").hide();
				$(".statistics_box").show();
				if(true){
//					superMap.scene.removeLightSource(superMap.seletedSpLightsoure);
//					superMap.seletedSpLightsoure = undefined;
//					superMap.scene.removeLightSource(superMap.DlightN);
//					superMap.DlightN=undefined;
//					superMap.scene.removeLightSource(superMap.DlightS);
//					superMap.DlightS=undefined;
//					superMap.scene.removeLightSource(superMap.DlightE);
//					superMap.DlightE=undefined;
//					superMap.scene.removeLightSource(superMap.DlightW);
//					superMap.DlightW=undefined;
					superMap.buildinglayer.brightness = 0.8;
					if(superMap.selectCircle){
						superMap.selectCircle.visible(false);
					}
				}
				superMap.buildinglayer.removeAllObjsColor();
			}
		},
		/**
		 * 图层建筑物点击查询相关
		 */
		"setLayer":function(scene,item){
			var layer1 = scene.layers.find(item.name);
			layer1.style3D._fillForeColor.alpha = 1; // 矢量图层填充前景色透明
			layer1.selectedColor =new superMap.cesium.Color(8 / 255,215 / 255,237 / 255,1); // 选中时给一个可见颜色
			layer1.selectedColor.alpha=1;
			layer1.saturation = 0.5;
			superMap.buildinglayer=layer1;
			superMap.buildinglayer.brightness = 0.8;
			layer1.style3D.fillForeColor.alpha = 1;
			layer1.selectColorType = 1; // 选中颜色的显示类型为替换色
			layer1.selectEnabled = true; // 矢量图层可选
			var hyp = new Cesium.HypsometricSetting();
			hyp.LineInterval= 1;
			hyp.Opacity = 0.5;
			hyp.emissionTextureUrl = "static/map/Build/Cesium2/Widgets/Images/speed.png";
			hyp.emissionTexCoordUSpeed = 0.01;
			layer1.hypsometricSetting = {
					hypsometricSetting: hyp
			}
		},
		/**
		 * 经纬度转换屏幕坐标
		 * 
		 * @param location
		 * @returns {superMap.cesium.Cartesian2}
		 */
		"pointToPixel":function(location){
			if(location.lng==0&&location.lat==0&&location.height==0){
				return {x:0,y:0,z:0};
			}
			if(location.height<0){
				return {x:location.lng,y:location.lat,z:0};
			}
			var position = superMap.cesium.Cartesian3.fromDegrees(location.lng, location.lat, $.trim(location.height)==""?0:location.height);
			var cartesian=new superMap.cesium.Cartesian2();
			superMap.scene.cartesianToCanvasCoordinates(position,cartesian);
			return cartesian;
		},
		"moveLine":null,
		/**
		 * 线型动画，圆形散布特效相关
		 */
		"setLine":function(){
			var data = [];
			var map={
					"camera":superMap.scene.camera,
					"getSize":function(){
						return {"width":superMap.scene.canvas.width,"height":superMap.scene.canvas.height};
					},
					"pointToPixel":function(location){
						return superMap.pointToPixel(location);
					},
					"getCenter":function(){
						
					}
			}
	        var moveLine = new MoveLine(map, {
	            // marker点半径
	            markerRadius: 3,
	            // marker点颜色,为空或null则默认取线条颜色
	            markerColor: "#BCFFFE",
	            // 线条类型 solid、dashed、dotted
	            lineType: 'solid',
	            // 线条宽度
	            lineWidth: 1,
	            // 线条颜色
	            colors: '#F0F0F0',
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
			superMap.moveLine=moveLine;
		},
		/**
		 * websocket链接成功后触发 这里订阅控制相关
		 */
		"websocketConnectionSuccess":function(websocket){
			//推送劳动数据
			websocket.subscribe("/topic/fetchLabourInfo", function(m) {
				var data=JSON.parse(m.body);
				if(data.status==200){
					var d=JSON.parse(data.data);
					if(d.data.sumRealNum){
						$("#sumRealNum").text(d.data.sumRealNum);
					}
					if(d.data.sumTotalNum){
						$("#sumTotalNum").text(d.data.sumTotalNum);
					}
				}
			});
			//推送劳动数据
			websocket.subscribe("/topic/project", function(m) {
				var data=JSON.parse(m.body);
				if($.trim(data.countFieldMan)!=""&&$.trim(data.countAttendance)!=""){
					$("#sumTotalNumNew").text(data.countFieldMan);
					$("#sumRealNumNew").text(data.countAttendance);
                    $('#lawuTime').text('数据更新时间：'+data.time);
					if(pmd){
						pmd.buildLabourDataPieData(data.countFieldMan,data.countAttendance);
					}
				}
			});
			
			websocket.subscribe(CONFIG_SUBSCRIBE_TOPIC, function(m) {
				// 收到消息
				var data=JSON.parse(m.body);
				if(superMap.siFly&&data.command!="enterFullScreen"&&data.command!="index_unit"&&data.command!="map-objs-click2"){
		    		superMap.stopFly();
		    	}
				switch(data.command){
					case "reload":
						//window.location.reload();
						break;
					case "map-control":
						// 地图控制
						socketMsg.mapControl(data);
						break;
					case "map-objs-click":
						// 选中控制
						socketMsg.mapObjsClick(data);
						break;
					case "map-objs-click2":
						// 选中控制
						socketMsg.mapObjsClick(data);
						superMap.bacolor(data.data.id[0]);
						break;
					case "map-startFly":
						superMap.startFly();
						break;
					case "view-clear":
						command.clear();
						break;
					case "cd-index":
						socketMsg.cd_index(data);
						break;
					case "cd-qiye":
						socketMsg.cd_qiye(data);
						break;
					case "cd-jindu":
						socketMsg.cd_jindu(data);
						break;
					case "cd-xiangmu":
						socketMsg.cd_xiangmu(data);
						break;
					case "cd-xiaoneng":
						socketMsg.cd_xiaoneng(data);
						break;
					case "cd-fenbo":
						var promise =superMap.scene.outputSceneToFile();
						superMap.cesium.when(promise,function(base64data){
						   $("#fb_map").prop("src",base64data);
						   socketMsg.cd_fenbo(data);
						});
						break;
					case "cd-dangjian":
						socketMsg.cd_dangjian(data);
						break;
					case "project-selectLike":
						socketMsg.project_selectLike(data);
						break;
					case "project-selectAll":
						select.projectSelectAll(data);
						break;
					case "markLayers-click":
						socketMsg.markLayers_click(data);
						break;
					case "qiye-fz":
						socketMsg.qiye_fz(data);
						break;
					case "qiye-jp":
						socketMsg.qiye_jp(data);
						break;
					case "element-click":
						socketMsg.elemnetClick(data);
						break;
					case "index-gy":
						socketMsg.index_gy(data);
						break;
					case "dangjian-djsj":
						socketMsg.dangjian_djsj(data);
						break;
					case "fenbo-click":
						event.fenbo_click(data);
						break;
					case "fenbo-click2":
						event.fenbo_click2(data);
						break;
					case "index_unit":
						socketMsg.index_unit(data);
						break;
					case "open-conference":
						socketMsg.open_conference(data);
						break;
					case "close-conference":
						socketMsg.closeConference(data);
						break;
					case "qiye_qyxc":
						socketMsg.qiye_qyxc(data);
						break;
					case "qiye_qyxc_close":
						socketMsg.qiye_qyxc_close(data);
						break;
					case "type-click":
						socketMsg.type_click(data);
						break;
					case "enterFullScreen":
						socketMsg.enterFullScreen(data);
						break;
					case "selectLayer":
						superMap.selectLayer(data.data);
						break;
					case "open-projectDetails":
						socketMsg.open_projectDetails(data.data);
						break;
					case "mouse-move":
//						var Y = $("#project-details-div").offset().top+data.data.y;
//						var X = $("#project-details-div").offset().left+data.data.x;
//						websocket.send("/topic/client",command.message("mouse-move","",{x:X,y:Y}));
						break;
					case "mouse-left-click":
//						var Y = $("#project-details-div").offset().top+data.data.y;
//						var X = $("#project-details-div").offset().left+data.data.x;
//						websocket.send("/topic/client",command.message("mouse-left-click","",{x:X,y:Y}));
						break;
					case "xmgk":
						socketMsg.xmgk(data);
						break;
					case "imageBlob":
						if(!window.imageBlob){
							window.imageBlob=new Map();
							if(!window.imageBlob.has(data.data.id)){
								var im=new Image();
								im.src="/static/"+data.data.imageUrl;
								window.imageBlob.set(data.data.id,im);
							}
						}else{
							if(!window.imageBlob.has(data.data.id)){
								var im2=new Image();
								im2.src="/static/"+data.data.imageUrl;
								window.imageBlob.set(data.data.id,im2);
							}
						}
						break;
				}	
			});
			
			websocket.send(CONFIG_COMMAND_TOPIC,command.message("getProjectAll","",""));
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
			// 在每个站点处停留1s
			// routeStop.waitTime = 1;
		},
		"startFly":function(){
			superMap.siFly=true;
			// 飞行速度
			superMap.flyManager.playRate=0.3;
			superMap.flyManager.currentStopIndex=0;
			superMap.flyManager.play();
		},
		"stopFly":function(){
			superMap.lastUpdateTime=win.currentTimeMillis();
			superMap.siFly=false;
    		superMap.flyManager.stop();
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