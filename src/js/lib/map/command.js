
/**
 * 指令控制
 */
var command={
		"message":function(command,message,data){
			return JSON.stringify({"command":command,"status":200,"timestamp":win.currentTimeMillis(),"message":message,"data":data});
		},
		/**
		 * 企业文化中心
		 */
		"qiye":function(e){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("cd-qiye","进入企业文化中心"));
			}else{
				console.log("WebSocket未连接");
			}
		},
		/**
		 * 进度管控中心
		 */
		"jindu":function(e){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("cd-jindu","进入进度管控中心"));
			}else{
				console.log("WebSocket未连接");
			}
		},
		/**
		 * 项目管控中心
		 */
		"xiangmu":function(e){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("cd-xiangmu","进入项目管控中心"));
			}else{
				console.log("WebSocket未连接");
			}
		},
		/**
		 * 效能监察中心
		 */
		"xiaoneng":function(e){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("cd-xiaoneng","进入效能监察中心"));
			}else{
				console.log("WebSocket未连接");
			}
		},
		/**
		 * 分拨调度中心
		 */
		"fenbo":function(e){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("cd-fenbo","进入分拨调度中心"));
			}else{
				console.log("WebSocket未连接");
			}
		},
		/**
		 * 党建主题中心
		 */
		"dangjian":function(e){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("cd-dangjian","进入党建主题中心"));
			}else{
				console.log("WebSocket未连接");
			}
		},
		/**
		 * 企业文化中心-发展历程
		 */
		"qiye_fz":function(e){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("qiye-fz","打开了企业文化中心-发展历程"));
			}else{
				console.log("WebSocket未连接");
			}
		},
		/**
		 * 企业文化中心-企业印记
		 */
		"qiye_qy":function(e){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("qiye-qy","打开了企业文化中心-企业印记"));
			}else{
				console.log("WebSocket未连接");
			}
		},
		/**
		 * 企业文化中心-精品工程
		 */
		"qiye_jp":function(e){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("qiye-jp","打开了企业文化中心-精品工程"));
			}else{
				console.log("WebSocket未连接");
			}
		},
		/**
		 * 企业文化中心-渝高荣誉
		 */
		"qiye_yg":function(e){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("qiye-yg","打开了企业文化中心-渝高荣誉"));
			}else{
				console.log("WebSocket未连接");
			}
		},
		/**
		 * 企业文化中心-企业宣传
		 */
		"qiye_yg":function(e){
			if(websocket.isConnection){
				websocket.send(CONFIG_COMMAND_TOPIC,command.message("qiye-yg","打开了企业文化中心-企业宣传"));
			}else{
				console.log("WebSocket未连接");
			}
		}
}
