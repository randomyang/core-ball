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
	
    var canvas = document.getElementById("stage");
    var bsNode = document.getElementById("begin");
    var stage = canvas.getContext("2d");
    
    var FPS = 60;
    var BASE_HEIGHT = 560;
    
    var scene;
    var beginStage = BeginStage(bsNode);
    var switcher;
    var level = 1;
    var scale;
	
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

		
		scene.on("passed", function(){
			switcher.switchStage(0, function(){
				scene.enabled = false;
				level++;
				canvas.style.display = "none";
				beginStage.level(level);
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