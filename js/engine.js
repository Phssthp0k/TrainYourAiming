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



function hexToRgbAOpacity(hex, opacity)
{
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex))
    {
        c= hex.substring(1).split('');
        if(c.length== 3)
        {
        	c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
    }
    throw new Error('Bad Hex');
}
function hexToRgbA(hex) {	return hexToRgbAOpacity(hex, 1);}

function getRandomColorOpacity(opacity) 
{
    var floor = Math.floor, random = Math.random, s = 255;    
    return [ floor(random()*s), floor(random()*s), floor(random()*s), opacity ];
    
}
function getRandomColor()
{
	return getRandomColorOpacity(1);
}

function getColorFromArray(color)
{
	return 'rgba('+ color.join(',') +')';;
}
function getColor(color)
{
	return getColorFromArray(color);
}
function getOpacity(color)
{
	return color[3];
}

var colors = 
{
	red  : [ 255, 0, 0, 1 ],
	green  : [ 0, 255, 0, 1 ],
	blu  : [ 0, 0, 255, 1 ],
	blue  : [ 0, 0, 255, 1 ],
	rogue : [220, 20, 60, 1] //"#DC143C"
}



class GameTimer
{
	constructor(intervalTime, timerName)
	{
		this._intervalTimer;
		this._intervalTime = (intervalTime!==null)?intervalTime:100;
		this._name = (timerName!==null)?timerName:"Timer";

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

	Start(functy)
	{
		if ( functy !== null )
		{
			this._intervalTimer = setInterval(functy,  this._intervalTime);	
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