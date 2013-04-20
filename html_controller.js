/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de 
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */

 
/* requireJS module definition */
define(["jquery", "straight_line", "circle", "parametric_curve"], 
       (function($, StraightLine, Circle, ParametricCurve) {

    "use strict"; 
                
    /*
	 * define callback functions to react to changes in the HTML page and
	 * provide them with a closure defining context and scene
	 */
    var HtmlController = function(context,scene,sceneController) {
    
    	var selectedObject = null;
    
        // generate random X coordinate within the canvas
        var randomX = function() { 
            return Math.floor(Math.random()*(context.canvas.width-10))+5; 
        };
            
        // generate random Y coordinate within the canvas
        var randomY = function() { 
            return Math.floor(Math.random()*(context.canvas.height-10))+5; 
        };
        
        var randomRadius = function() {
        	var minRadius = 20;
			var radius = Math.floor(Math.random() * (context.canvas.height / 2)) + 1;
			console.log("Calculated random radius: " + radius);
			return radius < minRadius ? minRadius : radius;
		}
            
        // generate random color in hex notation
        var randomColor = function() {

            // convert a byte (0...255) to a 2-digit hex string
            var toHex2 = function(byte) {
                var s = byte.toString(16); // convert to hex string
                if(s.length == 1) s = "0"+s; // pad with leading 0
                return s;
            };
                
            var r = Math.floor(Math.random()*25.9)*10;
            var g = Math.floor(Math.random()*25.9)*10;
            var b = Math.floor(Math.random()*25.9)*10;
                
            // convert to hex notation
            return "#"+toHex2(r)+toHex2(g)+toHex2(b);
        };
        
        
        editArea.hide();
        var selectCallback = function(obj) {
        	console.log("Invoking select callback");
        	selectedObject = obj;
			var color = obj.lineStyle.color;
			var stroke_width = obj.lineStyle.width;
			$("#stroke_color").attr("value", color);
			$("#stroke_width").attr("value", stroke_width);
			var isCircle = obj instanceof Circle;
			var isParametricCurve = obj instanceof ParametricCurve;
			if(isCircle) {
				console.log("selected object is circle");
				var radius = obj.radius;
				console.log("Is circle: [" + isCircle + "], radius: [" + radius +"]");
				$("#radiusSection").show();
				$("#radius").attr("value", radius);
				$("#curveSection").hide();
			}
			else if(isParametricCurve) {
				console.log("selected object is parametric curve");
				$("#radiusSection").hide();
				$("#curveSection").show();
			}
			else {
				console.log("selected object is straight line");
				$("#radiusSection").hide();
				$("#curveSection").hide();
			}
		};
		
        sceneController.onSelection(selectCallback);
        
        $("#stroke_color").change(function() {
        	var newColorValue = $("#stroke_color").attr("value");
			console.log("new color value: [" +  newColorValue + "]");
			if(selectedObject != null) {
				selectedObject.lineStyle.color = newColorValue;
				sceneController.select(selectedObject);
			}
		});
        
        $("#stroke_width").change(function() {
        	var newStrokeValue = $("#stroke_width").attr("value");
			console.log("new stroke value: [" +  newStrokeValue + "]");
			if(selectedObject != null) {
				selectedObject.lineStyle.width = newStrokeValue;
				sceneController.select(selectedObject);
			}
		});
        
        $("#radius").change(function() {
        	var newRadiusValue = $("#radius").attr("value");
			console.log("new radius value: [" +  newRadiusValue + "]");
			if(selectedObject != null) {
				selectedObject.radius = newRadiusValue;
				sceneController.select(selectedObject);
			}
			
		});
        
        
        
        /*
		 * event handler for "new line button".
		 */
        $("#btnNewLine").click( (function() {
        
            // create the actual line and add it to the scene
        	
        	 var style = { 
                     width: Math.floor(Math.random()*3)+1,
                     color: randomColor()
                 };
                          
            var line = new StraightLine( [randomX(),randomY()], 
                                         [randomX(),randomY()], 
                                         style );
            scene.addObjects([line]);

            // deselect all objects, then select the newly created object
            sceneController.deselect();
            sceneController.select(line); // this will also redraw
            $("#editArea").show();
                        
        }));
        
        /*
		 * event handler for "new line button".
		 */
        $("#btnNewCircle").click( (function() {
        
            // create the actual line and add it to the scene
        	
        	 var style = { 
                     width: Math.floor(Math.random()*3)+1,
                     color: randomColor()
                 };
            
            var radius = randomRadius();
            var circle = new Circle([randomX(), randomY()], 
            		radius, style);
            scene.addObjects([circle]);

            // deselect all objects, then select the newly created object
            sceneController.deselect();
            sceneController.select(circle); // this will also redraw
            $("#editArea").show();         
        }));
        
        $("#btnNewParametricCurve").click( (function() {
            
            // create the actual line and add it to the scene
        	
        	 var style = { 
                     width: Math.floor(Math.random()*3)+1,
                     color: randomColor()
                 };
        	var paramCurve = new ParametricCurve(null, null, 1, 10, 15, style);
            $("#editArea").show();         
        }));
        
        
    
    };

    // return the constructor function
    return HtmlController;


})); // require



            
