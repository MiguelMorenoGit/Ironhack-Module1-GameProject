'use strict';

class PlayerShoot {
  constructor(canvas,x,y){
    this.size=60;
    this.canvas=canvas;
    this.canvasObject = this.canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.speed= 25;
    this.direction= 1;
    this.img=imgShoot;
    this.imgGif=imgShootGif;
    this.imageFrame = 0;
    this.imageSpeed = 0;
  };

  update (){
    this.x = this.x + this.direction * this.speed;
  };

  draw(){
    this.canvasObject.fillStyle = "rgb(0,0,0,0)";     
    this.canvasObject.fillRect(this.x -this.size/2, this.y-this.size/2, 200 ,60);
    this.canvasObject.drawImage(this.imgGif,200*this.imageFrame,0,200,60, this.x -this.size/2, this.y-this.size/2, 200,60);
    //console.log('draw');


    //this.this.x += speed;
    this.imageSpeed++;
    if(this.imageSpeed % 6 === 0){
      this.imageFrame++;
    } if (this.imageFrame >4){
      this.imageFrame = 0;
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




}








debugger;