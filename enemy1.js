'use strict';
class Enemy1 {
  constructor(canvas,y){
      this.size = 20;
      this.canvas = canvas;
      this.canvasObject = this.canvas.getContext('2d');
      this.x = this.canvas.width;
      this.y = y;
      this.speed = 5;
      this.speedHeight = 2;
      this.direction = -1;
      this.limitHeight = 50+Math.floor(Math.random()*100);
      this.isUp = true;
      this.originY = y;
  };

  updateSpeed(speed){
    this.speed = speed;
  }

  update (){
    this.x = this.x + this.direction * this.speed;

    
    // if (this.y < this.limitHeight){
    //   this.y = this.y++;
    // }else if(this.y>=this.limitHeight){
    //   this.y = this.y--;
    // }
    console.log('Now: '+this.y);
    console.log('Max: '+this.limitHeight);

    //this.y = Math.random()*100 - Math.random()*100 + this.y;
    if(this.isUp){
      this.y = this.y-this.speedHeight;
      if(this.y < this.originY-this.limitHeight){
        this.isUp = false;
      }
    }else{
      this.y = this.y+this.speedHeight;
      if(this.y > this.originY+this.limitHeight){
        this.isUp = true;
      }
    }
    


    console.log(Math.random(100));

   };

  draw(){

    this.canvasObject.fillStyle = 'red';
    this.canvasObject.fillRect(this.x,this.y - this.size/2, this.size, this.size);

  };
};









debugger;