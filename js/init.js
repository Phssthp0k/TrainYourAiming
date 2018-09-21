// Var INIT //
var drawing = new CanvasManagement_Class( "playCanvas" );
drawing.PrintInfos();

var target = new Target_Class();
target.name = "mainTarget";
target.SetCircles(3);
target.targetPosition = drawing.canvasCenter;

drawing.UpdateObjectList( [target ] );


var scoring = new ScoreClass();