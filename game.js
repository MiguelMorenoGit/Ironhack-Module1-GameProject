// @ts-nocheck
'use strict';

class Game {
  constructor(canvas,callbackScore,playerLives){
    this.isPaused = false;
    this.canvas= canvas;
    this.canvasObject = this.canvas.getContext('2d');
    this.player = null;
    //this.playerNewLives = playerLives;
    this.playerLives=playerLives;
    this.parallax1 = null;
    this.parallax2 = null;
    this.shoots =[];
    this.enemieChargerArray= [];
    this.enemieChargerMax= 6;
    this.clouds = [];
    this.explosions = [];
    this.isGameOver = false;
    this.onGameOver = null;
    this.updateScoreInMain = callbackScore;
    this.speedIncrease = 0.05;
    this.speedGame = 3;
    this.enemyIncrease = -0.0003;
    this.enemyCount = 0.90;
    // this.gameSound= new Audio ("./sonidos/D1 - Go Straight (Original Version)-[AudioTrimmer.com].mp3");
    // this.windSound = new Audio ("./sonidos/viento_en_un_canaveral_de_un_parque_1.mp3");
    this.enemySound = new Audio ("./sonidos/wreee.mp3");
    this.explosionSound = new Audio ("./sonidos/Short-Explosion.wav");
    this.noEnemies = false;
    //this.finalScore = 0;
    this.animationId = null; // Para guardar el ID de la animación y poder cancelarla si es necesario
    

  };

  // Aquí van los métodos de la clase Game, como startLoop, updateCanvas, clearCanvas, drawCanvas, etc.
  startLoop(){

    
    if (this.animationId) return; // evita duplicados
    //this.resetAllVariables();
    this.player = new Player(this.canvas, 3);
    this.parallax2 = new Parallax2(this.canvas);
    this.parallax1 = new Parallax1(this.canvas);
    
    const loop = () => {
      // Solo actualizamos lógica del juego si NO está en pausa
      if (!this.isPaused) {
  
        if (!this.noEnemies && this.enemieChargerArray.length < this.enemieChargerMax) {
          if(Math.random() > this.enemyCount) {
            const enemy = new EnemyCharger(this.canvas, 100, this.speedGame);
            const enemyMarginX = enemy.spriteWidth;
            const enemyMarginY = enemy.spriteHeight;
            const y = Math.random() * (this.canvas.height - enemyMarginY) + enemyMarginY;
            this.enemieChargerArray.push(new EnemyCharger(this.canvas,y,this.speedGame));
          };
        }


        if(Math.random() > 0.8) {
          const y = Math.random()*this.canvas.height;
          this.clouds.push(new Cloud(this.canvas,y));
        };

        this.checkAllCollisions();
        this.updateCanvas();
        this.updateScoreInMain(this.player.score);
        this.playerLives.innerHTML="  Your lives :  " + this.player.lives;
      };
      
      // Esto sí se hace siempre, también en pausa
      this.clearCanvas ();
      this.drawCanvas ();
      this.animationId = window.requestAnimationFrame(loop);
      
    };
    
    this.animationId = window.requestAnimationFrame(loop);

  };

  stopLoop(){
    if(this.animationId) {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  updateCanvas(){
    if (this.isPaused) return;
    this.parallax2.update();
    this.parallax1.update();
    this.player.update();
    this.player.updateSpeed();
    this.shoots.forEach((shoot) => {
      shoot.update();
    });
    this.enemieChargerArray.forEach((enemy)=>{
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
      shoot.draw();
    });
    ;
    this.enemieChargerArray.forEach((enemy)=>{
      enemy.draw(); 
    });

    this.clouds.forEach((cloud)=>{
      cloud.draw();
    });

    this.explosions.forEach((explosion,indexExplosion) =>{
      explosion.draw(true);
      if (!explosion.isAlive){
        this.explosions.splice(indexExplosion,1);
      };
    });

    if (this.isPaused) this.drawPauseScreen();
    // if (this.isGameOver) this.drawGameOverScreen();
  
  };

  drawPauseScreen () {
    this.canvasObject.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.canvasObject.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvasObject.fillStyle = 'white';
    this.canvasObject.font = "60px 'Press Start 2P'";
    this.canvasObject.textAlign = 'center';
    this.canvasObject.fillText('PAUSE', this.canvas.width / 2, this.canvas.height / 2);

  }

  checkAllCollisions(){
    
    this.player.checkScreen();

    this.enemieChargerArray.forEach ((enemy, indexEnemy) =>{
      if (enemy.x + enemy.spriteWidth / 2 < 0) {
        this.enemieChargerArray.splice(indexEnemy, 1);
        this.player.updateScore(false);
      }

      // if(this.player.checkCollisionEnemy(enemy)){
      //   this.player.loseLive();
      //   this.enemieChargerArray.splice(indexEnemy,1);
      //   if (this.player.lives === 0){
      //     this.isGameOver = true;
      //     this.onGameOver(this.player.score); 
      //   }; 
      // };
      
      if (this.player.checkCollisionEnemy(enemy)) {
        const hasRecieveDamage = this.player.recieveDamage();

        if (hasRecieveDamage) {
          this.explosions.push(new Explosion (this.canvas,enemy.x,enemy.y, 2, 356));
          
          this.playSound(this.explosionSound, 0.9);

          this.enemieChargerArray.splice(indexEnemy, 1);

          if (this.player.lives === 0) {
            this.isGameOver = true;
            this.noEnemies = true; // Detener la generación de nuevos enemigos
            this.player.isDead = true; // Marcar al jugador como muerto
            this.player.lives = 0; // Aseguramos que las vidas no sean negativas

            if(this.onGameOver) this.onGameOver(this.player.score);
          }
        }
      }

      this.shoots.forEach ((shoot, index) =>{
        if (shoot.checkCollisionEnemy(enemy)){
          this.explosions.push(new Explosion (this.canvas,shoot.x,shoot.y, 30, 220));
          this.shoots.splice(index,1);
          this.enemieChargerArray.splice(indexEnemy,1);

          this.playSound(this.enemySound, 0.4);
          this.playSound(this.explosionSound, 0.7, 75);

          this.player.updateScore(true);
          this.speedGame = this.speedGame+this.speedIncrease;
          this.enemieChargerArray.forEach((e,indexe)=>{
              e.updateSpeed(this.speedIncrease);            
          });
          this.enemyCount = this.enemyCount+this.enemyIncrease;
        };
      });
    });

    this.shoots = this.shoots.filter((shoot) => {
      return shoot.x - shoot.hitboxWidth / 2 <= this.canvas.width;
    });

    this.clouds = this.clouds.filter((cloud) => {
      return cloud.x - cloud.size / 2 > 0;
    });

    //console.log('enemies: ', this.enemieChargerArray.length);
    //console.log('shoots: ', this.shoots.length);
  };

  // resetAllVariables(canvas,callbackScore,playerLives) {

  //   this.isPaused = false;
  //   this.canvas= canvas;
  //   this.canvasObject = this.canvas.getContext('2d');
  //   this.player = null;
  //   //this.playerNewLives = playerLives;
  //   this.playerLives=playerLives;
  //   this.parallax1 = null;
  //   this.parallax2 = null;
  //   this.shoots =[];
  //   this.enemieChargerArray= [];
  //   this.enemieChargerMax= 6;
  //   this.clouds = [];
  //   this.explosions = [];
  //   this.isGameOver = false;
  //   this.onGameOver = null;
  //   this.updateScoreInMain = callbackScore;
  //   this.speedIncrease = 0.04;
  //   this.speedGame = 3;
  //   this.enemyIncrease = -0.0001;
  //   this.enemyCount = 0.98;
  //   // this.gameSound= new Audio ("./sonidos/D1 - Go Straight (Original Version)-[AudioTrimmer.com].mp3");
  //   // this.windSound = new Audio ("./sonidos/viento_en_un_canaveral_de_un_parque_1.mp3");
  //   this.enemySound = new Audio ("./sonidos/wreee.mp3");
  //   this.noEnemies = false;
  //   //this.finalScore = 0;
  //   this.animationId = null; // Para guardar el ID de la animación y poder cancelarla si es necesari0

  // }

  // Sirve para reproducir cualquier sonido con un volumen específico, evitando que se corten si se reproducen varias veces seguidas.
  playSound (sound, volume = 1, timeout = 0){

    setTimeout(() => {
      const soundClone = sound.cloneNode();
      soundClone.volume = volume;
      soundClone.play();
    }, timeout);
   
  }

  gameOverCallback(callback){
    this.onGameOver = callback;
   
  };
};