var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Boy, Boy_running, Boy_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle2, obstacle6;

var score;

var gameOverImg,restartImg


function preload(){
  Boy_running = loadAnimation("");
  Boy_collided = loadAnimation("");
  
  groundImage = loadImage("");
  
  cloudImage = loadImage("");
  
  obstacle2 = loadImage("");
  obstacle6 = loadImage("");
  
  restartImg = loadImage("")
  gameOverImg = loadImage("")
  
}

function setup() {
  createCanvas(600, 200);
  
  Boy = createSprite(50,180,20,50);
Boy.addAnimation("run",);
  Boy.addAnimation("collide" ,);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",);
  ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage();
  
  restart = createSprite(300,140);
  restart.addImage();
  
  gameOver.scale = 0.6;
  restart.scale = 0.6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
 
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  Boy.setCollider("circle",0,0,40,);
  Boy.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180

  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    
    ground.velocityX = -(4 + 3 * score/100);
    
    score = score + Math.round(frameCount/60);
    
    if (score % 100 == 0 & score>0)
    checkPointSound.play();

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
    }
    

   trex.velocityY = trex.velocityY + 0.8
  
    
    spawnClouds();
  
    
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(Boy)){
    
        Boy.velocityY=-12;
    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      Boy.velocityY = 0
     
      
      Boy.changeAnimation("collided",);
     

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 

  Boy.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle2);
              break;
      case 2: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
              
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {

  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage();
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    
    cloud.lifetime = 134;
    
    cloud.depth = Boy.depth;
    Boy.depth = Boy.depth + 1;
    
    
   cloudsGroup.add(cloud);
    }
}

