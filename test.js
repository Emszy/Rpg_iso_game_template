var test =
{
	one : "",
	two : "",
	three : "",
	arr : [],
	num : 0,

	reset : function()
	{
		this.one = "";
		this.two = "";
		this.three = "";
		this.arr = [];
		this.num = 0;
	},

	print : function()
	{
		console.log(this.one);
		console.log(this.two);
		console.log(this.three);
		console.log(this.arr);
		console.log(this.num);
	},

	weapon : function(name, range, width, height,)
	{
		weapon1 = new Object();
		weapon1.name = name;
		weapon1.range = range;
		weapon1.height = height;
		weapon1.width = width;

		return (weapon1);

	},


	item : function(name)
	{
		item1 = new Object();
		item1.name = name;
		item1.use_item = function()
		{
			console.log(this.name);
		};

		return(item1);
	},

	dummy : function()
	{
		dummy1 = new Object();
		dummy1.pos = vector3d(0,0,0);
		dummy1.iso_pos = vector3d(0,0,0);
		dummy1.width = 16;
		dummy1.height = 16;
		dummy1.max_jump = 5;
		dummy1.descend = false;
		dummy1.keys = new Array(200).fill(false);
		dummy1.velocity = 0.05;
		dummy1.run = 1;
		dummy1.path = [];
		dummy1.looking_direction = vector2d(0,0);
		dummy1.walk_index = 0;
		dummy1.color="cyan";
		dummy1.set_path = function()
		{
			for (var x = 0; x < random_int(6, 9); x ++)
			{
				this.path.push(vector2d(random_int(200, 300), random_int(200,300)));
			}
		};
		dummy1.hot_keys = [this.item("one"), this.item("two"), this.item("three"), this.item("four"), this.item("five")];
		dummy1.weapon = this.weapon("sword", 20, 5, 25);
		dummy1.shield = this.weapon("shield", 20, 20, 20);
		dummy1.inventory = inventory.init();
		return(dummy1);
	},


};
