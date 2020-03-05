
class FourSquares_Class extends Game_Class
{
	constructor(canvasManager)
	{
		super(canvasManager);

		this.name = "Four Squares";

		this.quadratoWidth = 50;
		this.distanceFromCenter = 50;

		this.quadratoNW = new Square_Class("quadratoNW", this.quadratoWidth);
		this.quadratoSW = new Square_Class("quadratoSW", this.quadratoWidth);
		this.quadratoNE = new Square_Class("quadratoNE", this.quadratoWidth);
		this.quadratoSE = new Square_Class("quadratoSE", this.quadratoWidth);


		var xx = Math.floor(this.CM.drawingCanvas.width / 2);
		var yy = Math.floor(this.CM.drawingCanvas.height / 2);
		this.centralCrossair = new CrossHair_Class("CCA", colors.red, { x: xx, y: yy} );
		this.CM.background_Objects_List.Add(this.centralCrossair);
		
		this.CM.Add_OnMouse_Click_Function( this );
	}

	LoadGame()
	{
		super.ShowStartGame();

		this.quadratoNW.Position = { x: (this.CM.drawingCanvas.width /2) - this.quadratoWidth/2 - this.distanceFromCenter, 
									y: (this.CM.drawingCanvas.height/2) - this.quadratoWidth/2 - this.distanceFromCenter};
		this.quadratoSW.Position = { x: (this.CM.drawingCanvas.width /2) - this.quadratoWidth/2 - this.distanceFromCenter, 
									y: (this.CM.drawingCanvas.height/2) + this.quadratoWidth/2 + this.distanceFromCenter};
		this.quadratoNE.Position = { x: (this.CM.drawingCanvas.width /2) + this.quadratoWidth/2 + this.distanceFromCenter, 
									y: (this.CM.drawingCanvas.height/2) + this.quadratoWidth/2 + this.distanceFromCenter};
		this.quadratoSE.Position = { x: (this.CM.drawingCanvas.width /2) + this.quadratoWidth/2 + this.distanceFromCenter, 
									y: (this.CM.drawingCanvas.height/2) - this.quadratoWidth/2 - this.distanceFromCenter};

		this.quadratoNW.color = colors.blue;
		//this.quadratoNW.border.width = 5;
		this.quadratoSW.color = colors.red;
		this.quadratoNE.color = colors.yellow;
		this.quadratoSE.color = colors.red;
	}

	StartGame()
	{
		super.StartGame();
		//this.CM.StopRefresh();

		this.CM.UpdateObjectList( [ this.quadratoNW, this.quadratoSW, this.quadratoNE, this.quadratoSE ] );

		this.CM.RefreshScreen();
	}

	OnClick(mouseEvents)
	{
		var mousePos = GetMousePos(this.CM.Canvas, mouseEvents);

		if( this.quadratoNW.IsHit(mousePos) > 0 && !this.quadratoNW.isDestroyed) 
		{ 
			log("NW ["+mousePos.x+"]["+mousePos.y+"]");

			var asdf = new CrossHair_Class("HitNW", colors.green, mousePos);

			this.CM.overlay_Objects_List.Add(asdf); 
			this.CM.clickable_Objects_List.RemoveByName("quadratoNW");
			asdf.animations.FadeOut(100);
			this.quadratoNW.Destroy();	
		}
		if( this.quadratoSW.IsHit(mousePos) > 0) { log("SW ["+mousePos.x+"]["+mousePos.y+"]"); this.CM.overlay_Objects_List.Add(new CrossHair_Class("HitSW", colors.purple, mousePos)); }
		if( this.quadratoNE.IsHit(mousePos) > 0) { log("NE ["+mousePos.x+"]["+mousePos.y+"]"); this.CM.overlay_Objects_List.Add(new CrossHair_Class("HitNE", colors.blue, mousePos)); }
		if( this.quadratoSE.IsHit(mousePos) > 0) { log("SE ["+mousePos.x+"]["+mousePos.y+"]"); this.CM.overlay_Objects_List.Add(new CrossHair_Class("HitSE", colors.white, mousePos)); }
		
		// this.CM.RefreshScreen();
	}
}