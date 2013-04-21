/**
 * 
 */
/* requireJS module definition */
define([ "util", "vec2", "scene" ], (function(Util, vec2, Scene, PointDragger) {

	"use strict";

	var ParametricCurve = function(lineStyle) {
		console.log("creating ParametricCurve.");
		this.f_Function = function() { return 350 + 100 * Math.sin(t); };
		this.g_Function = function() { return 150 + 100 * Math.cos(t); };
		this.tMin = 0;
		this.tMax = 2 * Math.PI;
		this.segments = 20;
		this.lineStyle = lineStyle || { width : "2", color : "#0000AA"};
	};

	ParametricCurve.prototype.draw = function(context) {
		console.log("ParametricCurve.prototype.draw()");
	};

	ParametricCurve.prototype.isHit = function(context, position) {
		console.log("ParametricCurve.prototype.isHit()");
	};
	
    ParametricCurve.prototype.createDraggers = function() {
        var draggers = [];
   	 	return draggers;
       
   };

	return ParametricCurve;

})); // define
