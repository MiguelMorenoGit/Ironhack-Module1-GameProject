'use strict';
class Cloud {
  constructor(canvas,y){
      this.size = 10;
      this.canvas = canvas;
      this.canvasObject = this.canvas.getContext('2d');
      this.x = this.canvas.width;
      this.y = y;
      this.speed = 20;
      this.direction = -1;
  };

  update (){
    this.x = this.x + this.direction * this.speed;

  };

  draw(){

    this.canvasObject.fillStyle = 'white';
    this.canvasObject.fillRect(this.x,this.y - this.size/2, this.size, this.size);

  };
};









debugger;