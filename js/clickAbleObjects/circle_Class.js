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