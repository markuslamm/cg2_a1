/**
 * 
 */
/* requireJS module definition */
define([ "util", "vec2", "scene", "point_dragger" ], (function(Util, vec2, Scene, PointDragger) {

	"use strict";

	var BezierCurve = function(controlPoints, lineStyle) {
		console.log("creating BezierCurve.");
		this.p0 = controlPoints[0];
		this.p1 = controlPoints[1];
		this.p2 = controlPoints[2];
		this.p3 = controlPoints[3];
		this.lineStyle = lineStyle || { width : "2", color : "#0000AA" };
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
