var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkeyImage;
var food, foodImage;
var obstacle, obstacleImage;
var scene, sceneImage;
var Score = 0;
var obstacleGroup, foodGroup;
var invisibleGround;

function preload() {
  
  sceneImage = loadImage("jungle.jpg");
  
  foodImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");

  monkeyImage = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");
}

function setup() {
  scene = createSprite(0,0,400,5);
  scene.addImage("jungle", sceneImage);
  scene.scale = 1;
  scene.velocityX = -7;
  scene.x = scene.width / 2;

  monkey = createSprite(200,180);
  monkey.addAnimation("play", monkeyImage);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(200,280,400,20);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
textSize(18);
textFont("Georgia");
}

function draw() {
  
  background(255);
  
  Score = Score + Math.round(World.frameRate/60);
  
  text("Survival Time: " + Score,200,100);
  


  if(gameState === PLAY) {
    if(scene.x < 0) {
      scene.x = scene.width / 2;
    }
    
    if(keyDown("space") && monkey.y >= 328) {
      monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.50;
  
  if(foodGroup.isTouching(monkey)) {
    monkey.scale = monkey.scale + 0.02 ;
  }
  
  if(obstacleGroup.isTouching(monkey)) {
  gameState = END;
  }
  }
  else if(gameState === END) {
    score = 0;
    
    text("Game Over",180,150);
    
    scene.velocityX = 0;
    food.velocityX = 0;
    obstacle.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
  }
  
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  Obstacle();

  Food();

  Camera();
}

function Obstacle() {
    if(World.frameCount % 300 === 0) {
    obstacle = createSprite(400,250);
    obstacle.addAnimation("Stone", obstacleImage);
    obstacle.velocityX = -8;
    obstacle.scale = 0.20;
    obstacle.lifetime = 50;
    obstacleGroup.add(obstacle);
  }
}

function Food() {
  if(World.frameCount % 80 === 0) {
    food = createSprite(400,random(120,200));
    food.addAnimation("Banana", foodImage);
    food.velocityX = -8;
    food.scale = 0.05;
    food.lifetime = 50;
    foodGroup.add(food);
  }
  
  function Camera() {
    camera.x = monkey.x;
    camera.y = monkey.y;
  }
}