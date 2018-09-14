class drawingClass
{
	constructor( newDrawingCanvas )
	{
		this.drawingCanvas = newDrawingCanvas;
		this.canvasCenter = { x: this.drawingCanvas.width / 2, y: this.drawingCanvas.height / 2 };
		this.updateScreenTimer;
		this.objectsList;
		this.refreshCount = 0;
	}

	PrintInfos()
	{
		console.log(this.drawingCanvas);
		console.log(this.canvasCenter);
		console.log(this.updateScreenTimer);
		console.log(this.objectsList);
	}

	UpdateObjectList( oBjectsList )
	{
		this.objectsList = oBjectsList;
	}
	
	RefreshScreen()
	{
		this.refreshCount ++;
		
		UpdateScore();
		WriteLifes();
		WriteClickTime();
		WriteAvgClickTime();

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
function WriteAvgClickTime(){Write2div("avgClickTime", scoring.peek);}
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

