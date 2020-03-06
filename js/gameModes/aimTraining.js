class aimTraining_Class extends Game_Class
{
	constructor(canvasManager)
	{
		super(canvasManager);
		this.name = "Quick Aim";

		this.Size = 20;
		this.Duration = 60;

		this.SpawnTime = 5;

		this.TargetList = [];
	}
	
	LoadGame()
	{
		super.LoadGame();


	}
}