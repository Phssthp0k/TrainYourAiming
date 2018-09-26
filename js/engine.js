var debug = true;
var playing = false;

function guid() 
{
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

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

function getRandomColor() 
{
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class GameTimer
{
	constructor(intervalTime)
	{
		this._intervalTimer;
		this._intervalTime = (intervalTime!==null)?intervalTime:100;
		this._name = "Timer";

	}

	PrintInfos()
	{
		console.log(this._intervalTimer);
		console.log(this._intervalTime);
		console.log(this._name);
	}

	get timer () { return this._intervalTimer;}
	set timer (value) { return this._intervalTimer=value;}
	get name () { return this._name;}

	Start(param)
	{
		if ( param !== null )
		{
			log("Start Timer ["+this._name+"]");
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