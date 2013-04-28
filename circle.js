/**
 * 
 */
/* requireJS module definition */
define(["util", "vec2", "scene", "point_dragger"], 
       (function(Util,vec2,Scene,PointDragger) {
       
    "use strict";

    /**
	 * A simple circle object that can be dragged around by its center point.
	 * Parameters: - point0 and point1: array objects representing [x,y]
	 * coordinates of start and end point - lineStyle: object defining width and
	 * color attributes for line drawing, begin of the form { width: 2, color:
	 * "#00FF00" }
	 */ 

    var Circle = function(center, radius, lineStyle) {
    	console.log("creating circle. center:[" + center + "], radius:[" + radius + "], lineStyle.width:[" + lineStyle.width + "], lineStyle.color:[" + lineStyle.color + "]");
    	this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };
    	this.center = center || [50,50];
    	this.radius = radius || 35;
    };
    
    Circle.prototype.draw = function(context) {
    	context.beginPath();
    	context.arc(this.center[0], this.center[1], this.radius, 0, 2 * Math.PI, false),
    	
    	 // set drawing style
        context.lineWidth = this.lineStyle.width;
        context.strokeStyle = this.lineStyle.color;
        
     // actually start drawing
        context.stroke(); 
    	
	}
    
    Circle.prototype.isHit = function(context, position) {
    	var deltaX = this.center[0] - position[0];
    	var deltaY = this.center[1] - position[1];
    
    	var distance = Math.sqrt( (deltaX * deltaX) + (deltaY * deltaY) );
    	var tolerance = 5;
    	var hit = distance > (this.radius - tolerance) && distance < (this.radius + tolerance);
    	if(hit) {
    		console.log("circle hit: [" + position + "]");
    	}
    	return hit;
	}
    
    Circle.prototype.createDraggers = function() {
    	 var draggerStyle = { radius:4, color: this.lineStyle.color, width:0, fill:true }
         var draggers = [];
    	// create closure and callbacks for dragger    	 
    	 var _circle = this;
    	 /*
    	  * position dragging
    	  */
    	 var getCenter = function() { return _circle.center; };
    	 var setCenter = function(dragEvent) {_circle.center = dragEvent.position };
    	 
    	 /*
    	  * radius dragging
    	  */
    	 var getRadiusPoint1 = function() { return [(_circle.center[0] + _circle.radius), _circle.center[1]]; };
         var setRadius = function(dragEvent) { _circle.radius = Math.abs(dragEvent.position[0] - _circle.center[0]);};
    	
    	 draggers.push(new PointDragger(getCenter, setCenter, draggerStyle));
    	 draggers.push(new PointDragger(getRadiusPoint1, setRadius, draggerStyle));
    	 
    	 return draggers;
        
    };

   
    return Circle;

})); // define

    
