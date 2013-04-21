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
define([ "jquery", "straight_line", "circle", "parametric_curve" ],
		(function($, StraightLine, Circle, ParametricCurve) {

			"use strict";
			/*
			 * define callback functions to react to changes in the HTML page
			 * and provide them with a closure defining context and scene
			 */
			var HtmlController = function(context, scene, sceneController) {

				// generate random X coordinate within the canvas
				var randomX = function() { return Math.floor(Math.random() * (context.canvas.width - 10)) + 5; };

				// generate random Y coordinate within the canvas
				var randomY = function() { return Math.floor(Math.random() * (context.canvas.height - 10)) + 5; };

				// generate random radius within the canvas with a minimal radius
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
						if (s.length == 1)
							s = "0" + s; // pad with leading 0
						return s;
					};
					var r = Math.floor(Math.random() * 25.9) * 10;
					var g = Math.floor(Math.random() * 25.9) * 10;
					var b = Math.floor(Math.random() * 25.9) * 10;

					// convert to hex notation
					return "#" + toHex2(r) + toHex2(g) + toHex2(b);
				};
				
				$("#commonSection").hide();
				$("#radiusSection").hide();
				$("#curveSection").hide();
				
				/*
				 * callback when object is selected
				 */
				var onSelectionCallback = function() {
					console.log("Invoking onSelectCallback");
					var selectedObject = sceneController.getSelectedObject();
					
					$("#commonSection").show();
					$("#stroke_width").attr("value", selectedObject.lineStyle.width);
					$("#stroke_color").attr("value", selectedObject.lineStyle.color);
					
					/*
					 * display elements for straight line
					 */
					var buildLineSection = function() {
						$("#radiusSection").hide();
						$("#curveSection").hide();
					}
					
					/*
					 * display elements for circle
					 */
					var buildCircleSection = function() {
						$("#radiusSection").show();
						$("#curveSection").hide();
						$("#radius").attr("value", selectedObject.radius);
						
					};
					
					/*
					 * display elements for parametric curve
					 */
					var buildCurveSection = function() {
						$("#radiusSection").hide();
						$("#curveSection").show();
						var f_FuncString = selectedObject.f_Function.toString();
						var g_FuncString = selectedObject.g_Function.toString();
						console.log("f(t): " + f_FuncString);
						console.log("g(t): " + g_FuncString);

						$("#xFunction").attr("value", selectedObject.xFunction);
						$("#yFunction").attr("value", selectedObject.yFunction);
						$("#tMin").attr("value", selectedObject.tMin);
						$("#tMax").attr("value", selectedObject.tMax);
						$("#segments").attr("value", selectedObject.segments);
					};
					
					/*
					 * check object type
					 */
					if(selectedObject instanceof StraightLine) {
						console.log("StraightLine selected ");
						buildLineSection();
					}
					else if(selectedObject instanceof Circle) {
						console.log("Circle selected ");
						buildCircleSection();
					}
					else if(selectedObject instanceof ParametricCurve) {
						console.log("ParametricCurve selected ");
						buildCurveSection();
						
					}
					else {
						throw new Error(
								"Unknown obj type. Cannot display ui elements")
					}
				};
				sceneController.onSelection(onSelectionCallback);

				/*
				 * UI elements
				 */

//				$("#stroke_color").change(function() {
//					var selectedObject = sceneController.getSelectedObject();
//					var newColorValue = $("#stroke_color").attr("value");
//					console.log("new color value: [" + newColorValue + "]");
//					selectedObject.lineStyle.color = newColorValue;
//					sceneController.select(selectedObject);
//					}
//				});
//
//				$("#stroke_width").change(function() {
//					var newStrokeValue = $("#stroke_width").attr("value");
//					console.log("new stroke value: [" + newStrokeValue + "]");
//					if (selectedObject != null) {
//						selectedObject.lineStyle.width = newStrokeValue;
//						sceneController.select(selectedObject);
//					}
//				});
//
//				$("#radius").change(function() {
//					var newRadiusValue = $("#radius").attr("value");
//					console.log("new radius value: [" + newRadiusValue + "]");
//					if (selectedObject != null) {
//						selectedObject.radius = newRadiusValue;
//						sceneController.select(selectedObject);
//					}
//
//				});

				/*
				 * event handler for "new line button".
				 */
				$("#btnNewLine").click(
						(function() {
							// create the actual line and add it to the scene
							var style = {
								width : Math.floor(Math.random() * 3) + 1,
								color : randomColor()
							};

							var line = new StraightLine(
									[ randomX(), randomY() ], [ randomX(),
											randomY() ], style);
							scene.addObjects([ line ]);

							// deselect all objects, then select the newly
							// created object
							sceneController.deselect();
							sceneController.select(line); // this will also
															// redraw
						}));

				/*
				 * event handler for "new line button".
				 */
				$("#btnNewCircle").click(
						(function() {

							// create the actual line and add it to the scene

							var style = {
								width : Math.floor(Math.random() * 3) + 1,
								color : randomColor()
							};

							var radius = randomRadius();
							var circle = new Circle([ randomX(), randomY() ],
									radius, style);
							scene.addObjects([ circle ]);

							// deselect all objects, then select the newly
							// created object
							sceneController.deselect();
							sceneController.select(circle); // this will also
															// redraw
						}));

				$("#btnNewParametricCurve").click(
						(function() {							
							//initial values
							var style = {
									width : Math.floor(Math.random() * 3) + 1,
									color : randomColor()
								};
							
							/*
							 * Initial values for curve
							 */
//							var f_Function = function() { return return 350 + 100 * Math.sin(t); };
//							var g_Function = function() { return return 150 + 100 * Math.cos(t); };
//							var tMin = 0;
//							var tMax = 2 * Math.PI;
//							var segments = 20;
							
							var paramCurve = new ParametricCurve(style);
							scene.addObjects([ paramCurve ]);
							sceneController.deselect();
							sceneController.select(paramCurve);							
						}));
			};

			// return the constructor function
			return HtmlController;

		})); // require

