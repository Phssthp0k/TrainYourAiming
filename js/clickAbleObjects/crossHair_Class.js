class CrossHair_Class extends clickableObject_Class
{
	constructor ( newName, newColor, newPosition )	
	{
		super(newName);

		this.color = newColor;
		this.position = newPosition
	}

	Draw( canvas, newPosition )
	{
		var COntext = canvas.getContext('2d');
		
		this.position = newPosition || this.position;
		this.strokeColor = this.color;
		this.coord = this.position;


		// log("drawing crossair @ ["+coord.x+"]["+coord.y+"], color ["+strokeColor+"]");
		this.x = this.coord.x;
		this.y = this.coord.y;

		COntext.beginPath();
		COntext.lineWidth = 1;
		COntext.strokeStyle = this.strokeColor;
		COntext.moveTo(this.x, this.y - 10);
		COntext.lineTo(this.x, this.y + 10);
		COntext.moveTo(this.x - 10,  this.y);
		COntext.lineTo(this.x + 10,  this.y);
		COntext.stroke();
	}
}