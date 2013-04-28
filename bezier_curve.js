/**
 * 
 */
/* requireJS module definition */
define([ "util", "vec2", "scene", "point_dragger", "parametric_curve" ], (function(Util, vec2, Scene, PointDragger, ParametricCurve) {

	"use strict";

	var BezierCurve = function(p0, p1, p2, p3, lineStyle) {
		console.log("creating BezierCurve.");
		// init control points
		this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
		this.lineStyle = lineStyle;
		this.tMin = 0;
		this.tMax = 1;
		this.segments = 20;		
		this.xFunctionString = this.makeBernsteinFunction(this.p0[0], this.p1[0], this.p2[0], this.p3[0]);
		this.yFunctionString = this.makeBernsteinFunction(this.p0[1], this.p1[1], this.p2[1], this.p3[1]);
		/*
		 * init parametric curve delegate
		 */
		this.delegate = new ParametricCurve(lineStyle);
		this.delegate.tMin = this.tMin;
		this.delegate.tMax = this.tMax;
		this.delegate.segements = this.segments;
	};
	
	BezierCurve.prototype.makeBernsteinFunction = function(p0, p1, p2, p3) {
		return "Math.pow(1 - t, 3)*" + p0 + " + 3*Math.pow(1 - t, 2)*t*" + p1 + " + 3*(1 - t)*Math.pow(t, 2)*" + p2
		+ " + Math.pow(t, 3)*" + p3;
	}

	BezierCurve.prototype.draw = function(context) {
		console.log("BezierCurve.prototype.draw()");
		console.log("cP1X: " + this.p0[0] + ", cP1Y: " + this.p0[1]);
		console.log("cP2X: " + this.p1[0] + ", cP2Y: " + this.p1[1]);
		console.log("cP3X: " + this.p2[0] + ", cP3Y: " + this.p2[1]);
		console.log("cP4X: " + this.p3[0] + ", cP4Y: " + this.p3[1]);
		this.xFunctionString = this.makeBernsteinFunction(this.p0[0], this.p1[0], this.p2[0], this.p3[0]);
		this.yFunctionString = this.makeBernsteinFunction(this.p0[1], this.p1[1], this.p2[1], this.p3[1]);
		console.log("xFunction: " + this.xFunctionString);
		console.log("yFunction: " + this.yFunctionString);
		this.delegate.evalXFunction(this.xFunctionString);
		this.delegate.evalYFunction(this.yFunctionString);
		this.delegate.draw(context);
	};

	BezierCurve.prototype.isHit = function(context, position) {
		console.log("BezierCurve.prototype.isHit()");
	};

	BezierCurve.prototype.createDraggers = function() {
		var draggers = [];
		return draggers;

	};
	return BezierCurve;

})); // define
