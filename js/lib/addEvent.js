/**
 * @fileoverview addEvent
 * @author Random | http://weibo.com/random
 * @date 2015-03-05
 */

define(function(require, exports, module) {
	var isMobile = (/(mobile|iphone|ipod|ipad|ios|android|windows phone)/i).test(navigator.userAgent);
	var map = {
		"click" : "touchstart",
		"mousedown" : "touchstart",
		"mouseup" : "touchend"
	};
	
	module.exports = function(dom, type, handle, isCapture){
		if(dom.addEventListener){
			dom.addEventListener(isMobile ? map[type] || type : type, handle, isCapture);
		}else if(dom.attachEvent){
			dom.attachEvent("on" + type, handle);
		}else{
			dom["on" + type] = handle;
		}
		
	};
});