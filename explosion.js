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

      //this.imgAnimation=requestAnimationFrame(draw);
      this.canvasObject.fillStyle = 'rgb(0,0,0,0)';
      this.canvasObject.fillRect(this.x - this.size/2 , this.y - this.size/2 , this.size, this.size);
      //this.canvasObject.drawImage(this.img, 100*this.imageFrame, 0, 170 ,120,this.x -this.size/2,this.y-this.size/2,this.size,this.size);
      this.canvasObject.drawImage(this.imgGif, 130*this.imageFrame, 0, 130 , 130, this.x -this.size/2,this.y-this.size/2,this.size,this.size);
      //this.this.x += speed;
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

    // //this.imgAnimation=requestAnimationFrame(draw);
    // this.canvasObject.fillStyle = 'rgb(0,0,0,0)';
    // this.canvasObject.fillRect(this.x - this.size/2 , this.y - this.size/2 , this.size, this.size);
    // //this.canvasObject.drawImage(this.img, 100*this.imageFrame, 0, 170 ,120,this.x -this.size/2,this.y-this.size/2,this.size,this.size);
    // this.canvasObject.drawImage(this.imgGif, 130*this.imageFrame, 0, 130 , 130, this.x -this.size/2,this.y-this.size/2,this.size,this.size);
    // //this.this.x += speed;
    // this.imageSpeed++;
    // if(this.imageSpeed % 6 === 0){
    //   this.imageFrame++;
    // } if (this.imageFrame >13){
    //   //his.imageFrame = 0 ;
    //   this.explosion.splice(index)

    // } ;




  };

  // checkCollisionEnemy (enemy) {
  //    const collideRight = this.x + this.size/2 > enemy.x - enemy.size/2;
  //    const collideLeft = this.x - this.size/2 < enemy.x + enemy.size/2;
  //    const collideTop = this.y - this.size/2 < enemy.y + enemy.size/2;
  //    const collideBottom = this.y + this.size/2 > enemy.y - enemy.size/2;

  //    if(collideRight && collideLeft && collideTop && collideBottom){
  //      return true;
  //    }

  //    return false;

  // };

  

};










