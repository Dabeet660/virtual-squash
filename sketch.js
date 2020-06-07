var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var CloudGroup , cloudIamge ;
var ObstacleGroup, ObstacleImage1, ObstacleImage2, ObstacleImage3, ObstacleImage4, ObstacleImage5, ObstacleImage6;
var gameState;
var count = 0; 
var gameOver, gameRestart, gameOverImage, gameRestartImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  ObstacleImage1 = loadImage("obstacle1.png");
  ObstacleImage2 = loadImage("obstacle2.png");
  ObstacleImage3 = loadImage("obstacle3.png");
  ObstacleImage4 = loadImage("obstacle4.png");
  ObstacleImage5 = loadImage("obstacle5.png");
  ObstacleImage6 = loadImage("obstacle6.png");

  gameOverImage = loadImage("gameOver.png");
  gameRestartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(1920, 1080);
  
  trex = createSprite(50,380,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  
  gameState = "Play";
  
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;

  CloudGroup = new Group();
  ObstacleGroup = new Group();

  gameOver = createSprite(200,200,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.4;
  
  gameRestart = createSprite(350, 200, 10,10);
  gameRestart.addImage(gameRestartImage);
  gameRestart.visible = false;
  gameRestart.scale = 0.4;

}

function draw() {
  background(255);
  
   trex.collide(invisibleGround);

  if(gameState == "Play"){
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  count =  count +  Math.round((World.frameRate) / 60);
  
  SpawnClouds();
  SpawnObs();
  

  if(ObstacleGroup.isTouching(trex)){
      gameState = "Finish";
      }
  }

  if(gameState == "Finish"){
     count = 0;
     trex.velocityY = 0;
     ground.velocityX = 0;
     gameOver.visible = true;
     gameRestart.visible = true;
     CloudGroup.setVelocityEach(0);
     ObstacleGroup.setVelocityEach(0);
    
    if(mousePressedOver(gameRestart)){
       restartGame()
     }
  }
  drawSprites();
  text("Score:" + count, 300,100);
  
  
}


function SpawnObs(){
  if(frameCount%90 == 0){
     var obstacles = createSprite(600,360,10,10);
     var randomNumber = Math.round(random(1,6));
     switch(randomNumber){
       case 1:
         obstacles.addImage(ObstacleImage1);
       break;
       case 2:
         obstacles.addImage(ObstacleImage2);
       break;
       case 3:
         obstacles.addImage(ObstacleImage3);
       break;
       case 4:
         obstacles.addImage(ObstacleImage4);
       break;
       case 5:
         obstacles.addImage(ObstacleImage5);
       break;
       case 6:
         obstacles.addImage(ObstacleImage6);
       break;
      }
    obstacles.scale = 0.7;
    obstacles.velocityX = -6;
    obstacles.lieftime = 100;
    ObstacleGroup.add(obstacles);
    
   }
}

function SpawnClouds(){
   if(frameCount%60 == 0){
    var cloud = createSprite(600,Math.round(random(0,350)),10,10);
    cloud.addImage(cloudImage);
    cloud.velocityX = -3;
    CloudGroup.add(cloud);
    cloud.lifetime = 200;
    }
}

function restartGame(){
  gameState = "Play";
  gameOver.visible = false;
  gameRestart.visible = false;
  CloudGroup.setVelocityXEach(-3);
  ObstacleGroup.setVelocityXEach(-6);
  }
