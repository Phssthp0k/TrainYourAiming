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
	constructor(drawing_Class)
	{
		super(drawing_Class);
		this.name = "Quick Aim!";
	}
	LoadGame()
	{
		super.LoadGame();

		var target = new Target_Class();
		target.name = "mainTarget";
		target.SetCircles(3);
		target.maxRadius = 80;
		target.targetPosition = drawing.canvasCenter;
		target.targetPosition = { x: ((Math.random() * drawing.Canvas.width) + 1), y: ((Math.random() * drawing.Canvas.height) + 1) };

		drawing.UpdateObjectList( [ target ] );
		drawing.AddOnClickFunction( this.OnClick );
		drawing.RefreshScreen();

		// mostro la scritta start e il primo target
		// al click sul target parte il timer
	}

	OnClick()
	{
		log("clicked");
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