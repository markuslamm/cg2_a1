/**
 * 
 */
/* requireJS module definition */
define(["util", "vec2", "scene", "point_dragger"], 
       (function(Util,vec2,Scene,PointDragger) {
       
    "use strict";
    
    var ParametricCurve = function(xFunction, yFunction, tMin, tMax, segments, lineStyle) {
    	console.log("creating ParametricCurve.");
    	this.xFunction = xFunction;
    	this.yFunction = yFunction;
    	this.tMin = tMin;
    	this.tMax = tMax;
    	this.segments = segments;
//    	console.log("xFunction: " + xFunction);
//    	console.log("yFunction: " + yFunction);
//    	console.log("tMin: " + tMin);
//    	console.log("tMax: " + tMax);
//    	console.log("segments: " + segments);
    	this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };
    };
    
    ParametricCurve.prototype.draw = function(context) {
    	console.log("ParametricCurve.prototype.draw()");
    	var stepLength = (this.tMax - this.tMin) / this.segments;
    	var min = this.tMin;
    	var max = this.tMax;
    	var i;
    	console.log("stepLength: " + stepLength);
    	var points = [];
    	var startPoint = [this.xFunction(min), this.yFunction(min)];
    	console.log("startPoint: " + startPoint);
    	
    	for(i = min; i <= max; i += stepLength) {
    		//console.log("step " + i + ", x: " + this.xFunction(i) + ", y: " + this.yFunction(i));
    		points.push([this.xFunction(i), this.yFunction(i)]);
    		context.beginPath();
    		context.arc(this.xFunction(i), this.yFunction(i), 2, 0, 2 * Math.PI, false),
        	
       	 // set drawing style
           context.lineWidth = this.lineStyle.width;
           context.strokeStyle = this.lineStyle.color;
           
        // actually start drawing
           context.stroke(); 
    	}
	}
    
    ParametricCurve.prototype.isHit = function(context, position) {
    	console.log("ParametricCurve.prototype.isHit()");
    	return false;
	}
    
    ParametricCurve.prototype.createDraggers = function() {
        var draggers = [];
   	 	return draggers;
       
   };
    
    return ParametricCurve;

})); // define