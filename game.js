'use strict';

class Game {
  constructor(canvas){
    this.canvas= canvas;
    this.canvasObject = this.canvas.getContext('2d');
    this.player;
    this.shoots =[];
    this.enemies1 = [];
    this.clouds = [];
    this.isGameOver = false;
    //this.contadorPush = 0;
  };

  startLoop(){

    this.player = new Player(this.canvas, 3);

    
    
    //const y = Math.random()*this.canvas.height;
    // this.enemies1.push(new Enemy1(this.canvas,y));

    const loop = () => {

      if(Math.random() > 0.98) {
        const y = Math.random()*this.canvas.height;
        this.enemies1.push(new Enemy1(this.canvas,y));
      };

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

    //velocityUp = 1000000;

  updateCanvas(){
    this.player.update();
    this.player.updateSpeed();
    this.shoots.forEach((shoot) => {
      shoot.update();
    });
    this.enemies1.forEach((enemy)=>{
      enemy.update();
      
    });
    this.clouds.forEach((cloud)=>{
      cloud.update();
    });

  };

  clearCanvas(){
    this.canvasObject.clearRect(0,0,this.canvas.width,this.canvas.height);
  };

  drawCanvas(){
    this.player.draw();
    this.canvasObject.fillStyle = 'rgb(255, 252, 156)';
    this.shoots.forEach((shoot) => {
      shoot.draw();
    });
    //this.canvasObject.fillStyle = 'green';
    this.enemies1.forEach((enemy)=>{
      enemy.draw();
      
    });
    //this.canvasObject.fillStyle = 'white';
    this.clouds.forEach((cloud)=>{
      cloud.draw();
    });

    console.log(this.enemies1);
    console.log(this.shoots);
    console.log(this.clouds);

  };

  checkAllCollisions(){
    this.player.checkScreen();
    this.enemies1.forEach ((enemy, index) =>{
      if (enemy.x - enemy.size/2 <= 0 ){
         this.enemies1.splice(index,1);
      };
      if(this.player.checkCollisionEnemy(enemy)){
        this.player.loseLive();
        this.enemies1.splice(index,1);
        if (this.player.lives === 0){
          this.isGameOver = true;
          this.onGameOver();
          
        }; 
      };
      
      
      this.shoots.forEach ((shoot, index) =>{
        if (shoot.checkCollisionEnemy(enemy)){
          this.shoots.splice(index,1);
          this.enemies1.splice(index,1);
        };
      });
      

    });

    this.shoots.forEach ((shoot, index) =>{
      if (shoot.x + shoot.size/2 > this.canvas.width ){
         this.shoots.splice(index,1);
      };
      
      
      
    });

    this.clouds.forEach ((cloud, index) =>{
      if (cloud.x - cloud.size/2 <= 0 ){
         this.clouds.splice(index,1);
      };
    });
  };

  gameOverCallback(callback){
    this.onGameOver = callback;
  };

};









