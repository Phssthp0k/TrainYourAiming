class MouseHistory_Class
{
	// Need to know:
	// clicks history
	// Last click 


	constructor()
	{
		this._clickHistory = [] // holds ClickRecord_ClassES
		this._Time_last_Click;
		this._Time_last_ClickDelta = 0;

		this._avgClickDuration = ( this.totalPlayTime>0 && this.clicksAmount>0) ? (this.totalPlayTime/this.clicksAmount) : 0

		this._clicksAmount = 0;
	}
	
	AddNewClick()
	{
		this.newClick = new ClickRecord_Class();
		this._clicksAmount += 1;

		if( this._clickHistory.length = 0 )
		{
			// first record, no history, no delta
		}
		else
		{
			// not the first record, calc delta			
		}
		this._clickHistory[this._clickHistory.length] = this.newClick;
	}
}



class ClickRecord_Class
{
	constructor(mouseCoord)
	{
		// Need to know when clicked, where
		this._ClickDateTime = new Date()
		this._ClickTime = this._ClickDateTime.GetTime();
		this._mouseCoord = mouseCoord;
	}

	get CursorLocation() {return _mouseCoord;}
	get MouseCoord(){return _mouseCoord;}
	get ClickDate(){ return _ClickDate;}
	get ClickTime(){return _ClickTime;}
}