document.querySelector('#start-button').onclick = function() { //Start button is clicked 
  this.remove()  //removes start button
  startGame() //calls startGame
}

document.onclick = function(e){ //
  console.log(e.x, e.y)
}


const canvas = document.querySelector('#canvas'); //Get the canvas
var img = new Image(); //load an image element

canvas.width = window.innerWidth/1.5; //Set canvas width and height
canvas.height = 600

const ctx = canvas.getContext('2d'); //Get the context 


function startGame(){  
  console.log("START") 
  img.onload = function() {  //Load the car for the first time 
     ctx.drawImage(img, car.x, car.y, car.width, car.height); 
  }
  img.src = "./images/car.png";

  window.requestAnimationFrame(animate) //Starts the animation infinite loop
}


function drawBoard() {
  ctx.fillStyle = 'green'
  ctx.fillRect(0,0,canvas.width, canvas.height) //draws the green grass 
  ctx.fillStyle = 'grey'
  ctx.fillRect(100,0,canvas.width-200, canvas.height) //draws the road
  ctx.fillStyle = '#fff'
  ctx.fillRect(canvas.width-100,0,10, canvas.height) //draws the road 
  ctx.fillStyle = '#fff'
  ctx.fillRect(100,0,10, canvas.height) //draws the road 
}

let lines = [] // Collection of lines

function startLines() {
setInterval(() => {
  let line = { // Create new line object
    x: canvas.width/2 -5,
    y:0,
    width: 10,
    height: 40,
    color: 'white'
  }
  lines.push(line)
}, 1400);
}

function drawLine() {
  ctx.fillStyle = 'white';
  lines.forEach((line)=> {
    ctx.fillStyle = line.color;
    ctx.fillRect(line.x, line.y+=1.2, line.width, line.height);
  })
}

let logs = [] // Collection of logs

function startLogs() {
setInterval(() => {
  let randomPos = Math.random() * ((canvas.width - 200) - 100) + 100;
  
  let line = { // Create new line object
    x: randomPos,
    y:0,
    width: canvas.width/8,
    height: 20,
    color: 'brown'
  }
  lines.push(line)
}, 800);
}

function drawLogs() {
  ctx.fillStyle = 'white';
  lines.forEach((line)=> {
    ctx.fillStyle = line.color;
    ctx.fillRect(line.x, line.y+=1.2, line.width, line.height);
  })
}

let car = {  //Car object - also can be converted to a Class 
  x:canvas.width/2-20,
  y:400,
  width: 50,
  height: 80
}

function drawCar() {
  ctx.drawImage(img, car.x, car.y, car.width, car.height); //draws the car depending on the coords in the obj above 
}

document.onkeydown = function(e) { //controls -- up down left and right ... 
  switch (e.keyCode) { //changes the car object 
    case 38: car.y-=20; break;
    case 40: car.y+=20; break;
    case 37: if (car.x < 100){break} else {car.x-=20}; break;
    case 39: if (car.x > canvas.width - 140){break} else {car.x+=20}; break;
  }
  
}
startLogs()
startLines();
function animate(){
  let loop = window.requestAnimationFrame(animate) //continues the loop
  
  ctx.clearRect(0,0,canvas.width, canvas.height) //clears the whole canvas, the car, the board everything in the canvas
  
  drawBoard()  //redraws the board over and over and over again
  drawLine()
  drawLogs()
  drawCar()   //redraws the car over and over and over again
}