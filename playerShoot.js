'use strict';

class PlayerShoot {
  constructor(canvas,x,y,imgShoot){
    this.size=20;
    this.canvas=canvas;
    this.canvasObject = this.canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.speed= 20;
    this.direction= 1;
    this.imgShoot=imgShoot;
  };

  update (){
    this.x = this.x + this.direction * this.speed;
  };

  draw(){
    this.canvasObject.fillstyle = 'rgb(255, 252, 156)';       
    //this.canvasObject.fillRect(this.x -this.size/2, this.y-this.size/2, this.size ,this.size );
    this.canvasObject.drawImage(this.imgShoot, this.x -this.size/2, this.y-this.size/2, this.size ,this.size);

    // ----- si lo quisiera redondo ----- 
    //this.canvasObject.fill();
    // this.canvasObject.beginPath();
    // this.canvasObject.arc(this.x, this.y-this.size/2,10,0,2*Math.PI, false);
    // this.canvasObject.stroke();
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