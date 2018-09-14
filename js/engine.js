var debug = true;
var playing = false;
var test = false;

var GameClock;
function StartGamecloCk(){ GameClock = setInterval(Tick, 1);}
function StopGameClock()	{ clearInterval(GameClock);	}	
function Tick()
{
	
	drawing.RefreshScreen();
}


function log(message) { Log(message); }
function Log(message)
{
	if(debug) {console.log(message)};
}


function GetMousePos(canvas, evt)
{
	var rect = canvas.getBoundingClientRect();
		return {
		  x: evt.clientX - rect.left,
		  y: evt.clientY - rect.top
		};
}

function BoardPreparation( canvas )
{
	Log( "BoardPrep" );	
	StopGameClock();
	playing = false;
	Reset();
	drawing.RefreshScreen();
	DrawStartSign(playCanvas, "Press to START!");
}

function Reset()
{
	ResetScore();
}

function Start()
{
	Log( "Start" );
	playing = true;
	// drawing.PrintInfos();
	StartGamecloCk();
}