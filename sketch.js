    //creating variables
    var monkey , monkeyrunning
    var banana ,bananaImage, obstacle, obstacleImage
    var bananaGroup, obstacleGroup
    var SurvivalTime=0;
    var gameState=1;




function preload()
{
  
    //loading image
    monkeyrunning =                        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
 
}



function setup()
{
  
    //creating canvas
    createCanvas(400,370); 
    // cretaing sprite
    monkey=createSprite(80,315,20,20);
    monkey.addAnimation("moving",monkeyrunning);
    monkey.scale=0.1;
  
    ground=createSprite(400,350,900,10);
    ground.velocityX=-4;
    ground.x=ground.width/2;
    console.log(ground.x);
  
  
  //createing group
    bananaGroup=new Group();
    obstacleGroup=new Group();

}


function draw() 
{

    //creating background
    background("lightgreen");
 
    //creating text
    stroke("black");
    textSize=20;
    fill("black");
    SurvivalTime=Math.round(frameCount/frameRate())
    text ("SurvivialTime:"+SurvivalTime,100,50)
           
 
    // making monkey to colide with ground
   
     monkey.collide(ground);
  
  
   if(gameState===1)
{
     //making the ground move
    if (ground.x<0)
  {
    ground.x=ground.width/2
  }
    if (keyDown("space"))
  {
    monkey.velocityY=-12;
  }
    monkey.velocityY=monkey.velocityY +0.8;
    
    if (ground.x<0){
    ground.x=ground.width/2;
  }
    //calling
    food();
    stone();
     if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
     if (obstacleGroup.isTouching(monkey))
  {
    gameState=0;
  }
  }

  
    drawSprites();
 
 
  if (gameState===0){
    

    text("GAMEOVER",100,150);
    monkey.velocityX=0;
    monkey.velocityY=0;
    bananaGroup.setVelocityXEach(0);
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    SurvivalTime=0;
    monkey.destroy();
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    
  }
  
 
   
}
 
//cretaeing a sepearte fuction
function food()
{
    if (frameCount%80===0)
    {
    banana=createSprite(150,150,20,20);
  
    
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(50,100));
    banana.velocityX=-2;
    banana.lifetime=150;
    bananaGroup.add(banana);
      
   
  }
}

function stone()
{
    if (frameCount%300===0)
  {
    obstacle=createSprite(400,330,900,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-4;
    //obstacle.y=Math.round(random(100,300));
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);
    
  }
}
