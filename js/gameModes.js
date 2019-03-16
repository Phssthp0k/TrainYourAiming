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
		this.playing = false;
	}

	get name() {return this._name;}
	set name(value) {this._name = value;}

	LoadGame(){log("Loading '"+this._name+"'");}
	SetDifficultyLevel(){log("notDefined");}

	// Makes the game actually running (timer/click/etc)
	StartGame(){log("notDefined");}
	GameOver(){log("notDefined");}

	SetDifficultyLevel(){log("notDefined. SetDifficultyLevel");}
	OnClick(mouseEvents){log("notDefined. Mouse Click");}
	IsHit(mousePos){log("notDefined. IsHit must be used to check if click happened inside shape boundaries");}

	GameOver() {log("notDefined. GameOver");}
}

class QuickAim_Class extends Game_Class
{
	constructor(canvasManager_Class)
	{
		super(canvasManager_Class);

		this.name = "Quick Aim!";
	}
	
	LoadGame()
	{
		super.LoadGame();

		this._targets = [];
		for( var i=0; i < 10; i++ )
		{
			target = new Target_Class();
			target.name = "mainTarget";
			target.SetCircles(3);
			target.SetRadius( 40 );
			target.targetPosition = this.CM.canvasCenter;
			target.targetPosition = { x: ((Math.random() * this.CM.Canvas.width) + 1), y: ((Math.random() * this.CM.Canvas.height) + 1) };

			this._targets[this._gamesList.length] = this.target;
		}

		
		this.CM.UpdateObjectList( this._targets );
		this.CM.Add_OnMouse_Click_Function( this );
		this.CM.RefreshScreen();
		// mostro la scritta start e il primo target
		// al click sul target parte il timer
	}

	OnClick(mouseEvents)
	{
		var mousePos = GetMousePos(this.CM.Canvas, mouseEvents);
		if( this.target.IsHit(mousePos) > 0 )
		{
			this.target.targetPosition = { x: ((Math.random() * this.CM.Canvas.width) + 1), y: ((Math.random() * this.CM.Canvas.height) + 1) };
			//this.target.Vanish();
		}
		if( this.target2.IsHit(mousePos) > 0 )
		{
			this.target2.targetPosition = { x: ((Math.random() * this.CM.Canvas.width) + 1), y: ((Math.random() * this.CM.Canvas.height) + 1) };
		}
		this.CM.RefreshScreen();
			
	}

	StartGame()
	{

	}
}

class QuickClick_Class extends Game_Class
{
	constructor(canvasManager)
	{
		super(canvasManager);

		this.name = "Quick Click!";
	}

	LoadGame()
	{
		
	}

	StartGame()
	{

	}
}

class TestGame_Class extends Game_Class
{
	constructor(canvasManager)
	{
		super(canvasManager);

		this.name = "Test!";
		this.moveIt = false;
		this.autoRefresh = false;
		this.quadrato = new Square_Class("quadratoDiTest", 50);
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

	OnClick(mouseEvt)
	{
		if( this.quadrato.IsHit( GetMousePos(this.CM.drawingCanvas, mouseEvt) ) )
		{
			log('score');
			var ll = this.quadrato;
			ll.animations.FadeOut();			
			//this.quadrato.animations.FadeOut();
		}
		if(!this.autoRefresh) {this.CM.RefreshScreen(); }
	}

	OnMouseDown(mouseEvt) { if( this.quadrato.IsHit( GetMousePos(this.CM.drawingCanvas, mouseEvt) ) ){this.moveIt = true;} }
	OnMouseUp(mouseEvt) { this.moveIt = false; }
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
		this.playing = false;
		this.refreshTimer.Stop();
		this.CM.StopRefresh();
		log(this.score);
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
			this.cerchio.color = green;
			this.score++;	
		}
		else
		{
			this.cerchio.color = rogue;		
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