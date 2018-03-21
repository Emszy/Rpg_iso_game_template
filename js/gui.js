//This module basically expects an inventory system filled with items from the item system
//you will be able to use two items together, swap their positions, drop item from the ui into a garbage
// or you can turn off the drop for things like crafting ui's 
// I may need to break it down a little more for the skills / magic spells ** note to self

//** relies on inventory system
//** relies on mouse_event system


var gui =
{

	test : function()
	{
		ui.draw()
		ui2.draw();
		ui3.draw();
		
	},

	init : function(pos, width, height)
	{
		var ui = new Object();
		//background
		ui.showing = true;
		ui.pos = pos;
		ui.width = width;
		ui.height = height;
		ui.collision_index = 0;
		//tabs
		ui.tabs = [];
		ui.index = 0;

		ui.draw = function()
		{
			this.draw_background();
			this.draw_tabs();
			this.draw_items();
			this.tab_mouse_collision();
		};

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
				if (this.tabs[this.index].items.stock[x] && this.tabs[this.index].items.stock[x] != "none")
				{
					draw_generic(this.tabs[this.index].items.positions[x], this.tabs[this.index].items.width, this.tabs[this.index].items.height, this.tabs[this.index].items.stock[x].color);
				}
			}
		};

		ui.draw_background = function()
		{
			draw_generic(this.pos, this.width, this.height, "cyan");
		};


		ui.make_tab = function(name, items)
		{
			tab = new Object();
			tab.index = this.tabs.length;
			tab.color = "red";
			tab.width = this.width / 7 - (this.width * 0.005);
			tab.height = this.height / 20;
			row = Math.floor(tab.index / 7);
			col = tab.index % 7;
			tab.pos = vector2d(this.pos.x + (col * tab.width + (this.width * 0.01)) * 1.01,
							  (this.pos.y + (this.height * 0.9)) + ((tab.height) * row)* 1.1);
			
			tab.items = items;

			tab.items.positions = [];
			tab.items.width = this.width / 5 - (this.width * 0.08);
			tab.items.height = this.height / 7 - (this.height * 0.01);
			for ( x = 0 ; x < tab.items.stock.length; x++)
			{
				row = Math.floor(x / 5);
				col = x % 5;
				tab.items.positions.push(vector2d(this.pos.x + (this.width * 0.08) + (tab.items.width * col) * 1.5 ,
												  this.pos.y + (this.height * 0.1) + (tab.items.height * row) * 1.5));
			}
			this.tabs.push(tab);
		};


		ui.tab_mouse_collision = function()
		{
			for (var x = 0; x < this.tabs.length; x++)
			{
				var obj = new Object();

				obj.pos = this.tabs[x].pos;
				obj.width = this.tabs[x].width;
				obj.height = this.tabs[x].height;
				if (action.box_collision(obj, mouse) == true)
				{
					this.index = x;
					return (x);
				}
			}
			return ("none");
		}

		ui.item_mouse_collision = function()
		{
			for (var x = 0; x < this.tabs[this.index].items.positions.length; x++)
			{
				var obj = new Object()

				obj.pos = this.tabs[this.index].items.positions[x];
				obj.width = this.tabs[this.index].items.width;
				obj.height = this.tabs[this.index].items.height;
				if (action.box_collision(obj, mouse) == true)
				{
					return (x);
				}
			}
			return ("none");
		}

		ui.mouse_selection = function()
		{

			this.collision_index = this.item_mouse_collision();

			if (this.collision_index != "none" && this.tabs[this.index].items.stock[this.collision_index] != "none")
			{
				if (this.tabs[this.index].items.selected_index != null)
				{
					this.rearrange_items(this.tabs[this.index].items.stock, this.collision_index);
				}
				this.tabs[this.index].items.select(this.collision_index);
			}
			else
			{
				this.tabs[this.index].items.deselect();
			}
		};

		ui.rearrange_items = function(an_inventory, new_item)
		{
			if (this.tabs[this.index].items.selected_index != null && this.tabs[this.index].items.stock[new_item] != "none")
			{
				this.tabs[this.index].items.swap(this.tabs[this.index].items.selected_index, new_item);
			}
		};
		return (ui);
	},

}