'use strict';

class PlayerShoot {
  constructor(canvas,x,y){
    this.size=20;
    this.canvas=canvas;
    this.canvasObject = this.canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.speed= 18;
    this.direction= 1;
  };

  update (){
    this.x = this.x + this.direction * this.speed;
  };

  draw(){
    this.canvasObject.fillstyle = 'rgb(255, 252, 156)';
    this.canvasObject.fillRect(this.x, this.y-this.size/2, this.size ,this.size );
    
  };


}








debugger;