'use strict';

class Player {
  constructor(canvas, lives){
    this.size= 40;
    this.canvas = canvas;
    this.canvasObject = this.canvas.getContext('2d');
    this.x = 300 + this.size/2;
    this.y = this.canvas.height/2 - this.size;
    this.speed = 10;
    this.speed2=this.speed * 0.7;
    this.left=false;   //
    this.right=false;   //
    this.up=false;   //
    this.down=false;
    this.directionX = 0;
    this.directionY = 0;
    this.lives = lives;
  };

  update(){
    if (this.right && this.up){
      this.speed*0.1;
    } 
    if (this.left && this.up){
      this.speed*0,7;
    }  
    if (this.left && this.down){
      this.speed*0,7;
    } 
    if (this.right && this.down){
      this.speed*0,7;  
    } 
    if (this.right) this.x = this.x + this.speed;
    if (this.left) this.x = this.x - this.speed;
    if (this.up) this.y = this.y - this.speed;
    if (this.down) this.y = this.y + this.speed;
    
    
  };

  updateSpeed () {

    this.speed = 10;

    if (this.right && this.up){
      this.speed = this.speed2;
    } else if (this.left && this.up){
      this.speed = this.speed2;
    } else if (this.left && this.down){
      this.speed = this.speed2;
    } else if (this.right && this.down){
      this.speed = this.speed2 ; 
    } else {
      this.speed = this.speed;
    }

  };

  draw (){
    this.canvasObject.fillStyle = 'pink';
    this.canvasObject.fillRect(this.x - this.size/2 , this.y - this.size/2 , this.size, this.size);
  };

  setDirection (directionX,directionY){
    this.directionX = directionX;
    this.directionY = directionY;
  };

  checkScreen() {

    if (this.x <= 0){
      this.left = false;
    } else if (this.x - this.size>= this.canvas.width* 0.6){ // 0.7 para que la nave no vaya al final
      this.right = false;
    }
    if (this.y <= 0){ // contacto arriba
      this.up = false;
    } else if ( this.y + this.size >= this.canvas.height ){ // contacto abajo
      this.down = false;
    }
 

  };

  checkCollisionEnemy (enemy) {
     const collideRight = this.x + this.size/2 > enemy.x - enemy.size/2;
     const collideLeft = this.x - this.size/2 < enemy.x + enemy.size/2;
     const collideTop = this.y - this.size/2 < enemy.y + enemy.size/2;
     const collideBottom = this.y + this.size/2 > enemy.y - enemy.size/2;

     if(collideRight && collideLeft && collideTop && collideBottom){
       return true;
     }

     return false;

  };

  loseLive() {
    this.lives--;
  };

};










