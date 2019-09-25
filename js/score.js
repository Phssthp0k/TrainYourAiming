class Score_Class
{
	constructor()
	{
		this.totalScore = 0;
		this.date;
		this.time;
	}

	Reset()
	{
		log("Not defined yet");
	}
};

class ClickRecord_Class
{
	constructor(mouseCoord)
	{
		this._lastClickTime=new Date().getTime()
		this._mouseCoord=mouseCoord
	}

	get MouseCoord
}