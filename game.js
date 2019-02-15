'use strict';

class Game {
  constructor(canvas){
    this.canvas= canvas;
    this.canvasObject = this.canvas.getContext('2d');
    this.player;
    this.playerShoot =[];
    this.enemies1 = [];
    this.isGameOver = false;
  };

  startLoop(){

    this.player = new Player(this.canvas, 3);

    const loop = () => {

      
      this.clearCanvas ();
      this.drawCanvas ();
      this.checkAllCollisions();
      this.updateCanvas();
      
       

      window.requestAnimationFrame(loop);

    };

    

    
    window.requestAnimationFrame(loop);
  };

  updateCanvas(){
    this.player.update();

  };

  clearCanvas(){
    this.canvasObject.clearRect(0,0,this.canvas.width,this.canvas.height);
  };

  drawCanvas(){
    this.player.draw();

  };

  checkAllCollisions(){
    this.player.checkScreen();

  };

  gameOverCallback(callback) {
    this.onGameOver = callback;
  };

};









