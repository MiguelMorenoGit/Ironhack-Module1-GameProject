'use strict';

const main = ()=>{

  const buildDom = (html) => {          // -------  INICIO BUILDDOM  -------
    const main = document.querySelector('main');
    main.innerHTML = html;
    return main;
  };

  

  const buildSplashScreen = ()=>{       // -------  INICIO SPLASHSCREEN  -------
    const splashScreen = buildDom(`
    <section class="splash-screen">
     <img class="name" src="./images/NOMBRE_1.png" alt="name-game">
     <img class="keyboard" src="./images/keyboard.png">
     <button>Press for Play</button>
     <canvas class="background-splash"></canvas>
    </section>
    `);
    const startButton = document.querySelector('button');
    startButton.addEventListener('click',buildGameScreen);

    const width = document.querySelector('.splash-screen').offsetWidth;
    const height = document.querySelector('.splash-screen').offsetHeight;

    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);
    const background = new Background(canvasElement);
    background.startLoop();


  };

  
    
  const buildGameScreen = ()=>{        // -------  INICIO GAMEOVERSCREEN  -------
    const GameScreen = buildDom(`
    <section class="game-screen">
    <div id="hub">
      <h3 class="score"></h3>
      <h3 class="live"></h3>
    </div>
    <canvas class="background-game">
    </canvas>
    <audio volume="0.01" autoplay  loop>
      <source src="./sonidos/D1 - Go Straight (Original Version)-[AudioTrimmer.com].mp3">
    <audio>
    </section>
    `);
    const width = document.querySelector('.game-screen').offsetWidth;
    const height = document.querySelector('.game-screen').offsetHeight;

    const scoreLabel = document.querySelector(".score");
    const playerLives = document.querySelector(".live");
    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);


    const updateScore = (score) => {
      scoreLabel.innerHTML = "  Your score :  " + score;
    }

    // -------  CREAMOS EL JUEGO  -------//

    const game = new Game(canvasElement,updateScore,playerLives);
    game.gameOverCallback( (score) => {
      buildGameOverScreen(score);
    });
    game.startLoop();
    

    // -------  CONTROLES  -------// puedes meter todo en una funcion const setmove y hacer al final un addeventlistener(setmove que llame a todos)
    
    const setPlayerDirectionDown = (event) => {
      if(event.code === 'ArrowUp')game.player.up = true;
      if(event.code === 'ArrowDown')game.player.down = true;
      if(event.code === 'ArrowRight')game.player.right = true;
      if(event.code === 'ArrowLeft')game.player.left = true;
    };
    document.addEventListener('keydown', setPlayerDirectionDown);

    const setPlayerDirectionUp = (event) => {     
      if(event.code === 'ArrowUp')game.player.up = false;
      if(event.code === 'ArrowDown')game.player.down = false;
      if(event.code === 'ArrowRight')game.player.right = false;
      if(event.code === 'ArrowLeft')game.player.left = false;  
    };
    document.addEventListener('keyup', setPlayerDirectionUp);

    const setPlayerShoot = (e) => {
      if(e.keyCode === 32 ){
        game.shoots.push(new PlayerShoot(game.canvas,game.player.x+140,game.player.y+40));
        
      }
        //console.log(game.shoots);
    };
    document.addEventListener('keydown', setPlayerShoot);

    const setSoundShoot = (e) =>{
      if(e.keyCode === 32){
        audioLaser.currentTime =0;
        audioLaser.play();
        audioLaser.volume =3;
      }
    };
    document.addEventListener('keydown', setSoundShoot);

    
  };   // -------  FINAL GAMESCREEN  -------

  //const finalScore= scoreLabel;

    

  const buildGameOverScreen = (score)=> {  // -------  INICIO GAMEOVERSCREEN  -------
    const GameOverScreen = buildDom(`
    <section class="gameover-screen">
      <h1>Good job!!</h1>
      <h3 class="final-score">Your score was :</h3>

      <canvas class="background-gameover"></canvas>
      <div class="end-buttons">
        <button class="try-again">Try again!</button>
        <button class="restart">Restart</button>
      </div>
    </section>
    `);

    const Score = document.querySelector('.final-score');
    Score.innerHTML = "Your score is : " + score;

    const startButton = document.querySelector('.restart');
    startButton.addEventListener('click',buildSplashScreen);

    const tryAgainButton = document.querySelector('.try-again');
    tryAgainButton.addEventListener('click',buildGameScreen);

    const width = document.querySelector('.gameover-screen').offsetWidth;
    const height = document.querySelector('.gameover-screen').offsetHeight;

    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);
    const background = new Background(canvasElement);
    background.startLoop();

  };  // -------  FINAL GAMEOVERSCREEN  -------
    

  buildSplashScreen();


};

window.addEventListener('load', main);


