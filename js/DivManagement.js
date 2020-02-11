class DivManagement_Class
{
	constructor()
	{
		this.bodyWidth = document.body.clientWidth;
		this.bodyHeight = document.body.clientHeight;
	}

	createDiv_Centered(divName, divBackColor, divWidth, divHeight, onClick)
	{

		this.divLeft = (document.body.clientWidth/2)-(divWidth/2);
		this.divTop = (document.body.clientHeight/2)-(divHeight/2);

		return this.createDiv(divName, "body", divBackColor, this.divLeft, this.divTop, divWidth, divHeight, onClick);
	}

	createDiv(divName, divContainerID, divBackColor, divLeft, divTop, divWidth, divHeight, onClick)
	{
		var div = document.createElement(divName);
		var divContainer = elem(divContainerID);

		div.id = guid();
		div.className = divName.concat("_class");
		div.style.backgroundColor = divBackColor;
		div.style.position = "absolute";
		div.style.left = divLeft;
		div.style.top = divTop;
		div.style.width = divWidth;
		div.style.height = divHeight;
		
		// game's ico
		// game's description

		div.onclick  = onClick;
		divContainer.appendChild(div);
		return div.id;
	}

	Write2div(divID, message)
	{
		elem(divID).innerHTML = message;
	}

}


