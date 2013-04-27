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
		//interval length [tMin, tMax]
		var intervalLength = Math.abs(this.tMin - this.tMax);
		//increment of t, "length" of segment
		var delta = intervalLength / this.segments;
		var points = [];
		//calculate x, y for every point on curve
		for(var i = 0; i <= this.segments; i++) {
			var xVal = this.f_Function(i * delta + this.tMin);
			var yVal = this.g_Function(i * delta + this.tMin);
			points[i] = [xVal, yVal];
			console.log("calculated point: " + points[i]);
		}
		console.log("Points on curve: " + points.length);
		//draw curve on canvas
		context.beginPath();
		//init start point
		context.moveTo(points[0][0], points[0][1]);
		for(var i = 1; i < points.length; i++) {
			console.log("Drawing point: " + points[i]);
			context.lineTo(points[i][0],points[i][1]);
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
