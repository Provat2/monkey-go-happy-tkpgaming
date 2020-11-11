//declaring monkey property
var monkey , monkey_running;
//declaring obstacle property
var banana ,bananaImage, obstacle, obstacleImage;
//declaring groups
var fruitsGroup, obstaclesGroup;
//declaring score
var score;
//declaring ground property
var ground;


//giving game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;//assigning game state as play

//image loading
function preload(){
  
  
  //loading monkey animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  //loading banana image
  bananaImage = loadImage("banana.png");
  //loading obstacle image
  obstacleImage = loadImage("obstacle.png");
 
}


//setup function
function setup() {
  //creating canvas
  createCanvas(600,600);

  //creating monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);//adding animation
  monkey.scale = 0.1;//scaling monkey image
  //setting collider of monkey
  monkey.setCollider("rectangle",0,0,7,monkey.height);
  
 //creating ground
  ground = createSprite(300, 450, 600, 15);    
  
  //setting score as 0
  score = 0;
  
  //creating groups
  fruitsGroup = new Group();
  obstaclesGroup = new Group();
  
}

//drawing 
function draw() {
  
  //giving background color
  background ("cyan");
  
  //displaying score
  fill("black");
  textSize(20);
  text("Score:"+  score, 500, 50);
  
 //colliding with ground so that it dont fall off
  monkey.collide(ground);
  
  //play state behaviour
  if(gameState === PLAY){

    //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 400) {
        monkey.velocityY = -16;
    }    
   
    //giving gravity
    monkey.velocityY = monkey.velocityY + 0.9;
    
    //adding score if get the fruit
    if(fruitsGroup.isTouching(monkey)) {
      fruitsGroup.destroyEach();
      score += 1;
    }
    //spawing fruits
    fruits();
    //spawning obstacles
    obstacles();
    
    //loses when touches the obstacles
    if(obstaclesGroup.isTouching(monkey)){  
        gameState = END;     
    }
  }
  //end state behaviour
  else if (gameState === END) {
    //stopped the movement of obstacles
    obstaclesGroup.setVelocityXEach(0);
    //stops from disappering 
    obstaclesGroup.setLifetimeEach(-1);
     
    //stopped the movement of fruits
    fruitsGroup.setVelocityXEach(0);
    //stops from disappering 
    fruitsGroup.setLifetimeEach(-1);
    
    //stopping monkey jump
    monkey.velocityY = 0;
    
    //stopping restart option and game over shown
    textSize(20);
    text("Press 'r' to restart", 100, 500);
    textSize(30);
    text("GAME OVER", 200, 300);
    
    //reset option
    if (keyDown("r")){
      gameState = PLAY;
      obstaclesGroup.destroyEach();
      fruitsGroup.destroyEach();
      score = 0;
    }

  }
  
  //drawing sprites
  drawSprites();
}

//creating fruits
function fruits() {
  if (frameCount % 170 === 0) {
    banana = createSprite(600,450,40,10);//creating
    banana.addImage(bananaImage);//adding image
    banana.y = Math.round(random(390,430));//randomize
    banana.scale = 0.1;//scaling 
    
    banana.velocityX = -(7 + (score/2));//velocity
    banana.lifetime = 600;//lifetime
    
    fruitsGroup.add(banana);//adding to groups
  }
}

//creating obstacles
function obstacles() {
  if (frameCount % 60 === 0){
    obstacle = createSprite(600,425,10,10);//creating
    obstacle.addImage(obstacleImage);//adding image
    obstacle.scale = 0.1 ;//scaling
    
    obstacle.velocityX = -(7 + (score/2));//velocity
    obstacle.lifetime = 600;//lifetime    
    
    obstaclesGroup.add(obstacle);//adding to groups
  }
}




