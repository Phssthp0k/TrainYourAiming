// Genera i link per i giochi
class GamesList_Class
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
					div.style.width = "100px";
					div.style.height = "100px";
					div.style.background = getRandomColor();
					div.style.color = "white";
					div.innerHTML = game2Add.name;
					// game's ico
					// game's description

					div.onclick  = (function()
					{
						var currentI = i;
						var goo = game2Add;

							return function()
							{
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
	constructor(drawing_Class)
	{
		this._name = "Not Defined";
		this._id = guid();
		this._description = "";
		this._ico = "something";
		this._drawing_Class = drawing_Class;
	}

	get name() {return this._name;}
	set name(value) {this._name = value;}

	LoadGame(){log("Loading '"+this._name+"'");}
	SetDifficultyLevel(){log("notDefined");}

	// Makes the game actually running (timer/click/etc)
	Start(){log("notDefined");}
	GameOver(){log("notDefined");}

	SetDifficultyLevel(){log("notDefined");}
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
		this.target.maxRadius = 80;
		this.target.targetPosition = this._drawing_Class.canvasCenter;
		this.target.targetPosition = { x: ((Math.random() * this._drawing_Class.Canvas.width) + 1), y: ((Math.random() * this._drawing_Class.Canvas.height) + 1) };
		
		this.target2.name = "target2";
		this.target2.SetCircles(3);
		this.target2.maxRadius = 40;
		this.target2.targetPosition = this._drawing_Class.canvasCenter;
		this.target2.targetPosition = { x: ((Math.random() * this._drawing_Class.Canvas.width) + 1), y: ((Math.random() * this._drawing_Class.Canvas.height) + 1) };

		this._drawing_Class.UpdateObjectList( [ this.target, this.target2 ] );
		this._drawing_Class.AddOnClickFunction( this );
		this._drawing_Class.RefreshScreen();
		// mostro la scritta start e il primo target
		// al click sul target parte il timer
	}

	OnClick(mouseEvents)
	{
		log("clicked");
		if( this.target.IsHit(mouseEvents) > 0 )
		{
			this.target.targetPosition = { x: ((Math.random() * this._drawing_Class.Canvas.width) + 1), y: ((Math.random() * this._drawing_Class.Canvas.height) + 1) };
		}
		if( this.target2.IsHit(mouseEvents) > 0 )
		{
			this.target2.targetPosition = { x: ((Math.random() * this._drawing_Class.Canvas.width) + 1), y: ((Math.random() * this._drawing_Class.Canvas.height) + 1) };
		}
		this._drawing_Class.RefreshScreen();
			
	}
}

class QuickClick_Class extends Game_Class
{
	constructor(drawing_Class)
	{
		super(drawing_Class);

		this.name = "Quick Click!";
	}
	LoadGame(){log("defa");}
}