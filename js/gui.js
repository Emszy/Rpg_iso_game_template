var gui =
{

	test : function()
	{

		var tem = [
					items.all["bow"].copy(),
					items.all["iron_sword"].copy(),
					items.all["iron_two_hand_sword"].copy(),
					items.all["iron_plate"].copy(),
					items.all["wooden_wall"].copy(),
					items.all["hoe"].copy(),
					items.all["fishing_pole"].copy(),
					items.all["wooden_wall"].copy(),
					items.all["hoe"].copy(),
					items.all["fishing_pole"].copy(),
					items.all["wooden_wall"].copy(),
					items.all["hoe"].copy(),
					items.all["fishing_pole"].copy(),
					items.all["wooden_wall"].copy(),
					items.all["hoe"].copy(),
					items.all["wooden_wall"].copy(),
					items.all["hoe"].copy(),
					items.all["fishing_pole"].copy(),
					items.all["wooden_wall"].copy(),
					items.all["hoe"].copy(),
				  ];

	var ui = gui.init(vector2d(0,0), 200, 200);

		ui.make_tab("Armor", tem);
		ui.make_tab("Armor", tem);
		ui.make_tab("Armor", tem);
		ui.make_tab("Armor", tem);

		
		var ui2 = gui.init(vector2d(250,250), 500, 500);

		ui2.make_tab("Armor", tem);
		ui2.make_tab("Armor", tem);
		ui2.make_tab("Armor", tem);
		ui2.make_tab("Armor", tem);
		ui2.make_tab("Armor", tem);
	

		
		var ui3 = gui.init(vector2d(500,0), 30, 30);

		ui3.make_tab("Armor", tem);
		ui3.make_tab("Armor", tem);
		ui3.make_tab("Armor", tem);
		ui3.make_tab("Armor", tem);




		ui.draw_background();
		ui2.draw_background();
		ui3.draw_background();
		
		ui.draw_tabs();
		ui.draw_items();
		ui.mouse_collision();

		ui2.draw_tabs();
		ui2.draw_items();
		ui2.mouse_collision();

		ui3.draw_tabs();
		ui3.draw_items();
		ui3.mouse_collision();

	}, 

	init : function(pos, width, height)
	{
		var ui = new Object();
		//background
		ui.showing = true;
		ui.pos = pos;
		ui.width = width;
		ui.height = height;
		//tabs
		ui.tabs = [];
		ui.index = 0;

		ui.make_tab = function(name, items)
		{
			tab = new Object();
			tab.index = this.tabs.length;
			tab.color = "red";
			tab.width = this.width / 5 - (this.width * 0.005);
			tab.height = this.height / 20;
			row = Math.floor(tab.index / 5);
			col = tab.index % 5;
			tab.pos = vector2d(this.pos.x + (col * tab.width + (this.width * 0.01)) * 1.01,
							  (this.pos.y + (this.height * 0.8)) + ((tab.height) * row)* 1.1);
			
			tab.items = new Object();
			tab.items.arr = items;

			tab.items.positions = [];
			tab.items.width = this.width / 5 - (this.width * 0.1);
			tab.items.height = this.height / 7 - (this.height * 0.01);

			for ( x = 0 ; x < tab.items.arr.length; x++)
			{
				row = Math.floor(x / 5);
				col = x % 5;
				tab.items.positions.push(vector2d(this.pos.x + (this.width * 0.1) + (tab.items.width * col) * 1.5 ,
												  this.pos.y + (this.height * 0.05) + (tab.items.height * row) * 1.5));
			}
			this.tabs.push(tab);
		};

		ui.mouse_collision = function()
		{
			for (var x = 0; x < this.tabs[this.index].items.positions.length; x++)
			{
				var obj = new Object()

				obj.pos = this.tabs[this.index].items.positions[x];
				obj.width = this.tabs[this.index].items.width;
				obj.height = this.tabs[this.index].items.height;
				if (action.box_collision(obj, mouse) == true)
				{
					console.log(this.tabs[this.index].items.arr[x]);
				}
			}
		}

		ui.draw_tabs = function()
		{
			for(x = 0; x < this.tabs.length; x++)
			{
				draw_generic(this.tabs[x].pos, this.tabs[x].width, this.tabs[x].height, this.tabs[x].color);
			}
		};

		ui.draw_items = function()
		{
			for (var x = 0; x < this.tabs[this.index].items.positions.length; x++)
			{
				draw_generic(this.tabs[this.index].items.positions[x], this.tabs[this.index].items.width, this.tabs[this.index].items.height, this.tabs[this.index].items.arr[x].color);

			}
		};

		ui.draw_background = function()
		{
			draw_generic(this.pos, this.width, this.height, "cyan");
		};
		return (ui);
	},

}