//alert( window.canRunAds );

if( window.canRunAds === undefined )
{
    // adblocker detected, show fallback
//	alert("Spegni adblocker");
}

var gameField = new CanvasManagement_Class("GameField_Canvas");
gameField.Resize( [2,2] );

var div = new DivManagement_Class();

var gameModesList = new GameModes_List_Class("gameModesList");
gameModesList.AddNewGame( new aimTraining_Class(gameField) );
gameModesList.AddNewGame( new QuickAim_Class(gameField) );
gameModesList.AddNewGame( new FourSquares_Class(gameField) );
gameModesList.AddNewGame( new QuickClick_Class(gameField) );
gameModesList.AddNewGame( new Test2_Class(gameField) );
// gameModesList.AddNewGame( new TestGame_Class(gameField) );
// gameModesList.AddNewGame( new FollowTheCircle_Class(gameField) );

gameModesList.GenerateGamesList(LoadGameCheckList);


function Home()
{
	log("Requesting home");
	localStorage.setItem( "currGame", "null" );
	document.getElementById("nav-bar").style.display = "block";
	document.getElementById("stat-bar").style.display = "none";
}
function GameOver()
{
	log("Issuing Game Over");
	var currGame = localStorage.getItem( "currGame" );
	for ( var z = 0; z<gameModesList.GamesList.length; z++ )
	{
		if( gameModesList.GamesList[z].name == currGame )
		{
			if( gameModesList.GamesList[z].playing)
			{
				gameModesList.GamesList[z].GameOver();
				gameField.Hide();
			}
			break;
		}
	}
	Home();
}

function LoadGameCheckList()
{
	/* document.getElementById("gamingArea").style.display = "block"; */
	log("LoadGameCheckList");
	document.getElementById("nav-bar").style.display = "none";
	document.getElementById("stat-bar").style.display = "block";
	gameField.Show();
}



window.onload = function()
{
	var currGame = localStorage.getItem( "currGame" );
	
	if( currGame != "null" )
	{
		for ( var z = 0; z<gameModesList.GamesList.length; z++ )
		{
			if( gameModesList.GamesList[z].name == currGame )
			{
				gameModesList.GamesList[z].LoadGame();
				break;
			}
		}
	}
	else
	{
		log('home');
		Home();
	}
	
}

Home()