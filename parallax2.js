'use strict';
class Parallax2 {
  constructor(canvas){

      //this.img = imgSea;
      this.canvas = canvas;
      this.canvasObject = this.canvas.getContext('2d');
      this.x = 0;
      this.speed = -2;
      this.img = imgCity;
      this.imageFrame = 0;
      this.imageSpeed = 0;
      
  };

  
  update (){
    this.x = this.x + this.speed;
    this.x = this.x % this.img.width ; // para que se repita todo el rato
    //this.x = 2000;

  };

  draw(){                     //  img        positionx    position y    tamaño en x    tamaño en y

   
    this.canvasObject.drawImage(this.img, this.x,0,this.img.width, this.canvas.height);
    this.canvasObject.drawImage(this.img, this.x + this.img.width,0,this.img.width,this.canvas.height);
   
   





  };
};




debugger;