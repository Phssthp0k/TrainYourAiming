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
					var game2Add = this._gamesList[i];
					var div = document.createElement("div");
					div.className = "gameInList";
					div.style.width = "100px";
					div.style.height = "100px";
					div.style.background = "red";
					div.style.color = "white";
					div.innerHTML = game2Add.name;
					// game's ico
					// game's description

					div.onclick = function()
					{
						 onClickExtFunction(() => {game2Add.OnClick()});
					}

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
	constructor()
	{
		this._name = "Not Defined";
		this._description = "";
		this._ico = "something";

		this.bora = function () { log("boraa - " + this._name);}
	}


	get name() {return this._name;}
	set name(value) {this._name = value;}

	OnClick(){log("notDefined");}
	SetDifficultyLevel(){log("notDefined");}
}


class QuickAim_Class extends Game_Class
{
	constructor()
	{
		super();
		this.name = "Quick Aim!";
		this.bora = function () { log("boree " + this._name);}
	}
	OnClick(){log("defi");}
}

class QuickClick_Class extends Game_Class
{
	constructor()
	{
		super();

		this.name = "Quick Click!";
	}
}