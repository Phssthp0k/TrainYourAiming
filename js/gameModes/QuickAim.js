class QuickAim_Class extends Game_Class
{
	constructor(canvasManager)
	{
		super(canvasManager);
		this.name = "Quick Aim";
	}
	
	LoadGame()
	{
		super.LoadGame();
		
		this.GameTime = 20000;
		this.GameSpeed = 500;
		this.QA_timer = new GameTimer(this.GameSpeed);

		this._tensionFromCenterX = (this.CM.Canvas.width/2);
		this._tensionFromCenterY = (this.CM.Canvas.height/2);
		this._targetsMinimumDistance = 10;

		this._spawning = false;
		this._maxTargets = 10;
		this._targetID = 0;
		this._targets = [];
		this._destroyedTargets = [];
		this._targetTimeout = 1000;

		this.CM.Add_OnMouse_Click_Function( this );
		//this.CM.Add_OnMouse_Move_Function( this );Z

		//this.StartGame();
	}

	StartGame()
	{
		super.StartGame();
		log( this.playing );
		this.QA_timer.Start( () => this.CircleManagement() );
	}

	GameOver()
	{
		this.QA_timer.Stop();
		super.GameOver();
		log( this.playing );
		alert("Game Over!");
	}

	CircleManagement()
	{
		if( this.GameTime <= 0 )
		{
			this.GameOver();
		}
		else
		{
			this.GameTime-=this.GameSpeed;
		}

		if ( this._destroyedTargets.length > 0 )
		{
			for( var del=0; del < this._destroyedTargets.length; del++ )
			{
				this._targets.splice(this._destroyedTargets[del], 1);
			}
			this._destroyedTargets = [];
		}

		if( !this._spawning )
		{
			this._spawning = true;
			if( this._targets.length < this._maxTargets )
			{
				this.target = new Target_Class();
				this.target.name = "target-"+this._targetID; this._targetID+=1;

				this.target.SetCircles(2);
				// copio l'array nella var colore e lo rendo trasp.
				var color1 = colors.rogue.slice(0);		color1[3] = 0;
				var color2 = colors.red.slice(0);		color2[3] = 0;
				

				this.target.circlesColors = [ color1, color2 ];
				this.target.SetRadius( 20 );
				this.target.Position = this.CM.canvasCenter;

				var isPosOK = false;
				var targetDistance = this.target.Radius*2;
				
					this.target.Position = { x: ((Math.random() * this._tensionFromCenterX) + 1 + (this._tensionFromCenterX)), y: ((Math.random() * this._tensionFromCenterY) + 1) };
/* NON va
Serve per evitare la sovrapposizione
				while ( isPosOK )
				{
					var caller = this;
					log(caller.target.Position);

					for( var i=0; i < caller._targets.length; i++ )
					{
						if( Distance( caller.target.Position, caller._targets[i].Position ) > 0 )
						{
							isPosOk = true;
						}
					}
				} */
				
				this.target.Update();
				this.target.FadeIn(100);

				this._targets[this._targets.length] = this.target;
			}
			this._spawning = false;
		}
		this.CM.UpdateObjectList( this._targets );
	}

	OnMouseMove(mouseEvents)
	{

	}

	OnClick(mouseEvents)
	{
		var mousePos = GetMousePos(this.CM.Canvas, mouseEvents);

		for( var i=0; i < this._targets.length; i++ )
		{
			// Controllo se ho colpito
			if( this._targets[i].IsHit(mousePos) > 0 )
			{
				log("Target ["+this._targets[i].name+"] was HIT, Life ["+this._targets[i].Life+"], SpawnTime ["+this._targets[i].SpawnTime+"]" );
				this._destroyedTargets[this._destroyedTargets.length] = i;
				this._targets[i].FadeOut(5);
			}
		}
	}
}