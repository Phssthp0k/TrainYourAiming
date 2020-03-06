// -----------------------------------------------------------------
class Rectangle_Class extends clickableObject_Class
{
	constructor(newName, width, height )	
	{
		super(newName);

		this.width = width;
		this.height = height;
	}

	//get Center()  {	return { x: this.position.x + this.width/2, y: this.position.y + this.height/2	}; }
	get Center()  {	return this.position; }

	Draw( canvas, newPosition )
	{
		this.position = newPosition || this.position;
		var COntext = canvas.getContext('2d');

		if (!this.canClip)
		{
			if(this.position.x > canvas.width-(this.width/2)) { this.position.x = canvas.width-(this.width/2); }
			if(this.position.x <= 0) { this.position.x = 0 }

			if(this.position.y > canvas.height-this.height) { this.position.y = canvas.height-this.height; }
			if(this.position.y <= 0) { this.position.y = 0 }
		}

		COntext.beginPath();
		COntext.fillStyle = getColor(this.color);
		COntext.fillRect(this.position.x-(this.width)/2, this.position.y-(this.height/2), this.width, this.height);
		if( this.border.draw )
		{
			COntext.lineWidth = this.border.width;
			COntext.strokeStyle = getColor(this.border.color);
			COntext.stroke();	
		}
	}

	IsHit( mousePos )
	{
		if( (mousePos.x > this.position.x-(this.width/2) && mousePos.x < (this.position.x+(this.width/2))) && 
				(mousePos.y > this.position.y-(this.height/2) && mousePos.y < (this.position.y+(this.height/2)))
			)
				{
					return this.hitScore;
				}
				else
				{
					return 0;
				}  
	}
}