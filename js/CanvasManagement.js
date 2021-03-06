
// Ciascun layer contiene una lista di oggetti da disegnare
class Layer_Class
{
	constructor(listName)
	{
		this.name = listName || "Not Defined";
		this.objectList = [];
	}

	get List() {return this.objectList;}
	get list() {return this.objectList;}

	set List(value) { this.objectList = value; }
	set list(value) { this.objectList = value; }

	Add(newObject)
	{
		this.objectList[this.objectList.length] = newObject;
	}

	Pop() // Remove Last Element
	{
		this.objectList.Pop();
	}

	Shift() // Remove First Element
	{
		this.objectList.Shift();
	}

	RemoveByName(remName)
	{
		for( var i=0; i < this.objectList.length; i++ )
		{
			if( this.objectList[i].Name.localeCompare(remName) == 0 )
			{
				this.objectList.splice(i,1);
			}
		}
	}

	Update(newList)
	{
		this.objectList = newList;
	}
}


// Instantiate with a container, draws the passed objs
class CanvasManagement_Class
{
	constructor( newDrawingCanvasID )
	{
		if( typeof newDrawingCanvasID !== "string"  )
		{
			alert( "Canvas ID hasn't been correctly passed" );
		}
		this.multFactor = 256; // each square that represents a part of the playng ground
		this.ratio = [ 2, 2 ]; // modificare in oggetto { oriz, vert }
		this._isGraduated = 1;

		this.drawingCanvas = document.getElementById(newDrawingCanvasID);
		//this.hitCanvas = document.createElement('canvas');

		// this.updateScreenTimer;
		this.background_Objects_List = new Layer_Class("BackgroundObjects");
		this.clickable_Objects_List = new Layer_Class("ClickableObjects");
		this.overlay_Objects_List = new Layer_Class("OverlayObjects");

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

	get isGraduated() { return this._isGraduated; }
	set isGraduated(value)	{ this._isGraduated = value; }


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

	// solo per retro compatibilita'. Da rimuovere
	UpdateObjectList( oBjectsList ) {this.clickable_Objects_List.List = oBjectsList;}


	Resize( newRatio ) // in form of [4,3]
	{

		this.ratio = newRatio;

		var x=this.ratio[0];
		var y=this.ratio[1];
		var newWidth = x*this.multFactor;
		var newHeight = y*this.multFactor;
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
		console.log(this.clickableObjectsList);
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
		this.ClearScreen();
		
		var canvas = this.drawingCanvas;
		var COntext = canvas.getContext('2d');

		if( this._isGraduated > 0 )
		{
			var countsX = this.ratio[0];
			var countsY = this.ratio[1];
			var gridLineWidth = 2;

			// ori
			if( countsX > 0 )
			{
				for( var r=1; r < countsX; r++ )
				{
					COntext.beginPath();
					COntext.lineWidth = gridLineWidth;
					COntext.strokeStyle = getColor(colors.red);
					// 
					COntext.moveTo(this.multFactor*r, 0);
					COntext.lineTo(this.multFactor*r, 10);


					COntext.moveTo(this.multFactor*r, this.multFactor*countsY-10);
					COntext.lineTo(this.multFactor*r, this.multFactor*countsY+10);
					
					COntext.stroke();
				}
			}

			// vert
			if( countsY > 0 )
			{
				for( var s=1; s < countsY; s++ )
				{
					COntext.beginPath();
					COntext.lineWidth = gridLineWidth;
					COntext.strokeStyle = getColor(colors.red);
					
					COntext.moveTo(0, this.multFactor*s);
					COntext.lineTo(10, this.multFactor*s);

					COntext.moveTo(this.multFactor*countsX-10, this.multFactor*s);
					COntext.lineTo(this.multFactor*countsX+10, this.multFactor*s);
					
					COntext.stroke();
				}
			}
		}

		this.refreshCount ++;

		// Deve diventare un ciclo su array di layer

		// Draw Background Objectss
		if ( this.background_Objects_List.List.length > 0 )
		{	
			this.background_Objects_List.List.forEach(function(listObj)
			{
				listObj.Draw( canvas );
			});
		}

		// Draw Clickable Objects
		if ( this.clickable_Objects_List.List.length > 0 )
		{	
			this.clickable_Objects_List.List.forEach(function(listObj)
			{
				listObj.Draw( canvas );
			});
		}

		// Draw Overlay Objects (like crossair)
		if ( this.overlay_Objects_List.List.length > 0 )
		{	
			this.overlay_Objects_List.List.forEach(function(listObj)
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

