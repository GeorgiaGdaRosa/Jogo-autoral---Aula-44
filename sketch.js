var bg, backgroundImg
var girl, girlBlink, girlWalk
var solo
var plataformaPosition=[
   {x:320,y:230},
   {x:500,y:200},
   {x:1000,y:220},
   {x:1500,y:230},
   {x:1700,y:200}
]
var plataformas 
var plataformaImg

function preload() {
   backgroundImg = loadImage("./assets/background2.png")
   girlBlink = loadAnimation("./assets/blink_1.png", "./assets/blink_2.png", "./assets/blink_3.png", "./assets/blink_4.png")
   girlWalk = loadAnimation("./assets/walk_1.png", "./assets/walk_2.png", "./assets/walk_3.png", "./assets/walk_4.png", "./assets/walk_5.png", "./assets/walk_6.png", "./assets/walk_7.png")
   plataformaImg = loadImage("./assets/ground.png")
}

function setup() {
   canvas = createCanvas(700, 300)
   bg = createSprite(350, 150)
   bg.addImage(backgroundImg)
   girl = createSprite(30, 240)
   girlBlink.frameDelay = 10
   girl.addAnimation("girlBlink", girlBlink)
   girl.addAnimation("walk", girlWalk)
   solo = createSprite(width/2,height-10,width,10)
   solo.visible = false
   plataformas = new Group()
   for(var i = 0;i<plataformaPosition.length;i++){
      var plataforma = createSprite(plataformaPosition[i].x,plataformaPosition[i].y,50,20)
      plataformas.add(plataforma)
      plataforma.addImage(plataformaImg)
      plataforma.scale = 0.6
   }
}

function draw() {
   background(220)
   //girl.collide(plataformas)

   if (bg.x < -350) {
      bg.x = bg.width / 2
   }

   playerControls()

   drawSprites()
   text("x:" + mouseX + "y:" + mouseY, mouseX, mouseY)
   

}

function playerControls() {
   bg.velocityX = 0
   plataformas.setVelocityXEach(0)
   //girl.collide(solo)
   girl.velocityY+= 0.8
   girl.changeAnimation("girlBlink")
   if (keyIsDown(RIGHT_ARROW)) {
      girl.changeAnimation("walk", girlWalk)
      girl.mirrorX(1)
      bg.velocityX = -1
      plataformas.setVelocityXEach(-1)
      girl.x += 1.2
   }

   if (keyIsDown(LEFT_ARROW)) {
      girl.changeAnimation("walk", girlWalk)
      girl.mirrorX(-1)
      girl.x -= 1.2
      bg.velocityX = 1
      plataformas.setVelocityXEach(1)
   }

  // if (keyDown("space") && girl.y>=240){
     // girl.velocityY = -10
   //}

   if(girl.collide(plataformas)){
      if (keyDown("space")){
         girl.velocityY = -10
      }
   }

   if(girl.collide(solo)){
      if (keyDown("space") && girl.y>=240){
         girl.velocityY = -10
      }
   }
}





