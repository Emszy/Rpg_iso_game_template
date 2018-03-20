
skills = 
{
	test : function(skill)
	{
		// skill.health.display();
		// skill.health.add_xp(10);
		// skill.health.add_lvl();
		// skill.health.display();
		// skill.health.add_xp(100);
		// skill.health.add_lvl();
		// skill.health.display();
		// skill.health.add_xp(1000);
		// skill.health.add_lvl();
		// skill.health.display();
		// skill.health.add_xp(10000);
		// skill.health.add_lvl();
		// skill.health.display();

		// skill.health.add_xp(100000);
		// skill.health.add_lvl();
		// skill.health.display();
		// skill.health.add_xp(1000000);
		// skill.health.add_lvl();
		// skill.health.display();
		// skill.health.add_xp(10000000);
		// skill.health.add_lvl();
		// skill.health.display();
		// skill.health.add_current(20);
		// skill.health.subtract_current(38);
		// skill.health.current_reset();
		// console.log(skill.health.access(22));
		// console.log(skill.attack.access(22));

	//agility run stamina
		// skill.agility.count_down();
		// if (skill.agility.timer_done())
		// {
		// 	skill.agility.subtract_current(1);
		// 	skill.agility.timer_reset();
		// }  
		// skill.agility.display();

		return (skill);
	},

	skill : function(name)
	{
		var skil = new Object();
		skil.name = name;
		skil.xp = 0;
		skil.lvl = 1;
		skil.current = 4;
		skil.timer = 50;
		skil.max_timer = 50;

		skil.add_xp = function(xp)
		{
			this.xp += xp;
		};

		skil.add_lvl = function()
		{
			while (this.xp > Math.round(this.lvl * this.lvl * this.lvl * 11.5))
			{
				this.lvl+=1;
				this.current = this.lvl;
			}
		};

		skil.add_current = function(boost)
		{
			if (this.current + boost < this.lvl + 12)
			{
				this.current+=boost;
			}
			else
			{
				this.current = this.lvl + 12;
			}
		};

		skil.subtract_current = function(boost)
		{
			if (this.current - boost >= 0)
			{
				this.current-=boost;
			}
			else
			{
				this.current = 0;
			}
		};

		skil.current_reset = function()
		{
			this.current = this.lvl;
		};

		skil.count_down = function()
		{
			this.timer -= 1;
		};

		skil.timer_reset = function()
		{
			this.timer = this.max_timer;
		};

		skil.timer_done = function()
		{
			if (this.timer <= 0) return (true);
			else return (false);
		};

		skil.display = function()
		{
			console.log("\n" + this.name + ":\n",
						"xp" + this.xp + "\n",
						"lvl" + this.lvl + "\n",
						"current" + this.current + "\n",
						"timer" + this.timer + "\n");
		};

		skil.access = function(lvl)
		{
			if (this.lvl >= lvl) return(true);
			return (false);
		};

		return(skil);
	},

	init : function()
	{
		var skill = new Object();
		skill.health = this.skill("health");
		skill.attack = this.skill("attack");
		skill.strength = this.skill("strength");
		skill.defence = this.skill("defence");
		skill.agility = this.skill("agility");
		skill.archery = this.skill("archery");
		skill.prayer = this.skill("prayer");
		skill.fishing = this.skill("fishing");
		skill.magic = this.skill("magic");
		skill.woodcutting = this.skill("woodcutting");
		skill.mining = this.skill("mining");
		skill.crafting = this.skill("crafting");
		skill.farming = this.skill("farming");

		skill.show_all = function()
		{
			this.health.display();
			this.attack.display();
			this.strength.display();
			this.defence.display();
			this.agility.display();
			this.archery.display();
			this.prayer.display();
			this.fishing.display();
			this.magic.display();
			this.woodcutting.display();
			this.mining.display();
			this.crafting.display();
			this.farming.display();
		};
		return(skill);
	}
}