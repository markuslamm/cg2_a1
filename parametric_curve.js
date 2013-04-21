/**
 * 
 */
/* requireJS module definition */
define([ "util", "vec2", "scene" ], (function(Util, vec2, Scene, PointDragger) {

	"use strict";

	var ParametricCurve = function(lineStyle) {
		console.log("creating ParametricCurve.");
		 //this.f_Function = function(t) { return 10*t + 300; }
		 //this.g_Function = function(t) { return 10*t + 300; };
		this.f_Function = function(t) { return 350 + 100 * Math.sin(t); };
		this.g_Function = function(t) { return 150 + 100 * Math.cos(t); };
		this.tMin = 0;
		this.tMax = 2 * Math.PI;
		this.segments = 20;
		this.lineStyle = lineStyle || { width : "2", color : "#0000AA"
		};
	};

	ParametricCurve.prototype.draw = function(context) {
//    	console.log("ParametricCurve.prototype.draw()");
//    	var intervalLength = Math.abs(this.tMin - this.tMax);
//    	var segmentLength = intervalLength / this.segments;
//        context.beginPath();
//        var i = 1;
//        context.moveTo(this.f_Function((segmentLength) * (i - 1)),
//					   this.g_Function((segmentLength) * (i - 1)));
//        for(i; i <= this.segments; i++) {
//			var p = [this.f_Function(segmentLength * i), this.g_Function(segmentLength * i)];
//			context.lineTo(p[0], p[1]);
//		}
//  
//        context.lineWidth = this.lineStyle.width;
//        context.strokeStyle = this.lineStyle.color;
//        context.stroke(); 
		var segmentLength = Math.abs((this.tMin - this.tMax) / this.segments);
		var startPoint = [this.f_Function(this.tMin), this.g_Function(this.tMax)];
		context.beginPath();
		context.moveTo(startPoint);
		for(var i = this.tMin; i <= this.tMax; i = i + segmentLength) {
			var p = [this.f_Function(i), this.g_Function(i)];
			context.lineTo(p[0], p[1]);
		}
		context.lineWidth = this.lineStyle.width;
		context.strokeStyle = this.lineStyle.color;
		context.stroke(); 
		
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
