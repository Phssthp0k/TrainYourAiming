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

		// this.updateScreenTimer;
		this.objectsList = [];
		this.refreshCount = 0;
		
		this.OnClick_ChildClassesFunctions = []; //[ this ];
		this.OnMouseDown_ChildClassesFunctions = []; //[ this ];
		this.OnMouseUp_ChildClassesFunctions = []; //[ this ];
		this.OnMouseMove_ChildClassesFunctions = []; //[ this ];
		this.OnMouseOut_ChildClassesFunctions = []; //[ this ];

		this.drawingTimer = new GameTimer(1);

		this.LatMouseCoord = {x:0, y:0};

		this.clickMngmnt();
	}

	get Context()	{ return this.drawingCanvas.getContext('2d'); }


	get canvas() { return Canvas; };
	get Canvas()
	{
		return this.drawingCanvas;
	}

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
				if (evt) {caller.LastMouseCoord = GetMousePos( caller.drawingCanvas, evt);}
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

	OnClick(mouseEvents) 		{	log("click");		}
	OnMouseDown(mouseEvents)	{	log("OnMouseDown");	}
	OnMouseUp(mouseEvents)		{	log("OnMouseUp");	}
	OnMouseMove(mouseEvents)	{	log("OnMouseMove");	}
	OnMouseOut(mouseEvents)		{	log("OnMouseOut");	}

	DrawCenterCrossline()
	{
		var x = this.drawingCanvas.width / 2;
		var y = this.drawingCanvas.height / 2;

		// remove aliasing
		x = Math.floor(x) + 0.5;
		y = Math.floor(y) + 0.5;
		this.Context.strokeWidth = 1;

		this.Context.moveTo(x, y - 10);
		this.Context.lineTo(x, y + 10);

		this.Context.moveTo(x - 10,  y);
		this.Context.lineTo(x + 10,  y);

		// Line color
		this.Context.strokeStyle = 'green';
		this.Context.stroke();
  		this.Context.strokeStyle = 'black';
	}

	DrawAimCrossair(coord)
	{
		var x = coord.x;
		var y = coord.y;

		this.Context.strokeWidth = 1;

		this.Context.moveTo(x, y - 10);
		this.Context.lineTo(x, y + 10);

		this.Context.moveTo(x - 10,  y);
		this.Context.lineTo(x + 10,  y);

		// Line color
		this.Context.strokeStyle = 'white';
		this.Context.stroke();
  		this.Context.strokeStyle = 'black';
	}

	UpdateObjectList( oBjectsList ) {this.objectsList = oBjectsList;}


	Resize( ratio ) // in form of [4,3]
	{
		var multFactor = 256;

		var x=ratio[0];
		var y=ratio[1];
		var newWidth = x*multFactor;
		var newHeight = y*multFactor;
		var orizSpace = window.document.body.clientWidth - newWidth;
		var vertSpace = window.document.body.clientHeight - newHeight;

		this.drawingCanvas.style.left = orizSpace /2;
		this.drawingCanvas.style.top = vertSpace /2;

		this.drawingCanvas.width = newWidth;
		this.drawingCanvas.height = newHeight;
	}	

	Show()
	{
		this.drawingCanvas.style.visibility = "visible";
	}
	Hide()
	{
		this.drawingCanvas.style.visibility = "hidden";
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



	StartRefresh() {log("StartRefresh"); this.drawingTimer.Start( () => {this.RefreshScreen()} );}
	StartRefreshScreen() {this.StartRefresh();}
	StopRefresh() {this.drawingTimer.Stop();}
	StopRefreshScreen() {this.StopRefresh();}
	Refresh() {this.Refresh();}
	RefreshScreen()
	{
		var canvas = this.drawingCanvas;
		this.ClearScreen();

		this.DrawCenterCrossline();
		// Non disegnare se fuori dal canvas
		// Non e' preciso, 
		// this.DrawAimCrossair(this.LastMouseCoord);

		if ( this.objectsList.length > 0 )
		{
			// log(this.refreshCount);
			this.refreshCount ++;

			// da rimuovere
			//UpdateAllScore();
			
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
	clrscr() { this.ClearScreen(); }
}




function DrawStartSign( canvas, message ) 
{
	var canvasQuarter = { left: canvas.width / 4, top: canvas.height / 4 };
	var rect = { x : canvasQuarter.left, y : canvasQuarter.top, width : canvasQuarter.left *2, height : canvasQuarter.top *2 };
	DrawString2Canvas( canvas, message, rect, true );
}

function DrawString2Canvas(canvas, message, rect, clearScr)
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

