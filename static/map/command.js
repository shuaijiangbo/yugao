/**
 * 指令控制
 */
var command={
		"message":function(command,message,data){
			return JSON.stringify({"command":command,"status":200,"timestamp":win.currentTimeMillis(),"message":message,"data":data});
		},
		"show_park":function(){
			websocket.send(CONFIG_COMMAND_TOPIC,command.message("show-park"));
		},
		"clear":function(){
			$("#indexPage").css("opacity","0");
			$("#contentBox").children("div:gt(0)").hide();
			command.clearView();
		},
		/**
		 * 清除地图上的元素，切换菜单
		 */
		"clearView":function(){
			video.stopAll();
			$("#video-div").remove();
			$(".left").hide();
			$(".right").hide();
			$("#type1").hide();
			$("#type2").hide();
			$(".fenbo").hide();
			$(".fenbo_form").hide();
			$("#popBoxContainer").addClass("pop_in_animate");
			$("#popBoxContainer").removeClass("pop_out_animate");
			$("#popBoxContainer .pop_box").children("div").hide();
			superMap.moveLine.update([]);
			superMap.buildinglayer.removeAllObjsColor();
			// 清除点光源
			for (var p1 of superMap.points) {
				superMap.scene.removeLightSource(p1);
				superMap.points.remove(p1);
			}
			$("#marks-all").html("");
			superMap.htmlMark.clear();
			for(var e of qiye_jpgc.data){
				$("#"+e.id).css({"position":"static"});
			}
		}
}

var socketMsg={
	/**
	 * 控制大屏
	 * @param msg
	 */
	"mapControl":function(msg,callback){
		superMap.camera.flyTo({destination:msg.data.position,
			orientation : {
				heading : msg.data.heading,
				pitch : msg.data.pitch,
				roll : msg.data.roll
			},
			duration:msg.data.duration,
			complete:callback
		});
	},
	"elemnetClick":function(msg){
		$(msg.data.obj).click();
		if(msg.data.noClear){
			return;
		}
		command.clearView();
	},
	/**
	 * 点击高亮
	 * @param msg
	 */
	"mapObjsClick":function(msg){
		$("#marks-all").find(".object").html("");
		$(".tip").remove();
		superMap.buildinglayer.removeAllObjsColor();
		// 设置建筑物高亮
		superMap.buildinglayer.setObjsColor(msg.data.id, msg.data.color);
	},
	"cd_index":function(msg){
		command.clear();
		$("#indexPage").css("opacity","1");
		$("#centerBox").css("opacity","1");
		$(".navbar-nav").children("img").css("display","none");
		superMap.removeBgColor();
	},
	"index_gy":function(msg){
		$("#unit3").click();
	},
	"index_unit":function(msg){
		$("#centerBox").css("opacity","1");
		if(msg.data.index==3&&$("#popBuildPark").is(":visible")){
			$("#popBoxContainer").addClass("pop_in_animate");
			$("#popBoxContainer").removeClass("pop_out_animate");
			$("#popBoxContainer .pop_box").children("div").hide();
			return;
		}
		if(msg.data.index==1&&$("#popBuildNetwork").is(":visible")){
			$("#popBoxContainer").addClass("pop_in_animate");
			$("#popBoxContainer").removeClass("pop_out_animate");
			$("#popBoxContainer .pop_box").children("div").hide();
			return;
		}
		if(msg.data.index==5&&$("#popBuildBuilding").is(":visible")){
			$("#popBoxContainer").addClass("pop_in_animate");
			$("#popBoxContainer").removeClass("pop_out_animate");
			$("#popBoxContainer .pop_box").children("div").hide();
			return;
		}
		if(msg.data.index==2&&$("#popBuildRoad").is(":visible")){
			$("#popBoxContainer").addClass("pop_in_animate");
			$("#popBoxContainer").removeClass("pop_out_animate");
			$("#popBoxContainer .pop_box").children("div").hide();
			return;
		}
		if(msg.data.index==6&&$("#popBuildBridge").is(":visible")){
			$("#popBoxContainer").addClass("pop_in_animate");
			$("#popBoxContainer").removeClass("pop_out_animate");
			$("#popBoxContainer .pop_box").children("div").hide();
			return;
		}
		if(msg.data.index==7&&$("#stateOwned").is(":visible")){
			$("#popBoxContainer").addClass("pop_in_animate");
			$("#popBoxContainer").removeClass("pop_out_animate");
			$("#popBoxContainer .pop_box").children("div").hide();
			return;
		}
		if(msg.data.index==8&&$("#popDevelopHistory").is(":visible")){
			$("#popBoxContainer").addClass("pop_in_animate");
			$("#popBoxContainer").removeClass("pop_out_animate");
			$("#popBoxContainer .pop_box").children("div").hide();
			return;
		}
		if(msg.data.index==4&&$("#popTotalInvest").is(":visible")){
			$("#popBoxContainer").addClass("pop_in_animate");
			$("#popBoxContainer").removeClass("pop_out_animate");
			$("#popBoxContainer .pop_box").children("div").hide();
			return;
		}

		$("#unit"+msg.data.index).click();
	},
	/**
	 *进入企业文化中心模块
	 * @param msg
	 */
	"cd_qiye":function(msg){
		$(".items_lis>li:eq(0)").click();
		command.clear();
		$("#contentBox").children("#culturePage").show().css("visibility","visible");
		$('.single_base_box').addClass('moveIn');
		$('.down_arrows_box').addClass('showIn');
		$(".navbar-nav").children("img").css("display","none");
		$(".navbar-nav:eq(1)").children("img").css("display","block");
		socketMsg.setLine(msg);
		socketMsg.mapObjsClick({"data":{"id":qiye_fz.ids,"index":0,"color":superMap.cesium.Color.AQUA}});
		superMap.removeBgColor();
	},
	/**
	 *进入进度管控中心模块
	 * @param msg
	 */
	"cd_jindu":function(msg){
		command.clear();
		$(".navbar-nav").children("img").css("display","none");
		$(".navbar-nav:eq(2)").children("img").css("display","block");
		$("#contentBox").children("#progressPage").show().css("visibility","visible");
		event.xmgk(msg.data);
		superMap.removeBgColor();
	},
	/**
	 *进入项目管控中心模块
	 * @param msg
	 */
	"cd_xiangmu":function(msg){
		command.clear();
		$("#contentBox").children("#projectManageCenter").show().css("visibility","visible");
		$(".navbar-nav").children("img").css("display","none");
		$(".navbar-nav:eq(3)").children("img").css("display","block");
		event.xmgk(msg.data);
		superMap.removeBgColor();
	},
	"xmgk":function(msg){
		command.clearView();
		event.xmgk(msg.data);
	},
	"cd_xiaoneng":function(msg){
		command.clear();
		$(".navbar-nav").children("img").css("display","none");
		$(".navbar-nav:eq(3)").children("img").css("display","block");
		$("#contentBox").children("#efficacyMonitorPage").show().css("visibility","visible");
		event.xmgk(msg.data);
		superMap.removeBgColor();
	},
	"cd_fenbo":function(msg){
		command.clear();
		$(".navbar-nav").children("img").css("display","none");
		$(".navbar-nav:eq(4)").children("img").css("display","block");
		$("#contentBox").children("#distributionSchedulingCenter").show().css("visibility","visible");
		$("#distributionSchedulingCenter .statistics_box").show();
		event.fenbo(msg.data,0);
		superMap.removeBgColor();
	},
	"cd_dangjian":function(msg){
		command.clear();
		$(".navbar-nav").children("img").css("display","none");
		$(".navbar-nav:eq(0)").children("img").css("display","block");
		$("#contentBox").children("#parkBuildingCenter").show().css("visibility","visible");
		superMap.removeBgColor();
	},
	"project_selectLike":function(msg){
		var obj=msg.data;
		if(obj.type==3){
			$(".left").hide();
			$(".right").hide();
			$("#event_mark_"+obj.id).find(".left").show();
			$("#event_mark_"+obj.id).find(".right").show();
			if(obj.project){
				//直播
				video.stopAll();
				$.get(BASE_URL+"/api/listCamera",{"projectId":obj.id},function(re){
					var urls=[];
					if(re.status==200){
						$(re.data).each(function(i,e){
							if(e.projectId==obj.id){
								urls.push({url:e.souceUrl,image:e.picUrl,code:e.code});
							}
						});
	                    video.projectPlay(urls);
					}
				},"json");
				if(window.leftOne){
                    window.leftOne(obj.id);
				}
                $("#indexPage").css("opacity","0");
                $("#contentBox").children("div:gt(0)").hide();
                $("#contentBox").children("#projectManageDetailNew").show().css("visibility","visible");
				if(obj.imageUrl){
					superMap.viewer.entities.removeAll();
					var en={
							id:obj.id,
							position:superMap.cesium.Cartesian3.fromDegrees(obj.topTip.lng,obj.topTip.lat,1),
					        box : {
					        	dimensions:new superMap.cesium.Cartesian3(384, 118, 10),
					        	show:true,
								material:new superMap.cesium.ImageMaterialProperty({image:window.imageBlob.get(obj.id)||"/static/"+obj.imageUrl})
				            },
				            show:true
				    };
					superMap.viewer.entities.add(en);
					if(!window.imageBlob.get(obj.id)){
						var im=new Image();
						im.src="/static/"+obj.imageUrl;
						window.imageBlob.set(obj.id,im);
					}
				}
			}
			return;
		}
		command.clear();
		$("#contentBox").children("#projectPageDetail").show().css("visibility","visible");
		if(obj.id<20){
			if(obj.topTip){
				var id="make_"+obj.id+"_top";
				var po=superMap.pointToPixel({"lng":obj.topTip.lng,"lat":obj.topTip.lat,"height":obj.topTip.height});
				var html='<div class="marks project" id="'+id+'" style="pointer-events: none;top: '+po.y+'px; left: '+po.x+'px; width: 200px;height:100px;margin-left:-100px;margin-top:-50px; ">';
				html+='<div style="width: 100%;transform-origin:center top;">';
				html+='<h1>'+obj.topTip.name+'</h1>';
				html+='<h3>'+obj.topTip.english+'</h3>';
				html+='</div>';
				html+='</div>';
				$("#marks-all").append(html);
				superMap.htmlMark.push({type:"project","id":id,"lng":obj.topTip.lng,"lat":obj.topTip.lat,"height":obj.topTip.height});
			}
			if(obj.leftTip && false){
				var id="make_"+obj.id+"_left";
				var po=superMap.pointToPixel({"lng":obj.leftTip.lng,"lat":obj.leftTip.lat,"height":obj.leftTip.height});
				var html='<div class="marks project" id="'+id+'" style="pointer-events: none;top: '+po.y+'px; left: '+po.x+'px;width: 400px; margin-left:-420px;margin-top:-50px;">';
				html+='<div style="width: 100%;transform-origin: right top;">';
				for(var d of obj.leftTip.data){
					html+='	<p class="tit" style="text-align: right;">'+d.tit+'</p>';
					html+='	<p class="value" style="text-align: right;">'+d.value+'</p>';
				}
				html+='<div class="object"></div>';
				html+='</div>';
				html+='</div>';
				$("#pro_1").remove();
				$("#marks-all").append(html);
				superMap.htmlMark.push({type:"project","id":id,"lng":obj.leftTip.lng,"lat":obj.leftTip.lat,"height":obj.leftTip.height});
			}
			if(obj.rightTip && false){
				var id="make_"+obj.id+"_right";
				var po=superMap.pointToPixel({"lng":obj.rightTip.lng,"lat":obj.rightTip.lat,"height":obj.rightTip.height});
				var html='<div class="marks project" id="'+id+'" style="pointer-events: none;top: '+po.y+'px; left: '+po.x+'px;width: 400px;margin-left:20px; margin-top:-50px;">';
				html+='<div style="width: 100%;transform-origin: left top;">';
				for(var d of obj.rightTip.data){
					html+='	<p class="tit" style="text-align: left;">'+d.tit+'</p>';
					html+='	<p class="value" style="text-align: left;">'+d.value+'</p>';
				}
				html+='<div class="object"></div>';
				html+='</div>';
				html+='</div>';
				$("#marks-all").append(html);
				superMap.htmlMark.push({type:"project","id":id,"lng":obj.rightTip.lng,"lat":obj.rightTip.lat,"height":obj.rightTip.height});
			}
			if(window.fetchEnv24Hours){
				window.fetchEnv24Hours.reLoad();
			}
			if(obj.devices){
				for(var d of obj.devices){
					var en={
							position:superMap.cesium.Cartesian3.fromDegrees(
					                  d.lnglat[0],
					                  d.lnglat[1],
					                  d.lnglat[2]
					                ),
							billboard : {
								image:"static/map/Build/Cesium2/Widgets/Images/camera.png",
								width:40,
								height:40,
								scaleByDistance:new superMap.cesium.NearFarScalar(100, 1, 5000, 0.01)
				            },
				            show:true
				        };
					en.deviceId=d.deviceId;
					en.projectId=d.projectId;
					en.devices=true;
					superMap.viewer.entities.add(en);
				}
			}

			/*superMap.moveLine.update(obj.line,{
	            // marker点半径
	            markerRadius: 1,
	            // marker点颜色,为空或null则默认取线条颜色
	            markerColor: "#BCFFFE",
	            // 线条类型 solid、dashed、dotted
	            lineType: 'solid',
	            // 线条宽度
	            lineWidth: 1,
	            // 线条颜色
	            colors: 'rgba(186,252,250,0.9)',
	            // 移动点半径
	            moveRadius: 1,
	            // 移动点颜色
	            fillColor: '#BCFFFE',
	            // 移动点阴影颜色
	            shadowColor: '#BCFFFE',
	            // 移动点阴影大小
	            shadowBlur: 1,
	        });*/
		}else{
			var result=obj.result;
			if(obj.topTip){
				var id="make_"+obj.id+"_top";
				var po=superMap.pointToPixel({"lng":result.geometry.center.x,"lat":result.geometry.center.y,"height":parseInt(result.fieldValues[10])+10});
				var html='<div class="marks project" id="'+id+'" style="pointer-events: none;top: '+po.y+'px; left: '+po.x+'px; width: 200px;height:100px;margin-left:-100px;margin-top:-50px; ">';
				html+='<div style="width: 100%;transform-origin:center top;">';
				html+='<h1>'+obj.topTip.name+'</h1>';
				html+='<h3>'+obj.topTip.english+'</h3>';
				html+='</div>';
				html+='</div>';
				$("#marks-all").append(html);
				superMap.htmlMark.push({type:"project","id":id,"lng":result.geometry.center.x,"lat":result.geometry.center.y,"height":parseInt(result.fieldValues[10])+10});
			}
			obj.line.clear();
			if(obj.leftTip && false){
				var id="make_"+obj.id+"_left";
				var po=superMap.pointToPixel({"lng":parseFloat(result.fieldValues[1])-0.0008,"lat":parseFloat(result.fieldValues[2]),"height":parseInt(result.fieldValues[10])+5});
				var html='<div class="marks project" id="'+id+'" style="pointer-events: none;top: '+po.y+'px; left: '+po.x+'px;width: 400px; margin-left:-420px;margin-top:-50px;">';
				html+='<div style="width: 100%;transform-origin: right top;">';
				for(var d of obj.leftTip.data){
					html+='	<p class="tit" style="text-align: right;">'+d.tit+'</p>';
					html+='	<p class="value" style="text-align: right;">'+d.value+'</p>';
				}
				html+='<div class="object"></div>';
				html+='</div>';
				html+='</div>';
				$("#marks-all").append(html);
				superMap.htmlMark.push({type:"project","id":id,"lng":parseFloat(result.fieldValues[1])-0.0008,"lat":parseFloat(result.fieldValues[2]),"height":parseInt(result.fieldValues[10])+5});
				for(var i=0;i<3;i++){
					obj.line.push({
						"from":{
							"city":"",
							"lnglat":[parseFloat(result.fieldValues[1]),parseFloat(result.fieldValues[2]),parseInt(result.fieldValues[10])*(0.5*i)],
							"speed":1.5,
							"color":"#10C2DA",
							"max":50,
								"type":'none'
							},
							"to":{
							"city":"",
							"lnglat":[parseFloat(result.fieldValues[1])-0.0008,parseFloat(result.fieldValues[2]),parseInt(result.fieldValues[10])+5],
							"speed":1.5,
							"color":"#10C2DA",
							"max":50,
								"type":"none"
							}
						});
				}
			}
			if(obj.rightTip && false){
				var id="make_"+obj.id+"_right";
				var po=superMap.pointToPixel({"lng":parseFloat(result.fieldValues[3])+0.0008,"lat":parseFloat(result.fieldValues[4]),"height":parseInt(result.fieldValues[10])+5});
				var html='<div class="marks project" id="'+id+'" style="pointer-events: none;top: '+po.y+'px; left: '+po.x+'px;width: 400px;margin-left:20px; margin-top:-50px;">';
				html+='<div style="width: 100%;transform-origin: left top;">';
				for(var d of obj.rightTip.data){
					html+='	<p class="tit" style="text-align: left;">'+d.tit+'</p>';
					html+='	<p class="value" style="text-align: left;">'+d.value+'</p>';
				}
				html+='<div class="object"></div>';
				html+='</div>';
				html+='</div>';
				$("#marks-all").append(html);
				superMap.htmlMark.push({type:"project","id":id,"lng":parseFloat(result.fieldValues[3])+0.0008,"lat":parseFloat(result.fieldValues[4]),"height":parseInt(result.fieldValues[10])+5});
				for(var i=0;i<3;i++){
					obj.line.push({
						"from":{
							"city":"",
							"lnglat":[parseFloat(result.fieldValues[3]),parseFloat(result.fieldValues[4]),parseInt(result.fieldValues[10])*(0.5*i)],
							"speed":1.5,
							"color":"#10C2DA",
							"max":50,
								"type":'none'
							},
							"to":{
							"city":"",
							"lnglat":[parseFloat(result.fieldValues[3])+0.0008,parseFloat(result.fieldValues[4]),parseInt(result.fieldValues[10])+5],
							"speed":1.5,
							"color":"#10C2DA",
							"max":50,
								"type":"none"
							}
						});
				}
			}
			superMap.buildinglayer.removeAllObjsColor();
			// 设置建筑物高亮
			superMap.layers[2].setObjsColor([obj.id], new superMap.cesium.Color(8 / 255,215 / 255,237 / 255,1));
			superMap.bacolor(obj.id);

			/*superMap.moveLine.update(obj.line,{
	            // marker点半径
	            markerRadius: 1,
	            // marker点颜色,为空或null则默认取线条颜色
	            markerColor: "#BCFFFE",
	            // 线条类型 solid、dashed、dotted
	            lineType: 'solid',
	            // 线条宽度
	            lineWidth: 1,
	            // 线条颜色
	            colors: 'rgba(186,252,250,0.9)',
	            // 移动点半径
	            moveRadius: 1,
	            // 移动点颜色
	            fillColor: '#BCFFFE',
	            // 移动点阴影颜色
	            shadowColor: '#BCFFFE',
	            // 移动点阴影大小
	            shadowBlur: 1,
	            deltaAngle:0.1
	        });*/
		}
		//直播
		video.stopAll();
		if(obj.live){
			if($.trim(obj.live.projectId)!=""){
				video.projectId=obj.live.projectId;
				$.get(BASE_URL+"api/devicesList",{projectId:obj.live.projectId},function(result){
					if(result.status==200){
						var cameras=result.data.result;
						video.dataSource=cameras;
						video.autoPlayAll();
					}
				},"json");
			}
		}
	},
	"markLayers_click":function(msg){
		var e=msg.data.data;
		var po=superMap.pointToPixel({"lng":msg.data.position.lng,"lat":msg.data.position.lat,"height":msg.data.position.height});
		var html='<div class="marks tip" style="top: '+(po.y+50)+'px;pointer-events: none; left:'+(po.x+50)+'px; width: 400px; height: 250px;">';
		html+='<div class="line"></div>';
		html+='<div class="name">'+e.title+'</div>';
		html+='<div style="padding: 20px 30px; text-align: left;color: #F6F7F7;overflow: hidden;">';
		for(var p of e.data){
			html+='<p>'+p.tit+'：'+p.value+'</p>';
		}
		html+='</div>';
		html+='</div>';
		$("#marks-all").append(html);
	},
	"qiye_fz":function(msg){
		$(".items_lis>li:eq(0)").click();
		command.clearView();
		socketMsg.setLine(msg);
		qiye_fz.index=0;
		socketMsg.mapObjsClick({"data":{"id":qiye_fz.ids,"index":0,"color":superMap.cesium.Color.AQUA}});
		setTimeout(auto);
	},
	"setLine":function(msg){
		var data=msg.data;
		for(var d of data){
//			var position = superMap.cesium.Cartesian3.fromDegrees(d.from.lnglat[0],d.from.lnglat[1],500);
//			var options={
//					color:new superMap.cesium.Color(200/255,223/255,233/255, 1),
//					distance:5000,
//					decay:0,
//					intensity:10
//			}
//			var targetPosition = new superMap.cesium.Cartesian3(d.from.lnglat[0],d.from.lnglat[1], 10);
//			var point = new superMap.cesium.SpotLight(position, targetPosition, options);
//			// 设置点光源
//			superMap.points.push(point);
//			superMap.scene.addLightSource(point);
//			var position1 = superMap.cesium.Cartesian3.fromDegrees(d.to.lnglat[0],d.to.lnglat[1],500);
//			var options1={
//					color:new superMap.cesium.Color(200/255,223/255,233/255, 1),
//					distance:5000,
//					decay:0,
//					intensity:10
//			}
//			var targetPosition1 = new superMap.cesium.Cartesian3(d.to.lnglat[0],d.to.lnglat[1], 10);
//			var point1 = new superMap.cesium.SpotLight(position1, targetPosition1, options1);
//			// 设置点光源
//			superMap.points.push(point1);
//			superMap.scene.addLightSource(point1);
		}
		superMap.moveLine.update(data,{
            // marker点半径
            markerRadius: 1,
            // marker点颜色,为空或null则默认取线条颜色
            markerColor: "#DDA748",
            // 线条类型 solid、dashed、dotted
            lineType: 'solid',
            // 线条宽度
            lineWidth: 4,
            // 线条颜色
            colors: '#BDFFFE',
            // 移动点半径
            moveRadius: 5,
            // 移动点颜色
            fillColor: '#BDFFFE',
            // 移动点阴影颜色
            shadowColor: '#BDFFFE',
            // 移动点阴影大小
            shadowBlur: 3,
            deltaAngle:0.3
        });
	},
	"qiye_jp":function(msg){
		$(".items_lis>li:eq(2)").click();
		command.clearView();
		socketMsg.mapControl({"data":qiye_jpgc.position});
		var data=[];
		for(var e of qiye_jpgc.data){
			var po=superMap.pointToPixel({"lng":e.lng,"lat":e.lat,"height":e.height});
			$("#"+e.id).css({"position":"fixed","top":(po.y-200)+"px","left":(po.x-200)+"px"});
			superMap.htmlMark.push({type:"project","id":e.id,"lng":e.lng,"lat":e.lat,"height":e.height});
			data.push({
	        	from: {
	                city: '',
	                lnglat: [e.lng,e.lat,e.height],
	                speed:1,
	                color:"#10C2DA",
	                max:50,
		            type:'ellipse'
	            },
	            to: {
	                city: '',
	                lnglat: [0,0,0],
	                speed:0,
	                color:"",
	                max:0,
		            type:'none'
	            }
	        });

//			var position = superMap.cesium.Cartesian3.fromDegrees(e.lng,e.lat,500);
//			var options={
//					color:new superMap.cesium.Color(200/255,223/255,233/255, 1),
//					distance:5000,
//					decay:0,
//					intensity:20
//			}
//			var targetPosition = new superMap.cesium.Cartesian3(e.lng,e.lat, 10);
//			var point = new superMap.cesium.SpotLight(position, targetPosition, options);
//			// 设置点光源
//			superMap.points.push(point);
//			superMap.scene.addLightSource(point);

		}
		superMap.moveLine.update(data);
	},
	"dangjian_djsj":function(msg){
		command.clearView();
		$("#parkBuildingCenter .items_lis li:eq(0)").click();
		var data=msg.data;
		for(var d of data){
//			var position = superMap.cesium.Cartesian3.fromDegrees(d.from.lnglat[0],d.from.lnglat[1],500);
//			var options={
//					color:new superMap.cesium.Color(200/255,223/255,233/255, 1),
//					distance:5000,
//					decay:0,
//					intensity:10
//			}
//			var targetPosition = new superMap.cesium.Cartesian3(d.from.lnglat[0],d.from.lnglat[1], 10);
//			var point = new superMap.cesium.SpotLight(position, targetPosition, options);
//			// 设置点光源
//			superMap.points.push(point);
//			superMap.scene.addLightSource(point);
//			var position1 = superMap.cesium.Cartesian3.fromDegrees(d.to.lnglat[0],d.to.lnglat[1],500);
//			var options1={
//					color:new superMap.cesium.Color(200/255,223/255,233/255, 1),
//					distance:5000,
//					decay:0,
//					intensity:10
//			}
//			var targetPosition1 = new superMap.cesium.Cartesian3(d.to.lnglat[0],d.to.lnglat[1], 10);
//			var point1 = new superMap.cesium.SpotLight(position1, targetPosition1, options1);
//			// 设置点光源
//			superMap.points.push(point1);
//			superMap.scene.addLightSource(point1);
		}
		superMap.moveLine.update(data,{
            // marker点半径
            markerRadius: 5,
            // marker点颜色,为空或null则默认取线条颜色
            markerColor: "#DDA748",
            // 线条类型 solid、dashed、dotted
            lineType: 'solid',
            // 线条宽度
            lineWidth: 3,
            // 线条颜色
            colors: '#BDFFFE',
            // 移动点半径
            moveRadius: 5,
            // 移动点颜色
            fillColor: '#BDFFFE',
            // 移动点阴影颜色
            shadowColor: '#BDFFFE',
            // 移动点阴影大小
            shadowBlur: 3,
            deltaAngle:0.3
        });
	},
	"open_conference":function(msg){
		$("#conference-div").remove();
		var html='<div id="conference-div">';
			html+='<p style="text-align: center; margin: 0 auto;font-size: 14px;line-height: 22px; margin-bottom: 25px;">视频会议</p>';
			html+='<p>会议ID：'+msg.data.conferenceID+'</p>';
			html+='<p>会议密码：'+msg.data.passwordEntry[msg.data.passwordEntry.length-1].password+'</p>';
			html+='</div>';
			$("#marks-all").append(html);
		var win=window.open(msg.data.chairJoinUri,"_blank","height=300,width=600");
		setTimeout(function(){
			win.close();
		},1000*10);
	},
	"closeConference":function(){
		$("#conference-div").remove();
		$("#video-div").remove();
		$("#project-details-div").remove();
		$("#xuanchuan-div").hide();
		document.getElementById("xuanchuan").pause();
	},
	"qiye_qyxc":function(msg){
		command.clearView();
		$("#culturePage .items_lis>li:eq(4)").click();
		if($("#video-div").length==0){
			if(msg.data){
				var html="<div id='video-div' style='width: 1280px;height: 720px;'>";
				html+="<iframe src='static/map/Build/videojs/preview.html?topic="+topic+"&deviceId="+msg.data.deviceId+"&projectId="+msg.data.projectId+"'></iframe>";
				//html+="<iframe src='https://xmgl.glodon.com/gvs/video/project/269099134658560/screen/1/live?deviceIds="+msg.data.deviceId+"&isAi=true&videoToken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjcXlna2phZG1pbkBjcXlna2phZG1pbi5jb20iLCJhdWQiOiJ0YWJsZXQiLCJ0ZW5hbnRpZCI6ImQ0N2ZjNmE0LWUxZTgtNDdjNi1hOTEwLTI5MzU3OTczNDVmYyIsInNjb3BlcyI6WyJST0xFX0FETUlOIl0sInByb2plY3RpZCI6ImJiNGExZjg0LWVhMGMtNDc5ZS1hNjIwLTQxNmUyYmU5ZjhiYyIsImlhdCI6MTU2MjkyMDM2OX0.JOLswdKt-pYpvuOu1wK3OlCe0HmKSQCZjpjHXdXNKgJk8XM3hYOzbtaY90F1pd9iZ8B0rWDSQSFj2D5qsa-ZYw&productCode=269099134658560'></iframe>";
				html+="</div>";
				$("#marks-all").append(html);
				//3秒后触发屏幕中心点左键点击
				setTimeout(function(){
					var winWidth=$("body").width();
					var winHeight=$("body").height();
					websocket.send("/topic/client",command.message("auto-play","",{"winWidth":parseInt(winWidth/2),"winHeight":parseInt(winHeight/2)}));
					setTimeout(function(){
						websocket.send("/topic/client",command.message("auto-play","",{"winWidth":parseInt(winWidth),"winHeight":parseInt(winHeight)}));
					},500);
				},3000);
				return;
			}
//			var html="<div id='video-div' style='width: 1280px;height: 720px;'>";
//			html+="<iframe src='http://127.0.0.1:8080/hls/yugaoxuanchuan.mp4'></iframe>";
//			html+="</div>";
//			$("#marks-all").append(html);
			var xuanchuan = document.getElementById("xuanchuan");
			xuanchuan.currentTime=0;
			xuanchuan.play();
			$("#xuanchuan-div").show();
			superMap.bacolor(12);
			var smd=[];
			for(var i=0;i<4000;i++){
				smd.push(parseInt(Math.random() * (70000 - 0 + 1) + 0));
			}
			socketMsg.mapObjsClick({data:{"id":smd,"index":2,"color":new superMap.cesium.Color(8 / 255,215 / 255,237 / 255,1)}});
			superMap.bacolor(smd[0]);
		}else{
			$("#video-div").remove();
		}
	},
	"enterFullScreen":function(msg){
		var w=$("#video-div").width();
		if(w==1280){
			$("#video-div").css({"width":"100%","height":"100%"});
		}else{
			$("#video-div").css({"width":"1280px","height":"720px"});
		}
	},
	"qiye_qyxc_close":function(msg){
		$("#video-div").remove();
		//superMap.removeBgColor();
	},
	"type_click":function(msg){

		if($("#efficacyMonitorPage").is(":visible")){
			$("#efficacyMonitorPage .tab_data_box").children("li").removeClass("active");
			$("#efficacyMonitorPage .tab_data_box").children("li:eq("+msg.data+")").addClass("active");
			return;
			//$("#projectManageCenter .tab_data_box").children("li:eq("+msg.data+")").click();
		}

		if($("#projectManageCenter").is(":visible")){
			$("#projectManageCenter .tab_data_box").children("li").removeClass("active");
			$("#projectManageCenter .tab_data_box").children("li:eq("+msg.data+")").addClass("active");
			//$("#projectManageCenter .tab_data_box").children("li:eq("+msg.data+")").click();
		}else{
			$("#progressPage .tab_data_box").children("li").removeClass("active");
			$("#progressPage .tab_data_box").children("li:eq("+msg.data+")").addClass("active");
			//$("#progressPage .tab_data_box").children("li:eq("+msg.data+")").click();
		}
	},
	"open_projectDetails":function(projectId){
		$("#project-details-div").remove();
		var html="<div id='project-details-div'>";
		html+="<iframe src='http://jfpark.glodon.com/static/jfpark/simulationLogin.html?projectId=1600157859410611&appid=00f7150867b5453b9992a237f25e45c1&permissions=homeEnvironmental,homeIntelligentMonitoring,homeProjectProgress,homeSafety,homeQuality,homeLabour,homeConstructionCompany,homeNews,homeConstructionSimulation'></iframe>";
		html+="</div>";
		$("#marks-all").append(html);
	}
}




var qiye_fz={"index":0,"ids":[19633,19149,19241],"data":[
	{"roll":6.283124057262624,"heading":5.7277782996283655,"pitch":-0.5075461637140002,"position":{"x":-1575878.7389801876,"y":5320330.799285156,"z":3147019.455598122},"duration":5},
		{"roll":6.283133812640703,"heading":1.7438452593219864,"pitch":-0.5055775216630667,"position":{"x":-1573137.6910256166,"y":5319650.5962365065,"z":3149794.7215641076},"duration":5},
		{"roll":6.283148012031969,"heading":3.147527663300588,"pitch":-0.1509555071694213,"position":{"x":-1573887.8950260086,"y":5316566.213882972,"z":3153110.8986932486},"duration":5},
		{"roll":6.283124064510719,"heading":5.728113354233522,"pitch":-0.5083262759144871,"position":{"x":-1580874.274362459,"y":5323912.515147487,"z":3145605.7455383833},"duration":5}
	]};

var qiye_jpgc={"position":{"roll":0.00003801112415580121,"heading":0.8115543150577551,"pitch":-0.3655980828137426,"position":{"x":-1574191.5833306133,"y":5321740.281001818,"z":3146779.6169524696},"duration":5},"data":[
	{"lng":106.5021500001182,"lat":29.583544626026445,"height":70,"id":"marks_jp_1"},
	{"lng":106.52908497506039,"lat":29.587634262287196,"height":70,"id":"marks_jp_2"},
	{"lng":106.51519917676164,"lat":29.60928129169777,"height":70,"id":"marks_jp_3"},
	{"lng":106.51326907196753,"lat":29.568493267714217,"height":70,"id":"marks_jp_4"}
]}

function auto(){
	$(".center_content_container").hide();
	socketMsg.mapControl({"data":qiye_fz.data[qiye_fz.index]},function(){
		if(qiye_fz.index==0){
			$("#developmentHistory > div:eq(0)").children(".memorial_day_box").html("<p class='memorial_day'>1992年4月</p>");
			$("#developmentHistory > div:eq(0)").children(".memorial_event_box").html("<p>为服务重庆高新区开发建设，经重庆市科委批准成立“重庆高新技术产业开发区建设发展总公司，隶属于高新区管委会</p>");

			$("#developmentHistory > div:eq(1)").children(".memorial_day_box").html("<p class='memorial_day'>1993.4</p>");
			$("#developmentHistory > div:eq(1)").children(".memorial_event_box").html("<p>经渝改委批准，公司实行股份制改造，更名为“重庆高新技术产业开发区建设发展股份有限公司</p>");

			$("#developmentHistory > div:eq(2)").children(".memorial_day_box").html("<p class='memorial_day'>1998.12</p>");
			$("#developmentHistory > div:eq(2)").children(".memorial_event_box").html("<p>集团化发展升级，经渝改委批准，公司更名为“重庆渝高科技产业（集团）股份有限公司</p>");

			$("#developmentHistory > div:eq(3)").children(".memorial_day_box").html("<p class='memorial_day'>1992-2008</p>");
			$("#developmentHistory > div:eq(3)").children(".memorial_event_box").html("<p>完美打造了重庆高新区“石桥铺高科技开发园”和“二郎科技新城”一级开发、建设</p>");

		}else if(qiye_fz.index==1){

			$("#developmentHistory > div:eq(0)").children(".memorial_day_box").html("<p class='memorial_day'>2007.12</p>");
			$("#developmentHistory > div:eq(0)").children(".memorial_event_box").html("<p>按照市委、市政府“三区合一”的决策，公司转为隶属于北部新区管委会</p>");

			$("#developmentHistory > div:eq(1)").children(".memorial_day_box").html("<p class='memorial_day'>2005-2017</p>");
			$("#developmentHistory > div:eq(1)").children(".memorial_event_box").html("<p>连年获得“重庆市房地产开发企业50强称号”，“渝高”商标被评为重庆市著名商标</p>");

			$("#developmentHistory > p:eq(2)").hide();

			$("#developmentHistory > div:eq(2)").hide();
			$("#developmentHistory > div:eq(2)").hide();

			$("#developmentHistory > div:eq(3)").hide();
			$("#developmentHistory > div:eq(3)").hide();
		}else if(qiye_fz.index==2){
			$("#developmentHistory > div:eq(0)").children(".memorial_day_box").html("<p class='memorial_day'>2016.2</p>");
			$("#developmentHistory > div:eq(0)").children(".memorial_event_box").html("<p>北部新区撤销，职能职责划归两江新区，公司隶属于两江新区管委会</p>");

			$("#developmentHistory > div:eq(1)").children(".memorial_day_box").html("<p class='memorial_day'>2017.11</p>");
			$("#developmentHistory > div:eq(1)").children(".memorial_event_box").html("<p> 中央文明委授予公司“全国文明单位”称号</p>");

			$("#developmentHistory > p:eq(2)").show();

			$("#developmentHistory > div:eq(2)").show();
			$("#developmentHistory > div:eq(2)").show();

			$("#developmentHistory > div:eq(2)").children(".memorial_day_box").html("<p class='memorial_day'>2018.9</p>");
			$("#developmentHistory > div:eq(2)").children(".memorial_event_box").html("<p>渝高集团获得重庆市金融办公室批准进入重庆市拟上市企业储备库</p>");

		}else if(qiye_fz.index==3){
			$("#developmentHistory > div:eq(0)").children(".memorial_day_box").html("<p class='memorial_day'>1992年4月15日</p>");
			$("#developmentHistory > div:eq(0)").children(".memorial_event_box").html("<p>公司初名为<br/>重庆高薪技术产业开发区建设发展总公司</p>");

			$("#developmentHistory > div:eq(1)").children(".memorial_day_box").html("<p class='memorial_day'>1993年4月23日</p>");
			$("#developmentHistory > div:eq(1)").children(".memorial_event_box").html("<p>公司更名为<br/>重庆高薪技术产业开发区建设股份有限公司</p>");

			$("#developmentHistory > div:eq(2)").children(".memorial_day_box").html("<p class='memorial_day'>1993年9月28日</p>");
			$("#developmentHistory > div:eq(2)").children(".memorial_event_box").html("<p>公司更名为<br/>重庆渝高产业股份有限公司</p>");

			$("#developmentHistory > div:eq(3)").show();
			$("#developmentHistory > div:eq(3)").show();

			$("#developmentHistory > div:eq(3)").children(".memorial_day_box").html("<p class='memorial_day'>1998年12月30日</p>");
			$("#developmentHistory > div:eq(3)").children(".memorial_event_box").html("<p>公司更名为<br/>重庆渝高产业科技（集团）股份有限公司</p>");
		}
		qiye_fz.index++;
		$(".center_content_container").show();
		if(qiye_fz.index<qiye_fz.data.length){
			setTimeout(auto,1000*5);
		}
	});
}

var select={
		"projectLike":function(value){
			if($.trim(value)!=""){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("getProjectLike","",{"value":value}));
			}
		},
		"projectSelectAll":function(msg){
			$(".search_result_lists").html("");
			for(var d of msg.data){
				$(".search_result_lists").append("<li onclick=\"select.projectLike('"+d+"')\">"+d+"</li>");
			}
			//$("#searchResultBoxMonitore").mCustomScrollbar("update");
		}
}

var event={
		fenbo:function(dataMake,index){
			command.clearView();
			var data=[];
			$("#fb_event").html("");
			var width=$(superMap.scene.canvas).width();
			var height=$(superMap.scene.canvas).height();
			$(dataMake).each(function(i,e){
				var color=(e.type==2?"#F43D11":"#DAE302");
				$("#fb_event").append("<li id='event_li_"+e.id+"'><span class='address'>"+e.address+"</span>-<span class='event'>"+e.event+"</span></li>");
				data.push({
		        	to: {
		                city: e.event,
		                lnglat: e.lnglat,
		                speed:1,
		                color:color,
		                max:70,
			            type:'ellipse',
			            fontColor:color,
			            fontSize:22
		            },
		            from: {
		                city: '',
		                lnglat: [0,0,0],
		                speed:0.3,
		                color:"#F43D11",
		                max:20,
			            type:'none'
		            }
		        });
				var po=superMap.pointToPixel({lng:e.lnglat[0],lat:e.lnglat[1],height:e.lnglat[2]});
				var html='<div class="marks project upAnddown" id="event_mark_'+e.id+'" style="pointer-events: none;top: '+po.y+'px; left: '+po.x+'px; margin-left: -40px; margin-top: -85px;">';
				html+='<img src="static/map/Build/Cesium2/Widgets/Images/'+(e.type==2?"DANGER":"DANGERroutine")+'.png" width="80"/>';
				html+='</div>';
				$("#marks-all").append(html);
				superMap.htmlMark.push({type:"project","id":"event_mark_"+e.id,"lng":e.lnglat[0],"lat":e.lnglat[1],"height":e.lnglat[2]});
			});

			$(dataMake).each(function(i,e){
				var color=(e.type==2?"#F43D11":"#DAE302");
				var po=superMap.pointToPixel({lng:e.lnglat[0],lat:e.lnglat[1],height:e.lnglat[2]});
				var x_b=(po.x/width);
				var y_b=(po.y/height);
				var Y = $('#fb_map').offset().top+($("#fb_map").height()*y_b);
				var X = $('#fb_map').offset().left+($("#fb_map").width()*x_b);
				if(i==index){
					data.push({
			        	to: {
			                city: "",
			                lnglat: e.lnglat,
			                speed:1,
			                color:color,
			                max:70,
				            type:'ellipse',
				            fontColor:color,
				            fontSize:18
			            },
			            from: {
			                city: '',
			                lnglat: [X,Y,-1],
			                speed:0.3,
			                color:color,
			                max:20,
				            type:'ellipse'
			            }
			        },
			        {
			        	to: {
			                city: "",
			                lnglat: e.lnglat,
			                speed:1,
			                color:color,
			                max:70,
				            type:'ellipse',
				            fontColor:color,
				            fontSize:18
			            },
			            from: {
			                city: '',
			                lnglat: [($("#event_li_"+e.id).offset().left+$("#event_li_"+e.id).width())+10,($("#event_li_"+e.id).offset().top+$("#event_li_"+e.id).height()),-1],
			                speed:0.3,
			                color:color,
			                max:20,
				            type:'none'
			            }
			        }
					);
				}else{
					data.push({
			        	to: {
			                city: "",
			                lnglat: [0,0,0],
			                speed:1,
			                color:color,
			                max:70,
				            type:'none'
			            },
			            from: {
			                city: '',
			                lnglat: [X,Y,-1],
			                speed:0.3,
			                color:color,
			                max:20,
				            type:'ellipse'
			            }
			        });
				}
			});


			superMap.moveLine.update(data,{
	            // marker点半径
	            markerRadius: 1,
	            // marker点颜色,为空或null则默认取线条颜色
	            markerColor: "#000",
	            // 线条类型 solid、dashed、dotted
	            lineType: 'dotted',
	            // 线条宽度
	            lineWidth: 2,
	            // 线条颜色
	            colors: '#F43D11',
	            // 移动点半径
	            moveRadius: 5,
	            // 移动点颜色
	            fillColor: '#F43D11',
	            // 移动点阴影颜色
	            shadowColor: '#F43D11',
	            // 移动点阴影大小
	            shadowBlur: 3
	        });
		},
		fenbo_click:function(msg){
			var promise =superMap.scene.outputSceneToFile();
			superMap.cesium.when(promise,function(base64data){
			   $("#fb_map").prop("src",base64data);
			   event.fenbo(msg.data.data,msg.data.index);
			});
		},
		fenbo_click2:function(msg){
			var obj=msg.data.obj;
			$(".fenbo").hide();
			$("#fenbo_form").hide();
			$("#distributionSchedulingCenter .statistics_box").show();
			$("#type1").hide();
			$("#type2").hide();
			if(obj.type==2){
				$("#type2").show();
				$("#type2 .dz_title").text(obj.event+"（模拟演习）");
				$("#type2 .dz_warn_ul").find("li").removeClass("active");
				for(var n of obj.num){
					$("#type2 .dz_warn_ul").find("li:eq("+n+")").addClass("active");
				}
			}else{
				$("#type1 .dz_warn_ul").find("li").removeClass("active");
				for(var n of obj.num){
					$("#type1 .dz_warn_ul").find("li:eq("+n+")").addClass("active");
				}
				$("#type1").show();
				$("#type1 .dz_title").text(obj.event+"（模拟演习）");
				$(".eventName").text(obj.event+"（模拟演习）");
				if(msg.data.no){
					return;
				}
				switch(obj.status){
				case 0:
					$("#fenbo_video").show();
					$("#fenbo_video").find("#video").html("<img   style='width:100%;height:100%;' src='static/imgs/dongdi.jpg' ></img>");
					$("#fenbo_map").show();
					$("#fenbo_map").find("#iframe").html("<iframe style='width: 100%;height: 100%;border: none;' src='http://192.168.31.50:8090/BIM/model/model.html'></iframe>");
					$("#distributionSchedulingCenter .statistics_box").hide();
					break;
				case 1:
					$("#fenbo_1").show();
					$("#fenbo_form").show();
					$("#distributionSchedulingCenter .statistics_box").hide();
					break;
				case 2:
					$("#distributionSchedulingCenter .statistics_box").show();
					break;
				case 3:
					$("#distributionSchedulingCenter .statistics_box").show();
					break;
				case 4:
					$("#fenbo_4").show();
					$("#fenbo_form").show();
					$("#distributionSchedulingCenter .statistics_box").hide();
					break;
				case 5:
					$("#fenbo_5").show();
					$("#fenbo_form").show();
					$("#distributionSchedulingCenter .statistics_box").hide();
					break;
				case 6:
					$("#distributionSchedulingCenter .statistics_box").show();
					break;
				case 7:
					$("#fenbo_7").show();
					$("#fenbo_form").show();
					$("#distributionSchedulingCenter .statistics_box").hide();
					break;
				case 8:
					$("#distributionSchedulingCenter .statistics_box").show();
					break;
				case 9:
					$("#distributionSchedulingCenter .statistics_box").show();
					break;
				case 10:
					event.fenbo(msg.data.data,0);
					break;
				}
			}
		},
		xmgk:function(markData){
			var lineDate=[];
			for(var d of markData){
				if(d.node){
					lineDate.push({
			        	to: {
			                city: "",
			                lnglat: [d.topTip.lng,d.topTip.lat,d.topTip.height],
			                speed:1,
			                color:"#19FABD",
			                max:70,
				            type:'ellipse',
			            },
			            from: {
			                city: '',
			                lnglat: [0,0,0],
			                speed:0.3,
			                color:"#F43D11",
			                max:20,
				            type:'none'
			            }
			        });
				}else{
					lineDate.push({
			        	to: {
			                city: "",
			                lnglat: [d.topTip.lng,d.topTip.lat,d.topTip.height],
			                speed:1,
			                color:"#089CFF",
			                max:70,
				            type:'ellipse',
			            },
			            from: {
			                city: '',
			                lnglat: [0,0,0],
			                speed:0.3,
			                color:"#F43D11",
			                max:20,
				            type:'none'
			            }
			        });
				}
				var po=superMap.pointToPixel({lng:d.topTip.lng,lat:d.topTip.lat,height:d.topTip.height});
				var html='<div id="event_mark_'+d.id+'" onclick="select.projectLike(\''+d.name+'\');" class="marks project upAnddown" id="1" style="z-index: 90; top: '+po.y+'px; width: 300px;height:100px; left: '+po.x+'px;margin-left:-150px;margin-top:-105px;">';
				html+='<h1>'+d.topTip.name+'</h1>';
				html+='<h3>'+d.topTip.english+'</h3>';
				html+='<img src="static/map/Build/Cesium2/Widgets/Images/'+(d.node?"spotgreen":"spotgblue")+'.png" width="50"/>';
				if(d.leftTip && false){
					html+="<ul class='left'>";
					for(var f of d.leftTip.data){
						html+='<li>'+f.tit+'：'+f.value+'</li>';
					}
					html+='</ul>';
				}
				if(d.rightTip && false){
					html+="<ul class='right'>";
					for(var r of d.rightTip.data){
						html+='<li>'+r.tit+'：'+r.value+'</li>';
					}
					html+='</ul>';
				}
				html+='</div>';
				$("#marks-all").append(html);
				superMap.htmlMark.push({type:"project","id":"event_mark_"+d.id,"lng":d.topTip.lng,"lat":d.topTip.lat,"height":d.topTip.height});
			}

			superMap.moveLine.update(lineDate,{
	            // marker点半径
	            markerRadius: 1,
	            // marker点颜色,为空或null则默认取线条颜色
	            markerColor: "#0E0E0E",
	            // 线条类型 solid、dashed、dotted
	            lineType: 'dotted',
	            // 线条宽度
	            lineWidth: 2,
	            // 线条颜色
	            colors: '#F43D11',
	            // 移动点半径
	            moveRadius: 5,
	            // 移动点颜色
	            fillColor: '#F43D11',
	            // 移动点阴影颜色
	            shadowColor: '#F43D11',
	            // 移动点阴影大小
	            shadowBlur: 3
	        });
		}
}
