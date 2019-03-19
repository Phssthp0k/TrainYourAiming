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

		// Dev
		this.animations =
		{
			father : this,
			timer : new GameTimer(1, "CO timer"),
			list : {
						active : [  ],
					},
			StartRotate(canvas, angle) {},
			StopRotate(){},
			Rotate(canvas, angle) 
			{
				var COntext = canvas.getContext('2d');
				COntext.clearRect(0, 0, canvas.Width, canvas.Height);
				
				COntext.save();
				COntext.translate(this.position.x+(this.width/2), this.position.y+(this.height/2));
				COntext.rotate(angle*Math.PI / 180);
		    	COntext.translate(-this.position.x-(this.width/2), -this.position.y-(this.height/2));
			},
			FadeIn(timeToFade) 
			{
				log('ok'); 
			},
			FadeOut(timeToFade) 
			{
				this.father.SetOpacity(getOpacity(this.father.color)-0.2);
				// Creo un timer di sec/timeToFade (valore di opacity da togliere ad ogni giro)
				// che operi da solo
			},
		}
	} // FINE COSTRUTTORE
			
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

class Square_Class extends Rectangle_Class
{
	constructor ( newName, newSide )	
	{
		super(newName, newSide, newSide);
		this.side = newSide;
	}
}

class Circle_Class extends clickableObject_Class
{
	constructor ( )	
	{
		super();
		this.radius = 70;

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
		COntext.fillStyle = this.color;
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