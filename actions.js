action = 
{

	test : function(dummy)
	{

	//person is just a global dummy
		// dummy1.hot_keys[0].use_item();
		// dummy1.hot_keys[1].use_item();
		// dummy1.hot_keys[2].use_item();
		// dummy1.hot_keys[3].use_item();
		// dummy1.hot_keys[4].use_item();
		// console.log(dummy1.path);
		// console.log(dummy1.path[dummy1.walk_index].x);
		// console.log(dummy1.looking_direction);
		// dummy1.hot_keys = this.use_hot_key(1, dummy1.hot_keys);
		// dummy1.hot_keys = this.use_hot_key(2, dummy1.hot_keys);
		// person = action.run(dummy1);
		// person = action.stop_run(dummy1);

			dummy = action.check_keys(dummy);
			dummy = action.gravity(dummy);
			// dummy1 = this.follow_path(dummy1, dummy1.path);
		// console.log(dummy1.pos, tile_map.pos);
		// action.swing_weapon(dummy1, vector2d(screen.width / 2, screen.height / 2));
		// action.block(dummy1, vector2d(screen.width / 2, screen.height / 2));


		return (dummy);

	},

	check_keys : function(person)
	{
		var left = 65;
  	 	var right = 68;
  	 	var up = 83;
   		var down = 87;
   		var run = 16;
   		var jump = 32;

   		if (person.keys[left] == true)
   		{
      		person = action.move_left(person, person.velocity);
      		tile_map = action.move_right(tile_map, person.velocity);
   		}
   		if (person.keys[right] == true)
   		{
      		person = action.move_right(person, person.velocity);
      		tile_map = action.move_left(tile_map, person.velocity);
   		}
   		if (person.keys[up] == true)
   		{
     		person =  action.move_up(person, person.velocity);
   		   	tile_map = action.move_down(tile_map, person.velocity);
   		}
   		if (person.keys[down] == true)
   		{
   		   person = action.move_down(person, person.velocity);
   		   tile_map = action.move_up(tile_map, person.velocity);
   		}
   		if (person.keys[run] == true)
   		{
   		   person = action.run(person);
		}
		if (person.keys[jump] == true)
   		{
   			person = action.jump(person);
		}
		else if (person.keys[jump] == false && person.pos.z > 0)
		{
			person.decend = true;
		}
		return (person);
	},

	move_up : function(person, velocity)
	{
		person.pos.y += velocity;
		person.pos.x += velocity;
	
		person.looking_direction.y = 1;
		person.looking_direction.x = 1;
		return (person);
	},

	move_down : function(person, velocity)
	{
		person.pos.x -= velocity;
		person.pos.y -= velocity;

		person.looking_direction.y = -1;
		person.looking_direction.x = -1;


		return (person);
	},

	move_left : function(person, velocity)
	{
		person.pos.x -= velocity;
		person.pos.y += velocity;

		person.looking_direction.x = -1;
		person.looking_direction.y = 1;


		return (person);
	},

	move_right : function(person, velocity)
	{
		person.pos.x += velocity;
		person.pos.y -= velocity;

		person.looking_direction.x = 1;
		person.looking_direction.y = -1;
// 
		return (person);
	},

	run : function(person)
	{
		person.velocity == 2 ? person.velocity = 0.5 : person.velocity = 2;
		return (person);
	},

	stop_run : function(person)
	{
		person.run = 1;
		return (person);
	},


	jump : function(person)
	{
		if (person.pos.z >= person.max_jump) person.descend = true
   		if (person.pos.z <= 0) person.descend = false;

   		if (person.descend == false) person.pos.z += 0.5;
   		if (person.descend == true) person.pos.z -= 0.4;
		return (person);
	},

	gravity : function(person)
	{
		if (person.keys[32] == false && person.pos.z > 0) person.descend = true
		if (person.descend == true && person.pos.z > 0) person.pos.z -= 0.4;
		if (person.pos.z < 0) person.pos.z = 0;
		return (person);
	},

	use_hot_key : function(key, array_of_items)
	{
		//specifically for key 1-9 implementations
		if (array_of_items[key - 1] != "none")
		{
			array_of_items[key - 1].use_item;
			array_of_items[key - 1].delete;
			array_of_items[key - 1] = test.item("none");
		}
		return (array_of_items);
	},

	follow_path : function(person, path)
	{
		//generic to follow closest path to waypoint
		person.looking_direction = vector2d(0,0);
		if (person.pos.x < person.path[person.walk_index].x) 
		{
			person = this.move_right(person, person.velocity);
			tile_map = this.move_left(tile_map, person.velocity);

		}
		if (person.pos.x > person.path[person.walk_index].x) 
		{
			person = this.move_left(person, person.velocity);
			tile_map = this.move_right(tile_map, person.velocity);

		}
		if (person.pos.y < person.path[person.walk_index].y) 
		{
			person = this.move_down(person, person.velocity);
			tile_map = this.move_up(tile_map, person.velocity);

		}
		if (person.pos.y > person.path[person.walk_index].y) 
		{
			person = this.move_up(person, person.velocity);
			tile_map = this.move_down(tile_map, person.velocity);

		}
		//check to set next waypoint
		if (this.path_switch_collision(person, path[person.walk_index])) 
		{
			person.walk_index++;
			if (person.walk_index >= path.length) person.walk_index = 0;
		}

		return (person);
	},

	swing_weapon : function(person, pos)
	{	
		var center = vector2d((pos.x + person.width / 2) - (person.weapon.width / 2), (pos.y + person.height / 2) - (person.weapon.height / 2));
		var weapon_pos = vector2d(center.x, center.y);
		var x_range = (person.looking_direction.x * person.weapon.range);
		var y_range = (person.looking_direction.y * person.weapon.range);
		var weapon_pos = vector2d(center.x + x_range, 
								  center.y + y_range);

		if (person.looking_direction.x == -1 && person.looking_direction.y == -1)
		{
			drawRotatedRect(weapon_pos.x + 20, weapon_pos.y + 3, person.weapon.width, person.weapon.height, -45);
		}
		else if (person.looking_direction.x == 1 && person.looking_direction.y == 1)
		{
			drawRotatedRect(weapon_pos.x - 20, weapon_pos.y - 3, person.weapon.width, person.weapon.height, -45);
		}
		else if (person.looking_direction.x == 1 && person.looking_direction.y == -1)
		{
			drawRotatedRect(weapon_pos.x + 3, weapon_pos.y + 20, person.weapon.width, person.weapon.height, 45);
		}
		else if (person.looking_direction.x == -1 && person.looking_direction.y == 1)
		{
			drawRotatedRect(weapon_pos.x - 3, weapon_pos.y - 20, person.weapon.width, person.weapon.height, 45);
		}
		else if (person.looking_direction.x == 1 && person.looking_direction.y == 0 || person.looking_direction.x == -1 && person.looking_direction.y == 0)
		{
			drawRotatedRect(weapon_pos.x, weapon_pos.y - 10, person.weapon.width, person.weapon.height, 90);
		}
		else if (person.looking_direction.x == 0 && person.looking_direction.y == -1 || person.looking_direction.x == 0 && person.looking_direction.y == 1)
		{
			drawRotatedRect(weapon_pos.x - 10, weapon_pos.y, person.weapon.width, person.weapon.height, 0);
		}
		return (weapon_pos);
	},

	block : function (person, pos)
	{
		var center = vector2d((pos.x + person.width / 2) - (person.shield.width / 2), (pos.y + person.height / 2) - (person.shield.height / 2));
		var x_range = (person.looking_direction.x * person.shield.range);
		var y_range = (person.looking_direction.y * person.shield.range);
		var shield_pos = vector2d(center.x + x_range, 
								  center.y + y_range);

		if (person.looking_direction.x == -1 && person.looking_direction.y == -1)
		{
			drawRotatedRect(shield_pos.x + 3, shield_pos.y + 20, person.shield.width, person.shield.height, -45);
		}
		else if (person.looking_direction.x == 1 && person.looking_direction.y == 1)
		{
			drawRotatedRect(shield_pos.x - 3, shield_pos.y - 20, person.shield.width, person.shield.height, -45);
		}
		else if (person.looking_direction.x == 1 && person.looking_direction.y == -1)
		{
			drawRotatedRect(shield_pos.x - 20, shield_pos.y - 3, person.shield.width, person.shield.height, 45);
		}
		else if (person.looking_direction.x == -1 && person.looking_direction.y == 1)
		{
			drawRotatedRect(shield_pos.x + 20, shield_pos.y + 3, person.shield.width, person.shield.height, 45);
		}
		else if (person.looking_direction.x == 1 && person.looking_direction.y == 0 || person.looking_direction.x == -1 && person.looking_direction.y == 0)
		{
			drawRotatedRect(shield_pos.x, shield_pos.y + 10, person.shield.width, person.shield.height, 90);
		}
		else if (person.looking_direction.x == 0 && person.looking_direction.y == -1 || person.looking_direction.x == 0 && person.looking_direction.y == 1)
		{
			drawRotatedRect(shield_pos.x + 10, shield_pos.y, person.shield.width, person.shield.height, 0);
		}
		return (shield_pos);
	},

	

	box_collision : function(obj1, obj2)
	{
		return !(
        ((obj1.pos.y + obj1.height) < (obj2.pos.y)) ||
        (obj1.pos.y > (obj2.pos.y + obj2.height)) ||
        ((obj1.pos.x + obj1.width) < obj2.pos.x) ||
        (obj1.pos.x > (obj2.pos.x + obj2.width))
    	);
	},

	path_switch_collision : function(obj1, obj2)
	{
		// fixed width for obj2, obj2 has no .pos in this function. its to account
		// fluctuation in speed to register waypoints.

		return !(
        ((obj1.pos.y + obj1.height) < (obj2.y)) ||
        (obj1.pos.y > (obj2.y + 8)) ||
        ((obj1.pos.x + obj1.width) < obj2.x) ||
        (obj1.pos.x > (obj2.x + 8))
    	);
	},

	circle_collision : function(obj1, obj2)
	{
		distance = Math.sqrt(
			      ((obj1.pos.x - obj2.pos.x) * (obj1.pos.x - obj2.pos.x))
            + ((obj1.pos.y - obj2.pos.y) * (obj1.pos.y - obj2.pos.y))
     		    );

		if (distance < obj1.battle_radius + obj2.battle_radius)
		{
    		return (1);
		}
		return (0);

	}

}