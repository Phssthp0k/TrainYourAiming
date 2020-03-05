var debug = true;
var playing = false;

function guid() 
{
	function s4() 
	{
		return Math.floor((1 + Math.random()) * 0x10000)
		  .toString(16)
		  .substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function name()
{
	function s4() 
	{
		return Math.floor((1 + Math.random()) * 0x10000)
	    	.toString(16)
	    	.substring(1);
	}
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

function PadLeft( nr, n, str )
{
	return Array(n-String(nr).length+1).join(str||'0')+nr;
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

function elem(htmlID)
{
	return document.getElementById(htmlID);
}


class GameTimer
{
	constructor(intervalTime, timerName)
	{
		this._intervalTimer;
		this._intervalTiming = (intervalTime!==null)?intervalTime:100;
		this._name = (timerName!==null)?timerName:"Timer";
	}

	PrintInfos()
	{
		console.log(this._intervalTimer);
		console.log(this._intervalTiming);
		console.log(this._name);
	}

	get timer () { return this._intervalTimer;}
	set timer (value) { return this._intervalTimer=value;}

	get timing () { return this._intervalTiming;}
	set timing (value) { return this._intervalTiming=value;}

	get name () { return this._name;}

	Start(functy)
	{
		if ( functy !== null )
		{
			this._intervalTimer = setInterval(functy,  this._intervalTiming);	
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

function Distance( coord1, coord2 )
{
	return math.square( math.pow(coord2.x-coord1.x, 2) + math.pow(coord2.y-coord1.y, 2) );
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

function Random(top, bottom) { RandomNumber(top, bottom); }
function RandomNumber(top, bottom)
{
	var below = bottom || 0;
	var floor = Math.floor, randomize = Math.random;    
    return floor(randomize()*top) + below;
}

function getRandomColorOpacity(opacity) 
{
    var s = 255;    
    return [ Random(s), Random(s), Random(s), opacity ];
    
}
function getRandomColor()
{
	return getRandomColorOpacity(1);
}

function getColorFromArray(color)
{
	if( Array.isArray(color) )
	{
		return 'rgba('+ color.join(',') +')';;
	}
	else
	{
		return color;
	}
}
function getColor(color)
{
	return getColorFromArray(color);
}
function getHTMLcolor(color)
{
	return  getColorFromArray(color);
}

function getOpacity(color)
{
	return color[3];
}

function colorToArray(color)
{
	// From object

	// expect { r: xxx, g: yyy, b: zzz, a: ttt }
	// return [ color.r, color.g, color.b, color.a ]

	// Rimane con array in quanto piu' semplice ora
}

var colors = 
{
	aliceblue				: [ 240, 248, 255, 1 ],
	antiquewhite			: [ 250, 235, 215, 1 ],
	aqua					: [ 0, 255, 255, 1 ],
	aquamarine				: [ 127, 255, 212, 1 ],
	azure					: [ 240, 255, 255, 1 ],
	beige					: [ 245, 245, 220, 1 ],
	bisque					: [ 255, 228, 196, 1 ],	
	black					: [ 0, 0, 0, 1 ],
	blanchedalmond			: [ 255, 235, 205, 1 ],
	blu						: [ 0, 0, 255, 1 ],
	blue					: [ 0, 0, 255, 1 ],
	blueviolet				: [ 138, 43, 226, 1 ],
	brown					: [ 165, 42, 42, 1 ],
	burlywood				: [ 222, 184, 135, 1 ],
	cadetblue				: [ 95, 158, 160, 1 ],
	chartreuse				: [ 127, 255, 0, 1 ],
	chocolate				: [ 210, 105, 30, 1 ],
	coral					: [ 255, 127, 80, 1 ],
	cornflowerblue			: [ 100, 149, 237, 1 ],
	cornsilk				: [ 255, 248, 220, 1 ],
	crimson					: [ 220, 20, 60, 1 ],
	cyan					: [ 0, 255, 255, 1 ],
	darkblue				: [ 0, 0, 139, 1 ],
	darkcyan				: [ 0, 139, 139, 1 ],
	darkgoldenrod			: [ 184, 134, 11, 1 ],
	darkgray				: [ 169, 169, 169, 1 ],
	darkgreen				: [ 0, 100, 0, 1 ],
	darkgrey				: [ 169, 169, 169, 1 ],
	darkkhaki				: [ 189, 183, 107, 1 ],
	darkmagenta				: [ 139, 0, 139, 1 ],
	darkolivegreen			: [ 85, 107, 47, 1 ],
	darkorange				: [ 255, 140, 0, 1 ],
	darkorchid				: [ 153, 50, 204, 1 ],
	darkred					: [ 139, 0, 0, 1 ],
	darksalmon				: [ 233, 150, 122, 1 ],
	darkseagreen			: [ 143, 188, 143, 1 ],
	darkslateblue			: [ 72, 61, 139, 1 ],
	darkslategray			: [ 47, 79, 79, 1 ],
	darkturquoise			: [ 0, 206, 209, 1 ],
	darkviolet				: [ 148, 0, 211, 1 ],
	deeppink				: [ 255, 20, 147, 1 ],
	deepskyblue				: [ 0, 191, 255, 1 ],
	dimgray					: [ 105, 105, 105, 1 ],
	dimgrey					: [ 105, 105, 105, 1 ],
	dodgerblue				: [ 30, 144, 255, 1 ],
	firebrick				: [ 178, 34, 34, 1 ],
	floralwhite				: [ 255, 250, 240, 1 ],
	forestgreen				: [ 34, 139, 34, 1 ],
	fuchsia					: [ 255, 0, 255, 1 ],
	gainsboro				: [ 220, 220, 220, 1 ],
	ghostwhite				: [ 248, 248, 255, 1 ],
	gold					: [ 255, 215, 0, 1 ],
	goldenrod				: [ 218, 165, 32, 1 ],
	gray					: [ 128, 128, 128, 1 ],
	green					: [ 0, 128, 0, 1 ],
	greenyellow				: [ 173, 255, 47, 1 ],
	grey					: [ 128, 128, 128, 1 ],
	honeydew				: [ 240, 255, 240, 1 ],
	hotpink					: [ 255, 105, 180, 1 ],
	indianred				: [ 205, 92, 92, 1 ],
	indigo					: [ 75, 0, 130, 1 ],
	ivory					: [ 255, 255, 240, 1 ],
	khaki					: [ 240, 230, 140, 1 ],
	lavender				: [ 230, 230, 250, 1 ],
	lavenderblush			: [ 255, 240, 245, 1 ],
	lawngreen				: [ 124, 252, 0, 1 ],
	lemonchiffon			: [ 255, 250, 205, 1 ],
	lightblue				: [ 173, 216, 230, 1 ],
	lightcoral				: [ 240, 128, 128, 1 ],
	lightcyan				: [ 224, 255, 255, 1 ],
	lightgoldenrodyellow	: [ 250, 250, 210, 1 ],
	lightgray				: [ 211, 211, 211, 1 ],
	lightgreen				: [ 144, 238, 144, 1 ],
	lightgrey				: [ 211, 211, 211, 1 ],
	lightpink				: [ 255, 182, 193, 1 ],
	lightsalmon				: [ 255, 160, 122, 1 ],
	lightseagreen			: [ 32, 178, 170, 1 ],
	lightskyblue			: [ 135, 206, 250, 1 ],
	lightslategray			: [ 119, 136, 153, 1 ],
	lightsteelblue			: [ 176, 196, 222, 1 ],
	lightyellow				: [ 255, 255, 224, 1 ],
	lime					: [ 0, 255, 0, 1 ],
	limegreen				: [ 50, 205, 50, 1 ],
	linen					: [ 250, 240, 230, 1 ],
	magenta 				: [ 255, 0, 255, 1 ],
	maroon					: [ 128, 0, 0, 1 ],
	mediumaquamarine		: [ 102, 205, 170, 1 ],
	mediumblue				: [ 0, 0, 205, 1 ],
	mediumorchid			: [ 186, 85, 211, 1 ],
	mediumpurple			: [ 147, 112, 219, 1 ],
	mediumseagreen			: [ 60, 179, 113, 1 ],
	mediumslateblue			: [ 123, 104, 238, 1 ],
	mediumspringgreen		: [ 0, 250, 154, 1 ],
	mediumturquoise			: [ 72, 209, 204, 1 ],
	mediumvioletred			: [ 199, 21, 133, 1 ],
	midnightblue			: [ 25, 25, 112, 1 ],
	mintcream				: [ 245, 255, 250, 1 ],
	mistyrose				: [ 255, 228, 225, 1 ],
	moccasin				: [ 255, 228, 181, 1 ],
	navajowhite				: [ 255, 222, 173, 1 ],
	navy					: [ 0, 0, 128, 1 ],
	oldlace					: [ 253, 245, 230, 1 ],
	olive					: [ 128, 128, 0, 1 ],
	olivedrab				: [ 107, 142, 35, 1 ],
	orange					: [ 255, 165, 0, 1 ],
	orangered				: [ 255, 69, 0, 1 ],
	orchid					: [ 218, 112, 214, 1 ],
	palegoldenrod			: [ 238, 232, 170, 1 ],
	palegreen				: [ 152, 251, 152, 1 ],
	paleturquoise			: [ 175, 238, 238, 1 ],
	palevioletred			: [ 219, 112, 147, 1 ],
	papayawhip				: [ 255, 239, 213, 1 ],
	peachpuff				: [ 255, 218, 185, 1 ],
	peru					: [ 205, 133, 63, 1 ],
	pink					: [ 255, 192, 203, 1 ],
	plum					: [ 221, 160, 221, 1 ],
	powderblue				: [ 176, 224, 230, 1 ],
	purple					: [ 128, 0, 128, 1 ],
	red						: [ 255, 0, 0, 1 ],
	rogue 					: [ 220, 20, 60, 1 ], //"#DC143C"
	rosybrown				: [ 188, 143, 143, 1 ],
	royalblue				: [ 65, 105, 225, 1 ],
	saddlebrown				: [ 139, 69, 19, 1 ],
	salmon					: [ 250, 128, 114, 1 ],
	sandybrown				: [ 244, 164, 96, 1 ],
	seagreen				: [ 46, 139, 87, 1 ],
	seashell				: [ 255, 245, 238, 1 ],
	sienna					: [ 160, 82, 45, 1 ],
	silver					: [ 192, 192, 192, 1 ],
	skyblue					: [ 135, 206, 235, 1 ],
	slateblue				: [ 106, 90, 205, 1 ],
	slategray				: [ 112, 128, 144, 1 ],
	snow					: [ 255, 250, 250, 1 ],
	springgreen				: [ 0, 255, 127, 1 ],
	steelblue				: [ 70, 130, 180, 1 ],
	tan						: [ 210, 180, 140, 1 ],
	teal					: [ 0, 128, 128, 1 ],
	thistle					: [ 216, 191, 216, 1 ],
	tomato					: [ 255, 99, 71, 1 ],
	turquoise				: [ 64, 224, 208, 1 ],
	violet					: [ 238, 130, 238, 1 ],
	wheat					: [ 245, 222, 179, 1 ],
	white					: [ 255, 255, 255, 1 ],
	whitesmoke				: [ 245, 245, 245, 1 ],
	yellow					: [ 255, 255, 0, 1 ],
	yellowgreen				: [ 154, 205, 50, 1 ]
}