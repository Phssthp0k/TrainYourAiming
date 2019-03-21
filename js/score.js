class Score_Class
{
	constructor()
	{
		this.totalScore = 0;
		this.date;
		this.time;
		this.clickHistory = [] // holds ClickRecord_ClassES
		this.clicks = { 
						lastClickTime : new Date().getTime(), 
						lastClickDuration : 0, 
						bestClickDuration : 1000, 
						clicksAmount : 0, 
						totalPlayTime : 0,
						avgClickDuration : ( this.totalPlayTime>0 && this.clicksAmount>0) ? (this.totalPlayTime/this.clicksAmount) : 0
					}; 
		this.avgClicksPerMinute = 0;
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