// general variables
var telegram; //start screen for games
var mainMap; //main map
var balloon; // hot air balloon
var balloonX, balloonY; // balloon's positions
var theme; //theme music var


// UK variables
// room background variable
var room;

// start screen background
var telegram;

// character variable
var foggUK;

// hat variable
var tophat1;

// cat variable
var cat;

// character position
var xFoggUK = 0, yFoggUK = 355;

// score
var scoreEngland = 0;

// character speed
speedFoggUK = 2;

// hat speed
speedHat = 2;

// Egypt variables
var tomb;
// mummy orientations
var mummyRight, mummyLeft;
// fogg character
var fogg
// fogg positions
var xFogg = 220; yFogg = 220;
//diamond
var diamond;
// mummy positions
var xMummy = 0; yMummy = 220;
// diamond positions
var xDiamond, yDiamond;
// fogg speed
var speedFogg = 2;
// mummy speed
var speedMummy = 1;
// score
var score = 0;
// lives
var lives = 3;


// India variables
var fogg;
var elephantArtwork;
var balloon;
var elephants = [];
var points = 0;
var time;
var playing = 0;
var result;
var heartsLeft = 3;

// Hong Kong variables
var goodDimsum;
var badDimsum;
var fogg;
var bgHK, intro;
var goodDimsums = [];
var badDimsums = [];
var pointsHK = 0;
var timeHK;
var playingHK = 0;
var resultHK;

// Japan variables
var foggJapan, timeJapan, resultJapan, wonJapan;
var bgJapan, intro, boatImg, foggImg;
var points = 0;
var playing = 0;
var heartsLeft = 3;
var bgx = -250;
var running = false;
var noiseLoc; var ySpeed;

// US variables
var wrapped = 0; // variable that checks if user has wrapped screen
// bison variable
var bison;

var scoreUS = 0;

// bison speed
var speedBison;

// train variable
var train;

// train speed
var speedTrain = 0;

// train coordinates
var xTrain=-550, yTrain=230;

// tracks
var tracks;

// start screen background
var telegram;

// dirt background
var dirt;

// array of bison
bison = [];


function preload() {
  tomb = loadImage("images/tomb.jpg");
  mummyRight = loadImage("images/mummyright.png");
  mummyLeft = loadImage("images/mummyleft.png");
  diamond = loadImage("images/diamond.png");
  foggImage = loadImage("images/fogg.png");
  telegram = loadImage("images/telegram.png");
  mainMap = loadImage("images/aroundtheworld.jpg");
  bg = loadImage('images/inbg.png');
  elephantArtwork = loadImage('images/elephantRight.png');
  balloon = loadImage('images/balloon.png');
  heart = loadImage('images/heart.png');
  goodDimsum = loadImage('images/dimsum.png');
  badDimsum = loadImage('images/baddimsum.png');
  foggHK = loadImage('images/charHK.png');
  bgHK = loadImage('images/hkbg.jpg');
  intro = loadImage('images/bg.png');  
  bgJapan = loadImage('images/ocean.jpg');
  boatImg = loadImage('images/boat.png');
  foggImg = loadImage('images/charJapan.png');
  bison = loadImage("images/bison.png");
  train = loadImage("images/fulltrain.png");
  tracks = loadImage("images/fulltracks.png");
  dirt = loadImage("images/dirt.jpg");
  room = loadImage("images/room.jpg");
  foggUK = loadImage("images/foggUK.png");
  tophat1 = loadImage("images/tophat1.png");
  cat = loadImage("images/cat.png");
  theme = loadSound("theme.mp3");
}

function setup() {
  theme.play();
  showmap = true;
  start = false;
  end = false;
  // common game variable
  game = false;
  // variable that starts Egypt game
  gameEgypt = false;
  // variable that checks if Egypt game was won
  egyptWon = false;
  // variable that starts Hong Kong game
  gameHK = false;
  // variable that checks if China game was won
  hkWon = false;
  // variable that starts England game
  gameEngland = false;
  // variable that checks if UK game was won
  englandWon = false;
  // variable that starts India game
  gameIndia = false;
  // variable that checks if India game was won
  indiaWon = false;
  // variable that starts US game
  gameUS = false;
  // variable that checks if US game was won
  usWon = false;
  // variable that starts Japan game
  gameJapan = false;
  // variable that checks if Japan game was won
  japanWon = false;
  createCanvas(500,500);
  // set up balloon position
  balloonX = 240;
  balloonY = 210;
  // set up UK game
  hat2 = new Hat(100, 0);
  hat3 = new Hat(175, 0);
  hat4 = new Hat(250, 0);
  hat5 = new Hat(325, 0);
  hat6 = new Hat(400, 0);
  hat2.start = true;
  hat3.start = true;
  hat4.start = true;
  hat5.start = true;
  hat6.start = true;
  // set up Egypt game
  xDiamond = int(random(50,450));
  yDiamond = int(random(75, 450));
  // set up India game
  fogg = new Fogg( 250, 450 );
  for (var i = 1; i < 5; i++) {
    elephants.push( new Elephant(150, 100*i));
  }
  // set up Hong Kong game
  for (var i = 0; i < 20; i++) {
    goodDimsums.push( new dimsum(random(width), random(-500,0), goodDimsum) );
    badDimsums.push( new dimsum(random(width), random(-500,0), badDimsum) );
  }
  // set up Japan game
  foggJapan = new FoggJapan( 450, 250 );
  boat = new Boat(80, 250);
  noiseLoc = 0
  ySpeed = noise(noiseLoc);
  // set up US game
  for (i=3;i<=20;i++) {
    bison[i]=new Bison(i*25,0);
    bison[i].start = true;
  }
  
  
}

function draw() {
  textAlign(LEFT);
  if (showmap == true) {
    background(255);
    textAlign(CORNER);
    textFont("American Typewriter");
    textSize(30);
    fill(0);
    text("Around the World in 80 Days", 40, 50);
    image(mainMap,0,100,500,400);
    imageMode(CENTER);
    image(balloon,balloonX,balloonY,50,50);
    
    // start in England
    if(englandWon == false && balloonX == 240 && balloonY == 210) {
      textSize(15);
      text("You're about to set off on your journey! Press \"S\" to start playing.",30,80);
      if (keyIsDown(83)) {
        gameEngland = true;
        game = true;
        showmap = false;
      }
    }
    // move from England to Egypt
    if(englandWon == true && egyptWon == false) {
      if (balloonX < 285) {
        balloonX+=0.5;
      }
      if (balloonY < 260) {
        balloonY+=0.5;
      }
      if (balloonX == 285 && balloonY == 260 && egyptWon == false) {
        textSize(15);
        text("You've arrived in Egypt! Press \"S\" to start playing.",60,80);
        if (keyIsDown(83)) {
          gameEgypt = true;
          game = true;
          showmap = false;
        }
      }
    }
    
    // move from Egypt to India
    if (egyptWon == true && indiaWon == false) {
      if (balloonX < 350) {
        balloonX+=0.5;
      }
      if (balloonY <270) {
        balloonY+=0.5;
      }
      if (balloonX == 350 && balloonY == 270 && indiaWon == false) {
        textSize(15);
        text("You've arrived in India! Press \"S\" to start playing.",60,80);
        if (keyIsDown(83)) {
          gameIndia = true;
          game = true;
          showmap = false;
        }
      }
    }
    
    // move from India to Hong Kong
    if (indiaWon == true && hkWon == false) {
      if (balloonX < 385) {
        balloonX += 0.5;
      }
      if (balloonY > 260) {
        balloonY -= 0.5;
      }
      if (balloonX == 385 && balloonY == 260 && hkWon == false) {
        textSize(15);
        text("You've arrived in Hong Kong! Pres \"S\" to start playing.",60, 80);
        if (keyIsDown(83)) {
          gameHK = true;
          game = true;
          showmap = false;
        }
      }
    }
    
    // move from Hong Kong to Japan
    if (hkWon == true && japanWon == false) {
      if (balloonX < 430) {
        balloonX += 0.5;
      }
      if (balloonY > 220) {
        balloonY -= 0.5
      }
      if (balloonX == 430 && balloonY == 220 && japanWon == false) {
        textSize(15);
        text("You've arrived in Japan! Pres \"S\" to start playing.",60, 80);
        if (keyIsDown(83)) {
          gameJapan = true;
          game = true;
          showmap = false;
        }
      }
    }
    
    // move from Japan to the US
    if(japanWon == true && usWon == false) {
      if (balloonX == 500)
      {
        balloonX = 0;
        wrapped = 1;
      }
      if (balloonX < 500 && wrapped == 0 ) {
        balloonX += 0.5;
      }
      if (balloonX < 110) {
        balloonX += 0.5;
      }
      if (balloonX == 110 && usWon == false) {
        textSize(15);
        text("You've arrived in the US! Pres \"S\" to start playing.",60, 80);
        if (keyIsDown(83)) {
          gameUS = true;
          game = true;
          showmap = false;
        }
      }
    }
    
    // move from the US to the UK
    if(usWon == true) {
      if (balloonX < 240) {
        balloonX += 0.5
      }
      if (balloonY > 210) {
        balloonY -= 0.5
      }

      if (balloonX == 240 && balloonY == 210) {
        textSize(15);
        textAlign(LEFT);
        text("Congratulations!\nFogg has travelled the world in 80 days!", 40, 80);
      }
    }
    /*ellipse(285,260,10,10);
    ellipse(350,270,10,10);
    ellipse(385,260,10,10);
    ellipse(430,240,10,10);
    ellipse(110,240,10,10);*/
    imageMode(CORNER);
  } else if (game == true && start == false) {
    startScreen();
  } else if (game == true && start == true) {
    
    // Play England game
    if (gameEngland == true) {
      image(room, 0, 0);
      displayInfo();
      if (keyIsDown(68)) {
        xFoggUK += speedFoggUK;
      }
      if (keyIsDown(65)) {
        xFoggUK -= speedFoggUK;
      }
      image(foggUK, xFoggUK, 355);
      hat2.update();
      hat3.update();
      hat4.update();
      hat5.update();
      hat6.update();
      if(hat2.show() == true) {
        hat2.display();
      }
      if(hat3.show() == true) {
        hat3.display();
      }
      if(hat4.show() == true) {
        hat4.display();
      }
      if(hat5.show() == true) {
        hat5.display();
      }
      if(hat6.show() == true) {
        hat6.display();
      }
      hat2.checkHit();
      hat3.checkHit();
      hat4.checkHit();
      hat5.checkHit();
      hat6.checkHit();
    } else if (gameEgypt == true) {
      imageMode(CORNER);
      image(tomb, 0, 0, 500, 500);
      image(foggImage, xFogg, yFogg);
      image(diamond, xDiamond, yDiamond, 40, 40);
      // choose random position for diamond
      if(keyIsDown(65)) {
        xFogg -= speedFogg;
      }
      if(keyIsDown(68)) {
        xFogg += speedFogg;
      }
      if(keyIsDown(87)) {
        yFogg -= speedFogg;
      }
      if (keyIsDown(83)) {
        yFogg += speedFogg;
      }
      if(xFogg > width) {
        xFogg = 0;
      }
      if (xFogg < 0) {
        xFogg = width;
      }
      if (yFogg > height) {
        yFogg = 50;
      }
      if (yFogg < 50) {
        yFogg = height;
      }
      // modify direction of mummy according to position to fogg
      if(xFogg > xMummy && yFogg > yMummy) {
        image(mummyRight, xMummy, yMummy);
        xMummy += speedMummy;
        yMummy += speedMummy;
      } else if(xFogg > xMummy && yFogg < yMummy) {
        image(mummyRight, xMummy, yMummy);
        xMummy += speedMummy;
        yMummy -= speedMummy;
      } else if(xFogg < xMummy && yFogg < yMummy) {
        image(mummyLeft, xMummy, yMummy);
        xMummy -= speedMummy;
        yMummy -= speedMummy;
      } else if(xFogg < xMummy && yFogg > yMummy) {
        image(mummyLeft, xMummy, yMummy);
        xMummy -= speedMummy;
        yMummy += speedMummy;
      } else if(xFogg == xMummy && yFogg < yMummy) {
        image(mummyRight, xMummy, yMummy);
        yMummy -= speedMummy;
      } else if(xFogg == xMummy && yFogg > yMummy) {
        image(mummyRight, xMummy, yMummy);
        yMummy += speedMummy;
      } else if(xFogg < xMummy && yFogg == yMummy) {
        image(mummyLeft, xMummy, yMummy);
        yMummy -= speedMummy;
      } else if(xFogg > xMummy && yFogg == yMummy) {
        image(mummyRight, xMummy, yMummy);
        yMummy += speedMummy;
      } 
      // sides to help detect colission
      var foggRightSide = xFogg + foggImage.width - 20;
      var foggLeftSide = xFogg + 20;
      var foggBottom = yFogg + foggImage.height - 20;
      var foggTop = yFogg - 20;
      var diamondRightSide = xDiamond + 40;
      var diamondLeftSide = xDiamond;
      var diamondTop = yDiamond;
      var diamondBottom = yDiamond + 40;
      var mummyRightSide = xMummy + mummyRight.width - 20;
      var mummyLeftSide = xMummy + 20;
      var mummyTop = yMummy + 20;
      var mummyBottom = yMummy + mummyRight.height - 20;
    
      noStroke();
    
      // detect collision between fogg and diamond 
      if(!(foggRightSide < diamondLeftSide || foggLeftSide > diamondRightSide || foggBottom < diamondTop || foggTop > diamondBottom)) {
        score += 1;
        xDiamond = int(random(50,450));
        yDiamond = int(random(75, 450));
      }
      
      // detect collision between fogg and mummy
      if(!(foggRightSide < mummyLeftSide || foggLeftSide > mummyRightSide || foggBottom < mummyTop || foggTop > mummyBottom)) {
        xFogg = 220;
        yFogg = 220;
        xMummy = 0;
        yMummy = 220;
        lives--;
      }
      displayInfo();
      if(lives == 0) {
        showmap = true;
        gameEgypt = false;
        game = false;
        start = false;
        score = 0;
        lives = 3;
        /*image(telegram, 0, 0, 500, 500);
        textFont("American Typewriter");
        textSize(60);
        text("YOU LOSE.", 100, 250);*/
      }
      if (score == 5) {
        showmap = true;
        gameEgypt = false;
        game = false;
        egyptWon = true;
        start = false;
        score = 0;
      }
    } else if (gameIndia == true) {
      fill(0, 10);
      image(bg, 250, 250);
    
      fogg.move();
      fogg.display();
    
      for (var i = 0; i < elephants.length; i++) {
       elephants[i].move();
       elephants[i].display();
      }
      scoreFunction();
      collision(fogg, elephants);
      if (dist(fogg.x, fogg.y, fogg.balX, fogg.balY) < 30) {
        showmap = true;
        indiaWon = true;
        gameIndia = false;
        game = false;
        start = false;
      }
      if (heartsLeft == 0) {
        showmap = true;
        gameIndia = false;
        game = false;
        start = false;
        heartsLeft = 3;
      }
    } else if (gameHK == true) {
      fill(0, 10);
      imageMode(CENTER);
      image(bgHK, 250, 250);
      rect(0,0,width,height);
      image(foggHK, mouseX, mouseY, 100, 100);
      
      for (var i = 0; i < goodDimsums.length; i++) {
        goodDimsums[i].move();
        goodDimsums[i].display();
        
        badDimsums[i].move();
        badDimsums[i].display();
      }
      scoreFunction();
      if(pointsHK == 10) {
        showmap = true;
        hkWon = true;
        gameHK = false;
        game = false;
        start = false;
      }
    } else if (gameJapan == true) {
      scroll();
      foggJapan.move();
      foggJapan.display();
      
      boat.move();
      boat.display();
      
      scoreFunction();
      if (dist(foggJapan.x, foggJapan.y, boat.x, boat.y) < 50) {
        showmap = true;
        japanWon = true;
        gameJapan = false;
        game = false;
        start = false;
      }
    } else if (gameUS == true) {
      image(dirt,0,0,500,500);
      image(tracks,0,250);
      displayInfo();
      if (keyIsDown(68) && speedTrain <= 1) {
        speedTrain += 0.05;
      }
      if (keyIsDown(65) && speedTrain >= -1) {
        speedTrain -= 0.05;
      }
      xTrain += speedTrain;
      image(train,xTrain, yTrain);
      for (i=3;i<=20;i++) {
        bison[i].update();
        if(bison[i].show() == true) {
          bison[i].display();
        }
        bison[i].checkHit();
      }
      if(xTrain >= -50) {
        showmap = true;
        usWon = true;
        gameUS = false;
        game = false;
        start = false;
      }
    }
  }
}

function Bison(x,y) {
  speedBison = int(random(1,5));
  this.xPos = x;
  this.yPos = y;
  
  this.update = function() {
    if(this.yPos == 500) {
      this.yPos = 0;
      this.start = false;
    }
    if ((this.start == true && this.yPos == 0)) {
      speedBison = 2;
      var randomNum = int(random(0, 100));
      if (randomNum == 1) {
        this.start = true;
      } else {
        this.start = false;
      }
      this.yPos += speedBison;
    } else if (this.start == true && this.yPos < 500) {
      this.yPos += speedBison;
    } 
    if (this.start == false) {
      var randomNum = int(random(0, 200));
      if (randomNum == 1) {
        this.start = true;
      } else {
        this.start = false;
      }
    }
  }
  
  this.display = function() {
    if (this.start == true) {
      image(bison, this.xPos, this.yPos);
    }
  }
  
  this.show = function() {
    if (this.start == true && this.yPos == 0) {
      return false;
    }
    else if(this.start == true) {
      return true;
    }
    else if(this.start = false) {
      return false;
    }
  }
  
  this.hit = false;

  this.checkHit = function() {
    if( xTrain+590 < this.xPos+20 && xTrain+590 > this.xPos-20 && yTrain+20 < this.yPos+20 && yTrain+20 > this.yPos-20 ) {
      this.hit = true;
      this.yPos = 0;
      this.start = false;
      scoreUS += 1;
      if(scoreUS == 3) {
        showmap = true;
        gameUS = false;
        game = false;
        start = false;
        scoreUS = 0;
        xTrain=-550;
        yTrain=230;
      }
      console.log(scoreUS);
    }
  }
}

function scroll() {
  if (bgx > 750) {
      bgx = -250;
  }
  image(bgJapan, bgx, 250);
  image(bgJapan, bgx+1500, 250);

  bgx += 2;

}

function startScreen() {
  if(gameEngland == true) {
    image(telegram, 0, 0, 500, 500);
    textFont("American Typewriter");
    textSize(30);
    text("Catch The Hat in the UK", 80, 170);
    textSize(15);
    text("Help Phileas Fogg pack for his trip by catching 5 of his\nfalling top hats.\nBeware of the flying cats! They will reduce your score by 2.\n\n\nPress \"P\" to begin playing!", 50, 220);
    if(keyIsDown(80)) {
      start = true;
    }
  }
  if(gameEgypt == true) {
    image(telegram, 0, 0, 500, 500);
    textFont("American Typewriter");
    textSize(30);
    text("Escape The Pyramid in Egypt", 50, 170);
    textSize(15);
    text("Phileas Fogg is stuck in a pyramid!\nHelp him escape by collecting 5 diamonds.\nBeware of the mummy, 3 hits and you lose!\n\n\nPress \"P\" to start playing!", 50, 220);
    if(keyIsDown(80)) {
      start = true;
    }
  }
  if(gameIndia == true) {
    image(telegram, 0, 0, 500, 500);
    textFont("American Typewriter");
    textSize(30);
    textAlign(CENTER);
    text("Welcome to\nIndia!", 250, 180);
    textSize(16);
    text("Reach the Hot Air Balloon\nto move on to the next country.\n\nBut be careful of the elephants!\n\n\nPress \"P\" to start playing!", 250, 280);
    if(keyIsDown(80)) {
      start = true;
    }
  }
  if(gameHK == true) {
    image(telegram, 0, 0, 500, 500);
    textFont("American Typewriter");
    textSize(30);
    textAlign(CENTER);
    text("Welcome to\nHong Kong!", 250, 180);
    textSize(16);
    text("Collect at least 10 Dim sum baskets as you can\nby moving around with your mouse.\n\nBut be careful!\nYou will lose a point if you catch rotten dimsum.\n\n\nPress \"P\" to start playing!", 250, 280);
    if(keyIsDown(80)) {
      start = true;
    }
  }
  if(gameJapan == true) {
    image(telegram, 0, 0, 500, 500);
    textFont("American Typewriter");
    textSize(30);
    textAlign(CENTER);
    text("Welcome to\nJapan!", 250, 180);
    textSize(16);
    text("You are late! Beat the tide and\ncatch the boat on time to go to Yokohama.\n\n\Press W, A, S, D keys to move.\n\n\nPress \"P\" to start playing!", 250, 280);
    if(keyIsDown(80)) {
      running = true;
      start = true;
    }
  }
  if(gameUS == true) {
    image(telegram, 0, 0, 500, 500);
    textFont("American Typewriter");
    textSize(30);
    textAlign(CENTER);
    text("Cross The Herd of Bison", 250, 170);
    textSize(15);
    text("Help Phileas Fogg's train cross the desert without running\ninto bison.\nIf you run into 3 you will lose the game.\n\n\nPress \"P\" to begin playing!", 250, 220);
    if(keyIsDown(80)) {
      start = true;
    }
  }
}

function displayInfo() {
  if(gameEgypt == true) {
    fill(255);
    rect(0,0,500,50);
    fill(0);
    textFont("American Typewriter");
    textSize(15);
    text("Diamonds: ", 10, 30);
    text(score, 90, 30);
    text("Lives: ", 380, 30);
    if(lives>=1) {
      image(foggImage, 425, 15, 20, 20);
    }
    if(lives>=2) {
      image(foggImage, 440, 15, 20, 20);
    }
    if(lives==3) {
      image(foggImage, 455, 15, 20, 20);
    }
  }
  if(gameEngland == true) {
    fill(255);
    rect(0,0,80,30);
    fill(0);
    textSize(15);
    text("Score: ", 10, 20);
    text(scoreEngland, 60, 20);
  }
  if(gameUS == true){
    fill(255);
    rect(0,0,80,30);
    fill(0);
    textSize(15);
    text("Hits: ", 10, 20);
    text(scoreUS, 60, 20);
  }
}

function Fogg(x, y) {
  this.x = x;
  this.y = y;
  this.size = 80;
  
  this.balX = random(50,450);
  this.balY = random(50,250);
  
  this.foggDown = loadImage('images/down.png');
  this.foggLeft = loadImage('images/left.png');
  this.foggRight = loadImage('images/right.png');
  this.foggUp = loadImage('images/up.png');
  
  this.foggNow = this.foggRight;
  
  this.speed = 3;
  
  this.display = function() {
    imageMode(CENTER);
    image(this.foggNow, this.x, this.y, 50, 50);
    image(balloon, this.balX, this.balY, 50, 50);
  }
  
  this.move = function() {
    
    
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= 2;
      this.foggNow = this.foggLeft;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += 2;
      this.foggNow = this.foggRight;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.y -= 2;
      this.foggNow = this.foggUp;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.y += 2;
      this.foggNow = this.foggDown;
    }
    
    //wraparound
    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
  }
}

function Elephant(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 30;
  
  this.lookLeft = loadImage('images/elephantLeft.png');
  this.lookRight = elephantArtwork;
  this.now = this.lookRight;

  this.speed = random(3, 5);
  
  this.display = function() {
    imageMode(CENTER);
    image(this.now, this.x, this.y, this.radius*2, this.radius*2);
  }
  
  this.move = function() {
    this.x += this.speed;
    
    //wraparound
    if (this.x > width - this.radius) {
      this.x = width - this.radius;
      this.speed *= -1;
      this.now = this.lookLeft;
    }
    if (this.x < this.radius) {
      this.x = this.radius;
      this.speed *= -1;
      this.now = this.lookRight;
    }
  }
}

function collision(fogg, elephants) {
  if (gameIndia == true) {
    //collision
    for(i = 0; i < elephants.length; i++) {
      if (dist(fogg.x, fogg.y, elephants[i].x, elephants[i].y) < 30) {
        heartsLeft -= 1;
        fogg.x = 250;
        fogg.y = 450;
      }
    }
  }
}

function scoreFunction() {
  if (gameIndia == true) {
    fill(255);
    textSize(25);
    textAlign(LEFT);
    text("Points: " + points, 20, 40);
    
    for(xHeart = 1; xHeart <= heartsLeft; xHeart++) {
      image(heart, 140 + xHeart*35, 32, 25, 25);
    }
    
    //terminate the game if time is up or there is no more heart left
    if (heartsLeft === 0 || time === 0) {
      playing = 2;
    }
  }
  // Hong Kong score
  if (gameHK == true) {
    fill(255);
    textSize(25);
    textAlign(LEFT);
    text("pointsHK: " + pointsHK, 20, 40);
  }
}

function endScreen() {
  if (gameIndia == true) {
    image(intro, 250, 250, 500, 500);
    textFont("Verdana");
    fill(0);
    textAlign(CENTER);
    textSize(60);
    text("Game Over!", 250, 250);
    
    if (heartsLeft > 0)
      result = "You win!"
    else
      result = "You lose!"
    textSize(30);
    text(result, 250, 350);
  }
}

function dimsum(x, y, which) {
  this.x = x;
  this.y = y;
  this.which = which;
  this.size = 40;
  
  this.noiseOffsetX = random(0,1000);

  this.display = function() {
    imageMode(CENTER);
    image(this.which, this.x, this.y, this.size, this.size);
  }
  
  this.move = function() {
    this.y += 1;

    var xMovement = map(noise(this.noiseOffsetX), 0, 1, -2, 2);
    this.x += xMovement;


    if (this.x > width) { 
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    
    //collision
    if (dist(mouseX, mouseY, this.x, this.y) < 30) {
      if (this.which == goodDimsum)
        pointsHK += 1;
      if (this.which == badDimsum)
        pointsHK -= 1;
      this.y = random(-500, 0);
    }

    if (this.y > height) {
      this.y = random(-500, 0);
    }
    this.noiseOffsetX += 0.01;
  }
}

function FoggJapan(x, y) {
  this.x = x;
  this.y = y;
  this.size = 80;
  

  this.display = function() {
    imageMode(CENTER);
    image(foggImg, this.x, this.y, this.size, this.size);
  }
  
  this.move = function() {
    var r = map(ySpeed, 0, 0.5, -1, 0.5);
    noiseLoc += 0.005;
    
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= 2.5;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += 1;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.y -= 2;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.y += 2;
    }
    
    //wraparound
    if (this.x > width-this.size/3) {
      this.x = width-this.size/3;
    }
    if (this.x < this.size/3) {
      this.x = this.size/3;
    }
    if (this.y > height-this.size/2) {
      this.y = height-this.size/2;
    }
    if (this.y < this.size/2) {
      this.y = this.size/2;
    }
  
  this.x += random(1.5, 2);
  this.y += r;
  
  }
}

function Boat(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 50;
  this.speed = 3;
  
  this.display = function() {
    imageMode(CENTER);
    image(boatImg, this.x, this.y, this.radius*2, this.radius*2);
  }
  
  this.move = function() {
    this.y += this.speed;
    
    //wraparound
    if (this.y > height) {
      this.y = 0;
      //this.speed *= -1;
    }
    if (this.y < 0) {
      this.y = 500;
      //this.speed *= -1;
    }
  }
}

// Constructor for a hat/cat object
function Hat(x,y) {
  
  // Position of hat
  this.xPos = x;
  this.yPos = y;
  
  // 1/5 chance of flying cat
  var randomNum = int(random(0,3));
  if (randomNum == 1) {
    this.type = "cat"; 
  } else {
    this.type = "hat";
  }
  
  this.update = function() {
    if(this.yPos == 500) {
      if(this.type == "hat") {
        score -= 1;
      }
      this.yPos = 0;
      this.start = false;
    }
    if ((this.start == true && this.yPos == 0)) {
      var randomNum = int(random(0, 200));
      if (randomNum == 1) {
        this.start = true;
      } else {
        this.start = false;
      }
      this.yPos += speedHat;
    } else if (this.start == true && this.yPos < 500) {
      this.yPos += speedHat;
    } 
    if (this.start == false) {
      var randomNum = int(random(0, 50));
      if (randomNum == 1) {
        this.start = true;
      } else {
        this.start = false;
      }
    }
  }
  
  this.display = function() {
    if (this.start == true) {
      if (this.type == "hat") {
        image(tophat1,this.xPos, this.yPos);
      } else {
        image(cat, this.xPos, this.yPos);
      }
    }
  }
  
  this.show = function() {
    if (this.start == true && this.yPos == 0) {
      return false;
    }
    else if(this.start == true) {
      return true;
    }
    else if(this.start = false) {
      return false;
    }
  }
  
  this.hit = false;

  this.checkHit = function() {
    if( xFoggUK < this.xPos + 60 && xFoggUK > this.xPos - 60 && yFoggUK < this.yPos + 30 && yFoggUK > this.yPos - 100) {
      this.hit = true;
      this.yPos = 0;
      this.start = false;
      if (this.type == "hat") {
        scoreEngland += 1;
      } else {
        scoreEngland -= 2;
      }
      if(scoreEngland == 5) {
        showmap = true;
        englandWon = true;
        gameEngland = false;
        score = 0;
        game = false;
        start = false;
      }
    }
  }
} 

