// notebook background
var notebook;

// characters and variations of their positions
var eraserDown, eraserUp, eraserLeft, eraserRight, stickmanFront, stickmanLeft, stickmanRight, monsterFront, monsterLeft, monsterRight;

// variables to memorize last position of characters
var lastPosition;

// eraser position
var xEraser, yEraser;

// eraser's speed
var speedEraser;

// stickman position
var xStickman, yStickman;

// stickman's speed
var speedStickman;

// monster position
var xMonster, yMonster;

// monster's speed
var speedMonster;

// last orientation
var lastOrientation;

// number of stickmen caught
var score = 0;

// amount of time played
var time = 0;

// amount of times the stickman has escaped
var escaped = 0;

// variable that will be used to determine eraser's position
var eraserPosition;

// starting positions for eraser
var eraserPositions = [[0,280],[400,110],[700,280],[400,450]];

// variable that will be used to determine monster's position
var monsterPosition;

// starting positions for monster
var monsterPositions = [[0,125],[0,400],[700,125],[700,400]];

// variable that will be used to determine whether game should start
var startgame = false;

// variable that will be used to pause game
var pausegame = false;

// initial text for level
var level = "select a level!";

// variable for lives
var lives = 5;

// erasing sound
var erase;

// biting sound
var bite;

// "wah wah wah" sound for when player loses
var wahwahwah;

// sound for when player wins
var win;

function preload() {
  notebook = loadImage("images/notebook_background.jpg");
  eraserDown = loadImage("images/eraser_down.png");
  eraserUp = loadImage("images/eraser_up.png");
  eraserLeft = loadImage("images/eraser_left.png");
  eraserRight = loadImage("images/eraser_right.png");
  stickmanFront = loadImage("images/stickman_front.png");
  stickmanLeft = loadImage("images/stickman_left.png");
  stickmanRight = loadImage("images/stickman_right.png");
  monsterFront = loadImage("images/monster_front.png");
  monsterLeft = loadImage("images/monster_left.png");
  monsterRight = loadImage("images/monster_right.png");
  erase = loadSound("sounds/eraser.m4a");
  bite = loadSound("sounds/bite.mp3");
  wahwahwah = loadSound("sounds/wahwahwah.mp3");
  win = loadSound("sounds/win.m4a");
}

function setup() {
  createCanvas(800, 500);
  // set background to notebook image
  image(notebook, 0, 0);
  
  // pick random starting position for eraser
  eraserPosition = random(eraserPositions);

  // set eraser in random position
  xEraser = eraserPosition[0];
  yEraser = eraserPosition[1];
  
  // set character speeds
  speedEraser = 4;
  speedStickman = 1;
  speedMonster = 2;
  
  // place stickman in the center of the notebook
  xStickman = 400;
  yStickman = 250;
  
  // pick random starting position for monster
  monsterPosition = random(monsterPositions);
  
  // set monster in a random position
  xMonster = monsterPosition[0];
  yMonster = monsterPosition[1];
  
  // variable used to restart eraser's orientation
  lastOrientation = eraserRight;
  noStroke();
}

function draw() {
  
  if (startgame === true) {
    textSize(40);
    textFont("Marker Felt");
    if(pausegame === true) {
      text("Game paused. Press 'C' to continue playing.", 140, 280);
    } else if (score == 10) {
      image(notebook,0,0);
      textSize(100);
      text("YOU WON!", 200, 300);
    } else if (lives == 0) {
      image(notebook,0,0);
      textSize(100);
      text("GAME OVER", 200, 300);
    }
    
    else {
  
      // set background to notebook
      image(notebook, 0, 0);
      
      textSize(18);
      textFont("Marker Felt");
      
      // set text which will display how many lives the user has left
      text("Lives: " + lives, 20,25);
      // set text which will display the user's score (how many stickmen have been caught)
      text("Stickmen caught: " + score, 140, 25);
      
      // set text which will display the time played (in seconds)
      text("Time played (in seconds): " + int(millis()/600), 140, 65);
      
      // set text which will display how many times the stickman has escaped
      text("Number of times stickman has escaped: " + escaped, 140, 105);
      
      // set text which tells user how to pause game
      text("Press 'P' to pause game", 620,105);
      
      // move eraser to the left
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        xEraser -= speedEraser;
      }
      
      // move eraser to the right
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        xEraser += speedEraser;
      }
      
      // move eraser upwards
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        yEraser -= speedEraser;
      }
      
      // move eraser downwards
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        yEraser += speedEraser;
      }
      
      // check if eraser has disappeared from screen, in which case its coordinates should
      // be reset so that it wraps to the opposite side
      if (xEraser > width) {
        xEraser = 0;
      }
      if (xEraser < 0) {
        xEraser = width;
      }
      if (yEraser > height) {
        yEraser = 100;
      }
      if (yEraser < 100) {
        yEraser = height;
      }
      
      // check if monster has disappeared from screen, in which case its coordinates should
      // be reset so that it wraps to the opposite side
      if (xMonster > width) {
        xMonster = 0;
      }
      if (xMonster < 0) {
        xMonster = width;
      }
      if (yMonster > height) {
        yMonster = 100;
      }
      if (yMonster < 100) {
        yMonster = height;
      }
    
      // detect if stickman has escaped
      if (xStickman > width || xStickman < 0 || yStickman > height || yStickman < 100) {
        xStickman = 400;
        yStickman = 250;
        escaped += 1;
        eraserPosition = random(eraserPositions);
        xEraser = eraserPosition[0];
        yEraser = eraserPosition[1];
      }
    
      // modify direction of stickman according to position to eraser
      if(xEraser > xStickman && yEraser > yStickman) {
        image(stickmanLeft, xStickman, yStickman);
        xStickman -= speedStickman;
        yStickman -= speedStickman;
      } else if(xEraser > xStickman && yEraser < yStickman) {
        image(stickmanLeft, xStickman, yStickman);
        xStickman -= speedStickman;
        yStickman += speedStickman;
      } else if(xEraser < xStickman && yEraser < yStickman) {
        image(stickmanRight, xStickman, yStickman);
        xStickman += speedStickman;
        yStickman += speedStickman;
      } else if(xEraser < xStickman && yEraser > yStickman) {
        image(stickmanRight, xStickman, yStickman);
        xStickman += speedStickman;
        yStickman -= speedStickman;
      } else if (xEraser == xStickman && yEraser < yStickman) {
        image(stickmanFront, xStickman, yStickman);
        yStickman += speedStickman;
      } else if (xEraser == xStickman && yEraser > yStickman) {
        image(stickmanFront, xStickman,yStickman);
        yStickman -= speedStickman;
      } else if (xEraser < xStickman && yEraser == yStickman) {
        image(stickmanRight, xStickman,yStickman);
        xStickman += speedStickman;
      } else if (xEraser > xStickman && yEraser == yStickman) {
        image(stickmanLeft, xStickman,yStickman);
        xStickman -= speedStickman;
      }
      
      // modify direction of monster according to position to eraser
      if(xEraser > xMonster && yEraser > yMonster) {
        image(monsterRight, xMonster, yMonster);
        xMonster += speedMonster;
        yMonster += speedMonster;
      } else if(xEraser > xMonster && yEraser < yMonster) {
        image(monsterRight, xMonster, yMonster);
        xMonster += speedMonster;
        yMonster -= speedMonster;
      } else if(xEraser < xMonster && yEraser < yMonster) {
        image(monsterLeft, xMonster, yMonster);
        xMonster -= speedMonster;
        yMonster -= speedMonster;
      } else if(xEraser < xMonster && yEraser > yMonster) {
        image(monsterLeft, xMonster, yMonster);
        xMonster -= speedMonster;
        yMonster += speedMonster;
      } else if(xEraser == xMonster && yEraser < yMonster) {
        image(monsterFront, xMonster, yMonster);
        yMonster -= speedMonster;
      } else if(xEraser == xMonster && yEraser > yMonster) {
        image(monsterFront, xMonster, yMonster);
        yMonster += speedMonster;
      } else if(xEraser < xMonster && yEraser == yMonster) {
        image(monsterLeft, xMonster, yMonster);
        yMonster -= speedMonster;
      } else if(xEraser > xMonster && yEraser == yMonster) {
        image(monsterRight, xMonster, yMonster);
        yMonster += speedMonster;
      } 
    
      // change orientation and size of eraser according to key position
      // left
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        image(eraserLeft, xEraser, yEraser);
        lastOrientation = eraserLeft;
        var eraserRightSide = xEraser + eraserLeft.width;
        var eraserBottom = yEraser + eraserLeft.height;
      }
      // right
      else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        image(eraserRight, xEraser, yEraser);
        lastOrientation = eraserRight;
        var eraserRightSide = xEraser + eraserRight.width;
        var eraserBottom = yEraser + eraserRight.height;
      }
      // up
      else if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        image(eraserUp, xEraser, yEraser);
        lastOrientation = eraserUp;
        var eraserRightSide = xEraser + eraserUp.width;
        var eraserBottom = yEraser + eraserUp.height;
      }
      // down
      else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        image(eraserDown, xEraser, yEraser);
        lastOrientation = eraserDown;
        var eraserRightSide = xEraser + eraserDown.width;
        var eraserBottom = yEraser + eraserDown.height;
      }
      // no key has been pressed yet
      else {
        image(lastOrientation, xEraser, yEraser);
        var eraserRightSide = xEraser + lastOrientation.width;
        var eraserLeftSide = yEraser + lastOrientation.width;
      }
      
      // sides to help detect colission
      var eraserLeftSide = xEraser;
      var eraserTop = yEraser;
      var stickmanRightSide = xStickman + stickmanFront.width - 20;
      var stickmanLeftSide = xStickman + 20;
      var stickmanTop = yStickman + 20;
      var stickmanBottom = yStickman + stickmanFront.height - 20;
      var monsterRightSide = xMonster + monsterFront.width - 20;
      var monsterLeftSide = xMonster + 20;
      var monsterTop = yMonster + 20;
      var monsterBottom = yMonster + monsterFront.height - 20;
    
      noStroke();
    
      // detect collision between eraser and stickman 
      if(!(eraserRightSide < stickmanLeftSide || eraserLeftSide > stickmanRightSide || eraserBottom < stickmanTop || eraserTop > stickmanBottom)) {
        erase.play();
        score++;
        if(score==10) {
          win.play();
        }
        speedStickman += 0.1;
        restartGame();
      }
      
      // detect collision between eraser and monster
      if(!(eraserRightSide < monsterLeftSide || eraserLeftSide > monsterRightSide || eraserBottom < monsterTop || eraserTop > monsterBottom)) {
        bite.play();
        lives--;
        if(lives==0) {      
          wahwahwah.play();
        }
        restartGame();
      }
    }
  } else {
    image(notebook,0,0);
    textSize(80);
    textFont("Marker Felt");
    text("STICKMAN CHASER",140,100);
    textSize(20);
    text("Erase 10 stickmen off the notebook before they escape! Beware of the eraser-eating\nmonster, 3 eaten erasers and you're out.",140,190);
    text("Select your level of difficulty by pressing either 1, 2 or 3.\nLevel of difficulty: "+level,140,268);
    textSize(50);
    textFont("Marker Felt");
    text("PRESS 'S' TO START GAME!",180,450);
  }
}

function restartGame() {
  
  //reset stickman
  xStickman = 400;
  yStickman = 250;
  
  // reset eraser
  eraserPosition = random(eraserPositions);
  xEraser = eraserPosition[0];
  yEraser = eraserPosition[1];
  
  // reset monster
  monsterPosition = random(monsterPositions);
  xMonster = monsterPosition[0];
  yMonster = monsterPosition[1];
}

function keyPressed() {
  
  // start game
  if (key == "S") {
    startgame = true;
  }
  
  // pause the game
  if (key == "P") {
    pausegame = true;
  }
  
  // continue the game after pausing
  if (key == "C") {
    pausegame = false;
  }
  
  //set level of game - the higher the level, the faster the monster, which makes gameplay more difficult
  if (key == "1") {
    level = 1;
    speedMonster = 1;
  }
  if (key == "2") {
    level = 2;
    speedMonster = 1.25;
  }
  if (key == "3") {
    level = 3;
    speedMonster = 1.5;
  }
}

function updateSpeedMonster(clickedRange) {
  //grab the range data as an integer
  speedMonster = int(clickedRange.value);
}

function updateSpeedEraser(clickedRange) {
  //grab the range data as an integer
  speedEraser = int(clickedRange.value);
}

function updateSpeedStickman(clickedRange) {
  //grab de range data as an integer
  speedStickman = int(clickedRange.value);
}