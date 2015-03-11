/**
 * @fileoverview BackgroundShadow
 * @author Random | http://weibo.com/random
 * @date 2013-05-10
 */
 
define(function(require, exports, module){
	var $ = require("jquery");
	var entity;
	var TPL='<div style="left:0;top:0;position:fixed;z-index:1500;background-color:#000;"></div>';

	function initEntity(){
		if(entity){
			return;
		}
		
		entity=$(TPL);
		entity.css("opacity",0.5);
		entity.css("display", "none");
		$(document.body).append(entity);
	}

	/**
	 * 初始化事件
	 */
	function initEvent() {
		$(window).resize(function(){
			updateDimension();
		});
	}
	
	function updateDimension(){
		var win=$(window);
		var w=win.width();
		var h=win.height();
		
		entity[0].style.width = w + "px";
		entity[0].style.height = h + "px";
	}

	function init() {
		initEntity();
		initEvent();
	}
	

	init();

	module.exports = {
		
		show:function(){
			updateDimension();
			entity.css("display", "");
		},
		
		hide:function(){
			entity.css("display", "none");
		},

		/**
		 * 销毁
		 */
		destroy : function() {
			$(document.body).remove(entity);
		}
	};
}); 