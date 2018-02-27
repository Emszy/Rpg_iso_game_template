
var screen =
{
	canvas : "",
	ctx : "",
	width : 0,
	height :0,

	set_canvas : function(canvas_id)
	{
		this.canvas = document.getElementById(canvas_id);
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.ctx = this.canvas.getContext("2d");
	},
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


	init_test : function()
	{
		test.print();
		test.one = "init_one";
		test.two = "Init_two";
		test.three = "Init_three";
		test.arr.push("this", "that", 1, 49);
		test.num = 40392;
		test.print();

		tile_map.test();

	},

	update_test : function()
	{
		tile_map.draw();
	},

	initialize_game_loop : function(fps, canvas_id)
	{
		this.set_fps(fps);
		this.interval = 1000 / fps;
		screen.set_canvas(canvas_id);
	},

	initialize_game : function()
	{
		this.initialize_game_loop(60, "canvas");
		

		//put all initialize data here ex: players, objects, enemies, map, etc
		// this.init_test();
		// inventory.test();
		// skills.test();
		items.test();
		
	},

	game_update : function(x)
	{
		//runs in loop, this is where you put all the game
		// ex: enemy.move, player.move, render_map etc
		
		// this.update_test();

		// draw_generic(dummy.pos, dummy.width, dummy.height, "red");
		// dummy = action.test(dummy);


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

var dummy = test.dummy();

// dummy.set_path();
game_master5000.initialize_game();
loop();

