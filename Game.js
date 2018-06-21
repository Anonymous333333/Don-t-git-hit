var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

class Obstacle {
  constructor( radius, color, x, y, velocity_x, velocity_y ) {
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = y;
    this.velocity_x = velocity_x;
    this.velocity_y = velocity_y;
  }

  draw() {
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2, true );
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.x += this.velocity_x;
    this.y += this.velocity_y;
    if ( this.x + this.radius > canvas.width || this.x - this.radius < 0 ) {
      this.velocity_x *= -1
    }
    if ( this.y + this.radius > canvas.height || this.y - this.radius < 0 ) {
      this.velocity_y *= -1
    }
  }

  getRadius(){
    return this.radius;
  }

  getXposition(){
    return this.x;
  }

  getYposition(){
    return this.y
  }
}

var balls = createObstacle();

function createObstacle(){
  balls = [];
  for( var i = 0; i < 7; i++ ) {
    balls.push( new Obstacle( Math.random()*25, "#401e72", 635, 417, Math.random()*5, Math.random()*5 ) );
  }
  for( var i = 0; i < 7; i++ ) {
    balls.push( new Obstacle( Math.random()*17, "#094f2b", 635, 417, Math.random()*5, Math.random()*5 ) );
  }
  for( var i = 0; i < 6; i++ ) {
    balls.push( new Obstacle( Math.random()*15, "#4e5eb7", 635, 417, Math.random()*5, Math.random()*5 ) );
  }
  return balls;
}

class Ball {
  constructor( radius, color, x, y, speed ) {
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.velocity_x = 0;
    this.velocity_y = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2, true );
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    this.update();
  }
  update() {
      this.x += this.velocity_x;
      this.y += this.velocity_y;
      if ( this.x + this.radius > canvas.width || this.x - this.radius < 0 ) {
        this.velocity_x *= -1
      }
      if ( this.y + this.radius > canvas.height || this.y - this.radius < 0 ) {
        this.velocity_y *= -1
    }
  }
    keyPressed(keyCode){
      if(keyCode == 65){
        //A pressed
        this.velocity_x = -this.speed;
      }
      if(keyCode == 87){
        //W pressed
        this.velocity_y = -this.speed;
      }
      if(keyCode == 68){
        //D pressed
        this.velocity_x = this.speed;
      }
      if(keyCode == 83){
        //S pressed
        this.velocity_y = this.speed;
        }
    }
    keyReleased(keyCode){
      console.log(keyCode);
      if(keyCode == 65){
        //A pressed
        this.velocity_x = -0;
      }
      if(keyCode == 87){
        //W pressed
        this.velocity_y = -0;
      }
      if(keyCode == 68){
        //D pressed
        this.velocity_x = 0;
      }
      if(keyCode == 83){
        //S pressed
        this.velocity_y = 0;
        }
    }


  getRadius(){
    return this.radius;
  }

  getXposition(){
    return this.x;
  }

  getYposition(){
    return this.y
  }
}
var ball = new Ball(25, "blue", 200, 200, 5);
window.addEventListener("keydown", keyPressed, false);
window.addEventListener("keyup", keyReleased, false);

function keyPressed(e){
  e.preventDefault();
  ball.keyPressed(e.keyCode);
}
function keyReleased(e){
  ball.keyReleased(e.keyCode);

}
function distance( x1, y1, x2, y2){
  var a = x1 - x2;
  var b = y1 - y2;

  var dist = Math.sqrt( a*a + b*b );
  return dist;
}

var timer = 0 ;

function draw(){
  timer += 1;
  ctx.clearRect( 0, 0, canvas.width, canvas.height );
  ball.draw();

  for( var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }

   for( var i = 0; i < balls.length; i++) {

     radius_b1 = ball.getRadius();
    radius_b2 = balls[i].getRadius();

    x_b1 = ball.getXposition();
    x_b2 = balls[i].getXposition();

    y_b1 = ball.getYposition();
    y_b2 = balls[i].getYposition();

    sum_radius = radius_b1 + radius_b2;

    dist = distance( x_b1, y_b1, x_b2, y_b2 );

    if (sum_radius>= dist){
      alert("YOU FAILED. Press ok to play again.")
      ball = new Ball(25, "blue", 200, 200, 5);
      balls = createObstacle();
      timer = 0;
    }

    ctx.fillStyle="#ffffff";
    ctx.fillRect(5,20,350,50);

    ctx.font = "30px Arial";
    ctx.fillStyle="#000000";
    ctx.fillText("Points: " + timer,10,50);

   }

  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
