
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
// an item holds the skill it goes to
// an item holds the bonus given while using or when used
// an item has a position and a size
//






items = 
{

	skill : skills.init(),
	test : function()
	{
		this.skill.show_all();
		bow = this.create();
		bow.use();
	},

	create : function()
	{
		var bow = this.init("bow", 0, 0, 50, 50, 0, this.skill.show_all, 1, "archery", 1, 5);
		return(bow);
	},

	init : function(name, x, y, width, height, id, use_func, craft_lvl, skill_to_use, skill_lvl_to_use, bonus)
	{
		item = new Object();
		item.pos = vector2d(x, y);
		item.width = width;
		item.height = height;
		item.name = name;
		item.health = 100;
		item.id = id;
		item.placable = false;
		item.placed = false;
		item.dropped = false;
		item.plantable = false
		item.planted = false;
		item.wieldable = false;
		item.use_able = false;
		item.skill = skill_to_use;
		item.skill_lvl = skill_lvl_to_use;
		item.use = use_func;
		item.craft_lvl = craft_lvl;
		item.bonus = bonus;

		item.craft = function(invent)
		{
			//find ingredients
			//check if ingredients are in inventory
			//if all ingredients are there, make item, delete ingredients from inventory or subtract
			//if stackable, add item to inventory
			return (invent);
		}

		item.can_be_placed = function()
		{
			this.placable = true;
		}

		item.can_be_planted = function()
		{
			this.plantable = true;
		}

		item.can_be_wielded = function()
		{
			this.wieldable = true;
		}



	}


}

