class ScoreClass
{
	constructor()
	{
		this.lifes = 3;
		this.score = 0;
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

	}
};

function ResetScore()
{
	// Log( 'Resetting Score' );
	scoring = new ScoreClass();
}