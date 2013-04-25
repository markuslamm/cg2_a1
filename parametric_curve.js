/**
 * 
 */
/* requireJS module definition */
define([ "util", "vec2", "scene" ], (function(Util, vec2, Scene, PointDragger) {

	"use strict";

	var ParametricCurve = function(lineStyle) {
		console.log("creating ParametricCurve.");
//		 this.f_Function = function(t) { return 10 * t + 100; };
//		 this.g_Function = function(t) { return 10 * t + 100; };
//		 this.tMin = 0;
//		 this.tMax = 10;
		this.f_Function = function(t) {
			return 350 + 100 * Math.sin(t);
		};
		this.g_Function = function(t) {
			return 150 + 100 * Math.cos(t);
		};
		this.tMin = 0;
		this.tMax = 2 * Math.PI;
		this.segments = 10;
		this.lineStyle = lineStyle || { width : "2", color : "#0000AA" };
	};

	ParametricCurve.prototype.draw = function(context) {

//		console.log("ParametricCurve.prototype.draw()");
//		var segmentLength = Math.abs((this.tMin - this.tMax) / this.segments);
//		var startPoint = [ this.f_Function(this.tMin), this.g_Function(this.tMax) ];
//		context.beginPath();
//		context.moveTo(startPoint);
//		for ( var i = this.tMin; i <= this.tMax; i = i + segmentLength) {
//			var p = [ this.f_Function(i), this.g_Function(i) ];
//			context.lineTo(p[0], p[1]);
//		}
//		context.lineWidth = this.lineStyle.width;
//		context.strokeStyle = this.lineStyle.color;
//		context.stroke();
		
//		var segmentLength = Math.abs(this.tMin - this.tMax) / this.segments;
//		console.log("segment length: " + segmentLength);
//		var i = 1;
//		var startPoint = [ this.f_Function(segmentLength * (i - 1)), this.g_Function(segmentLength * (i - 1)) ];
//		console.log("start point: " + startPoint);
//		context.beginPath();
//        context.moveTo(startPoint);
//        for(i; i <= this.segments; i++) {
//        	console.log("Drawing segment " + i);
//        	var xVal = this.f_Function(segmentLength * i);
//        	var yVal = this.g_Function(segmentLength * i);
//        	console.log("xVal: " + xVal + ", yVal: " + yVal);
//			var p = [xVal, yVal];
//			context.lineTo(p[0], p[1]);
//		}
		
		var delta = Math.abs(this.tMin - this.tMax);
		var i = 1;
        context.beginPath();
        context.moveTo(this.f_Function((delta/this.segments) * (i - 1)),
					   this.g_Function((delta/this.segments) * (i - 1)));
        for(i; i <= this.segments; i++) {
			
			var point = [this.f_Function((delta / this.segments) * i),
						   this.g_Function((delta / this.segments) * i)];
			
			context.lineTo(point[0], point[1]);
			
		}
        context.lineWidth = this.lineStyle.width;
        context.strokeStyle = this.lineStyle.color;
        context.stroke(); 
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
