class clickableObject_Class
{
	constructor(newName)
	{
		this.name = (newName || "notDefined");
		this.position = { x : 0, y : 0 }; // La posizione deve essere sempre centrale
		this.canClip = false;
		this.border = { width : 1, color : getRandomColor() };
		this.hitScore = 1;
		this.color = getRandomColor(); // array r g b a
		
		this.timestamp = new Date().getTime();

		// Dev
		this.animations =
		{
			father : this,
			// animationTimer : new GameTimer(1, "CO timer"),  // Da implementare
			activeList : [ ],
			RotateLeft(canvas, angle )
			{

			},
			StartRotate(canvas, angle) 
			{
				// se angle negativo, spin a sx, se poisitivo a dx.
			},
			StopRotate() {},
			Rotate(canvas, angle, speedMs) 
			{
				var COntext = canvas.getContext('2d');
				COntext.clearRect(0, 0, canvas.Width, canvas.Height);
				
				COntext.save();
				COntext.translate(this.position.x+(this.width/2), this.position.y+(this.height/2));
				COntext.rotate(angle*Math.PI / 180);
		    	COntext.translate(-this.position.x-(this.width/2), -this.position.y-(this.height/2));
			},
			// Fade IN e fade OUT
			fadeTimer : new GameTimer(100, "FadeTimer"),
			FadeIn(timeToFade) 
			{
				this.fadeTimer.Stop(); // Blocco se stavo gia' facendo un fade
				this.fadeTimer.timing = timeToFade;
				// this.timer.Start( () => {this._fadeIn()} );	non deve chiamare la funzione ma la funzione deve essere aggiunta all'elenco. 
				// Verra' chiamato un metodo comune che esegue tutte le trasformazioni
				this.fadeTimer.Start( () => {this._fadeIn()} );	
			},
			_fadeIn()
			{
				if( getOpacity(this.father.color) >= 1 )
				{
					this.fadeTimer.Stop();
				}
				else
				{
					this.father.color[3] += 0.1;
				}
			},			
			FadeOut(timeToFade) 
			{
				this.fadeTimer.Stop(); // Blocco se stavo gia' facendo un fade
				this.fadeTimer.timing = timeToFade;
				this.fadeTimer.Start( () => {this._fadeOut()} );	
			},
			_fadeOut()
			{
				if( getOpacity(this.father.color) <= 0 )
				{
					this.fadeTimer.Stop();
				}
				else
				{
					this.father.color[3] -= 0.1;
				}
			},
		}
	} // FINE COSTRUTTORE
			
	get SpawnTime()	{ return this.timestamp; }
	get Life()	{ return (new Date().getTime() - this.timeStamp); }

	get Position()	{ return this.position; }
	set Position(value)	{ this.position=value; }

	Animate()
	{
		var animationList = this.animations.list.active;	
		log (animationList.length);
		for ( var i=0; i<animationList.length; i++ )
		{
			log(animationList[i]);
			animationList[i]();
		}
	}
	Draw( canvas, newPosition ){log("Draw function() is notDefined");};
	Refresh( canvas )
	{
		log('refresh');
		this.Draw( canvas );
	}
	
	OnClick( canvas, newPosition ){log("notDefined");};
	IsHit( mousePos ){log("notDefined");};

	SetOpacity(opacity)
	{
		this.color = [ this.color[0], this.color[1], this.color[2], opacity ];
	}
	ChangeOpacity(opacity) { SetOpacity(opacity); }
}

class drawable_ObjectsList_Class
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

	Update(newList)
	{
		this.objectList = newList;
	}
}
















class CrossAir_Class extends clickableObject_Class
{
	constructor ( newName, newColor, newPosition )	
	{
		super(newName);

		this.color = newColor;
		this.position = newPosition
	}

	Draw( canvas, newPosition )
	{
		this.COntext = canvas.getContext('2d');

		this.position = newPosition || this.position;
		this.strokeColor = this.color;
		this.coord = this.position;


		// log("drawing crossair @ ["+coord.x+"]["+coord.y+"], color ["+strokeColor+"]");
		this.x = this.coord.x;
		this.y = this.coord.y;

		this.COntext.lineWidth = 1;
		this.COntext.strokeStyle = this.strokeColor;
		this.COntext.moveTo(this.x, this.y - 10);
		this.COntext.lineTo(this.x, this.y + 10);
		this.COntext.moveTo(this.x - 10,  this.y);
		this.COntext.lineTo(this.x + 10,  this.y);
		this.COntext.stroke();
	}
}

class Text_Class extends clickableObject_Class
{

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

