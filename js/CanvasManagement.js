// Instantiate with a container, draws the passed objs
class CanvasManagement_Class
{
	constructor( newDrawingCanvasID )
	{
		if( typeof newDrawingCanvasID !== "string"  )
		{
			alert( "Canvas ID hasn't been correctly passed" );
		}
		this.drawingCanvas = document.getElementById(newDrawingCanvasID);
		//this.hitCanvas = document.createElement('canvas');

		this.canvasCenter = { x: this.drawingCanvas.width / 2, y: this.drawingCanvas.height / 2 };
		this.updateScreenTimer;
		this.objectsList;
		this.refreshCount = 0;
		this.OnClick_ChildClassesFunctions = []; //[ this ];
		this.OnMouseDown_ChildClassesFunctions = []; //[ this ];
		this.OnMouseUp_ChildClassesFunctions = []; //[ this ];
		this.OnMouseMove_ChildClassesFunctions = []; //[ this ];
		this.OnMouseOut_ChildClassesFunctions = []; //[ this ];

		this.drawingTimer = new GameTimer(1);

		this.clickMngmnt();
	}

	PrintInfos()
	{
		console.log(this.drawingCanvas);
		console.log(this.canvasCenter);
		console.log(this.updateScreenTimer);
		console.log(this.objectsList);
		console.log(this.drawingTimer);
	}

	get Canvas()
	{
		return this.drawingCanvas;
	}

	UpdateObjectList( oBjectsList ) {this.objectsList = oBjectsList;}

	Add_OnMouse_Click_Function( Newfunction ){this.OnClick_ChildClassesFunctions[this.OnClick_ChildClassesFunctions.length] = Newfunction;}
	Add_OnMouse_Down_Function( Newfunction ){this.OnMouseDown_ChildClassesFunctions[this.OnMouseDown_ChildClassesFunctions.length] = Newfunction;}
	Add_OnMouse_Up_Function( Newfunction ){this.OnMouseUp_ChildClassesFunctions[this.OnMouseUp_ChildClassesFunctions.length] = Newfunction;}
	Add_OnMouse_Move_Function( Newfunction ){this.OnMouseMove_ChildClassesFunctions[this.OnMouseMove_ChildClassesFunctions.length] = Newfunction;}
	Add_OnMouse_Out_Function( Newfunction ){this.OnMouseOut_ChildClassesFunctions[this.OnMouseOut_ChildClassesFunctions.length] = Newfunction;}
	clickMngmnt()
	{
		var caller = this;

		var onClickChildFunctions = this.OnClick_ChildClassesFunctions;
		this.drawingCanvas.onclick = (function(evt)
		{
			return function(evt)
			{
				if( onClickChildFunctions.length > 0)
				{
					for( var i = 0; i < onClickChildFunctions.length; i++ )
					{
						onClickChildFunctions[i].OnClick(evt);
					}
				}
			}
		})();

		var onMouseDownChildFunctions = this.OnMouseDown_ChildClassesFunctions;
		this.drawingCanvas.onmousedown = (function(evt)
		{
			return function(evt)
			{
				if( onMouseDownChildFunctions.length > 0)
				{
					for( var i = 0; i < onMouseDownChildFunctions.length; i++ )
					{
						onMouseDownChildFunctions[i].OnMouseDown(evt);
					}
				}
			}
		})();

		var onMouseUpFunctions = this.OnMouseUp_ChildClassesFunctions;
		this.drawingCanvas.onmouseup = (function(evt)
		{
			return function(evt)
			{
				if( onMouseUpFunctions.length > 0)
				{
					for( var i = 0; i < onMouseUpFunctions.length; i++ )
					{
						onMouseUpFunctions[i].OnMouseUp(evt);
					}
				}
			}
		})();

		var onMouseMoveFunctions = this.OnMouseMove_ChildClassesFunctions;
		this.drawingCanvas.onmousemove = (function(evt)
		{
			return function(evt)
			{
				if( onMouseMoveFunctions.length > 0)
				{
					for( var i = 0; i < onMouseMoveFunctions.length; i++ )
					{
						onMouseMoveFunctions[i].OnMouseMove(evt);
					}
				}
			}
		})();

		var onMuseOutFunctions = this.OnMouseOut_ChildClassesFunctions;
		this.drawingCanvas.onmouseout = (function(evt)
		{
			return function(evt)
			{
				if( onMuseOutFunctions.length > 0)
				{
					for( var i = 0; i < onMuseOutFunctions.length; i++ )
					{
						onMuseOutFunctions[i].OnMouseOut(evt);
					}
				}
			}
		})();
	}

	OnClick(mouseEvents) {log("click");}
	OnMouseDown(mouseEvents){log("OnMouseDown");}
	OnMouseUp(mouseEvents){	log("OnMouseUp");}
	OnMouseMove(mouseEvents){	log("OnMouseMove");}
	OnMouseOut(mouseEvents){	log("OnMouseOut");}

	StartRefresh() {log("StartRefresh"); this.drawingTimer.Start( () => {this.RefreshScreen()} );}
	StopRefresh() {this.drawingTimer.Stop();}
	RefreshScreen()
	{
		//log(this.refreshCount);
		this.refreshCount ++;

		// da rimuovere
		//UpdateAllScore();

		var canvas = this.drawingCanvas;
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		this.objectsList.forEach(function(listObj)
		{
			listObj.Draw( canvas );
		});
	}
}

function UpdateAllScore()
{
// Da sistemare
		UpdateScore();
		WriteLifes();
		WriteClickTime();
		WriteAvgClickTime();
		WriteBestClickTime();
}

function UpdateScore(){if( scoring.score >= 0 ) { Write2div("score", scoring.score); }}
function WriteLifes(){if( scoring.lifes >= 0 ) { Write2div("lifes", scoring.lifes); }}
function WriteClickTime(){Write2div("totClickTime", scoring.clicks.lastClickDuration);}
function WriteAvgClickTime(){Write2div("avgClickTime", scoring.clicks.avgClickDuration);}
function WriteBestClickTime(){Write2div("bestClickTime", scoring.clicks.bestClickDuration);}
function Write2div(divID, message)
{
	document.getElementById(divID).innerHTML = message;
}

function DrawStartSign( canvas, message ) 
{
	var canvasQuarter = { left: canvas.width / 4, top: canvas.height / 4 };
	var rect = { x : canvasQuarter.left, y : canvasQuarter.top, width : canvasQuarter.left *2, height : canvasQuarter.top *2 };
	DrawMessage2Canvas( canvas, message, rect, true );
}

function DrawMessage2Canvas(canvas, message, rect, clearScr)
{
	var context = canvas.getContext('2d');

	if( clearScr ) { context.clearRect(0, 0, canvas.width, canvas.height); }

	context.font = '18pt Calibri';
	var gradient=context.createLinearGradient(0,0,rect.width,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	// Fill with gradient
	context.fillStyle=gradient;
	context.textAlign = 'center';
	// context.shadowBlur=20;
	// context.shadowColor="black";
	context.fillText(message, canvas.width/2, canvas.height/2);
}

