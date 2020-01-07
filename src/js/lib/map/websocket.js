var SockJS =require('./sockjs.min.js');
var superMap =require('./index.js');

require('./stomp.js');

var interval;
var link={
		/**
		 * websocket连接成功后触发
		 */
		"success":function(){
			clearInterval(interval);
			interval=0;
		},
		/**
		 * websocket连接错误后触发
		 */
		"error":function(){
			if(interval==0){
				interval=setInterval("link.connection()",5000);
			}
		},
		/**
		 * websocket断线重连机制
		 */
		"connection":function(){
			//链接服务器
			websocket.init(CONFIG_WEBSOCKET_URL,function(){
				websocket.isConnection=true;
				link.success();
				superMap.websocketConnectionSuccess(websocket);
			},function(){
				websocket.isConnection=false;
				link.error();
			});
		}
}

/**
 * 使用websocket即时推送通知消息 可复用
 */
var websocket = {
	"isConnection":false,
	"stompClient" : null,
	"init" : function(url, connectSuccessCallback, connectErrorCallback) {
		// 建立websocket的方法（连接地址，连接成功回调方法，连接失败回调方法）
		var sockjs = new SockJS(url);
		if (websocket.stompClient) {
			try {
				stompClient.disconnect();
			} catch (e) {
				console.log(e);
			}
		}
		websocket.stompClient = Stomp.over(sockjs);
		websocket.stompClient.connect({}, connectSuccessCallback,
				connectErrorCallback);
	},
	"send" : function(topic, msg) {
		// 发送消息的方法 （topic发送主题， msg消息json）
		websocket.stompClient.send(topic, {
			atytopic : "greetings"
		}, msg);
	},
	"subscribe" : function(topic, messageCallback) {
		// 订阅消息的方法（ topic 订阅主题， messageCallback 收到消息的回调函数）
		websocket.stompClient.subscribe(topic, messageCallback);
	},
	"unsubscribe" : function(topic) {
		// 取消订阅的方法 （主题）
		websocket.stompClient.unsubscribe(topic);
	},
	"disconnect" : function() {
		// 断开连接的方法
		websocket.stompClient.disconnect();
	}
}

link.connection();