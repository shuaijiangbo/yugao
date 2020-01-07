
function CanvasLayer(options) {
    this.options = options || {};
    this.paneName = this.options.paneName || 'labelPane';
    this.zIndex = this.options.zIndex || 98;
    this._map = options.map;
    this._lastDrawTime = null;
    this.show();
    this.initialize(options.map);
}

//CanvasLayer.prototype = new BMap.Overlay();

CanvasLayer.prototype.initialize = function (map) {
    this._map = map;
    var canvas = this.canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;' + 'left:0;' + 'top:0;' + 'z-index:' + this.zIndex + ';pointer-events: none;';
    var ctx = this.ctx = this.canvas.getContext('2d');
    this.adjustSize();
    this.adjustRatio(ctx);
    var that = this;
    setTimeout(function(){
    	that._draw();
    },1000);
    $("#cesiumContainer .cesium-widget").append(this.canvas);
    return this.canvas;
};

CanvasLayer.prototype.adjustSize = function () {
    var size = this._map.getSize();
    var canvas = this.canvas;
    canvas.width = size.width;
    canvas.height = size.height;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
};

CanvasLayer.prototype.adjustRatio = function (ctx) {
    var backingStore = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
    var pixelRatio = (window.devicePixelRatio || 1) / backingStore;
    var canvasWidth = ctx.canvas.width;
    var canvasHeight = ctx.canvas.height;
    ctx.canvas.width = canvasWidth * pixelRatio;
    ctx.canvas.height = canvasHeight * pixelRatio;
    ctx.canvas.style.width = canvasWidth + 'px';
    ctx.canvas.style.height = canvasHeight + 'px';
    ctx.scale(pixelRatio, pixelRatio);
};

CanvasLayer.prototype.draw = function () {
    var self = this;
    var args = arguments;

    clearTimeout(self.timeoutID);
    self.timeoutID = setTimeout(function () {
        self._draw();
    }, 15);
};

CanvasLayer.prototype._draw = function () {
    var map = this._map;
    var size = map.getSize();
    var pixel = {x:parseInt(size.width/2),y:parseInt(size.height/2)};
    this.canvas.style.left = pixel.x - size.width / 2 + 'px';
    this.canvas.style.top = pixel.y - size.height / 2 + 'px';
    this.options.update && this.options.update.call(this);
    
};

CanvasLayer.prototype.getContainer = function () {
    return this.canvas;
};

CanvasLayer.prototype.show = function () {

};

CanvasLayer.prototype.hide = function () {
	
};

CanvasLayer.prototype.setZIndex = function (zIndex) {
    this.canvas.style.zIndex = zIndex;
};

CanvasLayer.prototype.getZIndex = function () {
    return this.zIndex;
};

var global = typeof window === 'undefined' ? {} : window;

var requestAnimationFrame = global.requestAnimationFrame || global.mozRequestAnimationFrame || global.webkitRequestAnimationFrame || global.msRequestAnimationFrame || function (callback) {
    return global.setTimeout(callback, 1000 / 60);
};

var MoveLine = function MoveLine(map, userOptions) {
    var self = this;

    //默认参数
    var options = {
        //marker点半径
        markerRadius: 3,
        //marker点颜色,为空或null则默认取线条颜色
        markerColor: '#fff',
        //线条类型 solid、dashed、dotted
        lineType: 'solid',
        //线条宽度
        lineWidth: 1,
        //线条颜色
        colors: '#F9815C',
        //移动点半径
        moveRadius: 2,
        //移动点颜色
        fillColor: '#fff',
        //移动点阴影颜色
        shadowColor: '#fff',
        //移动点阴影大小
        shadowBlur: 5
    };

    //全局变量
    var baseLayer = null,
        animationLayer = null,
        width = map.getSize().width,
        height = map.getSize().height,
        animationFlag = true,
        markLines = [];

    //参数合并
    var merge = function merge(userOptions, options) {
        Object.keys(userOptions).forEach(function (key) {
            options[key] = userOptions[key];
        });
    };

    function Marker(opts) {
        this.city = opts.city;
        this.location = opts.location;
        this.color = opts.color;
        this.type = opts.type || 'circle';
        this.speed = opts.speed || 0.15;
        this.size = 0;
        this.max = opts.max || 20;
        this.fontColor=opts.fontColor||options.fillColor;
        this.fontSize=opts.fontSize||18;
        if($.trim(opts.image)!=""){
        	var img = new Image();
        	img.src=opts.image;
        	this.image=img;
        }else{
        	this.image=null;
        }
    }

    Marker.prototype.draw = function (context) {
        var pixel = this.pixel = map.pointToPixel(this.location);
        if(pixel.x<=0&&pixel.y<=0){
        	return;
        }
        context.save();
        context.beginPath();
        context.fillStyle = options.markerColor || this.color;
        context.arc(pixel.x, pixel.y, options.markerRadius, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        if(this.image==null){
	        context.textAlign = 'center';
	        context.textBaseline = 'middle';
	        context.font = this.fontSize+'px Microsoft YaHei';
	        context.fillStyle = this.fontColor;
	        context.fillText(this.city, pixel.x, pixel.y + 30);
        }else{
        	context.globalAlpha = 0.5;
        	// 将图片画到canvas上面上去！
        	context.drawImage(this.image,pixel.x-(this.image.width/2),pixel.y-(this.image.height/2),this.image.width,this.image.height);
        }
        context.restore();
    };
    
    Marker.prototype.draw2 = function (context) {
        context.save();
        context.beginPath();
        switch (this.type) {
            case 'circle':
                this._drawCircle(context);
                break;
            case 'ellipse':
                this._drawEllipse(context);
                break;
            default:
                break;
        }
        context.closePath();
        context.restore();

        this.size += this.speed;
        if (this.size > this.max) {
            this.size = 0;
        }
    };
    
    Marker.prototype._drawCircle = function (context) {
        var pixel = this.pixel || map.pointToPixel(this.location);
        if(pixel.x<=0&&pixel.y<=0){
        	return;
        }
        context.strokeStyle = this.color;
        context.moveTo(pixel.x + pixel.size, pixel.y);
        context.arc(pixel.x, pixel.y, this.size, 0, Math.PI * 2);
        context.stroke();
    };

    Marker.prototype._drawEllipse = function (context) {
        var pixel = this.pixel || map.pointToPixel(this.location);
        if(pixel.x<=0&&pixel.y<=0){
        	return;
        }
        var x = pixel.x,
            y = pixel.y,
            w = this.size,
            h = this.size / 2,
            kappa = 0.5522848,

        // control point offset horizontal
        ox = w / 2 * kappa,

        // control point offset vertical
        oy = h / 2 * kappa,

        // x-start
        xs = x - w / 2,

        // y-start
        ys = y - h / 2,

        // x-end
        xe = x + w / 2,

        // y-end
        ye = y + h / 2;

        context.strokeStyle = this.color;
        context.moveTo(xs, y);
        context.bezierCurveTo(xs, y - oy, x - ox, ys, x, ys);
        context.bezierCurveTo(x + ox, ys, xe, y - oy, xe, y);
        context.bezierCurveTo(xe, y + oy, x + ox, ye, x, ye);
        context.bezierCurveTo(x - ox, ye, xs, y + oy, xs, y);
        context.stroke();
    };

    function MarkLine(opts) {
        this.from = opts.from;
        this.to = opts.to;
        this.id = opts.id;
        this.step = 0;
    }

    MarkLine.prototype.getPointList = function (from, to) {
        var points = [[from.x, from.y], [to.x, to.y]];
        var ex = points[1][0];
        var ey = points[1][1];
        points[3] = [ex, ey];
        points[1] = this.getOffsetPoint(points[0], points[3]);
        points[2] = this.getOffsetPoint(points[3], points[0]);
        points = this.smoothSpline(points, false);
        //修正最后一点在插值产生的偏移
        points[points.length - 1] = [ex, ey];
        return points;
    };

    MarkLine.prototype.getOffsetPoint = function (start, end) {
        var distance = this.getDistance(start, end) / 3; //除以3？
        var angle, dX, dY;
        var mp = [start[0], start[1]];
        var deltaAngle = options.deltaAngle||0.2; //偏移0.2弧度
        if (start[0] != end[0] && start[1] != end[1]) {
            //斜率存在
            var k = (end[1] - start[1]) / (end[0] - start[0]);
            angle = Math.atan(k);
        } else if (start[0] == end[0]) {
            //垂直线
            angle = (start[1] <= end[1] ? 1 : -1) * Math.PI / 2;
        } else {
            //水平线
            angle = 0;
        }
        if (start[0] <= end[0]) {
            angle -= deltaAngle;
            dX = Math.round(Math.cos(angle) * distance);
            dY = Math.round(Math.sin(angle) * distance);
            mp[0] += dX;
            mp[1] += dY;
        } else {
            angle += deltaAngle;
            dX = Math.round(Math.cos(angle) * distance);
            dY = Math.round(Math.sin(angle) * distance);
            mp[0] -= dX;
            mp[1] -= dY;
        }
        return mp;
    };

    MarkLine.prototype.smoothSpline = function (points, isLoop) {
        var len = points.length;
        var ret = [];
        var distance = 0;
        for (var i = 1; i < len; i++) {
            distance += this.getDistance(points[i - 1], points[i]);
        }
        var segs = distance / 2;
        segs = segs < len ? len : segs;
        for (var i = 0; i < segs; i++) {
            var pos = i / (segs - 1) * (isLoop ? len : len - 1);
            var idx = Math.floor(pos);
            var w = pos - idx;
            var p0;
            var p1 = points[idx % len];
            var p2;
            var p3;
            if (!isLoop) {
                p0 = points[idx === 0 ? idx : idx - 1];
                p2 = points[idx > len - 2 ? len - 1 : idx + 1];
                p3 = points[idx > len - 3 ? len - 1 : idx + 2];
            } else {
                p0 = points[(idx - 1 + len) % len];
                p2 = points[(idx + 1) % len];
                p3 = points[(idx + 2) % len];
            }
            var w2 = w * w;
            var w3 = w * w2;

            ret.push([this.interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3), this.interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)]);
        }
        return ret;
    };

    MarkLine.prototype.interpolate = function (p0, p1, p2, p3, t, t2, t3) {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
    };

    MarkLine.prototype.getDistance = function (p1, p2) {
        return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
    };

    MarkLine.prototype.drawMarker = function (context) {
        this.from.draw(context);
        this.to.draw(context);
    };

    MarkLine.prototype.drawLinePath = function (context) {
    	var from=map.pointToPixel(this.from.location)
        var to=map.pointToPixel(this.to.location)
    	if(from.x<=0&&from.y<=0){
    		return;
    	}
    	if(to.x<=0&&to.y<=0){
    		return;
    	}
        var pointList = this.path = this.getPointList(from,to);
        var len = pointList.length;
        context.save();
        context.beginPath();
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.colors;

        if (!options.lineType || options.lineType == 'solid') {
            context.moveTo(pointList[0][0], pointList[0][1]);
            for (var i = 0; i < len; i++) {
                context.lineTo(pointList[i][0], pointList[i][1]);
            }
        } else if (options.lineType == 'dashed' || options.lineType == 'dotted') {
            for (var i = 1; i < len; i += 2) {
                context.moveTo(pointList[i - 1][0], pointList[i - 1][1]);
                context.lineTo(pointList[i][0], pointList[i][1]);
            }
        }
        context.stroke();
        context.restore();
        this.step = 0; //缩放地图时重新绘制动画
    };

    MarkLine.prototype.drawMoveCircle = function (context) {
    	
    	var from=map.pointToPixel(this.from.location)
        var to=map.pointToPixel(this.to.location)
    	if(from.x<=0&&from.y<=0){
    		return;
    	}
    	if(to.x<=0&&to.y<=0){
    		return;
    	}
        var pointList = this.path || this.getPointList(from, to);

        context.save();
        context.fillStyle = options.fillColor;
        context.shadowColor = options.shadowColor;
        context.shadowBlur = options.shadowBlur;
        context.beginPath();
        context.arc(pointList[this.step][0], pointList[this.step][1], options.moveRadius, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
        context.restore();
        this.step += 1;
        if (this.step >= pointList.length) {
            this.step = 0;
        }
    };

    //底层canvas渲染，标注，线条
    var brush = function brush() {
        var baseCtx = baseLayer.ctx;
        if (!baseCtx) {
            return;
        }

        baseCtx.clearRect(0, 0, width, height);
        markLines.forEach(function (line) {
        	line.drawMarker(baseCtx);
        	line.drawLinePath(baseCtx);
        });
    };

    //上层canvas渲染，动画效果
    var render = function render() {
        var animationCtx = animationLayer.ctx;
        if (!animationCtx) {
            return;
        }

        if (!animationFlag) {
            animationCtx.clearRect(0, 0, width, height);
            return;
        }

        animationCtx.fillStyle = 'rgba(0,0,0,.93)';
        var prev = animationCtx.globalCompositeOperation;
        animationCtx.globalCompositeOperation = 'destination-in';
        animationCtx.fillRect(0, 0, width, height);
        animationCtx.globalCompositeOperation = prev;
        

        for (var i = 0; i < markLines.length; i++) {
            var markLine = markLines[i];
            markLine.drawMoveCircle(animationCtx); //移动圆点
            if(markLine.from.type!="none"){
            	markLine.from.draw2(animationCtx);
            }
            if(markLine.to.type!="none"){
            	markLine.to.draw2(animationCtx);
            }
        }
    };
    
    //相机事件
    var mouseInteract = function mouseInteract() {
        map.camera.moveStart.addEventListener(function(e){
    		animationFlag = false;
    		baseLayer.ctx.clearRect(0, 0, width, height);
    		animationLayer.ctx.clearRect(0, 0, width, height);
    	});
        map.camera.changed.addEventListener(function(){
        	animationFlag = false;
        	baseLayer._draw();
        	if(superMap.camera!=null){
        		$(".tip").remove();
	        	var position=superMap.camera.position;
	            for(var e of superMap.htmlMark){
	            	var j=superMap.cesium.Cartesian3.distance(new superMap.cesium.Cartesian3.fromDegrees(e.lng, e.lat, e.height), position);
	            	var po=superMap.pointToPixel({"lng":e.lng,"lat":e.lat,"height":e.height});
	            	if(po.x!=0&&po.y!=0){
	            		$("#"+e.id).css({"top":po.y+"px","left":po.x+"px"}).show();
	            	}else{
	            		$("#"+e.id).hide();
	            	}
	            	if(j<=100){
	            		if($.trim($("#"+e.id).prop("tagName"))=="LI"){
	            			continue;
	            		}else{
	            			$("#"+e.id).children("div").css("transform","scale(1)");
	            		}
	            	}else if(j<=200){
	            		if($.trim($("#"+e.id).prop("tagName"))=="LI"){
	            			continue;
	            		}else{
	            			$("#"+e.id).children("div").css("transform","scale(0.9)");
	            		}
	            	}else if(j<=400){
	            		if($.trim($("#"+e.id).prop("tagName"))=="LI"){
	            			continue;
	            		}else{
	            			$("#"+e.id).children("div").css("transform","scale(0.8)");
	            		}
	            	}else if(j<=600){
	            		if($.trim($("#"+e.id).prop("tagName"))=="LI"){
	            			continue;
	            		}else{
	            			$("#"+e.id).children("div").css("transform","scale(0.7)");
	            		}
	            	}else if(j<=800){
	            		if($.trim($("#"+e.id).prop("tagName"))=="LI"){
	            			continue;
	            		}else{
	            			$("#"+e.id).children("div").css("transform","scale(0.6)");
	            		}
	            	}else if(j<=1000){
	            		if($.trim($("#"+e.id).prop("tagName"))=="LI"){
	            			continue;
	            		}else{
	            			$("#"+e.id).children("div").css("transform","scale(0.5)");
	            		}
	            	}else if(j<=1200){
	            		if($.trim($("#"+e.id).prop("tagName"))=="LI"){
	            			continue;
	            		}else{
	            			$("#"+e.id).children("div").css("transform","scale(0.4)");
	            		}
	            	}else if(j<=1400){
	            		if($.trim($("#"+e.id).prop("tagName"))=="LI"){
	            			continue;
	            		}else{
	            			$("#"+e.id).children("div").css("transform","scale(0.3)");
	            		}
	            	}else if(j<=1600){
	            		if($.trim($("#"+e.id).prop("tagName"))=="LI"){
	            			continue;
	            		}else{
	            			$("#"+e.id).children("div").css("transform","scale(0.2)");
	            		}
	            	}else{
	            		if($.trim($("#"+e.id).prop("tagName"))=="LI"){
	            			continue;
	            		}else{
	            			$("#"+e.id).children("div").css("transform","scale(0.1)");
	            		}
	            	}
	            }
        	}
        });
    	map.camera.moveEnd.addEventListener(function(e){
    		animationFlag = true;
            baseLayer._draw();
            animationLayer._draw(); 
    	});
    };
    


    var addMarkLine = function addMarkLine() {
        markLines = [];
        var data = options.data;
        data.forEach(function (line, i) {
            markLines.push(new MarkLine({
                id: i,
                from: new Marker({
                    city: line.from.city,
                    location: {"lng":line.from.lnglat[0], "lat":line.from.lnglat[1],"height":line.from.lnglat[2]},
                    color: line.from.color,
                    type:line.from.type,
                    speed:line.from.speed,
                    max:line.from.max,
                    image:line.from.image,
                    fontColor:line.from.fontColor,
                    fontSize:line.from.fontSize
                }),
                to: new Marker({
                    city: line.to.city,
                    location: {"lng":line.to.lnglat[0], "lat":line.to.lnglat[1],"height":line.to.lnglat[2]},
                    color: line.to.color,
                    type:line.to.type,
                    speed:line.to.speed,
                    max:line.to.max,
                    image:line.to.image,
                    fontColor:line.to.fontColor,
                    fontSize:line.to.fontSize
                })
            }));
        });
    };
    $("#cesiumContainer .cesium-widget").find("canvas").css({"position": "absolute","user-select": "none","display": "block","z-index":"0","pointer-events": "auto"});
    //初始化
    var init = function init(map, options) {
        merge(userOptions, options);

        baseLayer = new CanvasLayer({
            map: map,
            update: brush
        });

        animationLayer = new CanvasLayer({
            map: map,
            update: render
        });
        mouseInteract();
        addMarkLine();
        (function drawFrame() {
            requestAnimationFrame(drawFrame);
            render();
        })();
    };

    init(map, options);

    self.options = options;
    
    MoveLine.prototype.update = function (dataset,userOptions) {
    	if(userOptions){
    		merge(userOptions, options);
    	}
    	options.data=dataset;
    	addMarkLine();
    	baseLayer._draw();
    	animationLayer._draw(); 
    };

};

