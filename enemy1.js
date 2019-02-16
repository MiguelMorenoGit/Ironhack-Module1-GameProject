'use strict';
class Enemy1 {
  constructor(canvas,y){
      this.size = 50;
      this.canvas = canvas;
      this.canvasObject = this.canvas.getContext('2d');
      this.x = this.canvas.width;
      this.y = y;
      this.speed = 5;//5
      this.speedHeight = 0;//2
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
    

   };

  draw(){

    this.canvasObject.fillStyle = "orange";
    this.canvasObject.fillRect(this.x - this.size/2 ,this.y - this.size/2, this.size, this.size);

  };

  // checkScreen(){
  //   if (this.x - this.size/2 <= 0 ){
  //     this.enemies1.splice(index,1);
  //   };
  // };


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
};











debugger;