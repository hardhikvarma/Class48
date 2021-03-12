var PLAY = 1;
var END = 0;
var GameState = PLAY;
var Bow1Score, Bow2Score;
var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bow2, bow2_img, arrow2, arrow_img2;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var arrowGroup,bowGroup;
var arrow2Group,bow2Group;
var redB, greenB, blueB, pinkB; 
var bird, bird_img;
var greenB2_img, redB2_img, pinkB2_img, blueB2_img;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  arrow_img2 = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  bow2_img = loadImage("bow0.png");
  red_balloonImage = loadAnimation("red_balloon0.png");
  green_balloonImage = loadAnimation("green_balloon0.png");
  pink_balloonImage = loadAnimation("pink_balloon0.png");
  blue_balloonImage = loadAnimation("blue_balloon0.png");
  bird_img = loadImage("bird.png");
  greenB2_img = loadAnimation("greenballoon2.jpg");
  redB2_img = loadAnimation("redballoon2.png");
  pinkB2_img = loadAnimation("pinkballoon2.jpg");
  blueB2_img = loadAnimation("blueballoon2.jpg");
}



function setup() {
  createCanvas(500, 500);
  
  //creating background
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 2.5

  
   Bow1Score = 0;
   Bow2Score = 0;
 
  arrowGroup = new Group();
  bowGroup = new Group();
  arrow2Group = new Group();
  bow2Group = new Group();
  redB = new Group();
  greenB = new Group();
  blueB= new Group();
  pinkB= new Group();
  birdGroup = new Group();
    
  // creating bow to shoot arrow
  bow = createSprite(480,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  bowGroup.add(bow);

  bow2 = createSprite(480,185,20,50);
  bow2.addImage(bowImage); 
  bow2.scale = 1;
  bow2Group.add(bow2);
}

function draw() {

  //GameState = play
  if(GameState === PLAY)
  {
    
       background.velocityX = -3 
      if (background.x < 0)
      {
        background.x = background.width/2;
      }
    
    if(arrowGroup.isTouching(redB))
    {
      redB.destroyEach();
      arrowGroup.destroyEach();
      Bow1Score = Bow1Score + 1;
      red.changeAnimation("balloon1",redB2_img);
    }
    
    if(arrowGroup.isTouching(pinkB))
    {
      pinkB.destroyEach();
      arrowGroup.destroyEach();
      Bow1Score = Bow1Score + 1;
      pink.changeAnimation("balloon2",pinkB2_img);
    }
    
    if(arrowGroup.isTouching(greenB))
    {
      greenB.destroyEach();
      arrowGroup.destroyEach();
      Bow1Score = Bow1Score + 1;
      green.changeAnimation("balloon3",greenB2_img);
    }
    
    if(arrowGroup.isTouching(blueB))
    {
      blueB.destroyEach();
      arrowGroup.destroyEach();
      Bow1Score = Bow1Score + 1;
      blue.changeAnimation("balloon4",blueB2_img);
    }
    
    //2nd bow
    if(arrow2Group.isTouching(redB))
    {
      redB.destroyEach();
      arrow2Group.destroyEach();
      Bow2Score = Bow2Score + 1;
    }
    
    if(arrow2Group.isTouching(pinkB))
    {
      pinkB.destroyEach();
      arrow2Group.destroyEach();
      Bow2Score = Bow2Score + 1;
    }
    
    if(arrow2Group.isTouching(greenB))
    {
      greenB.destroyEach();
      arrow2Group.destroyEach();
      Bow2Score = Bow2Score + 1;
    }
    
    if(arrow2Group.isTouching(blueB))
    {
      blueB.destroyEach();
      arrow2Group.destroyEach();
      Bow2Score = Bow2Score + 1;
    }
    
    if(bowGroup.isTouching(redB)||bowGroup.isTouching(greenB)||
       bowGroup.isTouching(blueB)||bowGroup.isTouching(pinkB)||bow2Group.isTouching(redB)||bow2Group.isTouching(greenB)||
       bow2Group.isTouching(blueB)||bow2Group.isTouching(pinkB)||Bow1Score == 25|| Bow2Score == 25||arrow2Group.isTouching(birdGroup)||arrowGroup.isTouching(birdGroup))
      {
        GameState = END;
        fill("black");
        textSize(40)
        text("GAMEOVER",120,200);
      }
  }
  
  //GameState = end
  if(GameState === END){
    arrow.x = 0; 
    bow.velocityY = 0;
    bow2.velocityY = 0;
    background.velocityX = 0;
    
    arrowGroup.setVelocityXEach(0);
    pinkB.setVelocityXEach(0);
    greenB.setVelocityXEach(0);
    blueB.setVelocityXEach(0);
    redB.setVelocityXEach(0);
    
  }
  
  //moving bow
  bow.y = World.mouseY
  
  if(keyDown("UP_ARROW")){
    bow2.y = bow2.y-5;
  }

  if(keyDown("DOWN_ARROW")){
    bow2.y = bow2.y+5;
  }
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
    
  }
  if(keyDown("s")){
    createArrow2();
  }
  
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }

var select_bird = Math.round(random(1,2));

if(World.frameCount % 150 == 0){
  if(select_bird == 1){
    birds();
  }else{
    birds2();
  }
}
  
  drawSprites();

    textSize(20);
    fill("red");
    text("Bow1: "+ Bow1Score, 100,50);

    textSize(20);
    fill("black");
    text("Bow2: "+ Bow2Score, 300,50);
}


function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addAnimation(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  
  //adding group to the balloon
  redB.add(red);  
  
  return red;
  
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addAnimation(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  
  //adding group to the balloon
  blueB.add(blue);
  
  return blue;
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addAnimation(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  
  //adding group to the balloon
  greenB.add(green);
  
  return green;   
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addAnimation(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1;
  
  //adding group to the balloon
  pinkB.add(pink);
  
  return pink;
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y = bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
   
  //adding group to the arrow
   arrowGroup.add(arrow);  
    
 return arrow;
   
}

function createArrow2() {
  var arrow2= createSprite(100, 100, 60, 10);
  arrow2.addImage(arrow_img2);
  arrow2.x = 360;
  arrow2.y = bow2.y;
  arrow2.velocityX = -4;
  arrow2.lifetime = 100;
  arrow2.scale = 0.3;
   
  //adding group to the arrow
   arrow2Group.add(arrow2);  
    
 return arrow2;
   
}

function birds() {
  var bird = createSprite(0,Math.round(random(20, 370)), 10, 10);
  bird.addImage(bird_img);
  bird.velocityX = 3;
  bird.lifetime = 150;
  bird.scale = 0.25;
  //bird.debug = true;
  
  birdGroup.add(bird);
  
  return bird;
}

function birds2() {
  var bird2 = createSprite(0,Math.round(random(20, 370)), 10, 10);
  bird2.addImage(bird_img);
  bird2.velocityX = 3;
  bird2.lifetime = 150;
  bird2.scale = 0.25;
  //bird2.debug = true;
 
  birdGroup.add(bird2);
  
  return bird2;
}


