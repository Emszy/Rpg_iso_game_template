function random_int(min, max)
{
    return Math.round(Math.random() * (max - min) + min);
}

function random_float(min, max)
{
    return Math.random() * (max - min) + min;
}

function vector2d(x,y)
{
	return pos = {x: x, y:y};
}

function make_image(img_src)
{
	image = new Image();
	image.src = img_src;
	return(image);
}

function draw_generic(pos, width, height, color)
{
	screen.ctx.fillStyle = color;
	screen.ctx.fillRect(pos.x, pos.y, width, height);
	screen.ctx.fill();
}

function drawRotatedRect(x,y,width,height,degrees){

        // first save the untranslated/unrotated context
        screen.ctx.save();

        screen.ctx.beginPath();
        // move the rotation point to the center of the rect
        screen.ctx.translate( x+width/2, y+height/2 );
        // rotate the rect
        screen.ctx.rotate(degrees*Math.PI/180);

        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn
        screen.ctx.rect( -width/2, -height/2, width,height);

        screen.ctx.fillStyle="gold";
        screen.ctx.fill();

        // restore the context to its untranslated/unrotated state
        screen.ctx.restore();

    }


function drawImageRot(img,x,y,width,height,deg){

    //Convert degrees to radian 
    var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image    
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    //reset the canvas  
    ctx.rotate(rad * ( -1 ) );
    ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}