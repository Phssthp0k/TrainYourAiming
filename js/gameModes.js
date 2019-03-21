// Genera i link per i giochi
class GameModes_List_Class
{
	constructor( divContainerID )
	{
		this._divContainer = document.getElementById(divContainerID);
		this._gamesList = [];
	}

	get GamesList()	{return this._gamesList;}
	set GamesList(value){this._gamesList = value;}

	AddNewGame( game )
	{
		this._gamesList[this._gamesList.length] = game;
	}

	GenerateGamesList( onClickExtFunction )
	{
		if( this._gamesList !== null )
		{
			if( this._gamesList.length > 0 )
			{
				for( var i=0; i < this._gamesList.length; i++ )
				{
					var game2Add = this._gamesList[i]
					var div = document.createElement("div");
					div.id = guid();
					div.className = "gameInList";
					//div.style.background = getRandomColor();
					div.innerHTML = game2Add.name;

					// game's ico
					// game's description

					div.onclick  = (function()
					{
						var currentI = i;
						var goo = game2Add;

							return function()
							{
								localStorage.setItem("currGame",goo.name);
								onClickExtFunction();
								goo.LoadGame();
							}
					})();

					this._divContainer.appendChild(div);
				}
			}
			else
			{
				alert("Games List is empty");
			}
		}
		else
		{
			alert("Game's list hasn't been defined yet");
		}
	}
}

class Game_Class
{
	constructor(canvasManager)
	{
		this._name = "Not Defined";
		this._id = guid();
		this._description = "";
		this._ico = "something";
		this.CM = canvasManager;
		this._playing = false;
	}

	get name() {return this._name;}
	set name(value) {this._name = value;}

	get playing() {return this._playing;}
	set playing(value) {this._playing = value;}


	LoadGame(){log("Loading '"+this._name+"'");}
	SetDifficultyLevel(){log("notDefined");}

	SetDifficultyLevel(){log("notDefined. SetDifficultyLevel");}
	OnClick(mouseEvents){log("notDefined. Mouse Click");}
	IsHit(mousePos){log("notDefined. IsHit must be used to check if click happened inside shape boundaries");}

	// Makes the game actually running (timer/click/etc)
	StartGame()
	{
		log("Game_Class.StartGame");
		this.playing = true;
		this.CM.StartRefresh();

	}

	GameOver() 
	{
		log("Game_Class.GameOver");
		this.playing = false;
		this.CM.ClearScreen();
		this.CM.StopRefresh();
		this.CM.Remove_OnMouse_Functions();
	}
}


class QuickClick_Class extends Game_Class
{
	constructor(canvasManager)
	{
		super(canvasManager);

		this.name = "Test Fade";		
		this.quadrato2 = new Square_Class("quadratoDiTest2", 50);
	}

	LoadGame()
	{
		super.LoadGame();

		this.quadrato2.position = { x: ((Math.random() * this.CM.Canvas.width) + 1), y: ((Math.random() * this.CM.Canvas.height) + 1) };		
		
		var quadColor = getRandomColor();
		quadColor[3] = 0;
		this.quadrato2.color = quadColor;
		
		this.CM.UpdateObjectList( [ this.quadrato2 ] );
		this.CM.Add_OnMouse_Click_Function( this );

		this.quadrato2.animations.FadeIn(200);

		this.CM.StartRefresh();		
	}

	OnClick(mouseEvt)
	{
		if( this.quadrato2.IsHit( GetMousePos(this.CM.drawingCanvas, mouseEvt) ) )
		{
			this.quadrato2.animations.FadeOut(100);
		}
		//this.CM.RefreshScreen();
	}

	StartGame()
	{

	}
}


class QuickAim_Class extends Game_Class
{
	constructor(canvasManager_Class)
	{
		super(canvasManager_Class);
		this.name = "Quick Aim";
	}
	
	LoadGame()
	{
		super.LoadGame();
		
		this.GameTime = 20000;
		this.GameSpeed = 500;
		this.QA_timer = new GameTimer(this.GameSpeed);

		this._tensionFromCenter = (this.CM.Canvas.height/2);
		this._targetsMinimumDistance = 10;

		this._spawning = false;
		this._maxTargets = 10;
		this._targetID = 0;
		this._targets = [];
		this._destroyedTargets = [];
		this._targetTimeout = 1000;

		this.CM.Add_OnMouse_Click_Function( this );

		this.StartGame();
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
				var color1 = colors.rogue.slice(0);
				var color2 = colors.red.slice(0);
				color1[3] = 0;
				color2[3] = 0;
				this.target.circlesColors = [ color1, color2 ];
				this.target.SetRadius( 20 );
				this.target.targetPosition = this.CM.canvasCenter;

				for( var i=0; i < this._targets.length; i++ )
				{

				}
				this.target.targetPosition = { x: ((Math.random() * this._tensionFromCenter) + 1 + (this._tensionFromCenter)), y: ((Math.random() * this._tensionFromCenter) + 1) };
				
				this.target.Update();
				this.target.FadeIn(100);

				this._targets[this._targets.length] = this.target;
			}
			this._spawning = false;
		}
		this.CM.UpdateObjectList( this._targets );
	}

	OnClick(mouseEvents)
	{
		var mousePos = GetMousePos(this.CM.Canvas, mouseEvents);

		for( var i=0; i < this._targets.length; i++ )
		{
			// Controllo se ho colpito
			if( this._targets[i].IsHit(mousePos) > 0 )
			{
				log("Target ["+this._targets[i].name+"] was HIT" );
				this._destroyedTargets[this._destroyedTargets.length] = i;
				this._targets[i].FadeOut(70);
			}
		}
	}
}



class TestGame_Class extends Game_Class
{
	constructor(canvasManager)
	{
		super(canvasManager);

		this.name = "Test DragDrop";
		this.moveIt = false;
		this.autoRefresh = true;
		this.quadrato = new Square_Class("quadratoDiTest", 50);
		this.color = colors.blue;
		this.quadrato.color = this.color;
	}
	
	LoadGame()
	{
		log("Loading");
		this.quadrato.position = { x: ((Math.random() * this.CM.Canvas.width) + 1), y: ((Math.random() * this.CM.Canvas.height) + 1) };
		
		this.CM.UpdateObjectList( [ this.quadrato ] );

		this.CM.Add_OnMouse_Click_Function( this );
		this.CM.Add_OnMouse_Down_Function( this );
		this.CM.Add_OnMouse_Up_Function( this );
		this.CM.Add_OnMouse_Move_Function( this );
		this.CM.Add_OnMouse_Out_Function( this );

		// this.quadrato.StartRotate(this.CM.drawingCanvas, 1);
		if(this.autoRefresh) {this.CM.StartRefresh();}else{this.CM.RefreshScreen();}
	}

	StartGame()
	{

	}

	GameOver()
	{
		super.GameOver();
	}

	OnClick(mouseEvt)
	{
		if( this.quadrato.IsHit( GetMousePos(this.CM.drawingCanvas, mouseEvt) ) )
		{
			var ll = this.quadrato;
		}
		if(!this.autoRefresh) {this.CM.RefreshScreen(); }
	}

	OnMouseDown(mouseEvt) 
	{ 
		if( this.quadrato.IsHit( GetMousePos(this.CM.drawingCanvas, mouseEvt) ) )
		{
			this.moveIt = true;
			this.quadrato.color = colors.green;
		} 
	}
	OnMouseUp(mouseEvt) { this.moveIt = false; this.quadrato.color = this.color}
	OnMouseOut(mouseEvt) { this.moveIt = false; }
	OnMouseMove(mouseEvt)
	{
		if( this.moveIt )
		{
			//this.quadrato.StopRotate();
			var coord = GetMousePos(this.CM.drawingCanvas, mouseEvt)
			this.quadrato.position = { x: coord.x - this.quadrato.side/2 , y: coord.y  - this.quadrato.side/2  };
			//this.quadrato.animations.StartRotate(this.CM.drawingCanvas, 1);
			if(!this.autoRefresh) {this.CM.RefreshScreen(); }

		}
	}
}


class FollowTheCircle_Class extends Game_Class
{
	/*
		Il giocatore deve portare il cursore sopra il cerchio e mantenerlo sopra in movimento
	*/
	constructor(canvasManager)
	{
		super(canvasManager);

		this.name = "Follow the Circle";
		this.autoRefresh = true;
		
		this.cerchio = new Circle_Class();
		this.cerchio.radius = 30;
		
		this.RefreshTimerLapse = 1
		this.refreshTimer = new GameTimer(this.RefreshTimerLapse);

		this.OutSecs = 3000;

		this.circleVector = 10;
		this.circleSpeed = 25;
		this.circleSpeedTick = 0;
		this.newDirection = Math.floor(Math.random() * 4); // 0---3 = NSWE
		this.lastDirection = 0;

		this.movementDelta = 10;

		this.lastMousePos = { x: 0, y: 0 };

		this.score = 0;
	}

	LoadGame()
	{
		log("Loading ["+this.name+"]");

		this.cerchio.position = this.CM.canvasCenter ;
		
		this.CM.UpdateObjectList( [ this.cerchio ] );

		this.CM.Add_OnMouse_Click_Function( this );
		this.CM.Add_OnMouse_Down_Function( this );
		this.CM.Add_OnMouse_Up_Function( this );
		this.CM.Add_OnMouse_Move_Function( this );
		this.CM.Add_OnMouse_Out_Function( this );

		this.CM.StartRefresh()
	}

	OnClick(mouseEvt)
	{
		if( !this.playing)
		{
			this.playing = true;
			if( this.cerchio.IsHit( this.lastMousePos ) )
			{
				this.refreshTimer.Start( () => {this.RefreshPos()} ); 
			}
		}
	}
	OnMouseDown(mouseEvt) {}
	OnMouseUp(mouseEvt) {}
	OnMouseOut(mouseEvt) {}
	OnMouseMove(mouseEvt) 	
	{
		this.lastMousePos = GetMousePos(this.CM.drawingCanvas, mouseEvt);
	}

	GameOver()
	{
		//super(GameOver);
		super.GameOver();
		this.refreshTimer.Stop();
		alert("Gameover! Your Score is ["+this.score+"]");
	}

	RefreshPos()
	{
		/*
			1. vettore a differenti lunghezze, (math.random)
			2. all'azzeramento del vettore, nuova direzione (per ora NSWE, poi anche diagonali)

		*/

		// Controllo che il mouse sia all'interno del cerchio
		if( this.cerchio.IsHit( this.lastMousePos ) )
		{
			this.cerchio.color = colors.green;
			this.score++;	
		}
		else
		{
			this.cerchio.color = colors.rogue;		
			// 
			this.OutSecs -= this.RefreshTimerLapse;
			if( this.OutSecs <= 0 )
			{
				this.GameOver();
			}
		}			

		if( this.circleSpeedTick === this.circleSpeed )
		{
			this.circleSpeedTick = 0;

			if( this.circleVector <= 0 )
			{
				this.circleVector = Math.floor(Math.random() * 10);
				do
				{
					this.newDirection = Math.floor(Math.random() * 4);
				}
				while (this.newDirection === this.lastDirection )
				this.lastDirection = this.newDirection;
			}
					
			this.circleVector--;
				
			switch(this.newDirection)
			{
				case 0: //up
					this.cerchio.position.x += this.movementDelta;
					break;
				case 1: //down
					this.cerchio.position.x -= this.movementDelta;
					break;
				case 2: //left
					this.cerchio.position.y -= this.movementDelta;
					break;
				case 3: // right
					this.cerchio.position.y += this.movementDelta;
					break;
			}
		}
		else
		{
			this.circleSpeedTick++;
		}
	}
}