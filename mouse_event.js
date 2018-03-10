var mouse =
{
   pos : vector2d(0,0),
   tile : make_tile(),
   iso : make_tile(),
   width : 1,
   height : 1,



   iso_pt : function(e, pos)
   {
      
      mouse.pos = this.windowToCanvas(screen.canvas, e.clientX, e.clientY);
      
      var temp = isometric.get_2d_tile_coordinate(pos.x, pos.y);
      mouse.iso.pos = vector2d((mouse.pos.x - screen.iso_pos.x), (mouse.pos.y - screen.iso_pos.y));
      mouse.iso.pos = isometric.to_2d(mouse.iso.pos.x, mouse.iso.pos.y);
      mouse.iso.pos.x = temp.x + mouse.iso.pos.x;
      mouse.iso.pos.y = temp.y + mouse.iso.pos.y;
      mouse.tile.pos = isometric.get_tile_coordinate(mouse.iso.pos.x, mouse.iso.pos.y);

   },

   windowToCanvas : function(canvas, x, y)
   {
      var box = canvas.getBoundingClientRect();

      return { 
               x: x - box.left * (canvas.width  / box.width),
               y: y - box.top  * (canvas.height / box.height)
             };
   }



};

canvas.onmousedown = function (e) {

   mouse.iso_pt(e, dummy.pos);
   var tst = test.dummy();

   tst.pos = isometric.get_2d_tile_coordinate(dummy.pos.x, dummy.pos.y);
   if (action.box_collision(tst, mouse.iso) == true)
   {
      dummy.color == "red" ? dummy.color = "cyan" : dummy.color = "red";
   }

   console.log("dummy", tst.pos, "mouse", mouse.iso.pos, "\nmouse tile", mouse.tile.pos);
};

function make_tile()
{
   return({
      pos : vector2d(0,0),
      width : 1,
      height: 1,
   });
};

window.onkeydown = function (e) {


   if (e.keyCode == 65)
   {
      dummy = action.move_left(dummy, dummy.velocity);
      tile_map = action.move_right(tile_map, dummy.velocity);

   }
   if (e.keyCode == 68)
   {
      dummy = action.move_right(dummy, dummy.velocity);
      tile_map = action.move_left(tile_map, dummy.velocity);

   }
   if (e.keyCode == 83)
   {
     dummy =  action.move_up(dummy, dummy.velocity);
      tile_map = action.move_down(tile_map, dummy.velocity);

   }
   if (e.keyCode == 87)
   {
      dummy = action.move_down(dummy, dummy.velocity);
      tile_map = action.move_up(tile_map, dummy.velocity);

   }
   // console.log("dummy", dummy.pos,"map", tile_map.pos);
};
