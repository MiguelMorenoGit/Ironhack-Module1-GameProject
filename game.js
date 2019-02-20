'use strict';

class Game {
  constructor(canvas,scoreLabel,playerLives){
    this.canvas= canvas;
    this.canvasObject = this.canvas.getContext('2d');
    this.player;
    //this.playerNewLives = playerLives;
    this.playerLives=playerLives;
    this.parallax1;
    this.parallax2;
    this.shoots =[];
    this.enemies1 = [];
    this.clouds = [];
    this.explosions = [];
    this.isGameOver = false;
    this.scoreLabel = scoreLabel;
    this.speedIncrease = 0.02;
    this.speedGame = 3;
    this.enemyIncrease = -0.0005;
    this.enemyCount = 0.98;
    
    
  };

  startLoop(){

    this.player = new Player(this.canvas, 3);
    this.parallax2 = new Parallax2(this.canvas);
    this.parallax1 = new Parallax1(this.canvas);

    //const y = Math.random()*this.canvas.height;
    // this.enemies1.push(new Enemy1(this.canvas,y));

    const loop = () => {

      if(Math.random() > this.enemyCount) {
        const y = Math.random()*this.canvas.height;
        this.enemies1.push(new Enemy1(this.canvas,y,this.speedGame));
      };

      if(Math.random() > 0.8) {
        const y = Math.random()*this.canvas.height;
        this.clouds.push(new Cloud(this.canvas,y));
      };

      this.clearCanvas ();
      this.drawCanvas ();
      this.checkAllCollisions();
      this.updateCanvas();
      this.scoreLabel.innerHTML="  Your score :  " + this.player.score;
      this.playerLives.innerHTML="  Your lives :  " + this.player.lives;
      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  };

  updateCanvas(){
    this.parallax2.update();
    this.parallax1.update();
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
    this.explosions.forEach((explosion)=>{
      explosion.update();
    });
  };

  clearCanvas(){
    this.canvasObject.clearRect(0,0,this.canvas.width,this.canvas.height);
  };

  drawCanvas(){
    this.parallax2.draw();
    this.parallax1.draw();
    this.player.draw();
    this.canvasObject.fillStyle = 'rgb(255, 252, 156)';
    this.shoots.forEach((shoot) => {
      // shoot.audio.currentTime =0;    -------arreglar sonido miercoles
      // shoot.audio.play();
      shoot.draw();
    });
    ;
    this.enemies1.forEach((enemy)=>{
      enemy.draw(); 
    });

    this.clouds.forEach((cloud)=>{
      cloud.draw();
    });

    this.explosions.forEach((explosion,indexExplosion) =>{
      const isItDrawing = explosion.draw(true);
      if (!isItDrawing){
        this.explosions.splice(indexExplosion,1);
      };
    });
  };

  checkAllCollisions(){
    this.player.checkScreen();
    this.enemies1.forEach ((enemy, indexEnemy) =>{
      if (enemy.x - enemy.size/2 <= 0 ){
         this.enemies1.splice(indexEnemy,1);
         this.player.updateScore(false);
      };
      if(this.player.checkCollisionEnemy(enemy)){
        this.player.loseLive();
        this.enemies1.splice(indexEnemy,1);
        if (this.player.lives === 0){
          this.isGameOver = true;
          this.onGameOver(); 
        }; 
      };
      
      this.shoots.forEach ((shoot, index) =>{
        if (shoot.checkCollisionEnemy(enemy)){
          this.explosions.push(new Explosion (this.canvas,shoot.x,shoot.y));
          
          //if(e.keyCode === 32 )game.shoots.push(new PlayerShoot(game.canvas,game.player.x+140,game.player.y+40));
          
          this.shoots.splice(index,1);
          this.enemies1.splice(indexEnemy,1);
          this.player.updateScore(true);
          this.speedGame = this.speedGame+this.speedIncrease;
          this.enemies1.forEach((e,indexe)=>{
              e.updateSpeed(this.speedIncrease);            
          });
          this.enemyCount = this.enemyCount+this.enemyIncrease;
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