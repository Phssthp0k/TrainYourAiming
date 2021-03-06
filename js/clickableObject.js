class clickableObject_Class
{
	constructor(newName)
	{
		this.name = (newName || "notDefined");
		this.position = { x : 0, y : 0 }; // La posizione deve essere sempre centrale
		this.color = getRandomColor(); // array r g b a
		this.border = { draw : false, width : 0, color : getRandomColor() };
		this._isDestroyed = false;
		
		this.canClip = false;
		this.hitScore = 1;
		
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

	get Name()				{ return this.name;	}
			
	get SpawnTime()			{ return this.timestamp; }
	get Life()				{ return (new Date().getTime() - this.timeStamp); }

	get Position()			{ return this.position; }
	set Position(value)		{ this.position=value; }

	get isDestroyed()		{ return this._isDestroyed; }


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
	IsHit( mousePos ){if(this._isDestroyed ) {	log("Object Destroyed"); } log("notDefined");};

	SetOpacity(opacity)
	{
		this.color = [ this.color[0], this.color[1], this.color[2], opacity ];
	}
	ChangeOpacity(opacity) { SetOpacity(opacity); }

	Destroy()
	{
		this._isDestroyed = true;
	}
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

