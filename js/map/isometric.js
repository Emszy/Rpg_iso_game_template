var isometric =
{
	to_2d : function(x, y)
	{
		var tmp = vector2d(0,0)
            tmp.x = (2 * y + x) / 2;
            tmp.y = (2 * y - x) / 2;
            return(tmp);
	},

	from_2d : function(x, y)
	{
		var tmp = vector2d(0,0)
            tmp.x = x - y;
            tmp.y = (x + y) / 2;
            return(tmp);
	},

	get_tile_coordinate : function(x, y)
	{

		var tmp = vector2d(0,0)
            tmp.x = Math.floor(x / tile_map.height);
            tmp.y = Math.floor(y / tile_map.height);
            return(tmp);

	},

	get_2d_tile_coordinate : function(x, y)
	{
            var tmp = vector2d(0,0)
            tmp.x = x * tile_map.height;
            tmp.y = y * tile_map.height;
            return(tmp);
	},
}