'use strict'; // Used for classes

// Var INIT //
var drawing = new drawingClass( "playAreaCanvas" );
drawing.PrintInfos();

var target = new targetClass();
target.name = "mainTarget";
target.SetCircles(3);
target.targetPosition = drawing.canvasCenter;
var objs = [ target ];
drawing.UpdateObjectList( objs );


var scoring = new ScoreClass();