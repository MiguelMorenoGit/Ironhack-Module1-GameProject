'use strict';

const CONFIG = {

  //------------DEBUG GLOBAL----------------
  debug: {
    enabled: false,          // Activa/desactiva TODO el debug
    showHitbox: false,
    showSpriteBox: false,
    showFPS: false,
  },

  //------------PLAYER----------------

    player: {
      invincibleDuration: 1500, // Duración de la invencibilidad en milisegundos
      hitShakeDuration: 300, // Duración del shake al recibir daño
      hitShakeForce: 30, // Fuerza del shake al recibir daño
      blinkInterval: 80, // Intervalo de parpadeo durante la invencibilidad en milisegundos
      invincibleAlpha: 0.45      // transparencia mientras parpadea
    },

  //------------GAME----------------
    //   game: {
    //     baseSpeed: 3,
    //   }

};

debugger;