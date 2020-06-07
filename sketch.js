var ball, ballimg,paddleimg,paddle;
var gameState;
var gameOver , gameRestart, overImg, restartImg;
var count = 0;
function preload() {
  
    ballimg = loadImage("ball.png");
    paddleimg = loadImage("paddle.png");
    overImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
}
function setup() {
  createCanvas(400, 400);
   ball = createSprite(200,200,10,10);
   ball.addImage(ballimg);
   ball.velocityX = 9;   

   paddle = createSprite(100,100,10,10);
   paddle.addImage(paddleimg);
   
   gameOver = createSprite(200,200,10,10);
   gameOver.addImage(overImg);
   gameOver.scale = 0.4;
   gameOver.visible = false;
  
   restart = createSprite(350, 200, 10,10);
   restart.addImage(restartImg);
   restart.scale = 0.4;
   restart.visible = false;
  
   gameState = "Play";
  
  /* give the ball an initial velocity of 9 in the X direction */
  

}

function draw() {
  background(205,153,0);
  
   
  edges = createEdgeSprites();
  if(gameState == "Play"){
    
  ball.bounceOff(edges[3]);
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[2]);
  paddle.bounceOff(edges[0]);
  paddle.bounceOff(edges[1]);
  paddle.bounceOff(edges[2]);
  paddle.bounceOff(edges[3]);
  
  if(keyDown(UP_ARROW))
  {
     paddle.velocityY = -3;
  }
  
  if(keyDown(DOWN_ARROW))
  {
    paddle.velocityY = 3;
  }
  
  if(ball.bounceOff(paddle)){
    randomVelocity();
  }  
    
       count = count  + Math.round(World.frameRate / 60);
      
  }
  
  
  if(ball.x < 0){
     gameState = "End";
   }
  
  if(gameState == "End"){
    count = 0;
    restart.visible = true;
    gameOver.visible = true;
    ball.velocityX = 0;
    ball.x = 200;
    ball.y = 200;
    paddle.velocityX = 0;
   }
  
  if(mousePressedOver(restart)){
     restartGame();
   }
  
  text("Score:" + count, 30,30);
  text("FPS:" + Math.round(World.frameRate),50,50);
  drawSprites();
  
}

function randomVelocity()
{
  var gen_random_velocity = random(1,20);
  ball.velocityX = 5;
}


function restartGame(){
  gameState = "Play";
  gameOver.visible = false;
  restart.visible = false;
  ball.velocityX = 9;
  
 }
