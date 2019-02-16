'use strict';

const main = ()=>{

  const buildDom = (html) => {
    const main = document.querySelector('main');
    main.innerHTML = html;
    return main;
  };

  const buildSplashScreen = ()=>{
    const splashScreen = buildDom(`
    <section class="splash-screen">
     <h1>Oh my GRADIUS</h1>
     <canvas></canvas>
     <button>start</button>
    </section>
    `);
    const startButton = document.querySelector('button');
    startButton.addEventListener('click',buildGameScreen)
  };

  const buildGameScreen = ()=>{
    const GameScreen = buildDom(`
    <section class="game-screen">
      <canvas></canvas>
    </section>
    `);
    const width = document.querySelector('.game-screen').offsetWidth;
    const height = document.querySelector('.game-screen').offsetHeight;

    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);

    const game = new Game(canvasElement);
    game.gameOverCallback(buildGameOverScreen);

    game.startLoop();



    const setPlayerDirectionDown = (event) => {
      //game.contadorPush+=1;

      if(event.code === 'ArrowUp')game.player.up = true;
      if(event.code === 'ArrowDown')game.player.down = true;
      if(event.code === 'ArrowRight')game.player.right = true;
      if(event.code === 'ArrowLeft')game.player.left = true;

      
 
    };

    document.addEventListener('keydown', setPlayerDirectionDown);

    const setPlayerDirectionUp = (event) => {
      //game.contadorPush-=1;

      if(event.code === 'ArrowUp')game.player.up = false;
      if(event.code === 'ArrowDown')game.player.down = false;
      if(event.code === 'ArrowRight')game.player.right = false;
      if(event.code === 'ArrowLeft')game.player.left = false;  

      

    };

    document.addEventListener('keyup', setPlayerDirectionUp);

    const setPlayerShoot = (e) => {
      //game.contadorPush-=1;

      if(e.keyCode === 32 )game.shoots.push(new PlayerShoot(game.canvas,game.player.x+50,game.player.y));
        console.log(game.shoots);
    };

    document.addEventListener('keydown', setPlayerShoot);

    
  };

  const buildGameOverScreen = ()=> {
    const GameOverScreen = buildDom(`
    <section class="gameover-screen">
      <h1>Game Over Loser</h1>
      <canvas></canvas>
      <button>start</button>
    </section>
    `);

    const startButton = document.querySelector('button');
    startButton.addEventListener('click',buildSplashScreen);
  };


  buildSplashScreen();


};

window.addEventListener('load', main);


