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

  };

  update(){
    // Mueve la posición del player según las teclas activas
    // Ojo: aquí this.x y this.y son el centro de la hitbox.
    if (this.right) this.x = this.x + this.currentSpeed;
    if (this.left) this.x = this.x - this.currentSpeed;
    if (this.up) this.y = this.y - this.currentSpeed;
    if (this.down) this.y = this.y + this.currentSpeed;
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

  draw () {

    this.drawHitbox(); // Dibujar la hitbox
    this.drawSpriteBox(); // Dibujar la caja que contiene el sprite en pantalla
    this.drawSprite(); // Dibujar el sprite del player en pantalla
    this.animateSprite(); // Controlar la animación del sprite, cambiando el frame actual según el contador de animación

  };

  drawHitbox () {
    
    //-------------DIBUJAMOS LA HITBOX----------------

    // Dibujamos la caja roja solo para depuración.
    // Cuando el juego esté fino, puedes poner alpha 0 o comentarlo.
    
    // Como this.x y this.y son el CENTRO de la hitbox,
    // para dibujar el rectángulo tenemos que restar la mitad del ancho y alto.

    this.canvasObject.fillStyle = 'rgb(0, 0, 0, 0)'; 

    if (this.gameConfig.debug.showHitbox) this.canvasObject.fillStyle = 'rgb(255, 0, 0, 0.5)';

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
      this.x - this.spriteWidth / 2 + this.spriteOffsetX,
      this.y - this.spriteHeight / 2 + this.spriteOffsetY,
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

    this.canvasObject.drawImage(
      this.imgGif, 
      this.frameWidth * this.currentFrame,
      0, 
      this.frameWidth, 
      this.frameHeight, 
      this.x - this.spriteWidth / 2 + this.spriteOffsetX,
      this.y - this.spriteHeight / 2 + this.spriteOffsetY, 
      this.spriteWidth,
      this.spriteHeight
    );
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

  loseLive() { this.lives -- ; } // Resta una vida al jugador

};










