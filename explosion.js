'use strict';

class Explosion {
  constructor(canvas, x,y){
    this.size= 220;
    this.canvas = canvas;
    this.canvasObject = this.canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.speed = 12;
    this.direction = -1;
    this.img = imgExplosion;
    this.imgGif = imgExplosionGif;
    this.imageFrame = 0;
    this.imageSpeed = 0;
   

  };

  update(){
    this.x = this.x + this.direction * this.speed;
    
  };

  draw (getExplosion){

    if(getExplosion === true){

      
      this.canvasObject.fillStyle = 'rgb(0,0,0,0)';
      this.canvasObject.fillRect(this.x - this.size/2 , this.y - this.size/2 , this.size, this.size);
      this.canvasObject.drawImage(this.imgGif, 130*this.imageFrame, 0, 130 , 130, this.x -this.size/2,this.y-this.size/2,this.size,this.size);
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
};










