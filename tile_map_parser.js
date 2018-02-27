
// Do not overwrite Array() class, you will break the parser.


var tile_map = 
{
	x : 0,
	y : 0,
	tile_width : 32,
	tile_height : 32,
	map : [],
	

	test : function()
	{
		name_arr =		["lava", "ocean", "grass", 	"sand"];
		img_src_arr =   [false,  false,   false, 	false];
		color_arr = 	["red",  "cyan",  "green", 	"yellow"];
		walkable_arr = 	[false,  false,   true, 	true];


		this.init_map_size(100, 100);
		this.copy_map(name_arr, img_src_arr, color_arr, walkable_arr);
	},

	change_tile_width : function(width)
	{
		this.tile_width = width;
	},

	change_tile_height : function(height)
	{
		this.tile_height = height;
	},

	init_map_size : function(width, height)
	{
		this.map = new Array(height);

		for (var x = 0; x < this.map.length; x++)
		{
			this.map[x] = new Array(width);
		}
	},

	create_tile : function(x, y, name, img, id, color, walkable)
	{
		tile = new Object();
		tile.x = x;
		tile.y = y;
		tile.width = this.tile_width;
		tile.height = this.tile_height;
		tile.name = name;
		tile.img = img;
		tile.id = id;
		tile.color = color;
		tile.walkable = walkable;

		return (tile);

	},

	copy_map : function(name_arr, img_src_arr, color_arr, walkable_arr)
	{
		for (var x = 0; x < this.map.length; x++)
		{
			for (var y = 0; y < this.map.length; y++)
			{
				var rand = Math.round(random_int(0, 3));

				this.map[x][y] = this.create_tile(
													x * this.tile_width,
												  	y * this.tile_height,
												  	name_arr[rand],
												  	img_src_arr[rand],
												  	rand,
												  	color_arr[rand],
												  	walkable_arr[rand]
												  );
			}
		}
	},

	draw_restraint : function(pos, x, y)
	{
		restraint = 500;
		if (pos.y - restraint > y) return false;
		if (pos.y + restraint < y) return false;
		if (pos.x - restraint > x) return false;
		if (pos.x + restraint < x) return false;
		return (true);
	},

	draw_default : function(color, x, y, width, height)
	{
		screen.ctx.fillStyle = color;
		screen.ctx.fillRect(x, y, width, height);
		screen.ctx.fill();
	},

	draw : function()
	{
		pos = vector2d(300,300);

		for (var x = 0; x < this.map.length; x++)
		{
			for (var y = 0; y < this.map.length; y++)
			{
				// ideally draw image instead of just a color.
				if (this.draw_restraint(pos, this.map[x][y].x,this.map[x][y].y) == true)
				{
					if (this.map[x][y].img != false)
					{
						context.drawImage(this.map[x][y].img, this.map[x][y].x, this.map[x][y].y);
					}
					else
					{
						this.draw_default(this.map[x][y].color ,this.map[x][y].x ,this.map[x][y].y, this.map[x][y].width, this.map[x][y].height);

					}
				}
				
			}
		}
	},

};










