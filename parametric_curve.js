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
		this.showTickmarks = false;
	};

	ParametricCurve.prototype.draw = function(context) {
		// console.log("xFunction: " + this.xFunction.toString());
		// console.log("yFunction: " + this.yFunction.toString());
		/* interval length [tMin, tMax] */
		var intervalLength = Math.abs(this.tMin - this.tMax);
		/* increment of t, "length" of segment */
		var delta = intervalLength / this.segments;
		var points = [];
		/* calculate x, y for every point on curve */
		for ( var i = 0; i <= this.segments; i++) {
			var xVal = this.xFunction(i * delta + this.tMin);
			var yVal = this.yFunction(i * delta + this.tMin);
			points[i] = [ xVal, yVal ];
		}
		/* draw curve on canvas */
		context.beginPath();
		/* init start point */
		context.moveTo(points[0][0], points[0][1]);
		for ( var i = 1; i < points.length; i++) {
			context.lineTo(points[i][0], points[i][1]);
		}
		context.lineWidth = this.lineStyle.width;
		context.strokeStyle = this.lineStyle.color;
		context.stroke();
		
		if(this.showTickmarks) {
			/* draw tickmarks on curve */
			context.beginPath();
			for (var i = 1; i < this.segments; i++) {
				var tang =  vec2.sub(points[(i+1)], points[(i-1)]) ;
				var tangNorm = [tang[1] * (-1), tang[0]];

				var normalizedVecN = vec2.mult(tangNorm, (1 / vec2.length(tangNorm)));
				var pTick0 =  vec2.add(points[i], vec2.mult(normalizedVecN, 10));
				var pTick1 =  vec2.sub(points[i], vec2.mult(normalizedVecN, 10));

				context.moveTo(pTick0[0],pTick0[1]);
				context.lineTo(pTick1[0],pTick1[1]);
//				var vecTangent =  vec2.sub(points[(i+1)], points[(i-1)]) ;
//				var vecNorm = [-vecTangent[1], vecTangent[0]];
//				var vecNormalized = vec2.mult(vecNorm, (1 / vec2.length(vecNorm)));
//				var tickPoint0 =  vec2.add(points[i], vec2.mult(vecNormalized, 15));
//				var tickPoint1 =  vec2.sub(points[i], vec2.mult(vecNormalized, 15));
//				context.moveTo(tickPoint0[0],tickPoint0[1]);
//				context.lineTo(tickPoint0[0],tickPoint0[1]);
				
				
//				console.log("current point: " + points[i]);
//				var tangentVec = vec2.sub(points[(i+1)], points[(i-1)]) ;
//				console.log("tangentVec: " + tangentVec);
//				var orthogonalVec = [-tangentVec[1], tangentVec[0]];
//				console.log("orthogonalVec: " + orthogonalVec);
//				var normalizedVec = vec2.mult(orthogonalVec, (1 / vec2.length(orthogonalVec)));
//				console.log("normalizedVec: " + normalizedVec);
//				var tickPoint0 = vec2.add(points[i], vec2.mult(normalizedVec, 10));
//				var tickPoint1 = vec2.sub(points[i], vec2.mult(normalizedVec, 10));
//				context.moveTo(tickPoint0[0],tickPoint0[1]);
//				context.lineTo(tickPoint1[0],tickPoint1[1]);
			}
			context.lineWidth = 1;
			context.strokeStyle = "#000000";
			context.stroke();
			
		}
	};

	ParametricCurve.prototype.isHit = function(context, position) {
		var delta = Math.abs(this.tMin - this.tMax) / this.segments;
		var hit = false;
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
			if (d <= (this.lineStyle.width / 2) + tolerance) {
				hit = true;
			}
		}
		console.log("ParametricCurve isHit(): " + hit);
		return hit;
	};

	ParametricCurve.prototype.Func = function(functionString) {
		var result = eval("(function(t) { return " + functionString + ";});");
		return result;

	};

	ParametricCurve.prototype.evalXFunction = function(xFunctionString) {
		try {
			this.xFunction = this.Func(xFunctionString);
			this.xFunctionString = xFunctionString;
		} catch (exc) {
			console.log("unable to create xFunction: " + exc.message);
			alert("Invalid xFunction expression");
		}
	};

	ParametricCurve.prototype.evalYFunction = function(yFunctionString) {
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
