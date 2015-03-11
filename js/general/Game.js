/**
 * @fileoverview Game
 * @author Random | http://weibo.com/random
 * @date 2015-03-04
 */

define(function(require, exports, module) {
	"use strict";
	
	var Scene = require("general/Scene");
	var Switcher = require("general/Switcher");
	var BeginStage = require("general/BeginStage");
	var addEvent = require("lib/addEvent");
	var Storage = require("lib/Storage");
	var util = require("lib/util");
	
    var canvas = document.getElementById("stage");
    var bsNode = document.getElementById("begin");
    var tip = document.getElementById("tip");
    var btnFW = document.getElementById("btnFW");
    var btnReset = document.getElementById("btnReset");
    var wxArrow = document.getElementById("wxArrow");
    var stage = canvas.getContext("2d");
    
    var FPS = 60;
    var BASE_HEIGHT = 560;
    var STORAGE_KEY = "core-ball-level";
    var SHARE_HREF = "sinaweibo://share?content=考验技巧的HTML5小游戏，我已玩到第#{level}关了，你也来试试吧！ http://ra.ndom.me/core-ball/";
    
    var scene;
    var beginStage = BeginStage(bsNode);
    var switcher;
    var level = Storage.getValue(STORAGE_KEY) || 1;
    var scale;
    var isResetting = false
	
    function adaptScreen(){
		var width = document.body.scrollWidth || document.documentElement.scrollWidth;
		var height = document.body.scrollHeight || document.documentElement.scrollHeight;

        canvas.width = width;
        canvas.height = height;
       
        switcher = Switcher(stage, width, height);
        bsNode.style.backgroundColor = switcher.color;
        bsNode.style.width = width + "px";
        bsNode.style.height = height + "px";
        
        scale = height / 560;
	}
	
	function updateSharedHref(){
		btnFW.href = SHARE_HREF.replace(/#\{level\}/, level);
	}
	
	function initForward(){
		if(util.isWenxin){
			addEvent(btnFW, "mousedown", function(){
				wxArrow.style.display = "";
			});
			
		}else if(util.isMobile){
			updateSharedHref();
			
		}else{
			//http://service.weibo.com/share/share.php?url=http://ra.ndom.me/core-ball/index.html&type=button&language=zh_cn&appkey=2hwszt&searchPic=true&style=number
		}
	}
	
	function updateLevel(lv){
		level = lv;
		Storage.setValue(STORAGE_KEY, level);
		beginStage.level(level);
		!util.isWenxin && util.isMobile && updateSharedHref();
	}

    
    function initEvent(){
		addEvent(document.body, "mousedown", function(evt){
			var i;
			
			if(evt && evt.changedTouches){
				i = evt.changedTouches.length;
				while(i--){
					scene.shot();
				}
				
			}else{
				scene.shot();
			}
		});
		
		addEvent(wxArrow, "mousedown", function(){
			wxArrow.style.display = "none";
		});
		
		addEvent(btnReset, "mousedown", function(){
			if(!isResetting){
				isResetting = true;
				tip.style.display = "";
				updateLevel(1);
				setTimeout(function(){
					tip.style.display = "none";
					isResetting = false;
				}, 1500);
			}
		});
		
		
		scene.on("passed", function(){
			switcher.switchStage(0, function(){
				scene.enabled = false;
				updateLevel(level + 1);
				canvas.style.display = "none";
				beginStage.show();
			});
		});
		
		scene.on("failed", function(){
			switcher.switchStage(0, function(){
				scene.enabled = false;
				canvas.style.display = "none";
				beginStage.level(level);
				beginStage.show();
			});
		});
		
		beginStage.on("start", function(){
			canvas.style.display = "";
			beginStage.hide();
			switcher.switchStage(1, function(){
				scene.run(level);
			});
		});
    }
    
	function init(){
		adaptScreen();
		scene = Scene(document.body, canvas, stage, scale);
		initEvent();
		
		beginStage.level(level);
		beginStage.show();
		
		window.setInterval(function(){
			scene.update();
			scene.render();
			
			switcher.update();
			switcher.render();
			
		}, 1000 / FPS);
	}
	
	var Game = {
		start : init
	};
	
	
	
	module.exports = Game;
});