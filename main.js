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
     <h1>Oh my GRADIUS</h1>
     <canvas></canvas>
     <button>start</button>
    </section>
    `);
    const startButton = document.querySelector('button');
    startButton.addEventListener('click',buildGameScreen)
  };
    
  const buildGameScreen = ()=>{        // -------  INICIO GAMEOVERSCREEN  -------
    const GameScreen = buildDom(`
    <section class="game-screen">
      <canvas>
      </canvas>
    </section>
    `);
    const width = document.querySelector('.game-screen').offsetWidth;
    const height = document.querySelector('.game-screen').offsetHeight;

    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);

    // -------  IMAGENES  -------

    const img=new Image();
    img.src = '/images/mar.png';

    const imgShoot=new Image();
    imgShoot.src = '/images/tiro.png';
    //img.src='https://orig15.deviantart.net/8bed/f/2015/058/a/8/smb1_background_by_steamerthesteamtrain-d8jq7ea.png';

    // -------  ICREAMOS EL JUEGO  -------

    const game = new Game(canvasElement,img,imgShoot);

    game.gameOverCallback(buildGameOverScreen);

    game.startLoop();

    // -------  CONTROLES  -------
    
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
      if(e.keyCode === 32 )game.shoots.push(new PlayerShoot(game.canvas,game.player.x+50,game.player.y,imgShoot));
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


