var screen =
{
	canvas : "",
	ctx : "",
	width : 0,
	height : 0,
	iso_pos : vector2d(0, 0),

	set_canvas : function(canvas_id)
	{
		this.canvas = document.getElementById(canvas_id);
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.iso_pos = vector2d(screen.width / 2,screen.height / 2)

		this.ctx = this.canvas.getContext("2d");
	},

	show : function()
	{
		console.log(this.width, this.height);
	},


	iso_translate : function(x, y)
	{
		screen.ctx.translate(this.iso_pos.x, this.iso_pos.y);
	},

	reset_translate : function()
	{
		screen.ctx.setTransform(1,0,0,1,0,0);
	}

}

var game_master5000 = 
{
	fps : 60,
	now : 1,
	then : Date.now(),
	interval : 1000 / 60,
	delta : 0,
	

	set_fps : function(fps)
	{
		this.fps = fps;
		this.interval = 1000 / fps;
	},

	initialize_game_loop : function(fps, canvas_id)
	{
		this.set_fps(fps);
		this.interval = 1000 / fps;
		screen.set_canvas(canvas_id);
	},

	update_test : function()
	{
		tile_map.draw_iso(player);

		tile_map.change_width(16);
		tile_map.change_height(8);

		if (player.pos.x >= 0 && player.pos.y >= 0 && player.pos.x < tile_map.map.length - 1 && player.pos.y < tile_map.map[0].length - 1)
		{
			draw_pos = tile_map.map[Math.round(player.pos.x)][Math.round(player.pos.y)].z - player.pos.z;
		}
		else
		{
			draw_pos = 0 - player.pos.z;
		}
		draw_tile(draw_pos, draw_pos, player.color);
		tile_map.change_width(32 * 3);
		tile_map.change_height(16 * 3);

	},

	initialize_game : function()
	{
		this.initialize_game_loop(60, "canvas");
		

		//put all initialize data here ex: players, objects, enemies, map, etc
		tile_map.test();

		// inventory.test();
		// skills.test();
		// items.test();
		
	},
	game_update : function()
	{
		//runs in loop, this is where you put all the game
		// ex: enemy.move, player.move, render_map etc

		screen.iso_translate();
		this.update_test();

		screen.reset_translate();

		player = action.test(player);
		// action.box_collision(dummy ,mouse);

	},

	loop : function()
	{
		
    	this.now = Date.now();
    	this.delta = this.now - this.then;
		
		if (this.delta > this.interval)
    	{
    		this.then = this.now - (this.delta % this.interval);
    		

    		screen.ctx.clearRect(0, 0, screen.width, screen.height);

			this.game_update()
	
    	}

	},
}

// loop is called outside for requestAnimationFrame() to work
// logic is inside game_master5000 so manipulate game_update() or initialize_game();
function loop()
{
	requestAnimationFrame(loop); 
    game_master5000.loop();
}

var player = test.dummy();

player.set_path();
game_master5000.initialize_game();
loop();

