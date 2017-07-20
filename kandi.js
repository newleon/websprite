// JavaScript source code
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var selector = document.getElementById("spriteselector");
setInterval(animate, 1000 / 30);

function SpriteSheet(path, frameWidth, frameHeight, frameSpeed, endFrame) {

    var image = new Image();
    var framesPerRow;

    // calculate the number of frames in a row after the image loads
    var self = this;
    image.onload = function () {
        framesPerRow = Math.floor(image.width / frameWidth);
    };

    image.src = path;

    var currentFrame = 0;  // the current frame to draw
    var counter = 0;       // keep track of frame rate

    // Update the animation
    this.update = function () {

        // update to the next frame if it is time
        if (counter == (frameSpeed - 1))
            currentFrame = (currentFrame + 1) % endFrame;

        // update the counter
        counter = (counter + 1) % frameSpeed;
    };

    // Draw the current frame
    this.draw = function (x, y) {
        // get the row and col of the frame
        var row = Math.floor(currentFrame / framesPerRow);
        var col = Math.floor(currentFrame % framesPerRow);

        ctx.drawImage(
           image,
           col * frameWidth, row * frameHeight,
           frameWidth, frameHeight,
           x, y,
           frameWidth, frameHeight);
    };
}

function ssFunction() {
    sprite = selector.options[selector.selectedIndex].value;
    switch (sprite) {
        case "1":
            mySpriteSheet = new SpriteSheet("kandi2.png", 125, 125, 2, 16);
            break;
        case "2":
            mySpriteSheet = new SpriteSheet("bot.png", 2096 / 8, 786 / 3, 2, 24);
            break;
        case "3":
            mySpriteSheet = new SpriteSheet("GoblinWalk.png", 756 / 6, 1344 / 8, 3, 48);
            break;
        case "4":
            mySpriteSheet = new SpriteSheet("nohat.png", 576 / 9, 256 / 4, 2, 36);
            break;
    }
}


mySpriteSheet = new SpriteSheet("kandi2.png", 125, 125, 2, 16);
//mySpriteSheet = new SpriteSheet("kandi.png", 60, 96, 2, 16); // 60,90
//mySpriteSheet = new SpriteSheet("volt.png", 180, 495 / 2, 2, 10);
//mySpriteSheet = new SpriteSheet("run.png", 900 / 6, 600 / 4, 2, 24);

function animate() {
    //requestAnimFrame(animate);
    ctx.clearRect(0, 0, 300, 300);

    mySpriteSheet.update();

    mySpriteSheet.draw(12.5, 12.5);
}