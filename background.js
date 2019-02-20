'use strict';

class Background {
  constructor(canvas){
    this.canvas= canvas;
    this.canvasObject = this.canvas.getContext('2d');
    this.player;
    this.parallax1;
    this.parallax2;
    this.clouds = [];
    this.speedGame = 3;
    
  };

  startLoop(){

    this.parallax2 = new Parallax2(this.canvas);
    this.parallax1 = new Parallax1(this.canvas);
    gameSound.currentTime =0;
    gameSound.play();
    gameSound.volume = 0.2;

    const loop = () => {

      if(Math.random() > 0.8) {
        const y = Math.random()*this.canvas.height;
        this.clouds.push(new Cloud(this.canvas,y));
      };

      this.clearCanvas ();
      this.drawCanvas ();
      this.checkAllCollisions();
      this.updateCanvas();
      window.requestAnimationFrame(loop);

    };
    window.requestAnimationFrame(loop);
  };

  updateCanvas(){
    this.parallax2.update();
    this.parallax1.update();
    this.clouds.forEach((cloud)=>{
      cloud.update();
    });
    
  };

  clearCanvas(){
    this.canvasObject.clearRect(0,0,this.canvas.width,this.canvas.height);
  };

  drawCanvas(){
    this.parallax2.draw();
    this.parallax1.draw();
    //this.canvasObject.fillStyle = 'rgb(255, 252, 156)';
    this.clouds.forEach((cloud)=>{
      cloud.draw();
    });
  };

  checkAllCollisions(){
    this.clouds.forEach ((cloud, index) =>{
      if (cloud.x - cloud.size/2 <= 0 ){
         this.clouds.splice(index,1);
      };
    });
  };
  // gameOverCallback(callback){
  //   this.onGameOver = callback;
  // };
};