var dog,dogimg,dogHappy,foodStock,foods;
var database;
var food1;

function preload(){
dogimg = loadImage("images/dogImg.png");
dogHappy = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(700, 550);
  
  
  dog = createSprite(400,350,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

 
 
}


function draw() {
  background(46,139,87); 
  
  if (keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogHappy);
  }

  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogimg);
  }

  drawSprites();

  
  textSize(30);
  fill("red")
  text("Food Remaining: "+foods,200,200);
  fill("yellow")
  text("Press the up arrow key to feed the dog.",150,50);
  
}

function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if (x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  });
}


