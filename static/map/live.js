//视频监控管理
var video={
		videoObj:[],
		inPlay:[],
		dataSource:[],
		projectId:null,
		stopAll:function(){
			video.dataSource=[];
			for(var v of video.videoObj){
				v.myPlayer.pause();
			}
		},
		autoPlayAll:function(){
			var cameras=["7f7053f0-6a95-42bc-b140-ed1bc8792039","61645b68-1b3e-47f7-86e5-debc0f8cad8d","f39a421f-a703-413d-945f-658f53499490","4fff261f-a622-400f-988b-ec721318ffa4","967db1d1-f244-4996-9f8a-8725f0463b2b","cb00c683-d3fe-42f5-858f-77d52b96d004"];
			video.dataSource=[];
			if(video.projectId){
				for(var i=0;i<video.videoObj.length;i++) {
                    if (i > 5){
                        video.videoObj[i].play(cameras[i-6]);
                	}
				}
			}
		},
		projectPlay:function(urls){
			for(var i=0;i<video.videoObj.length;i++){
				if(i<6){
					if(urls[i]){
						video.videoObj[i].play2(urls[i]);
						$("#"+video.videoObj[i].id).parent("li").prop("url",urls[i].url);
					}else{
						video.videoObj[i].play2(urls[parseInt(Math.random() * ((urls.length-1) - 0 + 1) + 0)]);
						$("#"+video.videoObj[i].id).parent("li").prop("url",urls[parseInt(Math.random() * ((urls.length-1) - 0 + 1) + 0)].url);
					}
				}
			}
		},
		videoSize:function(width,height){
			$("#video-div").width(width).height(height);
		}
}

//播放器
function live(elementId){
	var self = this;
	this.id=elementId;
	this.deviceId=null;
	// 初始化视频，设为全局变量
	this.myPlayer = videojs(this.id, {
	    autoplay: true,
	    controls: false,//控制条
	    fluid:false,
	    techOrder: ["html5","flvjs"],
	    flvjs: {
	        mediaDataSource: {
	            isLive: false,
	            cors: true,
	            withCredentials: false
	        }
	    },
	    muted: true,// 静音
	},function(){
		$(".vjs-control-bar").remove();
	});
	//设置加载图
	this.setPoster=function(url){
		this.myPlayer.poster(url);
	}
	this.myPlayer.on("error", function (error) {
		//video.inPlay[self.deviceId]=false;
    	console.log(error);
    	//self.autoPlay();
    	$(".vjs-error-display").hide();
    });
	this.myPlayer.on("loadedmetadata", function () {
		self.myPlayer.pause();
		setTimeout(function(){
			self.drawImage();
		},3000);
    });
	
	this.selectImage=function(code){
		var _this3 = this;
		$.get(BASE_URL+"/api/findCameraImage",{"code":code},function(re){
			if(re.status==200&&re.data){
				_this3.setPoster(re.data.picUrl);
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("video-play","",{imageUrl:re.data.picUrl,classId:_this3.id,url:_this3.url.url}));
			}else{
				var url=_this3.url.url,type;
				if(url.indexOf("rtmp://")!=-1){
					type="rtmp/flv";
				}else if(url.indexOf(".flv")!=-1){
					type="video/x-flv";
				}else if(url){
					type="application/x-mpegURL";
				}else{
					type="video/mp4";
				}
				_this3.myPlayer.src({src:url,type:type});
				_this3.myPlayer.load(url);
				_this3.myPlayer.play();
			}
		},"json");
	};
	
	this.drawImage=function(){
		var canvas=document.createElement('canvas');
		var context=canvas.getContext("2d");
		canvas.width=180;
		canvas.height=100;
		context.drawImage($("#"+self.id).find("video")[0],0,0,canvas.width,canvas.height);
		var base64=canvas.toDataURL("image/jpeg",0.5);
		console.log(base64);
		if(websocket.isConnection){
			websocket.send(CONFIG_COMMAND_TOPIC,command.message("video-play","",{imageUrl:base64,classId:self.id,url:self.url.url}));
		}
	};
	this.play2=function(urls){
		var url=urls.url;
		self.url=urls;
		if($.trim(urls.image)!=""){
			self.setPoster(urls.image);
			websocket.send(CONFIG_COMMAND_TOPIC,command.message("video-play","",{imageUrl:urls.image,classId:self.id,url:url}));
			return;
		}else{
			self.selectImage.call(self,urls.code);
		}
	}
	
	this.play=function(deviceId){
		self.deviceId=deviceId;
		var imageUrl="http://gss-ivs.oss-cn-beijing.aliyuncs.com/gss-ivs/image/"+self.deviceId+"/SanpPicture.jpg";
		self.setPoster(imageUrl);
		if(websocket.isConnection){
			websocket.send(CONFIG_COMMAND_TOPIC,command.message("video-play","",{imageUrl:imageUrl,id:self.id,projectId:video.projectId,deviceId:self.deviceId}));
		}
		return;
//		$.post(BASE_URL+"api/liveUrl",{projectId:video.projectId,deviceId:deviceId,streamType:"HLS"},function(result){
//			if(result.status==200&&result.data.returnCode==0&&$.trim(result.data.result.pullLiveUrl)!=""){
//				var src=result.data.result.pullLiveUrl;
//				var type="";
//				if(src.indexOf("rtmp://")!=-1){
//					type="rtmp/flv";
//				}else if(src.indexOf(".flv")!=-1){
//					type="video/x-flv";
//				}else if(src.indexOf(".m3u8")!=-1){
//					type="application/x-mpegURL";
//				}else{
//					type="video/mp4";
//				}
//				self.myPlayer.src({src:src,type:type});
//				self.myPlayer.load(src);
//				self.myPlayer.play();
//				var imageUrl="http://gss-ivs.oss-cn-beijing.aliyuncs.com/gss-ivs/image/"+self.deviceId+"/SanpPicture.jpg";
//				self.setPoster(imageUrl);
//				if(websocket.isConnection){
//					websocket.send(CONFIG_COMMAND_TOPIC,command.message("video-play","",{imageUrl:imageUrl,id:self.id,projectId:video.projectId,deviceId:self.deviceId}));
//				}
//			}else{
//				self.play(self.deviceId);
//			}
//		},"json");
	}
	//自动找到能播放的源
	this.autoPlay=function(){
		if($.trim(self.deviceId)!=""){
			self.play(self.deviceId);
		}
		return;
		if(video.dataSource.length==0){
			return;
		}
		if($.trim(self.deviceId)!=""){
			video.inPlay[self.deviceId]=false;
		}
		var i=parseInt(Math.random() * ((video.dataSource.length-1) - 0 + 1) + 0);
		self.deviceId=video.dataSource[i].id;
		if(video.inPlay[self.deviceId]==true){
			self.autoPlay();
			return;
		}
		video.inPlay[self.deviceId]=true;
		if(websocket.isConnection){
			websocket.send(CONFIG_COMMAND_TOPIC,command.message("video-play","",{imageUrl:video.dataSource[i].pictureUrl,id:self.id,projectId:video.projectId,deviceId:self.deviceId}));
		}
		self.setPoster(video.dataSource[i].pictureUrl);
		return;
//		$.post(BASE_URL+"api/liveUrl",{projectId:video.projectId,deviceId:self.deviceId,streamType:"HLS"},function(result){
//			if(result.status==200&&result.data.returnCode==0&&$.trim(result.data.result.pullLiveUrl)!=""){
//				var src=result.data.result.pullLiveUrl;
//				var type="";
//				if(src.indexOf("rtmp://")!=-1){
//					type="rtmp/flv";
//				}else if(src.indexOf(".flv")!=-1){
//					type="video/x-flv";
//				}else if(src.indexOf(".m3u8")!=-1){
//					type="application/x-mpegURL";
//				}else{
//					type="video/mp4";
//				}
//				self.myPlayer.src({src:src,type:type});
//				self.myPlayer.load(src);
//				self.myPlayer.play();
//			}else{
//				self.autoPlay();
//			}
//		},"json");
	}
	return this;
}
//初始化播放器
$(".video_items video").each(function(i,e){
	video.videoObj.push(new live($(e)[0].id));
});

$(".video_items li").click(function(){
	$("#video-div").remove();
	var i=$(this).index();
	var src="";
	if($("#projectManageDetailNew").is(":visible")){
		src="static/map/Build/videojs/preview.html?topic=&url="+$(this).prop("url");
	}else{
		src="static/map/Build/videojs/preview.html?topic=&deviceId="+video.videoObj[i+6].deviceId+"&projectId="+video.projectId;
	}
	var html="<div id='video-div'>";
	html+="<iframe src='"+src+"'></iframe>";
	//html+="<iframe src='https://xmgl.glodon.com/gvs/video/project/269099134658560/screen/1/live?deviceIds="+video.videoObj[i].deviceId+"&isAi=true&videoToken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjcXlna2phZG1pbkBjcXlna2phZG1pbi5jb20iLCJhdWQiOiJ0YWJsZXQiLCJ0ZW5hbnRpZCI6ImQ0N2ZjNmE0LWUxZTgtNDdjNi1hOTEwLTI5MzU3OTczNDVmYyIsInNjb3BlcyI6WyJST0xFX0FETUlOIl0sInByb2plY3RpZCI6ImJiNGExZjg0LWVhMGMtNDc5ZS1hNjIwLTQxNmUyYmU5ZjhiYyIsImlhdCI6MTU2MjkyMDM2OX0.JOLswdKt-pYpvuOu1wK3OlCe0HmKSQCZjpjHXdXNKgJk8XM3hYOzbtaY90F1pd9iZ8B0rWDSQSFj2D5qsa-ZYw&productCode=269099134658560'></iframe>";
	html+="</div>";
	$("body").append(html);
	//3秒后触发屏幕中心点左键点击
	setTimeout(function(){
		var winWidth=$("body").width();
		var winHeight=$("body").height();
		websocket.send("/topic/client",command.message("auto-play","",{"winWidth":parseInt(winWidth/2),"winHeight":parseInt(winHeight/2)}));
		setTimeout(function(){
			websocket.send("/topic/client",command.message("auto-play","",{"winWidth":parseInt(winWidth),"winHeight":parseInt(winHeight)}));
		},500);
	},3000);
	return false;
});


var xuanchuan="<div id='xuanchuan-div' style='display:none; width: 1280px;height: 720px;position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: auto;z-index: 999;'><video loop id='xuanchuan' width='100%' height='100%'></div>";
$("body").append(xuanchuan);
const req = new XMLHttpRequest();
req.open('GET', BASE_URL+"yugaoxuanchuan.mp4", true);
req.responseType = 'blob';
req.onload = function () {
  if (this.status === 200) {
	  const blobSrc = URL.createObjectURL(this.response); // IE10+
	  document.getElementById("xuanchuan").src = blobSrc;
	  console.log("宣传片加载完毕");
  }
};
req.send();