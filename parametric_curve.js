/**
 * 
 */
/* requireJS module definition */
define([ "util", "vec2", "scene" ], (function(Util, vec2, Scene, PointDragger) {

	"use strict";

	var ParametricCurve = function(lineStyle) {
		console.log("creating ParametricCurve.");
		/* Initial values */
		this.tMin = 0;
		this.tMax = 2 * Math.PI;
		this.segments = 20;
		this.lineStyle = lineStyle || { width : "2", color : "#0000AA"
		};
		this.xFunctionString = "350 + 100 * Math.sin(t)";
		this.yFunctionString = "150 + 100 * Math.cos(t)";
		this.xFunction = this.Func(this.xFunctionString);
		this.yFunction = this.Func(this.yFunctionString);
		// console.log("init xFunction: " + this.xFunction.toString());
		// console.log("init yFunction: " + this.yFunction.toString());
	};

	ParametricCurve.prototype.draw = function(context) {
		console.log("drawing ParametricCurve.");
		console.log("xFunction: " + this.xFunction.toString());
		console.log("yFunction: " + this.yFunction.toString());
		// interval length [tMin, tMax]
		var intervalLength = Math.abs(this.tMin - this.tMax);
		// increment of t, "length" of segment
		var delta = intervalLength / this.segments;
		var points = [];
		// calculate x, y for every point on curve
		for ( var i = 0; i <= this.segments; i++) {
			var xVal = this.xFunction(i * delta + this.tMin);
			var yVal = this.yFunction(i * delta + this.tMin);
			points[i] = [ xVal, yVal ];
			// console.log("calculated point: " + points[i]);
		}
		// console.log("Points on curve: " + points.length);
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
			var point0 = [ this.xFunction(i * delta + this.tMin), this.yFunction(i * delta + this.tMin) ];
			var point1 = [ this.xFunction((i + 1) * delta + this.tMin), this.yFunction((i + 1) * delta + this.tMin) ];
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

	ParametricCurve.prototype.Func = function(functionString) {
		var result = eval("(function(t) { return " + functionString + ";});");
		return result;

	};

	ParametricCurve.prototype.XFunction = function(xFunctionString) {
		try {
			this.xFunction = this.Func(xFunctionString);
			this.xFunctionString = xFunctionString;
		} catch (exc) {
			console.log("unable to create xFunction: " + exc.message);
			alert("Invalid xFunction expression");
		}
	};

	ParametricCurve.prototype.YFunction = function(yFunctionString) {
		try {
			this.yFunction = this.Func(yFunctionString);
			this.yFunctionString = yFunctionString;

		} catch (exc) {
			console.log("unable to create yFunction: " + exc.message);
			alert("Invalid yFunction expression");
		}
	};

	ParametricCurve.prototype.createDraggers = function() {
		var draggers = [];
		return draggers;
	};

	return ParametricCurve;

})); // define
