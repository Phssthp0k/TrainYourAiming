class CrossHair_Class extends clickableObject_Class
{
	constructor ( newName, newColor, newPosition )	
	{
		super(newName);

		this.strokeColor = newColor;
		this.color = newColor;
		this.position = newPosition
	}

	Draw( canvas, newPosition )
	{
		var COntext = canvas.getContext('2d');
		
		this.position = newPosition || this.position;
		
		COntext.beginPath();
		COntext.lineWidth = 1;
		COntext.strokeStyle = getColor(this.strokeColor);
		COntext.moveTo(this.position.x, this.position.y - 10);
		COntext.lineTo(this.position.x, this.position.y + 10);
		COntext.moveTo(this.position.x - 10,  this.position.y);
		COntext.lineTo(this.position.x + 10,  this.position.y);
		COntext.stroke();
	}
}