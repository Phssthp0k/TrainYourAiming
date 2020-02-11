class clickableObject_V2_Class
{
	constructor(divName, divContainerID) //this.divID and this.divContainer can be null
	{
		log(divName);
		this.div = document.createElement(this.divName);
		this.divContainer = elem(divContainerID || "body");
		
		this.div.className = divName.concat("_class");
		this.div.id = name();
		this.div.style.position = "absolute";

		this.timer = new GameTimer(1);

		// this.spawnedAT = 
		
		// this.Default();
	}

	get LifeSpan()			{ 	return this._lifespan = value; 	}
	set LifeSpan(value)		{	return this._lifespan;

	get Color()				{ 	return this.div.style.backgroundColor;	}
	set Color(value)		{ 	this.div.style.backgroundColor = value;	}

	get Border()			{ 	return this.div.style.border;	}
	set Border(value)		{ 	this.div.style.border = value;	}

	get OnClick() 			{	return this.div.onclick;	}
	set OnClick(value) 		{	this.div.onclick = value;	}
	
	get OnMouseDown() 		{	return this.OnMouseDown;	}
	set OnMouseDown(value)	{	this.OnMouseDown = value;	}
	
	get OnMouseUp() 		{	return this.OnMouseUp;		}
	set OnMouseUp(value)	{	this.OnMouseUp = value;		}
	
	get OnMouseMove() 		{	return this.OnMouseMove;	}
	set OnMouseMove(value)	{	this.OnMouseMove = value;	}
	
	get OnMouseOut() 		{	return this.OnMouseOut;		}
	set OnMouseOut(value)	{	this.OnMouseOut = value;	}

	get Location()			{	return { left: this.div.style.left, top: this.div.style.top }	}
	set Location(value)			{log(value);	this.div.style.left = value.left; this.div.style.top = value.top }

	Create() { this.Spwan(); }
	Spawn()
	{
		this.divContainer.appendChild(this.div);
	}

	Despawn() { this.Kill(); };
	Destroy() { this.Kill(); };
	Kill()
	{
		this.div.remove();
	}

	Default()
	{

		this.divLeft = 20; // (document.body.clientWidth/2)-(this.divWidth/2);
		this.divTop = document.body.clientHeight/2;
		
		this.Color = "green";
		this.div.style.left = this.divLeft;
		this.div.style.top = this.divTop;
		this.div.style.width = this.divWidth;
		this.div.style.height = this.divHeight;
	}
}

class Circle_V2_Class extends clickableObject_V2_Class
{
	constructor(divName, radius, divContainerID) //this.divID and this.divContainer can be null
	{
		super(divName, divContainerID);

		this.div.style.borderRadius = "50%";
		this.SetRadius(radius || 50);
	}

	SetRadius(newRadius)
	{
		this.div.style.width=newRadius || 70;
		this.div.style.height=newRadius || 70;
	}
}

class Rectangle_V2_Class extends clickableObject_V2_Class
{
	constructor(newName, divContainerID, width, height )	
	{
		super(divName, divContainerID);

		this.div.style.width = width;
		this.div.style.height = height;
	}
}


class Square_V2_Class extends clickableObject_V2_Class
{
	constructor(newName, divContainerID, newSide )
	{
		super(divName, divContainerID);

		this.div.style.width = newSide;
		this.div.style.height = newSide;
	}
}