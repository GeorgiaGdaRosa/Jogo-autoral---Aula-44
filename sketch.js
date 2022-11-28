var bg, backgroundImg
var girl, girlBlink, girlWalk
var solo
var plataformaPosition = [
   { x: 320, y: 230 },
   { x: 500, y: 200 },
   { x: 1000, y: 220 },
   { x: 1500, y: 230 },
   { x: 1700, y: 200 }
]
var plataformas
var plataformaImg
var bordas
var bearImg, bearGroup
var bearPositions = [
   { x: 200, y: 270}
]
var bearDirection = "right"
var beeImg, beeGroup
var beePositions = [
   { x: 360, y: 150}
]
var beeDirection = "right"
var wolfImg, wolfGroup
var wolfPositions = [
   { x: 500, y: 270}
]
var wolfDirection = "right"
var girlDirection = null
var heart1, heart2, heart3, heartImg


function preload() {
   backgroundImg = loadImage("./assets/background2.png")
   girlBlink = loadAnimation("./assets/blink_1.png", "./assets/blink_2.png", "./assets/blink_3.png", "./assets/blink_4.png")
   girlWalk = loadAnimation("./assets/walk_1.png", "./assets/walk_2.png", "./assets/walk_3.png", "./assets/walk_4.png", "./assets/walk_5.png", "./assets/walk_6.png", "./assets/walk_7.png")
   plataformaImg = loadImage("./assets/ground.png")
   bearImg = loadAnimation("./assets/bear_walk1.png", "./assets/bear_walk2.png", "./assets/bear_walk3.png")
   beeImg = loadImage("./assets/bee.png")
   wolfImg = loadAnimation("./assets/wolf_walk1.png", "./assets/wolf_walk2.png", "./assets/wolf_walk3.png", "./assets/wolf_walk4.png", "./assets/wolf_walk5.png")
   heartImg = loadImage("./assets/heart.png")
}

function setup() {
   canvas = createCanvas(700, 300)
   bg = createSprite(350, 150)
   bg.addImage(backgroundImg)

   heart1 = createSprite(20,20)
   heart1.addImage(heartImg)
   heart1.scale = 0.2

   heart2 = createSprite(60,20)
   heart2.addImage(heartImg)
   heart2.scale = 0.2

   heart3 = createSprite(100,20)
   heart3.addImage(heartImg)
   heart3.scale = 0.2

   girl = createSprite(30, 240)
   girlBlink.frameDelay = 10
   girl.addAnimation("girlBlink", girlBlink)
   girl.addAnimation("walk", girlWalk)
   solo = createSprite(width / 2, height - 10, width, 10)
   solo.visible = false
   plataformas = new Group()
   for (var i = 0; i < plataformaPosition.length; i++) {
      var plataforma = createSprite(plataformaPosition[i].x, plataformaPosition[i].y, 50, 20)
      plataformas.add(plataforma)
      plataforma.addImage(plataformaImg)
      plataforma.scale = 0.6
   }
   bordas = createEdgeSprites()
   bearGroup = new Group()
   beeGroup = new Group()
   wolfGroup = new Group()
   spawBears()
   spawBees()
   spawWolfs()


}

function draw() {
   background(220)
   girl.collide(bordas)
   girl.collide(bearGroup)
   girl.collide(beeGroup)
   girl.collide(wolfGroup)

   if (bg.x < -350) {
      bg.x = bg.width / 2
   }



   playerControls()

   // Ajustei a velocidade para a mesma que foi definida inicialmente na função que gera os inimigos 0.8

   if (frameCount % 200 === 0) {
      if (bearDirection == "right" && girlDirection !== "left") {
         bearGroup.setVelocityXEach(0.8)
         bearGroup.setMirrorXEach(1)
         bearDirection = "left"
      } else if (bearDirection == "left" && girlDirection !== "right") {
         bearGroup.setVelocityXEach(-0.8)
         bearGroup.setMirrorXEach(-1)
         bearDirection = "right"

         // Velocida oposta a garota ficou 2
      } else if (bearDirection == "right" && girlDirection == "left") {
         bearGroup.setVelocityXEach(2)
         bearGroup.setMirrorXEach(1)
         bearDirection = "left"
      } else if (bearDirection == "left" && girlDirection == "right") {
         bearGroup.setVelocityXEach(-2)
         bearGroup.setMirrorXEach(-1)
         bearDirection = "right"

      }
   }


   if (frameCount % 100 === 0) {
      if (beeDirection == "left" && girlDirection !== "right") {
         beeGroup.setVelocityXEach(-0.8)
         beeGroup.setMirrorXEach(1)
         beeDirection = "right"
      } else if (beeDirection == "right" && girlDirection !== "left") {
         beeGroup.setVelocityXEach(0.8)
         beeGroup.setMirrorXEach(-1)
         beeDirection = "left"
      } else if (beeDirection == "left" && girlDirection == "right") {
         beeGroup.setVelocityXEach(-2)
         beeGroup.setMirrorXEach(1)
         beeDirection = "right"
      } else if (beeDirection == "right" && girlDirection == "left") {
         beeGroup.setVelocityXEach(2)
         beeGroup.setMirrorXEach(-1)
         beeDirection = "left"
      }
   }

   if (frameCount % 170 === 0) {
      if (wolfDirection == "right" && girlDirection !== "left") {
         wolfGroup.setVelocityXEach(0.8)
         wolfGroup.setMirrorXEach(1)
         wolfDirection = "left"
      } else if (wolfDirection == "left" && girlDirection !== "right"){
         wolfGroup.setVelocityXEach(-0.8)
         wolfGroup.setMirrorXEach(-1)
         wolfDirection = "right"

      }else if (wolfDirection == "right" && girlDirection == "left") {
         wolfGroup.setVelocityXEach(2)
         wolfGroup.setMirrorXEach(1)
         wolfDirection = "left"
      } else if (wolfDirection == "left" && girlDirection == "right"){
         wolfGroup.setVelocityXEach(-2)
         wolfGroup.setMirrorXEach(-1)
         wolfDirection = "right"

      }
   }

   if(girl.collide(bearGroup || beeGroup || wolfGroup)){
      heart3.visible = false
   }  
   
   if(girl.collide(bearGroup || beeGroup || wolfGroup) && heart3.visible == false){
      heart2.visible = false
      girl.x = 30
   } 
   
   if(girl.collide(bearGroup || beeGroup || wolfGroup) && heart3.visible == false && heart2.visible == false){
      heart1.visible = false
      girl.x = 30
}


   drawSprites()
   text("x:" + mouseX + "y:" + mouseY, mouseX, mouseY)
  

}

function playerControls() {
   bg.velocityX = 0
   plataformas.setVelocityXEach(0)
   girl.collide(solo)
   girl.velocityY += 0.8
   girl.changeAnimation("girlBlink")
   //definindo a direção como null no início da função
   girlDirection = null
   if (keyIsDown(RIGHT_ARROW)) {
      girl.changeAnimation("walk", girlWalk)
      girl.mirrorX(1)
      bg.velocityX = -1
      plataformas.setVelocityXEach(-1)
      girl.x += 1
      girlDirection = "right"
   }

   if (keyIsDown(LEFT_ARROW)) {
      girl.changeAnimation("walk", girlWalk)
      girl.mirrorX(-1)
      girl.x -= 1
      bg.velocityX = 1
      plataformas.setVelocityXEach(1)
      girlDirection = "left"
   }

   // apaguei o if que mudava a direção da garota para null

   if (keyDown("space") && girl.y >= 240) {
      girl.velocityY = -10
   }

   if (girl.collide(plataformas)) {
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
      girl.velocityX = 0
      if (keyDown("space")) {
         girl.velocityY = -10
      }
   }

   if(girl.collide(solo)){
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
      if (keyDown("space") && girl.y>=240){
         girl.velocityY = -10
      }
   }

}

function spawBears() {

   for (var i = 0; i < bearPositions.length; i++) {
      var bear = createSprite(bearPositions[i].x, bearPositions[i].y)
      bear.addAnimation("walk", bearImg)
      bear.scale = 0.8
      bear.velocityX = 0.8
      bearGroup.add(bear)
   }
}

function spawBees() {

   for (var i = 0; i < beePositions.length; i++) {
      var bee = createSprite(beePositions[i].x, beePositions[i].y)
      bee.addImage(beeImg)
      bee.scale = 0.5
      bee.velocityX = 0.8
      bee.mirrorX(-1)
      beeGroup.add(bee)
   }
}

function spawWolfs() {
   for (var i = 0; i < wolfPositions.length; i++) {
      var wolf = createSprite(wolfPositions[i].x, wolfPositions[i].y)
      wolf.addAnimation("wolf", wolfImg)
      wolf.velocityX = 0.8
      wolfGroup.add(wolf)
   }
}