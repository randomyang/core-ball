/**
 * @fileoverview Levels
 * @author Random | http://weibo.com/random
 * @date 2015-03-06
 */

define(function(require, exports, module) {
	"use strict";
	
	var addEvent = require("lib/addEvent");
	
	var Levels = {};
	var k;
	
	function typeAB(v, d){
		return function(){
			var angle = 0;
			return function(){
				angle += v * d % 360;
				return angle;
			};
		};
	}
	
	function typeC(v, td){
		return function(){
			var angle = 0;
			var d = 1;
			var t = +(new Date);
			return function(){
				var t2 = +(new Date);
				if(t2 - t > td){
					d = -d;
					t = t2;
				}
				angle += d * v % 360;
				return angle;
			};
		};
	}
	
	function typeD(v, sum, td, d){
		return function(){
			var angle = 0;
			var t = +(new Date);
			
			return function(){
				var t2 = +(new Date);
				if(t2 - t > td){
					v = sum - v;
					t = t2;
				}
				angle += v * d % 360;
				return angle;
			};
		};
	}
	
	function typeE(v){
		var d = 1;
		addEvent(document.body, "mousedown", function(){
			d = -d;
		});
		return function(){
			var angle = 0;
			
			return function(){
				angle += v * d % 360;
				return angle;
			};
		};
	}
	
	function typeDE(v, sum, td, d){
		addEvent(document.body, "mousedown", function(){
			d = -d;
		});
		return function(){
			var angle = 0;
			var t = +(new Date);
			
			return function(){
				var t2 = +(new Date);
				if(t2 - t > td){
					v = sum - v;
					t = t2;
				}
				angle += v * d % 360;
				return angle;
			};
		};
	}
	
	var roundTypes = {
		"A1" : typeAB(1.5, 1),
		"A2" : typeAB(1.5, -1),
		
		"B1" : typeAB(2.5, 1),
		"B2" : typeAB(2.5, -1),
		
		"C" : typeC(2.2, 3000),
		
		"D1" : typeD(2, 2.3, 1200, 1),
		"D2" : typeD(2, 2.3, 1200, -1),
		"D3" : typeD(4, 4.5, 1500, 1),
		"D4" : typeD(4, 4.5, 1500, -1),
		
		"E1" : typeE(2),
		"E2" : typeDE(2, 2.3, 1000, 1)
	};
	
	var childsTypes = {
		"0" : [],
		"2" : [0, 180],
		"3" : [0, 120, 240],
		"4" : [0, 90, 180, 270],
		"5" : [0, 72, 144, 216, 288],
		"6" : [0, 60, 120, 180, 240, 300],
		"7" : [0, 52, 103, 155, 206, 258, 309],
		"8" : [0, 45, 90, 135, 180, 225, 270, 315],
		"9" : [0, 40, 80, 120, 160, 200, 240, 280, 320],
		"10" : [0, 36, 72, 108, 144, 180, 216, 252, 288, 324],
		"11" : [0, 33, 66, 99, 131, 164, 197, 230, 262, 295, 328],
		"12" : [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
		"13" : [0, 28, 56, 84, 111, 139, 167, 194, 222, 250, 277, 305, 333],
		"14" : [0, 26, 52, 78, 103, 129, 155, 180, 206, 232, 258, 283, 309, 335],
		"15" : [0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336],
		"16" : [0, 23, 45, 68, 90, 113, 135, 158, 180, 203, 225, 248, 270, 293, 315, 338]
	};
	
	var data = {
		"1" : ["4", 4, "A1"],
		"2" : ["4", 8, "A1"],
		"3" : ["6", 8, "A1"],
		"4" : ["6", 8, "A2"],
		"5" : ["7", 5, "A1"],
		"6" : ["7", 8, "A2"],
		"7" : ["8", 8, "A1"],
		"8" : ["7", 10, "A2"],
		"9" : ["8", 10, "A2"],
		"10" : ["0", 24, "A1"],
		
		"11" : ["2", 8, "B1"],
		"12" : ["4", 8, "B2"],
		"13" : ["5", 10, "B1"],
		"14" : ["5", 12, "B2"],
		"15" : ["3", 14, "A2"],
		"16" : ["4", 16, "A1"],
		"17" : ["6", 12, "B1"],
		"18" : ["5", 18, "A2"],
		"19" : ["6", 12, "B1"],
		"20" : ["8", 16, "A2"],
		
		"21" : ["4", 8, "C"],
		"22" : ["4", 10, "C"],
		"23" : ["4", 12, "C"],
		"24" : ["6", 10, "C"],
		"25" : ["6", 16, "A1"],
		"26" : ["6", 18, "A2"],
		"27" : ["8", 18, "A1"],
		"28" : ["6", 12, "C"],
		"29" : ["6", 14, "C"],
		"30" : ["8", 16, "C"],
		
		"31" : ["4", 6, "D1"],
		"32" : ["4", 8, "D2"],
		"33" : ["6", 8, "D1"],
		"34" : ["6", 10, "D1"],
		"35" : ["8", 14, "C"],
		"36" : ["10", 12, "B2"],
		"37" : ["8", 10, "D1"],
		"38" : ["8", 12, "D2"],
		"39" : ["10", 12, "D1"],
		"40" : ["4", 20, "D2"],
		
		"41" : ["6", 8, "D3"],
		"42" : ["5", 10, "D4"],
		"43" : ["8", 12, "D3"],
		"44" : ["8", 15, "D4"],
		"45" : ["5", 15, "E1"],
		"46" : ["6", 16, "E1"],
		"47" : ["4", 10, "E2"],
		"48" : ["6", 12, "E2"],
		"49" : ["6", 16, "E2"],
		"50" : ["8", 16, "E2"]
		
		
		
	};

	
	function bindLevles(lv, ct, count, rt){
		Levels[lv] = {
			childs : childsTypes[ct],
			queueCount : count,
			round : roundTypes[rt]
		};
	}
	
	for(k in data){
		bindLevles(k, data[k][0], data[k][1], data[k][2]);
	}
	
	
	module.exports = Levels;
});