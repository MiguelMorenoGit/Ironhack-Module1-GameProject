'use strict';


class Cloud {
  constructor(canvas,y){
      this.size = 10;
      this.canvas = canvas;
      this.canvasObject = this.canvas.getContext('2d');
      this.x = this.canvas.width;
      this.y = y;
      this.speed = 40;
      this.direction = -1;

      // entre 0.3 y 0.8 aprox
      this.opacity = Math.random() * 0.5 + 0.3; 

      this.color = Math.random() > 0.5
      ? `rgba(255, 165, 0, ${this.opacity})`
      : `rgba(255, 0, 0, ${this.opacity})`;

      // Elegimos un color aleatorio UNA sola vez al crear la nube
      this.color = Math.random() > 0.5 ? 'orange' : 'red';
  };

  update (){
    this.x = this.x + this.direction * this.speed;

  };

  draw(){

    this.canvasObject.fillStyle = this.color; // Usamos el color elegido al crear la nube
    this.canvasObject.fillRect(this.x,this.y - this.size/2, this.size, this.size);

  };
};









debugger;