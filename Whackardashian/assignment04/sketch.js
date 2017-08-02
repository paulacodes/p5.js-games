// Score
var score = 0;

// Kardashian images
var kim, kylie, kendall, khloe, kris, blac;

// Lipstick images
var lipstick_up, lipstick_down;

// Lipstick variable
var lipstick;

// Diamond image
var diamond;

// Start screen
var start_screen;

// Win screen
var win;

// Lose screen
var lose;

// Start, End and Instructions conditions
var start = false;
var end = false;
var instructions = false;

// Time counter
var timePassed = 0;

// 60-second Countdown
var countDown;

// Start screen button
var buttonX, buttonY;

// Sounds
var theme_song, ouch;

function preload() {
  
  // Load the images of the Kardashians + the Blac Chyna intruder
  kim = loadImage("images/kimMole.png");
  kylie = loadImage("images/kylieMole.png");
  kendall = loadImage("images/kendallMole.png");
  khloe = loadImage("images/khloeMole.png");
  kris = loadImage("images/krisMole.png");
  kourtney = loadImage("images/kourtneyMole.png");
  blac = loadImage("images/blacMole.png");
  diamond = loadImage("images/diamond.png");
  
  // Load the images of the lipstick that will be used to whack the Kardashians
  lipstick_up = loadImage("images/lipstickUp.png");
  lipstick_down = loadImage("images/lipstickDown.png");
  
  // Load the starting/winning/losing screens
  start_screen = loadImage("images/startScreen.png");
  instructions_screen = loadImage("images/instructions.png");

  // Load the sounds
  theme_song = loadSound("sounds/kimSong.mp3");
  ouch = loadSound("sounds/ouch.mp3");
  
  imageMode(CENTER);
}

function setup() {
  createCanvas(500,500);
  
  // Create kardashian objects
  k1 = new Mole(125,125);
  k2 = new Mole(125,250);
  k3 = new Mole(125,375);
  k4 = new Mole(250,125);
  k5 = new Mole(250,250);
  k6 = new Mole(250,375);
  k7 = new Mole(375,125); 
  k8 = new Mole(375,250); 
  k9 = new Mole(375,375);
}

function draw() {
  
  // Display start screen
  if(start == false && end == false && instructions == false) {
    startScreen();
  }
  
  // Display instructions screen
  if(start == false && end == false && instructions == true) {
    instructionsScreen();
  }
  
  // Play game
  else if(start == true && end == false && instructions == false) {
    
    background(255);

    // Display score + time
    displayInfo();
  
    // Update kardashians
    k1.update();
    k2.update();
    k3.update();
    k4.update();
    k5.update();
    k6.update();
    k7.update();
    k8.update();
    k9.update();
  
    // Check if Kardashian was hit
    hit1 = k1.checkHit(mouseX, mouseY);
    hit2 = k2.checkHit(mouseX, mouseY);
    hit3 = k3.checkHit(mouseX, mouseY);
    hit4 = k4.checkHit(mouseX, mouseY);
    hit5 = k5.checkHit(mouseX, mouseY);
    hit6 = k6.checkHit(mouseX, mouseY);
    hit7 = k7.checkHit(mouseX, mouseY);
    hit8 = k8.checkHit(mouseX, mouseY);
    hit9 = k9.checkHit(mouseX, mouseY);

    // Display kardashians
    k1.display();
    k2.display();
    k3.display();
    k4.display();
    k5.display();
    k6.display();
    k7.display();
    k8.display();
    k9.display();
  
    // Figure out which way lipstick should point
    lipstickType();
  
    // End game after 60 seconds
    gameOver();
  }
}

// Display score + countdown
function displayInfo(){

  fill(0);
  textSize(20);
  text("Score: ",115,20);
  text("Time left: ",100,50);
  text(score,170,20);
  text(countDown,170,50);

  if(timePassed % 60 == 0){
    countDown -=1;
  }
}

// Start screen
function startScreen(){
  
  // Play theme song
  if(theme_song.isPlaying() == false){
    theme_song.play();
  }
  
  // Set countdown time to 60 seconds
  countDown = 60;
  score = 0;
  
  imageMode(CENTER);
  image(start_screen,250,250);
  
  // Set the location for the play button
  playX = 380;
  playY = 460;
  
  // Set the location for the instructions button
  instructionX = 25
  instructionY= 460;
  
  textAlign(CENTER,CENTER);
  textSize(20);
  textFont("Al Bayan");
  
  // Draw play button
  fill(255);
  strokeWeight(4);
  rect(playX, playY, 100, 30);
  
  // Draw instructions button
  fill(255);
  strokeWeight(4);
  rect(instructionX, instructionY, 100, 30);
  
  // Play button text
  fill(0);
  text("PLAY",playX+50, playY+17);
  
  // Instructions button text
  textSize(13);
  fill(0);
  text("INSTRUCTIONS",instructionX+50, instructionY+17)
  
  
  // Start game once play button is clicked
  if (mouseX > playX && mouseX < playX + 100 && mouseY > playY && mouseY < playY + 30 && mouseIsPressed) {
      start = true;
  }
  
  // Show instructions once instruction button is clicked
  if (mouseX > instructionX && mouseX < instructionX + 100 && mouseY > instructionY && mouseY < instructionY + 30 && mouseIsPressed) {
      instructions = true;
  }
  
}

// Display instructions
function instructionsScreen() {
  image(instructions_screen, 250, 250);
  
  // Set the location for the back button
  backX = 210;
  backY = 460;
  
  textAlign(CENTER,CENTER);
  textSize(20);
  textFont("Al Bayan");
  
  // Draw back button
  fill(255);
  strokeWeight(4);
  rect(backX, backY, 100, 30);
  
  // Back button text
  fill(0);
  text("BACK",backX+50, backY+17);
  
  // Go back to start screen once back button is clicked
  if (mouseX > backX && mouseX < backX + 100 && mouseY > backY && mouseY < backY + 30 && mouseIsPressed) {
      instructions = false;
  }
  
}

// End game once score is greater than 50 or 60 seconds have passed.
function gameOver(){
  // Incremenent timePassed by 1 every frame, assuming there are 60 frames per second,
  // we will reach 60 seconds once timePassed = 3600.
  timePassed += 1;
  
  // Condition to win game
  if(score >= 50) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU WIN.", 250, 250);
    start = false;
    end = true;
  }
  
  // Condition to lose game
  if(timePassed == 3600){
    // reset background image according to results of game
    background(255);
    textSize(80);
    fill(0);
    text("YOU LOSE.", 250,250);
    start = false;
    end = true;
  }
}

// Figure out which way lipstick should be pointing
function lipstickType(){
  noCursor();
  
  // If mouse is down, make lipstick point down
  if(mouseIsPressed){
    lipstick = lipstick_down;
  }
  // If mouse is up, make lipstick straight
  else{
    lipstick = lipstick_up;
  }
  image(lipstick,mouseX,mouseY);
}

// Constructor for a mole object
function Mole(x, y){
  
  // Position of mole
  this.xPos = x;
  this.yPos = y;
  
  // Randomly chosen up/down state for mole
  this.state = int(random(0,2));
  
  // Choose a random mole kardashian
  this.randomMole = function() {
    var randomNum = random(-1,20);
    
    // 2/20 chance kim
    if(randomNum < 2){
      return 0;
    }
    // 2/20 chance kylie
    else if(randomNum < 4){
      return 1;
    }
    // 3/20 chance kendall
    else if(randomNum < 7){
      return 2;
    }
    // 3/20 chance khloe
    else if(randomNum <10){
      return 3;
    }
    // 3/20 chance kourtney
    else if(randomNum < 13){
      return 4;
    }
    // 3/20 chance kris
    else if(randomNum < 16){
      return 5;
    }
    // 4/20 chance blac
    else if(randomNum < 20) {
      return 6;
    }
  }
  
  // Set the mole type state randomly 
  this.moleType = this.randomMole();
  
  // Display the state of the mole
  this.display = function(){

    imageMode(CENTER);
    
    // If the kardashian is down, display a diamond
    if (this.state == 0) {
      image(diamond,this.xPos,this.yPos,100,100);
    }

    // Otherwise, display kardashian
    else{
      if(this.moleType == 0) {
        image(kim,this.xPos,this.yPos);
      }
      else if(this.moleType == 1){
        image(kylie,this.xPos,this.yPos);
      }
      else if(this.moleType == 2){
        image(kendall,this.xPos,this.yPos);
      }
      else if(this.moleType == 3){
        image(khloe,this.xPos,this.yPos);
      }
      else if(this.moleType == 4){
        image(kourtney,this.xPos,this.yPos);
      } else if(this.moleType == 5){
        image(kris,this.xPos,this.yPos);
      } else if(this.moleType == 6){
        image(blac,this.xPos,this.yPos);
      }
    }
  }
  
  // Switch states after a random number of frames
  this.switchState = int(random(100,250));
  
  // Frame counter
  this.frames = 0;
  
  // Update the mole's state
  this.update = function(){
    
    this.frames += 1;
    
    // Change state once number of frames is equal to randomly set switchState number of frames
    if(this.frames == this.switchState){

      this.state = !this.state;
      
      this.moleType = this.randomMole();
      
      this.switchState = int(random(100,250));
      
      this.frames = 0;
    }
  }
  
  this.hit = false;
  
  // Check if mole was hit
  this.checkHit = function(x, y){

    if(x < this.xPos+50 && x > this.xPos-50 && y < this.yPos+50 && y > this.yPos-50 && mouseIsPressed){
      this.hit = true;
      
      if(this.state == 1){
        
        // Play hit sound
        ouch.play();

        this.state = 0;
        
        // If you whacked kim, get 5 points
        if(this.moleType == 0){
          score += 5;
        }
        // If you whacked blac, lose 5 points
        else if(this.moleType == 6){
          score -= 5;
        }
        // Get 2 points for all the other kardashians
        else {
          score += 2;
        }
      }
    }
    
    // Return hit state
    return this.hit;
  }
}
