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

   mouse.iso_pt(e, player.pos);
   var tst = test.dummy();

   tst.pos = isometric.get_2d_tile_coordinate(player.pos.x, player.pos.y);
   if (action.box_collision(tst, mouse.iso) == true)
   {
      player.color == "red" ? player.color = "cyan" : player.color = "red";
   }

   console.log("dummy", tst.pos, "mouse", mouse.iso.pos, "\nmouse tile", mouse.tile.pos);
};

window.onkeyup = function (e)
{
   player.keys[e.keyCode] = false;
}

window.onkeydown = function (e)
{
   console.log(e.keyCode);
   player.keys[e.keyCode] = true;

};

function make_tile()
{
   return({
      pos : vector2d(0,0),
      width : 1,
      height: 1,
   });
};


