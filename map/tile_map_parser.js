
var tile_map = 
{
	pos : vector2d(0,0),
	looking_direction : vector2d(0,0),
	run : 1,
	width : 64 / 2,
	height : 32 / 2,
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

	set : function()
	{
		name_arr =		[];
		img_src_arr =   [];
		color_arr = 	[];
		walkable_arr = 	[];


		this.init_map_size(25, 25);
		this.copy_map(name_arr, img_src_arr, color_arr, walkable_arr);
	},



	change_width : function(width)
	{
		this.width = width;
	},

	change_height : function(height)
	{
		this.height = height;
	},

	init_map_size : function(width, height)
	{
		this.map = new Array(height);

		for (var x = 0; x < this.map.length; x++)
		{
			this.map[x] = new Array(width);
		}
	},

	create_tile : function(x, y, z, name, img, id, color, walkable)
	{
		tile = new Object();
		tile.x = x;
		tile.y = y;
		tile.z = z;
		tile.width = this.width;
		tile.height = this.height;
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
													x * this.width,
												  	y * this.height,
												  	Math.random(1) / 2,
												  	name_arr[rand],
												  	img_src_arr[rand],
												  	rand,
												  	color_arr[rand],
												  	walkable_arr[rand]
												  );
			}
		}
	},

	draw_restraint : function(character)
	{
		//restraint is how many tiles away should be the start/end for x,y iteration.

		restraint = 5 * character.velocity * character.run;
		var map_area = new Object();

		map_area.start = vector2d(character.pos.x - restraint, character.pos.y - restraint);
		map_area.end = vector2d(character.pos.x + restraint, character.pos.y + restraint)
		return (map_area);

	},

	draw_default : function(color, x, y, width, height)
	{
		screen.ctx.fillStyle = color;
		screen.ctx.fillRect(x, y, width, height);
		screen.ctx.fill();
	},

	draw : function(character)
	{
		var map_area = draw_restraint(character.pos);
		for (var x = map_area.start.x; x < map_area.end.x; x++)
		{
			for (var y = map_area.start.y; y < map_area.end.y; y++)
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
	},

	draw_iso : function()
	{

		var map_area = this.draw_restraint(dummy);
		// console.log(pos);
		// console.log(map_area.start, map_area.end);


		for (var x = map_area.start.x; x <= map_area.end.x; x++)
		{
			for (var y = map_area.start.y; y <= map_area.end.y; y++)
			{	
				if (x >= 0 && y >= 0 && x < this.map.length && y < this.map[0].length)
				{
					if (this.map[x][y].img != false)
					{
						context.drawImage(this.map[x][y].img, this.map[x][y].x, this.map[x][y].y);
					}
					else
					{
						//if edge of map make taller
						if (x == 0 || y == 0 || y == this.map[0].length - 1 || x == this.map[0].length - 1)
						{
							draw_block(x + this.pos.x, y + this.pos.y, 5);
						}
						else draw_block(x + this.pos.x, y + this.pos.y, this.map[x][y].z);
					}
				}
				
			}
		}
	},

};


function draw_block(x, y, z)
{

	var top = "green"
	var left = "blue"
	var right ="purple"
	screen.ctx.save()
	screen.ctx.translate((x - y)* tile_map.width / 2, (y + x) * tile_map.height / 2);

	// draw top
	screen.ctx.beginPath();
	screen.ctx.moveTo(0,-z * tile_map.height);
	screen.ctx.lineTo(tile_map.width / 2, tile_map.height / 2 - z * tile_map.height);
	screen.ctx.lineTo(0 , tile_map.height - z * tile_map.height);
	screen.ctx.lineTo(-tile_map.width / 2, tile_map.height / 2 - z * tile_map.height);
	screen.ctx.closePath();
	screen.ctx.fillStyle = top;
	screen.ctx.fill();


	// draw left
	screen.ctx.beginPath();
	screen.ctx.moveTo(-tile_map.width / 2, tile_map.height / 2 -z * tile_map.height);
	screen.ctx.lineTo(0, tile_map.height - z * tile_map.height);
	screen.ctx.lineTo(0, tile_map.height);
	screen.ctx.lineTo(-tile_map.width / 2, tile_map.height / 2);
	screen.ctx.closePath();
	screen.ctx.fillStyle = left;
	screen.ctx.fill();

		// draw right
	screen.ctx.beginPath();
	screen.ctx.moveTo(tile_map.width / 2, tile_map.height / 2 -z * tile_map.height);
	screen.ctx.lineTo(0, tile_map.height - z * tile_map.height);
	screen.ctx.lineTo(0, tile_map.height);
	screen.ctx.lineTo(tile_map.width / 2, tile_map.height / 2);
	screen.ctx.closePath();
	screen.ctx.fillStyle = right;
	screen.ctx.fill();



	screen.ctx.restore();
}

function draw_tile(x, y, color)
{
	screen.ctx.save()
	screen.ctx.translate((x - y)* tile_map.width / 2, (y + x) * tile_map.height / 2);
	screen.ctx.beginPath();
	screen.ctx.moveTo(0,0);
	screen.ctx.lineTo(tile_map.width / 2, tile_map.height / 2);
	screen.ctx.lineTo(0 , tile_map.height);
	screen.ctx.lineTo(-tile_map.width / 2, tile_map.height / 2);
	screen.ctx.closePath();
	screen.ctx.fillStyle = color;
	screen.ctx.fill();
	screen.ctx.restore();

}








