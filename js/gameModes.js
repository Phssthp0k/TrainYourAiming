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
					div.style.background = getRandomColor();
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
	}

	get name() {return this._name;}
	set name(value) {this._name = value;}

	LoadGame(){log("Loading '"+this._name+"'");}
	SetDifficultyLevel(){log("notDefined");}

	// Makes the game actually running (timer/click/etc)
	Start(){log("notDefined");}
	GameOver(){log("notDefined");}

	SetDifficultyLevel(){log("notDefined");}
	OnClick(mouseEvents){log("notDefined. Mouse Click");}
	IsHit(mousePos){log("notDefined. IsHit must be used to check if click happened inside shape boundaries");}
}

class QuickAim_Class extends Game_Class
{
	constructor(canvasManager_Class)
	{
		super(canvasManager_Class);

		this.name = "Quick Aim!";
		this.target = new Target_Class();
		this.target2 = new Target_Class();
	}
	LoadGame()
	{
		super.LoadGame();

		this.target.name = "mainTarget";
		this.target.SetCircles(3);
		this.target.SetRadius( 40 );
		this.target.targetPosition = this.CM.canvasCenter;
		this.target.targetPosition = { x: ((Math.random() * this.CM.Canvas.width) + 1), y: ((Math.random() * this.CM.Canvas.height) + 1) };
		
		this.target2.name = "target2";
		this.target2.SetCircles(3);
		this.target2.SetRadius( 20 );
		this.target2.targetPosition = this.CM.canvasCenter;
		this.target2.targetPosition = { x: ((Math.random() * this.CM.Canvas.width) + 1), y: ((Math.random() * this.CM.Canvas.height) + 1) };

		this.CM.UpdateObjectList( [ this.target, this.target2 ] );
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
}

class QuickClick_Class extends Game_Class
{
	constructor(canvasManager)
	{
		super(canvasManager);

		this.name = "Quick Click!";
	}
	LoadGame(){log("defa");}
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

	OnClick(mouseEvt)
	{
		if( this.quadrato.IsHit( GetMousePos(this.CM.drawingCanvas, mouseEvt) ) )
		{
			log('score');			
			this.quadrato.animations.Boo();
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