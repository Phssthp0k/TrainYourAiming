class Text_Class extends clickableObject_Class
{
	constructor(newName, width, height )	
	{
		super(newName);

		this.width = width;
		this.height = height;
	}

	example()
	{
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.font = "30px Verdana";
		// Create gradient
		var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
		gradient.addColorStop("0", "magenta");
		gradient.addColorStop("0.5", "blue");
		gradient.addColorStop("1.0", "red");
		// Fill with gradient
		ctx.strokeStyle = gradient;
		ctx.strokeText("Big smile!", 10, 50);
	}
}