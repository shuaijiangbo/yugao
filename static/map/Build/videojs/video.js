var Video = function(ele, url) {
	if($.trim(url)==""){
		return;
	}
	var self = this;
	//播放器控件
	this.e = ele;
	this.type;
	//流地址
	this.url = url;
	this.hls = function() {
		if (Hls.isSupported()) {
			var hls = new Hls();
			hls.loadSource(self.url);
			hls.attachMedia(self.e);
			//加载成功-可以播放
			hls.on(Hls.Events.MANIFEST_LOADED, function() {
				self.e.play();
				self.isPlay=true;
			});
			//错误-重新加载源
			hls.on(Hls.Events.ERROR, function() {
				//hls.loadSource(self.url);
			});
			self.object=hls;
		} else {
			console.log("HLS.js插件没有加载");
		}
	}
	this.fly = function() {
		if (flvjs.isSupported()) {
			var flvPlayer = flvjs.createPlayer({
	            type: 'flv',
	            url: self.url
	        });
			flvPlayer.on(flvjs.Events.LOADING_COMPLETE,function(){
				flvPlayer.play();
				self.isPlay=true;
			});
	        flvPlayer.attachMediaElement(self.e);
			flvPlayer.load();
	        flvPlayer.play();
	        self.object=flvPlayer;
	    }else{
	    	console.log("FLV.js插件没有加载");
	    }
	}
	this.mp4 = function() {
		self.e.src=self.url;
		self.e.play();
	}
	this.rtmp = function() {
		if(videojs){
			//rtmp只能使用Flash进行播放
			videojs.options.flash.swf = "../../static/lib/videojs/video-js.swf";
			var myPlayer = videojs(this.e.id, {
			    autoplay: true,
			    controls: false, //控制条
			    fluid: true, //自适应窗口
			    techOrder: ["flash"],
			    muted:true, //静音
			    preload: "auto",// 预加载
			},function(){
				myPlayer.src({src:self.url,type:"rtmp/flv"});
				myPlayer.load(self.url);
				myPlayer.play();
			});
			myPlayer.on("loadedmetadata", function () {
				myPlayer.play();
	        });
			myPlayer.on("error", function (error) {
				myPlayer.load(self.url);
		    });
			self.object=myPlayer;
		}else{
			console.log("videojs插件没有加载");
		}
	}
	this.drawImage=function(){
		if(self.e.id.indexOf("video")!=-1&&self.isPlay){
			var canvas =document.createElement('canvas');
			var context=canvas.getContext("2d");
			canvas.width=self.e.width;
			canvas.height=self.e.height;
			context.drawImage(self.e,0,0,canvas.width,canvas.height);
			canvas.toBlob(function(blob) {
				var reader = new FileReader();
		        reader.onloadend=function() {
		        	if(reader.result.byteLength>0){
			            //reader.result是一个含有视频数据流的Blob对象
			            var buf = new Uint8Array(reader.result);
			            console.log(buf);
		        	}
		            reader=null;
		        };
		        reader.readAsArrayBuffer(blob);
			},"image/jpeg",0.3);
		}
	};
	this.init=function(){
		if (url.indexOf("rtmp://") != -1) {
			self.rtmp();
			self.type="rtmp";
		} else if (url.indexOf(".flv") != -1) {
			self.fly();
			self.type="flv";
		} else if (url.indexOf(".m3u8") != -1) {
			self.hls();
			self.type="hls";
		} else {
			self.mp4();
			self.type="mp4";
		}
	}
	self.init();
	this.reload=function(){
		self.init();
	}
	return this;
}