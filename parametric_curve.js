/**
 * 
 */
/* requireJS module definition */
define([ "util", "vec2", "scene" ], (function(Util, vec2, Scene, PointDragger) {

	"use strict";

	var ParametricCurve = function(lineStyle) {
		console.log("creating ParametricCurve.");
		this.tMin = 0;
		this.tMax = 2 * Math.PI;
		this.segments = 20;
		this.lineStyle = lineStyle || { width : "2", color : "#0000AA" };
		this.xFunctionString = "350 + 100 * Math.sin(t)";
		this.yFunctionString = "150 + 100 * Math.cos(t)";
	};
	
	 ParametricCurve.prototype.Func = function(functionString, t) {
			try{
				return eval(functionString);
			}
			catch(exc){
				alert("Cannot evaluate function expression " + functionString);
				console.log("An exception occured: " + exc);
			}
	    };

	ParametricCurve.prototype.draw = function(context) {
		console.log("drawing ParametricCurve.");
		console.log("xFunctionString: " + this.xFunctionString);
		console.log("yFunctionString: " + this.yFunctionString);
		// interval length [tMin, tMax]
		var intervalLength = Math.abs(this.tMin - this.tMax);
		// increment of t, "length" of segment
		var delta = intervalLength / this.segments;
		var points = [];
		// calculate x, y for every point on curve
		for ( var i = 0; i <= this.segments; i++) {
			var xVal = this.Func(this.xFunctionString, i * delta + this.tMin);
			var yVal = this.Func(this.yFunctionString, i * delta + this.tMin);
			points[i] = [ xVal, yVal ];
			console.log("calculated point: " + points[i]);
		}
		//console.log("Points on curve: " + points.length);
		// draw curve on canvas
		context.beginPath();
		// init start point
		context.moveTo(points[0][0], points[0][1]);
		for ( var i = 1; i < points.length; i++) {
			// console.log("Drawing point: " + points[i]);
			context.lineTo(points[i][0], points[i][1]);
		}
		context.lineWidth = this.lineStyle.width;
		context.strokeStyle = this.lineStyle.color;
		context.stroke();
	};

	ParametricCurve.prototype.isHit = function(context, position) {
		var delta = Math.abs(this.tMin - this.tMax) / this.segments;
		for ( var i = 0; i <= this.segments; i++) {
			var point0 = [ this.Func(this.xFunctionString, i * delta + this.tMin), this.Func(this.yFunctionString, i * delta + this.tMin)];
			var point1 = [ this.Func(this.xFunctionString, (i + 1) * delta + this.tMin), this.Func(this.yFunctionString, (i + 1) * delta + this.tMin) ];
			/*
			 * TAKEN FROM STAIGHT LINE
			 */
			var t = vec2.projectPointOnLine(position, point0, point1);
			// outside the line segment?
			if (t < 0.0 || t > 1.0) {
				continue;
			}
			// coordinates of the projected point
			var p = vec2.add(point0, vec2.mult(vec2.sub(point1, point0), t));
			// distance of the point from the line
			var d = vec2.length(vec2.sub(p, position));
			// allow 2 pixels extra "sensitivity"
			var tolerance = 3;
			return d <= (this.lineStyle.width / 2) + tolerance;
		}
		return false;
	};

	ParametricCurve.prototype.createDraggers = function() {
		var draggers = [];
		return draggers;
	};

	return ParametricCurve;

})); // define
