var SET = 0,
  PLAY = 1,
  END = 2;
var gameState = SET;

var bk, bkk;

var alien, alienR;

var invisibleG;

var hold, hold2, baw, bawBk;


var devil, devilbk, devilGroup;

var skull, skullbk, skullGroup;

var coin, coinbk, coinGroup;

var pack, packItem = 0,
  packbk;

var score = 0;


var l, lbk, r, rbk;

var Backbk;

var start, startbk;

var strtBk, str;


function preload() {

  backbk = loadImage("abstract-blue-technology-geometric-and-connection-system-electronic-circuit-background-vector.jpg")

  bkk = loadImage("mg22630164.600-1_800.jpg");


  alienR = loadAnimation("alien 1.png", "alien 2.png");

  devilbk = loadImage("devil.png");

  skullbk = loadImage("skull.png");

  coinbk = loadImage("coin.png");

  packbk = loadImage("coin.png");

  lbk = loadImage("left.png");

  rbk = loadImage("right.png");


  bawbk = loadImage("nameP.png");

  str = loadImage("start.png");

  startbk = loadImage("start button.png")


}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(backbk);

  bk = createSprite(width/2, height/2, 400, 400);
  bk.addImage(bkk);
  bk.scale = 0.75;
  //bk.velocityX = -5;


  alien = createSprite(width/2, 400, 50, 50);
  alien.addAnimation("run", alienR);
  alien.setCollider("rectangle", 0, 0, 65, 85, 0)

  //alien.debug = true

  invisibleG = createSprite(width/2, 440, bk.width, 10);
  invisibleG.visible = false;

  coinGroup = createGroup();

  devilGroup = createGroup();

  skullGroup = createGroup();


  
    
  hold = createSprite(width/2 - 200, height/2,5,height);
  hold.shapeColor = rgb(253, 96, 0);
  hold.visible = false;


  hold2 = createSprite(width/2 + 187.5, height/2,5,height);
  hold2.shapeColor = rgb(253, 96, 0);
  hold2.visible = false;
  
  baw = createSprite(width/2, 515, 20, 20);
  baw.scale = 0.80
  baw.addImage(bawbk);

  pack = createSprite(width/2 - 100, baw.y - 25, 20, 20);
  pack.addImage(packbk);
  pack.scale = 0.25

  l = createSprite(width/2 + 400, 400, 30, 30);
  l.addImage(lbk);
  l.scale = 0.75;
  //l.debug = true;

  r = createSprite(width/2 + 500, 400, 30, 30);
  r.addImage(rbk);
  r.scale = 0.75;
  //r.debug = true;

  strtBk = createSprite(width/2, 200, 600, 255)
  strtBk.addImage(str)
  strtBk.scale = 0.75;

  start = createSprite(width/2 - 2.5, 207.5)
  start.addImage(startbk)
  start.scale = 0.70;
  start.setCollider("circle",0,0,120);
  start.debug = false;



}

function draw() {

  drawSprites();
  
  text("Score: " + score, width/2 - 125, baw.y, fill("white"),textSize(20));

  alien.collide(invisibleG);

  alien.collide(hold);

  alien.collide(hold2);

  text("you", alien.x + 35, alien.y - 40, fill("white"), textSize(20));

  text("= " + packItem, pack.x + 20, pack.y + 5)

  baw.depth = pack.depth;
  pack.depth = pack.depth + 1

  if (gameState === SET) {
    packItem = 0;
    bk.velocityY = 0;
    start.visible = true;
    strtBk.visible = true;



    start.depth = strtBk.depth;
    start.depth = start.depth + 1

    if (mousePressedOver(start)) {
      gameState = PLAY;
      
    }


  }

  if (gameState === PLAY) {
    
    score = score + Math.round(setFrameRate() / 60);
    
    bk.velocityY = (8 + 3 * score / 100);

    if (bk.y > height) {
      bk.y = height / 2;
    }

    start.visible = false;
    strtBk.visible = false;


    if (mousePressedOver(l)) {
      alien.x = alien.x - 10;
    }

    if (mousePressedOver(r)) {
      alien.x = alien.x + 10;
    }


    evil1();

    evil2();

    goldCoin();

    if (coinGroup.isTouching(alien)) {
      packItem = packItem + 1
    }


    if(skullGroup.isTouching(alien)){
      gameState = END;
      alien.velocityY = 0;
    }
    
    if(devilGroup.isTouching(alien)){
      score = 0;
      packItem = 0;
    }


  }

  if (gameState === END){
    bk.velocityY = 0;

    start.visible = false;
    strtBk.visible = false;
    
    devilGroup.setVelocityXEach(0);
    devilGroup.destroyEach();
    
    skullGroup.setVelocityXEach(0);
    skullGroup.destroyEach();
    
    coinGroup.setVelocityXEach(0);
    coinGroup.destroyEach();
    
    devilGroup.setLifetimeEach(-1);
    skullGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    
    text("click on the alien to restart",width/2 - 175,200, textSize(30));
    
    if (mousePressedOver(alien)){
      replay();
    }
  }
  
}

function evil1() {

  if (frameCount % 230 === 0) {
    devil = createSprite(random(width/2 - 100, width/2 + 100), 0, 20, 20);
    devil.addImage(devilbk);
    devil.scale = 0.15;
    devil.velocityY = (8 + 3 * score / 100);
    
    //devil.setCollider("rectangle",0,0,350,350,0);
    //devil.debug = true;


    
    devil.lifetime = height/-(8 + 3 * score / 100);
    
    devilGroup.add(devil);
    
    baw.depth = devil.depth;
    baw.depth = baw.depth + 1

  }
}

function evil2() {

  if (frameCount % 100 === 0) {
    skull = createSprite(random(width/2 - 100, width/2 + 100), 0, 20, 20);
    skull.addImage(skullbk);
    skull.scale = 0.15;
    skull.velocityY = (8 + 3 * score / 100);
    
    //skull.setCollider("circle",0,0,125);
    //skull.debug = true;

    
    skull.lifetime = height/-(8 + 3 * score / 100);
    
    skullGroup.add(skull);

    baw.depth = skull.depth;
    baw.depth = baw.depth + 1

  }
}

function goldCoin() {

  if (frameCount % 150 === 0) {
    coin = createSprite(random(width/2 - 200, width/2 + 100), 0, 20, 20);
    coin.addImage(coinbk);
    coin.scale = 0.35;
    coin.velocityY = (8 + 3 * score / 100);

    //coin.setCollider("circle", 0, 0, 40);

    coin.lifeItem = height/-(8 + 3 * score / 100);
    
    coinGroup.add(coin);

    baw.depth = coin.depth;
    baw.depth = baw.depth + 1

  }

}

function replay (){
  
  gameState = SET;
  
  packItem = 0;
  
  score = 0;
  
  alien.y = 400;

  alien.x = width/2;


  
}