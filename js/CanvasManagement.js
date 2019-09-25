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
		// this.updateScreenTimer;
		this.objectsList = [];
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
		console.log("drawingCanvas");
		console.log(this.drawingCanvas);
		console.log("canvasCenter");
		console.log(this.canvasCenter);
		// console.log("updateScreenTimer");
		// console.log(this.updateScreenTimer);
		console.log("objectsList");
		console.log(this.objectsList);
		console.log("drawingTimer");
		console.log(this.drawingTimer);
	}

	get Canvas()
	{
		return this.drawingCanvas;
	}

	UpdateObjectList( oBjectsList ) {this.objectsList = oBjectsList;}

	Remove_OnMouse_Functions()
	{
		log("Remove_OnMouse_Functions");
		this.OnClick_ChildClassesFunctions = [];
		this.OnMouseDown_ChildClassesFunctions = [];
		this.OnMouseUp_ChildClassesFunctions = [];
		this.OnMouseMove_ChildClassesFunctions = [];
		this.OnMouseOut_ChildClassesFunctions = [];
		log("length ["+this.OnClick_ChildClassesFunctions.length+"]");
	}
	Add_OnMouse_Click_Function( Newfunction ){this.OnClick_ChildClassesFunctions[this.OnClick_ChildClassesFunctions.length] = Newfunction;}
	Add_OnMouse_Down_Function( Newfunction ){this.OnMouseDown_ChildClassesFunctions[this.OnMouseDown_ChildClassesFunctions.length] = Newfunction;}
	Add_OnMouse_Up_Function( Newfunction ){this.OnMouseUp_ChildClassesFunctions[this.OnMouseUp_ChildClassesFunctions.length] = Newfunction;}
	Add_OnMouse_Move_Function( Newfunction ){this.OnMouseMove_ChildClassesFunctions[this.OnMouseMove_ChildClassesFunctions.length] = Newfunction;}
	Add_OnMouse_Out_Function( Newfunction ){this.OnMouseOut_ChildClassesFunctions[this.OnMouseOut_ChildClassesFunctions.length] = Newfunction;}
	clickMngmnt()
	{
		var caller = this;

		this.drawingCanvas.onclick = (function(evt)
		{
			return function(evt)
			{
				if( caller.OnClick_ChildClassesFunctions.length > 0)
				{
					for( var i = 0; i < caller.OnClick_ChildClassesFunctions.length; i++ )
					{
						caller.OnClick_ChildClassesFunctions[i].OnClick(evt);
					}
				}
			}
		})();

		this.drawingCanvas.onmousedown = (function(evt)
		{
			return function(evt)
			{
				if( caller.OnMouseDown_ChildClassesFunctions.length > 0)
				{
					for( var i = 0; i < caller.OnMouseDown_ChildClassesFunctions.length; i++ )
					{
						caller.OnMouseDown_ChildClassesFunctions[i].OnMouseDown(evt);
					}
				}
			}
		})();

		this.drawingCanvas.onmouseup = (function(evt)
		{
			return function(evt)
			{
				if( caller.OnMouseUp_ChildClassesFunctions.length > 0)
				{
					for( var i = 0; i < caller.OnMouseUp_ChildClassesFunctions.length; i++ )
					{
						caller.OnMouseUp_ChildClassesFunctions[i].OnMouseUp(evt);
					}
				}
			}
		})();

		this.drawingCanvas.onmousemove = (function(evt)
		{
			return function(evt)
			{
				if( caller.OnMouseMove_ChildClassesFunctions.length > 0)
				{
					for( var i = 0; i < caller.OnMouseMove_ChildClassesFunctions.length; i++ )
					{
						caller.OnMouseMove_ChildClassesFunctions[i].OnMouseMove(evt);
					}
				}
			}
		})();

		this.drawingCanvas.onmouseout = (function(evt)
		{
			return function(evt)
			{
				if( caller.OnMouseOut_ChildClassesFunctions.length > 0)
				{
					for( var i = 0; i < caller.OnMouseOut_ChildClassesFunctions.length; i++ )
					{
						caller.OnMouseOut_ChildClassesFunctions[i].OnMouseOut(evt);
					}
				}
			}
		})();
	}

	OnClick(mouseEvents) 	{	log("click");		}
	OnMouseDown(mouseEvents){	log("OnMouseDown");	}
	OnMouseUp(mouseEvents)	{	log("OnMouseUp");	}
	OnMouseMove(mouseEvents){	log("OnMouseMove");	}
	OnMouseOut(mouseEvents)	{	log("OnMouseOut");	}

	StartRefresh() {log("StartRefresh"); this.drawingTimer.Start( () => {this.RefreshScreen()} );}
	StartRefreshScreen() {this.StartRefresh();}
	StopRefresh() {this.drawingTimer.Stop();}
	StopRefreshScreen() {this.StopRefresh();}
	RefreshScreen()
	{
		if ( this.objectsList.length > 0 )
		{
			// log(this.refreshCount);
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
	ClearScreen()
	{
		var canvas = this.drawingCanvas;
		var context = canvas.getContext('2d');

		// Pulire anche l'array degli oggetti
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
	ClrScr() { this.ClearScreen(); }
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

