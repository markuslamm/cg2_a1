/**
 * 
 */
/* requireJS module definition */
define([ "util", "vec2", "scene", "point_dragger", "parametric_curve", "controlpolygon_dragger"], (function(Util, vec2, Scene, PointDragger, ParametricCurve, ControlPolygonDragger) {

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
	
//	BezierCurve.prototype.setShowTickmarks = function(tickmarks) {
//		this.delegate.showTickmarks = tickmarks;
//	};
	
	BezierCurve.prototype.makeBernsteinFunction = function(p0, p1, p2, p3) {
		return "Math.pow(1 - t, 3)*" + p0 + " + 3*Math.pow(1 - t, 2)*t*" + p1 + " + 3*(1 - t)*Math.pow(t, 2)*" + p2
		+ " + Math.pow(t, 3)*" + p3;
	}

	BezierCurve.prototype.draw = function(context) {
		console.log("BezierCurve.prototype.draw()");
//		console.log("cP1X: " + this.p0[0] + ", cP1Y: " + this.p0[1]);
//		console.log("cP2X: " + this.p1[0] + ", cP2Y: " + this.p1[1]);
//		console.log("cP3X: " + this.p2[0] + ", cP3Y: " + this.p2[1]);
//		console.log("cP4X: " + this.p3[0] + ", cP4Y: " + this.p3[1]);
		this.xFunctionString = this.makeBernsteinFunction(this.p0[0], this.p1[0], this.p2[0], this.p3[0]);
		this.yFunctionString = this.makeBernsteinFunction(this.p0[1], this.p1[1], this.p2[1], this.p3[1]);
		console.log("xFunction: " + this.xFunctionString);
		console.log("yFunction: " + this.yFunctionString);
		this.delegate.evalXFunction(this.xFunctionString);
		this.delegate.evalYFunction(this.yFunctionString);
		this.delegate.draw(context);
	};

	BezierCurve.prototype.isHit = function(context, position) {
		var hit = this.delegate.isHit(context, position);
		console.log("BezierCurve isHit(): " + hit);
		return hit;
	};

	BezierCurve.prototype.createDraggers = function() {
		var draggerStyle = { radius:4, color: this.lineStyle.color, width:0, fill:true }
        var draggers = [];
		
		// create closure and callbacks for dragger
        var _bezierCurve = this;
        var getP0 = function() { return _bezierCurve.p0; };
        var getP1 = function() { return _bezierCurve.p1; };
        var getP2 = function() { return _bezierCurve.p2; };
        var getP3 = function() { return _bezierCurve.p3; };
        var setP0 = function(dragEvent) { _bezierCurve.p0 = dragEvent.position; };
        var setP1 = function(dragEvent) { _bezierCurve.p1 = dragEvent.position; };
        var setP2 = function(dragEvent) { _bezierCurve.p2 = dragEvent.position; };
        var setP3 = function(dragEvent) { _bezierCurve.p3 = dragEvent.position; };
        draggers.push(new PointDragger(getP0, setP0, draggerStyle, "p0"));
        draggers.push(new PointDragger(getP1, setP1, draggerStyle, "p1"));
        draggers.push(new PointDragger(getP2, setP2, draggerStyle, "p2"));
        draggers.push(new PointDragger(getP3, setP3, draggerStyle, "p3"));
        draggers.push(new ControlPolygonDragger(getP0, setP0, getP1, draggerStyle));
        draggers.push(new ControlPolygonDragger(getP1, setP1, getP2, draggerStyle));
        draggers.push(new ControlPolygonDragger(getP2, setP2, getP3, draggerStyle));

		return draggers;

	};
	return BezierCurve;

})); // define
