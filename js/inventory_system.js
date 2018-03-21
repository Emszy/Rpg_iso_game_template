var inventory = 
{
	max_items : 32,

	test : function()
	{
		inven = this.init();
		inven.show();
		inven.add_item("item");
		inven.add_item("item1");
		inven.add_item("item2");
		inven.add_item("item3");
		inven.add_item("item4");
		inven.add_item("item5");
		inven.add_item("item6");
		inven.add_item("item7");
		inven.add_item("item8");
		inven.add_item("item");
		inven.add_item("item1");

		inven.subtract_item(4);
		inven.subtract_item(11);
		inven.subtract_item(19);
		inven.subtract_item(438);
		inven.subtract_item(31);
		inven.subtract_item(35);
		inven.swap(3,5);
		inven.swap(-17,4);
		inven.swap(0,3);
		inven.swap(3,561);

		inven.show();
	},

	init : function()
	{
		inven = new Object();
		inven.count = 0;
		inven.stock = new Array(this.max_items).fill("none");
		inven.selected = "none";
		inven.selected_index = null;

		inven.show = function()
		{
			console.log(this.selected, this.stock, this.count);
		};

		inven.select = function(index)
		{
			this.selected = this.stock[index];
			this.selected_index = index;
		};

		inven.deselect = function()
		{
			this.selected = "none";
			this.selected_index = null;
		};

		inven.add_item = function(item)
		{
			if (this.count <= 32)
			{
				for (var i = 0; i <= this.stock.length - 1; i++) {
					if (this.stock[i] == "none")
					{
						this.stock[i] = item;
						this.count++;
						return(true);
					}
				}
				
			}
		};

		inven.subtract_item = function(index)
		{
			if (this.stock[index] != "none" && index <= 32 && index >= 0)
			{
				this.stock[index].delete;
				this.stock[index] = "none";
				this.count--;
			}

		};

		inven.swap = function(index1, index2)
		{
			var temp;
			if (index1 <= 32 && index2 <= 32 && index1 >= 0 && index2 >= 0)
			{
				temp = this.stock[index1];
				this.stock[index1] = this.stock[index2];
				this.stock[index2] = temp;
			}
			
		};

		return (inven);
	},


}