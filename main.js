
'use strict';

const main = ()=>{

  let currentGame= null;
  let currentBackground = null;

  // Referencias a listeners para poder eliminarlos
  let togglePause = null;
  let resetEnter = null;
  let setPlayerDirectionDown = null;
  let setPlayerDirectionUp = null;
  let setPlayerShoot = null;

  const buildDom = (html) => {          // -------  INICIO BUILDDOM  -------
    const main = document.querySelector('main');
    main.innerHTML = html;
    return main;
  };

  const removeGameListeners = () => {
    if (togglePause) document.removeEventListener('keydown', togglePause);
    if (resetEnter) document.removeEventListener('keyup', resetEnter);
    if (setPlayerDirectionDown) document.removeEventListener('keydown', setPlayerDirectionDown);
    if (setPlayerDirectionUp) document.removeEventListener('keyup', setPlayerDirectionUp);
    if (setPlayerShoot) document.removeEventListener('keydown', setPlayerShoot);

    togglePause = null;
    resetEnter = null;
    setPlayerDirectionDown = null;
    setPlayerDirectionUp = null;
    setPlayerShoot = null;
  };

  const stopCurrentScene = () => {
    removeGameListeners();

    if (currentGame) {
      currentGame.stopLoop();
      currentGame = null;
    }

    if (currentBackground && typeof currentBackground.stopLoop === 'function') {
      currentBackground.stopLoop();
    }

    currentBackground = null;
  };

  const buildSplashScreen = ()=>{

    stopCurrentScene(); // Detenemos cualquier juego o fondo que estuviera activo antes de construir la pantalla de inicio  
    
    // -------  INICIO SPLASHSCREEN  -------
    
    const splashScreen = buildDom(`
    <section class="splash-screen">
      <img class="name" src="./images/NOMBRE_1.png" alt="name-game">
      <img class="keyboard" src="./images/keyboard.png">
      <button>Press for Play</button>
      <canvas class="background-splash"></canvas> 
      <audio volume="0.5" autoplay  loop>
      <source src="./sonidos/D1 - Go Straight (Original Version)-[AudioTrimmer.com].mp3">
      <audio> 
    </section>
    `);

    const startButton = document.querySelector('button');
    startButton.addEventListener('click',buildGameScreen);
    
    const width = document.querySelector('.splash-screen').offsetWidth;
    const height = document.querySelector('.splash-screen').offsetHeight;
    
    
    const canvasElement = document.querySelector('canvas');
    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);
    
   

    // Guardamos la referencia real del fondo actual */
    currentBackground = new Background(canvasElement);
    currentBackground.startLoop();


  };

  
    
  const buildGameScreen = ()=>{

    // Antes de crear una partida nueva, limpiamos la anterior 
    stopCurrentScene();        
    
    // -------  INICIO GAMEOVERSCREEN  -------
    const GameScreen = buildDom(`
      <div class="game-wrapper">
        <section class="game-screen">
          <div id="hub">
            <h3 class="score"></h3>
            <h3 class="live"></h3>
          </div>

          <canvas class="background-game"></canvas>

          <section class="gameover-screen hidden">
            <h1>Good job!!</h1>
            <h3 class="final-score">Your score was :</h3>

            <div class="end-buttons">
              <button class="try-again">Try again!</button>
              <button class="restart">Home</button>
            </div>
          </section>

          <audio volume="0.3" autoplay loop>
            <source src="./sonidos/D1 - Go Straight (Original Version)-[AudioTrimmer.com].mp3">
          <audio>
        </section>
      </div>

    `);

    
    const width = document.querySelector('.game-screen').offsetWidth;
    const height = document.querySelector('.game-screen').offsetHeight;
    
    const scoreLabel = document.querySelector(".score");
    const playerLives = document.querySelector(".live");
    const canvasElement = document.querySelector('canvas');

    const gameOverPanel = document.querySelector('.gameover-screen');
    const finalScoreLabel = document.querySelector('.final-score');
    const tryAgainButton = document.querySelector('.try-again');
    const homeButton = document.querySelector('.restart');

    let enterPressed = false; // 🔥 control de enter para pause

    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);


    const updateScore = (score) => {
      scoreLabel.innerHTML = "  Your score :  " + score;
    }

    // -------  CREAMOS EL JUEGO  -------//

    currentGame = new Game(canvasElement, updateScore, playerLives);
    currentBackground = null; // El fondo del juego se maneja dentro de la clase Game, así que aquí ya no lo necesitamos

    currentGame.gameOverCallback( (score) => {
      finalScoreLabel.innerHTML = "Your score is : " + score;
      gameOverPanel.classList.remove('hidden');
    });

    currentGame.startLoop();

    tryAgainButton.addEventListener('click', buildGameScreen);
    homeButton.addEventListener('click', buildSplashScreen);

    // -------  PAUSE  -------//

    currentGame.isPaused = false; // Estado inicial

    const togglePause = (event) => {
      if (!currentGame) return;
      if (event.code === 'Enter' && !enterPressed) {
        enterPressed = true;
        currentGame.isPaused = !currentGame.isPaused;
      }
    };

    const resetEnter = (event) => {
      if (event.code === 'Enter') {
        enterPressed = false;
      }
    };

    document.addEventListener('keydown', togglePause);
    document.addEventListener('keyup', resetEnter);
    
   
    

    // -------  CONTROLES  -------// puedes meter todo en una funcion const setmove y hacer al final un addeventlistener(setmove que llame a todos)
    
    const setPlayerDirectionDown = (event) => {

      if (currentGame.isPaused || currentGame.isGameOver) return; // o hacer nada si el juego está en pausa o ha terminado
      
      if(event.code === 'ArrowUp')currentGame.player.up = true;
      if(event.code === 'ArrowDown')currentGame.player.down = true;
      if(event.code === 'ArrowRight')currentGame.player.right = true;
      if(event.code === 'ArrowLeft')currentGame.player.left = true;
    };
    document.addEventListener('keydown', setPlayerDirectionDown);

    const setPlayerDirectionUp = (event) => {   

      // Si el juego está en pausa o ha terminado, no hacemos nada
      if (currentGame.isGameOver) {
        currentGame.player.up = false;
        currentGame.player.down = false;
        currentGame.player.left = false;
        currentGame.player.right = false;
        return;
      }

      // Al levantar la tecla, desactivamos el movimiento correspondiente, pero solo si el juego no ha terminado. Si el juego ha terminado, nos aseguramos de que el jugador no se mueva en absoluto.
      if(event.code === 'ArrowUp')currentGame.player.up = false;
      if(event.code === 'ArrowDown')currentGame.player.down = false;
      if(event.code === 'ArrowRight')currentGame.player.right = false;
      if(event.code === 'ArrowLeft')currentGame.player.left = false;  
    };
    document.addEventListener('keyup', setPlayerDirectionUp);

    const setPlayerShoot = (e) => {

      if (currentGame.isPaused || currentGame.isGameOver) return; // o hacer nada si el juego está en pausa o ha terminado
      
      if(e.keyCode === 32 ){
        currentGame.shoots.push(new PlayerShoot(currentGame.canvas,currentGame.player.x + 70,currentGame.player.y+40));  
       
      }
    };
    document.addEventListener('keydown', setPlayerShoot);
    
  };   // -------  FINAL GAMESCREEN  -------

  //const finalScore= scoreLabel;

    

  //   const buildGameOverScreen = (score)=> {  // -------  INICIO GAMEOVERSCREEN  -------
  //     const GameOverScreen = buildDom(`
  //     <section class="gameover-screen">
  //       <h1>Good job!!</h1>
  //       <h3 class="final-score">Your score was :</h3>

  //       <canvas class="background-gameover"></canvas>
  //       <div class="end-buttons">
  //         <button class="try-again">Try again!</button>
  //         <button class="restart">Home</button>
  //       </div>
  //       <audio volume="0.5" autoplay  loop>
  //       <source src="./sonidos/D1 - Go Straight (Original Version)-[AudioTrimmer.com].mp3">
  //       <audio>
  //     </section>
  //     `);

  //     const Score = document.querySelector('.final-score');
  //     Score.innerHTML = "Your score is : " + score;

  //     const startButton = document.querySelector('.restart');
  //     startButton.addEventListener('click',buildSplashScreen);

  //     const tryAgainButton = document.querySelector('.try-again');
  //     tryAgainButton.addEventListener('click',buildGameScreen);

  //     const width = document.querySelector('.gameover-screen').offsetWidth;
  //     const height = document.querySelector('.gameover-screen').offsetHeight;

  //     const canvasElement = document.querySelector('canvas');

  //     canvasElement.setAttribute('width',width);
  //     canvasElement.setAttribute('height',height);
  //     const background = new Background(canvasElement);
  //     background.startLoop();

  //   };  // -------  FINAL GAMEOVERSCREEN  -------
      

  buildSplashScreen();


};

window.addEventListener('load', main);


