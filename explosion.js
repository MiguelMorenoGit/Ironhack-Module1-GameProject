'use strict';

class Explosion {
  constructor(canvas, x, y, speed, size){
    this.size = size;
    this.canvas = canvas;
    this.canvasObject = this.canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = -1;
    this.img = imgExplosion;
    this.imgGif = imgExplosionGif;
    this.imageFrame = 0;
    this.imageSpeed = 0;
    this.isAlive = true;
   

  };

  update(){
    this.x = this.x + this.direction * this.speed;
    this.isAlive = this.animateSprite();
    
  };

  draw (getExplosion){

    if(getExplosion === true){

      
      this.canvasObject.fillStyle = 'rgb(0,0,0,0)';
      this.canvasObject.fillRect(this.x - this.size/2 , this.y - this.size/2 , this.size, this.size);
      this.drawSprite();
      
    }
  };

  drawSprite(){
    this.canvasObject.drawImage(this.imgGif, 130*this.imageFrame, 0, 130 , 130, this.x -this.size/2,this.y-this.size/2,this.size,this.size);
  }

  animateSprite() {
    this.imageSpeed++;
      if(this.imageSpeed % 7=== 0){
        this.imageFrame++;
      } 
      if (this.imageFrame >13){
        //this.imageFrame = 0 ;
        return false;
      } else {
        return true;
      }
  }

};










