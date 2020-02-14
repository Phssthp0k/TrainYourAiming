class clickableObject_Class
{
	constructor(newName)
	{
		this.name = (newName || "notDefine");
		this.position = { x : 0, y : 0 };
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

// -----------------------------------------------------------------
class Rectangle_Class extends clickableObject_Class
{
	constructor(newName, width, height )	
	{
		super(newName);

		this.width = width;
		this.height = height;
	}

	Draw( canvas, newPosition )
	{
		this.position = newPosition || this.position;
		var COntext = canvas.getContext('2d');

		if (!this.canClip)
		{
			if(this.position.x > canvas.width-this.width) { this.position.x = canvas.width-this.width; }
			if(this.position.x <= 0) { this.position.x = 0 }

			if(this.position.y > canvas.height-this.height) { this.position.y = canvas.height-this.height; }
			if(this.position.y <= 0) { this.position.y = 0 }
		}

		COntext.beginPath();
		COntext.fillStyle = getColor(this.color);
		COntext.fillRect(this.position.x, this.position.y, this.width, this.height);
		COntext.lineWidth = this.borderWidth;
		COntext.strokeStyle = this.borderColor;
		COntext.stroke();
	}

	IsHit( mousePos )
	{
		return ( mousePos.x > this.position.x && mousePos.x < (this.position.x+this.width) && mousePos.y > this.position.y && mousePos.y < (this.position.y+this.height) )?this.hitScore:0;
	}
}

// -----------------------------------------------------------------
class Square_Class extends Rectangle_Class
{
	constructor ( newName, newSide )	
	{
		super(newName, newSide, newSide);
		this.side = newSide;
	}
}

// -----------------------------------------------------------------
class Circle_Class extends clickableObject_Class
{
	constructor ( newName )	
	{
		super(newName);
		this.radius = 50;

		this.Animations = [];
		this.circleTimer = new GameTimer(500);
	}

	Draw( canvas, newPosition )
	{
		this.position = newPosition || this.position;
		var COntext = canvas.getContext('2d');

		if (!this.canClip)
		{
			if(this.position.x < (this.radius)) { this.position.x = this.radius; }
			if(this.position.x > canvas.width-(this.radius)) { this.position.x = canvas.width-this.radius; }
			if(this.position.y < (this.radius)) { this.position.y = this.radius; }
			if(this.position.y > canvas.height-(this.radius)) { this.position.y = canvas.height-this.radius; }
		}

		COntext.beginPath();
		COntext.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
		COntext.fillStyle = getColor(this.color);
		COntext.fill();
		COntext.lineWidth = this.borderWidth;
		COntext.strokeStyle = this.borderColor;
		COntext.stroke();
	
	};

	StartAnimation()
	{
		this.circleTimer.Start( () => {this.Animation()} );
	}

	Animation()
	{
		if( this.Animations.length > 0 )
		{
			for( var i = 0; i < this.Animations.length; i++ )
			{
				this.Animations[i]();
			}
		}
	}

	IsHit( mousePos )
	{
		var res = Math.sqrt((this.position.x-mousePos.x)*(this.position.x-mousePos.x) + (this.position.y-mousePos.y)*(this.position.y-mousePos.y));
		return (( res < this.radius ) ? this.hitScore : 0 );
	}

	FadeOut()
	{
		this.animations.FadeOut(100);
	}
}