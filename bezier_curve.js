/**
 * 
 */
/* requireJS module definition */
define([ "util", "vec2", "scene", "point_dragger" ], (function(Util, vec2, Scene, PointDragger) {

	"use strict";

	var BezierCurve = function(controlPoints, lineStyle) {
		console.log("creating BezierCurve.");
		//init control points
		this.p0 = controlPoints[0];
		this.p1 = controlPoints[1];
		this.p2 = controlPoints[2];
		this.p3 = controlPoints[3];
		this.tMin = 0;
		this.tMax = 1;
		this.segments = 20;
		this.lineStyle = lineStyle || { width : "2", color : "#0000AA" };
		
		
		/* 
		 * bernstein functions, see handout
		 */
		this.bersteinPolynom0 = function(t) {
			return Math.pow(1 - t, 3);
		};
		
		this.bersteinPolynom1 = function(t) {
			return 3 * Math.pow(1 - t, 2) * t;
		};
		
		this.bersteinPolynom2 = function(t) {
			return 3 * (1 - t) * Math.pow(t, 2);
		};
		
		this.bersteinPolynom3 = function(t) {
			return Math.pow(t, 3);
		};
		
		//calculate x value
		this.xFunction = function(t) {
			var result = this.p0[0] * this.bersteinPolynom0(t) + this.p1[0] + this.bersteinPolynom1(t)
				+ this.p2[0] * this.bersteinPolynom2(t) + this.p1[0] + this.bersteinPolynom3(t);
		};
		
		//calculate x value
		this.yFunction = function(t) {
			var result = this.p0[1] * this.bersteinPolynom0(t) + this.p1[1] + this.bersteinPolynom1(t)
				+ this.p2[1] * this.bersteinPolynom2(t) + this.p1[1] + this.bersteinPolynom3(t);
		};
		
	};

	BezierCurve.prototype.draw = function(context) {
		console.log("BezierCurve.prototype.draw()");
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
