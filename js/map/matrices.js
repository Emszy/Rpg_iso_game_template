function vector2d(x,y)
{
  return pos = {x: x, y:y};
};

function vector3d(x,y,z)
{
  return pos = {x: x, y : y, z : z};
};

var matrices = 
{

  rotation : 0.1,

	scale : function(sx, sy, sz)
 	{
 		return([
 					  [sx, 0,  0,  0],
            [0,  sy, 0,  0],
            [0,  0,  sz, 0],
            [0,  0,  0,  1]
          ]);
 	},


	translate : function(dx, dy, dz)
 	{
 		 return([
 		 			    [1,0,0,0],	
              [0,1,0,0],	
              [0,0,1,0],	
 	            [dx,dy,dz,1]
 	          ]);
 	},

	rotate_z : function(radians)
	{
		  c = Math.cos(radians);
    	s = Math.sin(radians);
    	return([	
   					  [c,-s, 0, 0],
              [s, c, 0, 0],
              [0, 0, 1, 0],
              [0, 0, 0, 1]
            ]);

	},

	rotate_y : function(radians)
	{
    
   		c = Math.cos(radians)
    	s = Math.sin(radians)
    	return([
    				  [ c, 0, s, 0],
            	[ 0, 1, 0, 0],
            	[-s, 0, c, 0],
            	[ 0, 0, 0, 1]
            ])

	},

	rotate_x : function(radians)
	{
 
 			c = Math.cos(radians)
 			s = Math.sin(radians)
 			return([
              [1, 0, 0, 0],
              [0, c,-s, 0],
              [0, s, c, 0],
              [0, 0, 0, 1]
            ]);

	},

  dotproduct : function(a,b)
  {
    var n = 0; 
    var lim = Math.min(a.length, b.length);

    for (var i = 0; i < lim; i++) n += a[i] * b[i];
    return n;
  },


  scale : function(x, y, z)
    {
      var pos = new vector3d(x,y,z);
      var matrix = [x, y, z];
      var scale_matrix = matrices.scale(1.1,1.1,1.1);
      pos.x = this.dotproduct(matrix, scale_matrix[0]);
      pos.y = this.dotproduct(matrix, scale_matrix[1]);
      pos.z = this.dotproduct(matrix, scale_matrix[2]);
    return (pos);
  },


  translate : function(x, y, z)
  {
      var pos = new vector3d(x,y,z);
      var matrix = [x, y, z, 1];
      var translate_matrix = matrices.translate(x,y,z);

      pos.x = translate_matrix[3][0] + matrix[0];
      pos.y = translate_matrix[3][1] + matrix[1];
      pos.z = translate_matrix[3][2] + matrix[2];

    return (pos);
  },

  rotate : function(x, y ,z ,rotation_func)
  {
      var pos = new vector3d(x,y,z);
      var matrix = [x, y, z, 1];
      var scale_matrix = rotation_func(this.rotation);
      pos.x = this.dotproduct(matrix, scale_matrix[0]);
      pos.y = this.dotproduct(matrix, scale_matrix[1]);
      pos.z = this.dotproduct(matrix, scale_matrix[2]);
    return (pos);
  },

  radians : function(angle) 
  {
    return angle * (Math.PI / 180);
  },

   degrees : function(angle)
   {
    return angle * (180 / Math.PI);
   },

}