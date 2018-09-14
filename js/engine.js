var debug = true;
var playing = false;

function echo(messate) { Log(message); }
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
	StartGameClock(drawing.Tack);
}


var GameClock;
var GameClockSpeed = 100;
function StartGameClock(GameClockFunc){ GameClock = setInterval(Tick, GameClockSpeed, GameClockFunc);}
function StopGameClock()	{ clearInterval(GameClock);	}	
function Tick(func)
{
	//drawing.RefreshScreen();
	func();
}

class GameTimer
{
	constructor(intervalTime)
	{
		this._intervalTimer
		this._intervalTime = (intervalTime!==null)?intervalTime:100;
		this._name = "Timer";

	}
		get timer1 () { return this._intervalTimer;}
		set timer1 (vara) { return this._intervalTimer=vara;}
		get name () { return this._name;}


		Start(param)
		{
			
			if ( param !== null )
			{
				this._intervalTimer = setInterval(param,  this._intervalTime);
			}
			else
			{
				log("GameTimer.Tick(): Nothing to execute");
			}
		}

		Stop()
		{
			clearInterval(this._intervalTimer);
		}
}


class test
{
	constructor()
	{
		this.fuffa = new GameTimer(500);
	}

	puppa()
	{
		this.fuffa.Start(this.pelo);
	}

	pelo()
	{
		log("noni");
	}	
}