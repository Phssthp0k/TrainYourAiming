// -----------------------------------------------------------------
class Square_Class extends Rectangle_Class
{
	constructor ( newName, newSide )	
	{
		super(newName, newSide, newSide);
		this.side = newSide;
	}
}