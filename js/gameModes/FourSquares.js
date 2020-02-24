
class FourSquares_Class extends Game_Class
{
	constructor(canvasManager)
	{
		super(canvasManager);

		this.name = "Four Squares";

		this.quadratoWidth = 50;

		this.quadratoNW = new Square_Class("quadratoDiTest1", this.quadratoWidth);
		this.quadratoSW = new Square_Class("quadratoDiTest2", this.quadratoWidth);
		this.quadratoNE = new Square_Class("quadratoDiTest3", this.quadratoWidth);
		this.quadratoSE = new Square_Class("quadratoDiTest4", this.quadratoWidth);


		var xx = this.CM.drawingCanvas.width / 2;
		var yy = this.CM.drawingCanvas.height / 2;

		// remove aliasing
		xx = Math.floor(xx) + 0.5;
		yy = Math.floor(yy) + 0.5;

		this.centralCrossair = new CrossHair_Class("CCA", colors.red, { x: xx, y: yy} );

		this.CM.background_Objects_List.Add(this.centralCrossair);

		this.distanceFromCenter = 50;

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

		this.centralCrossair.color = colors.red;


		this.quadratoNW.color = colors.red;
		// this.quadratoNW.border.width = 5;
		this.quadratoSW.color = colors.red;
		this.quadratoNE.color = colors.yellow;
		this.quadratoSE.color = colors.red;
	}

	StartGame()
	{
		super.StartGame();

		this.CM.UpdateObjectList( [ this.quadratoNW, this.quadratoSW, this.quadratoNE, this.quadratoSE ] );

		this.CM.RefreshScreen();
	}

	OnClick(mouseEvents)
	{
		var mousePos = GetMousePos(this.CM.Canvas, mouseEvents);
		if( this.quadratoNW.IsHit(mousePos) > 0) { log("NW ["+mousePos.x+"]["+mousePos.y+"]"); this.CM.overlay_Objects_List.Add(new CrossHair_Class("HitNW", 'white', mousePos)); }
		if( this.quadratoSW.IsHit(mousePos) > 0) { log("SW ["+mousePos.x+"]["+mousePos.y+"]"); this.CM.overlay_Objects_List.Add(new CrossHair_Class("HitSW", 'blue', mousePos)); }
		if( this.quadratoNE.IsHit(mousePos) > 0) { log("NE ["+mousePos.x+"]["+mousePos.y+"]"); this.CM.overlay_Objects_List.Add(new CrossHair_Class("HitNE", 'green', mousePos)); }
		if( this.quadratoSE.IsHit(mousePos) > 0) { log("SE ["+mousePos.x+"]["+mousePos.y+"]"); this.CM.overlay_Objects_List.Add(new CrossHair_Class("HitSE", 'red', mousePos)); }
	}
}