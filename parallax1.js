'use strict';
class Parallax1 {
  constructor(canvas,img){

      this.img = img;
      this.canvas = canvas;
      this.canvasObject = this.canvas.getContext('2d');
      this.x = 0;
      this.speed = -40;
      
  };

  
  update (){
    this.x = this.x + this.speed;
    this.x = this.x % this.canvas.width; // para que se repita todo el rato
    //this.x = 2000;

  };

  draw(){                     //  img        positionx    position y    tamaño en x    tamaño en y

    // this.canvasObject.drawImage(this.img, this.x, this.canvas.height - this.img.height, this.img.width, this.img.height);
    // if (this.speed < 0) {
    //   this.canvasObject.drawImage(this.img, this.x + this.img.width, this.canvas.height - this.img.height, this.img.width, this.img.height);
    // } else {
    //   this.canvasObject.drawImage(this.img, this.x - this.img.width, this.canvas.height - this.img.height, this.img.width, this.img.height);
    // }
    this.canvasObject.drawImage(this.img, this.x, this.canvas.height - this.img.height);
    this.canvasObject.drawImage(this.img, this.x + this.canvas.width, this.canvas.height - this.img.height);
  };
};




debugger;