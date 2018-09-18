function getRandomColor() 
{
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class clickableObject
{
	constructor()
	{
		this.name = "name not defined";
		this.color = getRandomColor();
		this.position = { x : 0, y : 0 };
		this.canClip = false;
		this.border = { width : 1, color : getRandomColor() };
		this.hitScore = 1;
	}

	StartAnimation() {log("notDefined");};
	Draw( canvas, newPosition ){log("notDefined");};
	Refresh( canvas, newPosition ){log("notDefined");};
	IsHit( canvas, newPosition ){log("notDefined");};
	OnClick( canvas, newPosition ){log("notDefined");};

}

class circle extends clickableObject
{
	constructor ( )	
	{
		super();
		this.radius = 70;

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
		this.color = getRandomColor();
		this.border.color = getRandomColor();
	}

	Refresh( canvas )
	{
		log('refresh');
		this.Draw( canvas );
	};

	IsHit( mousePos )
	{
		var res = Math.sqrt((this.position.x-mousePos.x)*(this.position.x-mousePos.x) + (this.position.y-mousePos.y)*(this.position.y-mousePos.y));
		return (( res < this.radius ) ? this.hitScore : 0 );
	}
}