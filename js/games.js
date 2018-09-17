var games = []; // array che contiene l'elenco di giochi attivi

class Games
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

	GenerateGamesList()
	{
		if( this._gamesList !== null )
		{
			if( this._gamesList.length > 0 )
			{
				this._gamesList.forEach(function(game2Add)
				{
					var div = document.createElement("div");
					div.style.width = "100px";
					div.style.height = "100px";
					div.style.background = "red";
					div.style.color = "white";
					div.innerHTML = game2Add.name;

					this._divContainer.appendChild(div);
				});
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

class Game
{
	constructor(gameName)
	{
		this._name = gameName;
	}

	get name()
	{
		return this._name;
	}

	SetDifficultyLevel()
	{
		log("SetDifficultyLevel NOT DEFINED");
	}
}


