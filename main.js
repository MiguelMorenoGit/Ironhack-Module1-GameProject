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
     <button>START</button>
     <canvas class= background-spash></canvas>
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
    <div id="label" class="hub">    
    </div>
        <canvas>
        </canvas>
    </section>
    `);
    const width = document.querySelector('.game-screen').offsetWidth;
    const height = document.querySelector('.game-screen').offsetHeight;

    const scoreLabel = document.getElementById("label");
  
    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);

    // -------  CREAMOS EL JUEGO  -------//

    const game = new Game(canvasElement,scoreLabel);

    game.gameOverCallback(buildGameOverScreen);

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
      if(e.keyCode === 32 )game.shoots.push(new PlayerShoot(game.canvas,game.player.x+140,game.player.y+40));
        console.log(game.shoots);
    };
    document.addEventListener('keydown', setPlayerShoot);

    
  };      // -------  FINAL GAMESCREEN  -------

    

  const buildGameOverScreen = ()=> {     // -------  INICIO GAMEOVERSCREEN  -------
    const GameOverScreen = buildDom(`
    <section class="gameover-screen">
      <h1>Game Over Loser</h1>
      <canvas></canvas>
      <button>start</button>
    </section>
    `);

    const startButton = document.querySelector('button');
    startButton.addEventListener('click',buildSplashScreen);

  };  // -------  FINAL GAMEOVERSCREEN  -------
    

  buildSplashScreen();


};

window.addEventListener('load', main);


