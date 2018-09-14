class scoringProto 
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
						avgClickDuration : 0
					}; 
		this.avgClicksPerMinute = 0;
	}
};

function ResetScore()
{
	// Log( 'Resetting Score' );
	scoring = new scoringProto();
}