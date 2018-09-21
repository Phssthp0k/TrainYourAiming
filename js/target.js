class Target_Class
{
	constructor()
	{
		this.name = "target name not defined";
		this.maxRadius = 70;
		this.targetPosition = { x : 70, y : 70};
		this.circlesNumber = 3;
		this.targetCircles = [];
		this.targetTimer = new GameTimer(100);

		this.SetCircles(this.circlesNumber);
	}

	PrintInfos()
	{
		console.log(this.name);
		console.log(this.targetPosition);
		console.log(this.circlesNumber);
		console.log(this.maxRadius);
		console.log(this.targetCircles);
	}

	SetCircles( newCirclesNumber )
	{
		this.circlesNumber = newCirclesNumber;
		this.UpdateTarget();
	}

	SetRadius( newRadius )
	{
		this.maxRadius = newRadius;
		this.UpdateTarget();
	}

	UpdateTarget()
	{
		this.targetCircles = [];
		for ( var i = 0; i < this.circlesNumber; i++ )
		{
			this.targetCircles[i]= new Circle_Class();
			this.targetCircles[i].radius = this.maxRadius/(Math.abs(i-1)/2 + i/2 + (i+1)/2);
			this.targetCircles[i].position = this.targetPosition;
			this.targetCircles[i].hitScore = (i + 1);
			this.targetCircles[i].name = "Circle points: "+this.targetCircles[i].hitScore;
			// this.targetCircles[i].StartAnimation();
		}
	}

	Draw( canvas )
	{
		var newPos = this.targetPosition;
		this.targetCircles.forEach(function(elem)
		{
			elem.Draw( canvas, newPos );
		});
	};

	Refresh( canvas )
	{
		this.Draw(canvas);
	};

	IsHit(mousePos)
	{
		var retval = 0;
		this.targetCircles.forEach(function(elem)
		{
			if ( elem.IsHit(mousePos) )
			{
				retval += elem.hitScore;
				// log(elem.name + " " +elem.hitScore);
			}
		});
		log("Score: [" + retval + "]");
		return retval;
	};
}
