class drawingClass
{
	constructor( newDrawingCanvasID )
	{
		log(typeof newDrawingCanvasID);
		if( typeof newDrawingCanvasID !== "string"  )
		{
			alert( "Canvas ID hasn't been correctly passed" );
		}
		this.drawingCanvas = document.getElementById('playAreaCanvas');
		this.canvasCenter = { x: this.drawingCanvas.width / 2, y: this.drawingCanvas.height / 2 };
		this.updateScreenTimer;
		this.objectsList;
		this.refreshCount = 0;

		this.drawingTimer = new GameTimer(1);

		this.drawingCanvas.addEventListener('click', function(evt)
		{
			log("dC click");
		});
	}

	get Canvas()
	{
		return this.drawingCanvas;
	}

	PrintInfos()
	{
		console.log(this.drawingCanvas);
		console.log(this.canvasCenter);
		console.log(this.updateScreenTimer);
		console.log(this.objectsList);
		console.log(this.drawingTimer);
	}

	UpdateObjectList( oBjectsList ) {this.objectsList = oBjectsList;}

	StartRefresh() {log("StartRefresh"); this.drawingTimer.Start( () => {this.RefreshScreen()} );}
	StopRefresh() {this.drawingTimer.Stop();}
	RefreshScreen()
	{
		this.refreshCount ++;
		
		UpdateScore();
		WriteLifes();
		WriteClickTime();
		WriteAvgClickTime();
		WriteBestClickTime();

		var draw2canvas = this.drawingCanvas;
		var context = draw2canvas.getContext('2d');
		context.clearRect(0, 0, draw2canvas.width, draw2canvas.height);

		this.objectsList.forEach(function(listObj)
		{
			listObj.Draw( draw2canvas );
		});
	}
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

