var player;
var normalDog, happyDog;
var lastFed;
var readState;
var currentTime;
var database;

function preload() {
  normalDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 500); 
  database = firebase.database();

  food = new Food();
 
  player = createSprite(500, 375, 25, 25);
  player.addImage(normalDog);
  player.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feedTime = database.ref('FeedTime');
  feedTime.on("value", readTime);

  readState = database.ref('gameState');
  readState.on("value", readGameState);
  
  feedButton = createButton('Feed Me');
  feedButton.position(200, 200);
  feedButton.size(50, 25);
  feedButton.mousePressed(feedDog);

  addFoodButton = createButton('Add Food');
  addFoodButton.position(200, 275);
  addFoodButton.size(50, 25);
  addFoodButton.mousePressed(addFood);
}


function draw() {  
  currentTime = hour();

  //if currentTime = lastFedtime+1---> then the background should become garden 
  if(currentTime = (lastFed + 1)) {
    food.garden();
    updateGameState("Play");
  }

  //if the currentime = last fed time+2---> then the background should become bedroom
  else if(currenTime=(lastFed+2)) {
    food.bedroom();
    updateGameState("Sleeping");
  }      
        
  //if currentime > lastfedtime + 2 and currenttime<lastfedtime+4 then background hsould become washroom
  else if(currentTime > (lastFed + 2)) {
    food.washroom();
    updateGameState("Bathing");
  }
  
  //otherwise it should show the object milk
  else {
    food.display();
    updateGameState("Hungry");
  }

  if(gameState!="Hungry") {
    feedButton.hide();
    addFoodButton.hide();
    player.remove();
  }
  else {
    feedButton.show();
    addFoodButton.show();
    player.addImage(normalDog);
  }

  fill('black');
  text("FoodStock " + foodStock, 700, 100);

  drawSprites();
}


function readStock(data) {
  foodStock = data.val();
  food.updateFoodStock(foodStock);
}


function feedDog() {
  //added the happy dog image
  player.addImage(happyDog);

  //each time the food is being used we are updating it in our javascipt object
  food.updateFoodStock(food.getFoodStock()-1);
 
  //updating the food into database
  database.ref('/').update({
    Food: food.getFoodStock(),
    FeedTime: hour(),
    gameState: Hungry
  });
}

function addFood() {
  //whenever we press the addfood button we want the food to increase
  foodStock++;
  database.ref('/').update({
    Food: foodStock
  });
}

//reading lastfed time in database
function readTime(data) {
  //json format change in time is converted to javascript
  lastFed = data.val();
}

//reading gamestate in database
function readGameState(data) {
  readState = data.val();
}

//updating the game state in database
function updateGameState(state) {
  database.ref('/').update({
    gameState: state
  });
}