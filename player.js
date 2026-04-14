'use strict';

class Player {
  constructor(canvas, lives){
    this.gameConfig = CONFIG; // Para controlar hitbox y caja visual del sprite para depuración

    this.canvas = canvas; // Guardamos el canvas completo para poder consultar su ancho y alto 
    this.canvasObject = this.canvas.getContext('2d'); // Guardamos el contexto 2D, que es lo que usamos para dibujar
    
    //------------POSICION DEL PERSONAJE EN PANTALLA----------------
    this.x = this.canvas.width / 4; // Coordenada X en pantalla del centro de la hitbox del player
    this.y = this.canvas.height / 2; // Coordenada Y en pantalla del centro de la hitbox del player
    
    //------------MOVIMIENTO DEL PERSONAJE----------------
    this.baseSpeed = 10
    this.currentSpeed = this.baseSpeed; // Velocidad normal del Player
    this.diagonalSpeed = this.baseSpeed * 0.7; // Velocidad en Diagonal del Player, así evitamos que en diagonal corra más que en horizontal/vertical.
    // Flags de movimiento, se activan y desactivan al pulsar o soltar teclas.
    this.left = false;   //
    this.right = false;   //
    this.up = false;   //
    this.down = false; //
    
    //------------ESTADO DEL JUGADOR----------------
    this.lives = lives; // Vidas actuales del jugador
    this.score = 0; // Puntuación actual del jugador

    //------------INVENCIBILIDAD Y DAÑO----------------
    this.isInvincible = false; // Flag que indica si el jugador está en estado de invencibilidad
    this.invincibleStartTime = 0; // Momento en el que comenzó la invencibilidad, para controlar su duración
    this.isVisible = true; // Flag para controlar el parpadeo del sprite durante la invencibilidad

    //------------SHAKE AL RECIBIR DAÑO----------------
    this.isHitShaking = false; // Flag que indica si el jugador está en estado de shake por daño
    this.hitShakeStartTime = 0; // Momento en el que comenzó el shake, para controlar su duración
    this.hitShakeOffsetX = 0; // Desplazamiento en X durante el shake
    this.hitShakeOffsetY = 0; // Desplazamiento en Y durante el shake
    this.hitPushX = 0; // Sin empuje horizontal
    this.hitPushY = 0; // Sin empuje vertical

    //------------IMAGENES Y ANIMACIÓN----------------
    this.img = imgPig; // Imagen estática del personaje, por si la necesitas en otro momento
    this.imgGif = imgPigGif; // Spritesheet o imagen animada del personaje
    this.currentFrame = 0; // Frame actual de la animación
    this.animationCounter = 0; // Contador que controla cuándo cambiar al siguiente frame
    this.frameWidth = 170;
    this.frameHeight = 100;
    
    //------------HITBOX / CAJA DE COLISION----------------
    // Puede ser diferente al tamaño del Sprite para controlar mejor al personaje y sus colisiones
    this.hitboxWidth = 120; // Ancho de la hitbox, 
    this.hitboxHeight = 120;
    ; // Alto de la hitbox

    //------------SPRITES----------------
    this.spriteWidth = this.frameWidth * 1.5; // Ancho con el que se dibuja visualmente el sprite en pantalla
    this.spriteHeight = this.frameHeight * 1.5; // Alto con el que se dibuja visualmente el sprite en pantalla

    //------------OFFSET DEL SPRITE----------------
    // Estos offsets sirven para mover visualmente el sprite
    // respecto al centro de la hitbox.
    this.spriteOffsetX = -30; // Mueve el sprite en el eje X 
    this.spriteOffsetY = 0; // Mueve el sprite en el eje Y

    this.isDead = false; // Indicar si el player ha muerto

  };

  update(){
    // Mueve la posición del player según las teclas activas
    // Ojo: aquí this.x y this.y son el centro de la hitbox.
    if (this.right) this.x = this.x + this.currentSpeed;
    if (this.left) this.x = this.x - this.currentSpeed;
    if (this.up) this.y = this.y - this.currentSpeed;
    if (this.down) this.y = this.y + this.currentSpeed;
    
    this.updateInvincibility(); // Controlar el estado de invencibilidad, su duración y el parpadeo del sprite
    this.updateHitShake(); // Controlar el estado de shake por daño, su duración y el desplazamiento del shake
    this.animateSprite();   // Controlar la animación del sprite, cambiando el frame actual según el contador de animación
    
  };

  updateScore (isShoot) {
    
    if(isShoot === true)this.score = this.score + 100; // Si el disparo ha acertado, suma puntos 
    else this.score = this.score - 20; // Si falla, resta puntos
    
    if (this.score < 0) this.score = 0; // Evita que la puntuación baje de 0
  };

  updateSpeed () {
    // Comprobamos si el player se está moviendo en diagonal
    const isMovingDiagonally =
    (this.right && this.up) ||
    (this.left && this.up) ||
    (this.left && this.down) ||
    (this.right && this.down);

    this.currentSpeed = this.baseSpeed; // Por defecto usamos la velocidad normal

    // Si hay movimiento diagonal, reducimos la velocidad
    if (isMovingDiagonally) this.currentSpeed = this.diagonalSpeed;

  };

  updateInvincibility () {
    if (!this.isInvincible) {
      this.isVisible = true; // Si no estamos invencibles, el sprite siempre es visible
      return;
    } 

    const now = Date.now(); // Obtenemos el tiempo actual para comparar con el momento en que comenzó la invencibilidad
    const elapsed = now - this.invincibleStartTime; // Calculamos cuánto tiempo ha pasado desde que comenzó la invencibilidad

    // Controlamos el parpadeo del sprite durante la invencibilidad
    this.isVisible = Math.floor(elapsed / this.gameConfig.player.blinkInterval) % 2 === 0;
    console.log("Is Visible: ", this.isVisible);
    
    // Fin de la invencibilidad
    if (elapsed >= this.gameConfig.player.invincibleDuration) {
      this.isInvincible = false; // Terminamos la invencibilidad
      this.isVisible = true; // Aseguramos que el sprite sea visible al terminar la invencibilidad
    }

  }

  updateHitShake () {
    if (!this.isHitShaking) {
      this.hitShakeOffsetX = 0; // Si no estamos en shake, no hay desplazamiento
      this.hitShakeOffsetY = 0; // Si no estamos en shake, no hay desplazamiento
      this.hitPushX = 0; // Sin empuje horizontal
      this.hitPushY = 0; // Sin empuje vertical
      return;
    }

    const now = Date.now(); // Obtenemos el tiempo actual para comparar con el momento en que comenzó el shake
    const elapsed = now - this.hitShakeStartTime; // Calculamos cuánto tiempo ha pasado desde que comenzó el shake

    // 🔥 1. FIN DEL SHAKE
    if (elapsed >= this.gameConfig.player.hitShakeDuration) {
      this.isHitShaking = false;
      this.hitShakeOffsetX = 0;
      this.hitShakeOffsetY = 0;
      this.hitPushX = 0;
      this.hitPushY = 0;
      return;
    }

    // 🔥 2. EMPUJE INICIAL QUE SE VA APAGANDO
    this.hitPushX *= 0.8; // va perdiendo fuerza poco a poco
    this.hitPushY *= 0.8;

    // 🔥 3. SHAKE ENCIMA DEL EMPUJE
    const randomX = (Math.random() * 2 - 1) * this.gameConfig.player.hitShakeForce;
    const randomY = (Math.random() * 2 - 1) * (this.gameConfig.player.hitShakeForce * 0.2);

    this.hitShakeOffsetX = this.hitPushX + randomX;
    this.hitShakeOffsetY = this.hitPushY + randomY;
    
  }

  activeHitEffect () {
    this.isHitShaking = true; // Activamos el shake por daño
    this.hitShakeStartTime = Date.now(); // Guardamos el momento en que comenzó el shake
  }

  activeInvencibility () {
    this.isInvincible = true; // Activamos la invencibilidad
    this.invincibleStartTime = Date.now(); // Guardamos el momento en que comenzó la invencibilidad
     
    
  }

  recieveDamage () {
    // Si ya es invencible, ignoramos el golpe
    if(this.isInvincible) return false;

    this.lives--; // Restamos una vida al jugador
    this.activeInvencibility(); // Activamos la invencibilidad al recibir daño
    this.activeHitEffect(); // Activamos el shake por daño

    return true; // Devolvemos true para indicar que el golpe ha sido efectivo
  }

  draw () {

    if(this.isDead) return; // Si el jugador ha muerto, no dibujamos nada

    this.drawSpriteBox(); // Dibujar la caja que contiene el sprite en pantalla
    this.drawSprite(); // Dibujar el sprite del player en pantalla
    this.drawHitbox(); // Dibujar la hitbox

  };

  drawHitbox () {
    
    //-------------DIBUJAMOS LA HITBOX----------------

    // Dibujamos la caja roja solo para depuración.
    // Cuando el juego esté fino, puedes poner alpha 0 o comentarlo.
    
    // Como this.x y this.y son el CENTRO de la hitbox,
    // para dibujar el rectángulo tenemos que restar la mitad del ancho y alto.
    if(this.isDead) return; // Si el jugador ha muerto, no dibujamos nada

    this.canvasObject.fillStyle = 'rgb(0, 0, 0, 0)'; 

    if (this.gameConfig.debug.showHitbox) this.canvasObject.fillStyle = 'rgb(255, 0, 0, 0.6)';

    this.canvasObject.fillRect(
      this.x - this.hitboxWidth / 2,
      this.y - this.hitboxHeight / 2,
      this.hitboxWidth,
      this.hitboxHeight
    );
  }

  drawSpriteBox () {

    // Dibujamos una caja visual que representa exactamente
    // el espacio que ocupa el sprite en pantalla.
    // Sirve para ajustar mejor la relación entre sprite e hitbox.
    this.canvasObject.fillStyle = 'rgb(0, 0, 0, 0)';
    if (this.gameConfig.debug.showSpriteBox) this.canvasObject.fillStyle = 'rgb(0, 0, 255, 0.5)';
    this.canvasObject.fillRect(
      this.x - this.spriteWidth / 2 + this.spriteOffsetX + this.hitShakeOffsetX,
      this.y - this.spriteHeight / 2 + this.spriteOffsetY + this.hitShakeOffsetY,
      this.spriteWidth,
      this.spriteHeight
    );

  }

  drawSprite () {
    //-------------DIBUJAMOS EL SPRITE----------------

    // drawImage recibe:
    // 1) la imagen fuente
    // 2) x de recorte en el spritesheet
    // 3) y de recorte en el spritesheet
    // 4) ancho del frame original a recortar
    // 5) alto del frame original a recortar
    // 6) x donde se dibuja en pantalla
    // 7) y donde se dibuja en pantalla
    // 8) ancho final en pantalla
    // 9) alto final en pantalla
    
    // Aquí cogemos el frame actual de la animación:
    // Y lo dibujamos centrado respecto a la hitbox,
    // pero además aplicando spriteOffsetX y spriteOffsetY
    // para poder ajustar manualmente el sprite.

    // Si está en invencibilidad y toca "apagado", no dibujamos
    if (this.isInvincible && !this.isVisible) return;

    // Guardamos estado del canvas
    this.canvasObject.save();
     
    // Aplicamos transparencia si está invencible
    if (this.isInvincible) {
      this.canvasObject.globalAlpha = this.gameConfig.player.invincibleAlpha;
    }

    this.canvasObject.drawImage(
      this.imgGif, 
      this.frameWidth * this.currentFrame,
      0, 
      this.frameWidth, 
      this.frameHeight, 
      this.x - this.spriteWidth / 2 + this.spriteOffsetX + this.hitShakeOffsetX,
      this.y - this.spriteHeight / 2 + this.spriteOffsetY + this.hitShakeOffsetY, 
      this.spriteWidth,
      this.spriteHeight
    );

    // Restauramos para no afectar a TODO el juego
    this.canvasObject.restore();
  }

  animateSprite () {

     //-------------ANIMACIÓN----------------

    this.animationCounter ++ ; // Sumamos 1 en cada ciclo de dibujo

    // Cambiamos de frame cada 2 ciclos
    if (this.animationCounter % 2 === 0) this.currentFrame ++ ; 
    // Cuando pasamos del último frame, volvemos al primero
    if (this.currentFrame > 9) this.currentFrame = 0; 
  }


  checkScreen () {

    // -------------LÍMITES DE PANTALLA----------------
    // Calculamos los bordes visuales del sprite a partir de su centro.
    // Aquí usamos el sprite y no la hitbox, porque queremos que
    // la imagen no se salga de la pantalla aunque la hitbox sea distinta.
    const spriteLeft = this.x - this.spriteWidth / 2 + this.spriteOffsetX;
    const spriteRight = this.x + this.spriteWidth / 2 + this.spriteOffsetX;
    const spriteTop = this.y - this.spriteHeight / 2 + this.spriteOffsetY;
    const spriteBottom = this.y + this.spriteHeight / 2 + this.spriteOffsetY;

    // Cancelamos el movimiento al llegar a los limites marcados
    if (spriteLeft <= 0) this.left = false; // Limite Izquierdo
    else if (spriteRight >= this.canvas.width) this.right = false; // Limite Derecho

    if (spriteTop <= 0) this.up = false; // Limite Superior
    else if (spriteBottom >= this.canvas.height) this.down = false; // Limite Inferior
    
  };

  checkCollisionEnemy (enemy) {
    
    //---------------COLISIÓN ENTRE PLAYER Y ENEMIGO----------------
    
    // Aquí usamos la hitbox del player,
    // pero el enemigo sigue usando enemy.size.
    // Más adelante se puede mejorar para que el enemigo
    // tenga también hitbox propia.

    if(this.isDead) return; // Si el jugador ha muerto, no dibujamos nada

    return (

      // El lado derecho de este enemigo supera el lado izquierdo del otro
      this.x + this.hitboxWidth / 2 > enemy.x - enemy.hitboxWidth / 2 &&

      // El lado izquierdo de este enemigo está antes del lado derecho del otro
      this.x - this.hitboxWidth / 2 < enemy.x + enemy.hitboxWidth / 2 &&

      // La parte superior de este enemigo está por encima de la parte inferior del otro
      this.y - this.hitboxHeight / 2 < enemy.y + enemy.hitboxHeight / 2 &&

      // La parte inferior de este enemigo está por debajo de la parte superior del otro
      this.y + this.hitboxHeight / 2 > enemy.y - enemy.hitboxHeight / 2
    
    ); 

  };

};










