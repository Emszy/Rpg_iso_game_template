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
// holds_additional_items ---> arrows, chests,
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


// items.all is a master list of items with lookup by items.all["name"]
// after entering all items into the items.all arr, you can copy any item by simply using the
// items.all["name"].copy function, caveat is if some yous must add some trait to all items,
// make sure you enter it into the copy function and the master function, simple as that,
//  add to the show function for debugging.



	
items = 
{
	all : [],
	skill : skills.init(),
	item_count : 0,

	use : function()
	{
		console.log("testing");
	},


	test : function()
	{
		// this.skill.show_all();
		this.create_archery_weapon("bow", 32, 16, this.use, 1, 1);
		this.create_weapon("iron_sword", 16, 32, this.use, 1, 22);
		this.create_weapon("iron_two_hand_sword",16, 48, this.use, 1, 22);

		this.create_armor("iron_plate", 32, 16, this.use, 12, 23)
		this.create_building_block("wooden_wall", 16, 8, this.use, 1, 11)
		this.create_farming_item("hoe", 16, 8, this.use, 1, 3)
		this.create_fishing_item("fishing_pole", 16, 8, this.use, 1, 1);

		this.all["bow"].use();
		this.all["bow"].can_hold_items();

		bow = this.all["bow"].copy();
		// console.log(bow);

		this.all["bow"].health -= 50;

		this.all["bow"].show();
		this.all["bow"].use();
		this.all["bow"].can_hold_items();
		this.all["bow"].can_be_wielded();
		this.all["bow"].can_be_equipped();
		this.all["bow"].can_be_placed();
		this.all["bow"].can_be_planted();
		this.all["bow"].can_be_eaten(51);
		// bow.show();
		this.all["bow"].show();
	},
	create_archery_weapon : function(name, width, height, use_func, craft_lvl, bonus)
	{
		
		this.all[name] = this.init(name, 0, 0, 50, 50, 0, use_func, 1, "archery", 1, 5);
		this.all[name].can_be_wielded();
		this.all[name].can_be_equipped();
		this.all[name].can_be_shot();
	},

	create_weapon : function(name, width, height, craft_lvl, use_func, bonus)
	{
		this.all[name] = this.init(name, 0, 0, 50, 50, 0, use_func, 1, "attack", 1, 5);
		this.all[name].can_be_wielded();
	},

	create_armor : function(name, width, height, use_func, craft_lvl, bonus)
	{
		this.all[name] = this.init(name, 0, 0, 50, 50, 0, use_func, 1, "defence", 1, 5);
		this.all[name].can_be_equipped();

	},

	create_building_block : function(name, width, height, use_func, craft_lvl, bonus)
	{
		this.all[name] = this.init(name, 0, 0, 50, 50, 0, use_func, 1, "crafting", 1, 5);
		this.all[name].can_be_placed(); 
		
	},

	create_farming_item : function(name, width, height, use_func, craft_lvl, bonus)
	{
		this.all[name] = this.init(name, 0, 0, 50, 50, 0, use_func, 1, "farming", 1, 5);
		this.all[name].can_be_planted();
		this.all[name].can_be_placed();
	},

	create_fishing_item : function(name, width, height, use_func, craft_lvl, skill_associated, bonus)
	{
		this.all[name] = this.init(name, 0, 0, 50, 50, 0, use_func, 1, "fishing", 1, 5);

	},

	create_woodcutting_item : function(name, width, height, use_func, craft_lvl, bonus)
	{
		this.all[name] = this.init(name, 0, 0, 50, 50, 0, use_func, 1, "woodcutting", 1, 5);
	},

	create_mining_item : function(name, width, height, use_func, craft_lvl, bonus)
	{
		this.all[name] = this.init(name, 0, 0, 50, 50, 0, use_func, 1, "mining", 1, 5);
	},

	create_food_item : function(name, width, height, use_func, craft_lvl, bonus)
	{
		this.all[name] = this.init(name, 0, 0, 50, 50, 0, use_func, 1, "farming", 1, 5);
		this.all[name].can_be_eaten();
		this.all[name].can_be_planted();

	},

	create_magic_item : function(name, width, height, use_func, craft_lvl, bonus)
	{

		this.all[name] = this.init(name, 0, 0, 50, 50, 0, function(){console.log("hi")}, 1, "magic", 1, 5);
		this.all[name].can_be_wielded();
		this.all[name].can_be_equipped();
	},

	create_non_craftables : function(name, width, height, use_func, craft_lvl, skill_associated, bonus)
	{
		this.all[name] = this.init(name, 0, 0, 50, 50, 0, function(){console.log("hi")}, 1, skill_associated, 1, 5);
		this.all[name].can_be_planted();

	},

	create_potion : function(name, width, height, use_func, craft_lvl, bonus)
	{
		this.all[name] = this.init(name, 0, 0, 50, 50, 0, function(){console.log("hi")}, 1, "crafting", 1, 5);
		this.all[name].can_be_wielded();
		this.all[name].can_be_eaten();
	},

	init : function(name, x, y, width, height, id, use_func, craft_lvl, skill_to_use, skill_lvl_to_use, bonus)
	{
		item = new Object();
		item.pos = vector2d(x, y);
		item.color = random_color();
		item.timer = 60;
		item.width = width;
		item.height = height;
		item.name = name;
		item.health = 100;
		item.id = this.item_count;
		item.edible = false;
		item.placable = false;
		item.craft_cost = new Object();
		item.craft_cost.items = [];
		item.craft_cost.prices = [];
		item.placed = false;
		item.holds_items = false;
		item.dropped = false;
		item.plantable = false
		item.planted = false;
		item.wieldable = false;
		item.shootable = false;
		item.equippable = false;
		item.skill = skill_to_use;
		item.skill_lvl = skill_lvl_to_use;
		item.use = use_func;
		item.craft_lvl = craft_lvl;
		item.bonus = bonus;

		item.show = function()
		{
			console.log(this.pos);
			console.log("timer: " + this.timer);

			console.log("width: " + this.width);
			console.log("height: " + this.height);
			console.log("name: " + this.name);
			console.log("health: " + this.health);
			console.log("id: " + this.id);
			console.log("placable: " + this.placable);
			console.log("placed: " + this.placed);
			console.log("dropped: " + this.dropped);
			console.log("plantable: " + this.plantable);
			console.log("planted: " + this.planted);
			console.log("wieldable: " + this.wieldable);
			console.log("skill: " + this.skill);
			console.log("skill lvl: " + this.skill_lvl);
			this.use();
			console.log("craft lvl: " + this.craft_lvl);
			console.log("bonus: " + this.bonus);
			console.log(this.craft_cost.items);
			if (this.inventory) console.log(this.inventory);
			if (this.hp_to_add) console.log("hp_to_add: " + this.hp_to_add);
		};

		item.set_coordinates = function(pos)
		{
			this.x = pos.x;
			this.y = pos.y;
		};

		item.copy = function()
		{
			copy = new Object();
			copy.pos = vector2d(this.pos.x, this.pos.y);
			copy.color = this.color;
			copy.timer = this.timer;
			copy.width = this.width;
			copy.height = this.height;
			copy.name = this.name;
			copy.health = this.health;
			copy.id = this.id;
			copy.edible = this.edible;
			copy.placable = this.placable;
			copy.craft_cost = new Object();
			copy.craft_cost.items = this.craft_cost.items;
			copy.craft_cost.prices = this.craft_cost.prices;
			copy.placed = this.placed;
			copy.holds_items = this.holds_items;
			copy.dropped = this.dropped;
			copy.plantable =this.plantable;
			copy.planted = this.planted;
			copy.wieldable = this.wieldable;
			copy.shootable = this.shootable;
			copy.equippable = this.equippable;
			copy.skill = this.skill;
			copy.skill_lvl = this.skill_lvl;
			copy.use = this.use;
			copy.craft_lvl = this.craft_lvl;
			copy.bonus = this.bonus;
			copy.show = this.show;
			copy.set_coordinates = this.set_coordinates;
			copy.craft = this.craft;
			copy.set_craft_cost = this.set_craft_cost;
			copy.can_hold_items = this.can_hold_items;
			copy.can_be_eaten = this.can_be_eaten;
			copy.can_be_placed = this.can_be_placed;
			copy.can_be_planted = this.can_be_planted;
			copy.can_be_wielded = this.can_be_wielded;
			copy.can_be_equipped = this.can_be_equipped;
			copy.can_be_shot = this.can_be_shot;
			if (this.inventory) copy.inventory = this.inventory;
			if (this.hp_to_add) copy.hp_to_add = this.hp_to_add;

			return (copy);
		};

		item.craft = function(invent)
		{
			//find ingredients
			//check if ingredients are in inventory
			//if all ingredients are there, make item, delete ingredients from inventory or subtract
			return (invent);
		};

		item.set_craft_cost = function(materials, prices)
		{
			item.craft_cost.items = materials;
			item.craft_cost.prices = prices;
		};

		item.can_hold_items = function()
		{
			this.holds_items = true;
			this.inventory = inventory.init();
		};

		item.can_be_eaten = function(hp_to_add)
		{
			this.edible = true;
			this.hp_to_add = hp_to_add;

		};
		item.can_be_placed = function()
		{
			this.placable = true;
		};

		item.can_be_planted = function()
		{
			this.plantable = true;
		};

		item.can_be_wielded = function()
		{
			this.wieldable = true;
		};
		item.can_be_equipped = function()
		{
			this.equippable = true;
		};

		item.can_be_shot = function()
		{
			this.shootable = true;
		};

		this.item_count++;
		return (item);


	}


}


