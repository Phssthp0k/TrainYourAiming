//alert( window.canRunAds );

if( window.canRunAds === undefined )
{
    // adblocker detected, show fallback
//	alert("Spegni adblocker");
}

var drawing = new CanvasManagement_Class("playCanvas");
drawing.drawingCanvas.width  = window.document.body.clientWidth;
drawing.drawingCanvas.height = window.document.body.clientHeight;
//drawing.PrintInfos();

var div = new DivManagement_Class();


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
			}
			break;
		}
	}
	Home();
}

function ShowGamingArea()
{
	/* document.getElementById("gamingArea").style.display = "block"; */
	document.getElementById("nav-bar").style.display = "none";
	document.getElementById("stat-bar").style.display = "block";
}

var gameModesList = new GameModes_List_Class("gameModesList");
gameModesList.AddNewGame( new Test2_Class(drawing) );
gameModesList.AddNewGame( new QuickClick_Class(drawing) );
gameModesList.AddNewGame( new QuickAim_Class(drawing) );
gameModesList.AddNewGame( new TestGame_Class(drawing) );
gameModesList.AddNewGame( new FollowTheCircle_Class(drawing) );
gameModesList.AddNewGame( new FourSquares_Class(drawing) );

gameModesList.GenerateGamesList(ShowGamingArea);



window.onload = function()
{
	var currGame = localStorage.getItem( "currGame" );
	
	if( currGame != "null" )
	{
		ShowGamingArea();
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