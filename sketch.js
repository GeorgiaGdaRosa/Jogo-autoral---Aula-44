var bg, backgroundImg
var girl, girlBlink, girlWalk

function preload() {
   backgroundImg = loadImage("./assets/background2.png")
   girlBlink = loadAnimation("./assets/blink_1.png", "./assets/blink_2.png", "./assets/blink_3.png", "./assets/blink_4.png")
   girlWalk = loadAnimation("./assets/walk_1.png", "./assets/walk_2.png", "./assets/walk_3.png", "./assets/walk_4.png", "./assets/walk_5.png", "./assets/walk_6.png", "./assets/walk_7.png")
}

function setup() {
   canvas = createCanvas(700, 300)
   bg = createSprite(350, 150)
   bg.addImage(backgroundImg)
   girl = createSprite(30, 240)
   girlBlink.frameDelay = 10
   girl.addAnimation("girlBlink", girlBlink)
   girl.addAnimation("walk", girlWalk)
}

function draw() {
   background(220)


   if (bg.x < -350) {
      bg.x = bg.width / 2
   }

   playerControls()

   drawSprites()
   text("x:" + mouseX + "y:" + mouseY, mouseX, mouseY)
}

function playerControls() {
   bg.velocityX = 0
   girl.changeAnimation("girlBlink")
   if (keyIsDown(RIGHT_ARROW)) {
      girl.changeAnimation("walk", girlWalk)
      bg.velocityX = -1
   }
}



