/**
 * 
 */
/* requireJS module definition */
define(["util", "vec2", "scene", "point_dragger"], 
       (function(Util,vec2,Scene,PointDragger) {
       
    "use strict";
    
    var ParametricCurve = function(xFunction, yFunction, tMin, tMax, segments, lineStyle) {
    	console.log("creating ParametricCurve.");
    	this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };
    };
    
    ParametricCurve.prototype.draw = function(context) {
    	console.log("ParametricCurve.prototype.draw()");
	}
    
    ParametricCurve.prototype.isHit = function(context, position) {
    	console.log("ParametricCurve.prototype.isHit()");
    	return false;
	}
    
    ParametricCurve.prototype.createDraggers = function() {
        var draggers = [];
        draggers.push(new PointDragger(getCenter, setCenter, draggerStyle));
   	 	return draggers;
       
   };
    
    return ParametricCurve;

})); // define