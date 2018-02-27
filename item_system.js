
// all items have
// ----------------
// bonus_when_used
// price_to_craft *
// crafting_lvl *
// lvl_to_use ---> skill specific
// stage_of_seed **
// can_be_equipped *
// health
// height
// width
// x
// y
// can_be_placed
// can be picked up
// holds_additional_items ---> arrows, 
// 


// an item has a name and an id to look it up
// an item is either stationed on the ground, dropped, or planted
// an item is either weildable or use_able
// an item can run out of health while using, or degrade over time
// an item holds the ingredients_list to craft it
// an item can be crafted after passing an inventory to item.craft, returns inventory without ingredients, with new item
// an item holds the lvl in order to craft it.
// an item holds the skill and lvl in order to use it
// an item holds the bonus given while using or when used
// an item has a position and a size
//






items = 
{

	skill : skills.init(),
	test : function()
	{
		this.skill.show_all();
	},

	init : function(name, id, use_func, craft_lvl)
	{
		item = new Object();
		item.name = name;
		item.health = 100;

		item.id = id;
		item.placed = false;
		item.dropped = false;
		item.planted = false;
		item.weildable = false;
		item.use_able = false;
		item.use = use_func;
		item.craft_lvl = craft_lvl;
		item.craft = function(invent)
		{
			//find ingredients
			//check if ingredients are in inventory
			//if all ingredients are there, make item, delete ingredients from inventory or subtract
			//if stackable, add item to inventory
			return (invent);
		}





	}


}

