'use strict';
class Enemy1 {
  constructor(canvas,y,speed){
      this.size = 170;
      this.canvas = canvas;
      this.canvasObject = this.canvas.getContext('2d');
      this.x = this.canvas.width;
      this.y = y;
      this.speed = speed;//5
      this.speedHeight = 2;//2
      this.direction = -1; 
      this.limitHeight = 50+Math.floor(Math.random()*100);
      this.isUp = true;
      this.originY = y;
      this.img = imgEnemy1;
      this.imgGif = imgEnemy1Gif;
      this.imageFrame = 0;
      this.imageSpeed = 0;
  };

  updateSpeed(speed){
    this.speed = speed;         
  }

  update (){
    this.x = this.x + this.direction * this.speed;

  
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

    

    this.canvasObject.fillStyle = "rgb(0,0,0,0)";
    this.canvasObject.fillRect(this.x - this.size/2 ,this.y - this.size/2, this.size, this.size);
    //this.canvasObject.drawImage(this.img, this.x -this.size/2, this.y-this.size/2, this.size ,this.size);
    this.canvasObject.drawImage(this.imgGif, 100*this.imageFrame, 0, 100 ,150,this.x -this.size/2, this.y-this.size/2, this.size ,this.size);
    //this.this.x += speed;
    this.imageSpeed++;
    if(this.imageSpeed % 3 === 0){
      this.imageFrame++;
    } if (this.imageFrame >11){
      this.imageFrame = 0;
    }

    // this.canvasObject.fillStyle = "rgb(0,0,0,0)";
    // this.canvasObject.fillRect(this.x - this.size/2 ,this.y - this.size/2, this.size, this.size);
    // //this.canvasObject.drawImage(this.img, this.x -this.size/2, this.y-this.size/2, this.size ,this.size);
    // this.canvasObject.drawImage(this.imgGif, 130*this.imageFrame, 0, 130 ,130,this.x -this.size/2, this.y-this.size/2, this.size ,this.size);
    // //this.this.x += speed;
    // this.imageSpeed++;
    // if(this.imageSpeed % 2 === 0){
    //   this.imageFrame++;
    // } if (this.imageFrame >13){
    //   this.imageFrame = 0;
    // }

  };

  updateSpeed(newSpeed)
  {
    this.speed = this.speed+newSpeed;
  }
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