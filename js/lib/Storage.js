/**
 * @fileoverview Storage
 * @author Random | http://weibo.com/random
 * @date 2015-03-11
 */

define(function(require, exports, module) {
	"use strict";
	
	var Storage = {
		setValue : function(key, value){
			window.localStorage && (window.localStorage[key] = value);
		},
		
		getValue : function(key){
			if(window.localStorage){
				return window.localStorage[key];
			}
		}
	};
	
	module.exports = Storage;
});