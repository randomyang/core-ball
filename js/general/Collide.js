/**
 * @fileoverview Collide
 * @author Random | http://weibo.com/random
 * @date 2015-02-05
 */

define(function(require, exports, module) {
	"use strict";
	
	var util = require("lib/util");
	
	var Collide = {
		check : function(core, ball){
			var childs = core.childs();
			var i = childs.length;
			var d = 2 * ball.rad();
			
			while(i--){
				if(ball !== childs[i].ball && util.getPointDistance(ball.pos(), childs[i].ball.pos()) <= d + 2){
					return true;
				}
			}
			
			return false;
		}
	};
	
	module.exports = Collide;
});