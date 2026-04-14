'use strict';

class PlayerShoot {
  constructor(canvas, x, y) {
    this.gameConfig = CONFIG; // Para controlar hitbox y caja visual del sprite para depuración

    this.canvas = canvas; // Guardamos el canvas completo para poder consultar su ancho y alto
    this.canvasObject = this.canvas.getContext('2d'); // Guardamos el contexto 2D, que es lo que usamos para dibujar

    //------------POSICION DEL DISPARO EN PANTALLA----------------
    // Igual que en Player, x e y representan el CENTRO de la hitbox
    this.x = x;
    this.y = y;

    //------------MOVIMIENTO DEL DISPARO----------------
    this.speed = 25; // Velocidad horizontal del disparo
    this.direction = 1; // El disparo avanza hacia la derecha

    //------------IMAGENES Y ANIMACIÓN----------------
    this.img = imgShoot; // Imagen estática del disparo, por si la necesitas en otro momento
    this.imgGif = imgShootGif; // Spritesheet o imagen animada del disparo
    this.currentFrame = 0; // Frame actual de la animación
    this.animationCounter = 0; // Contador que controla cuándo cambiar al siguiente frame
    this.frameWidth = 200; // Ancho del frame dentro del spritesheet
    this.frameHeight = 60; // Alto del frame dentro del spritesheet

    //------------HITBOX / CAJA DE COLISION----------------
    // Puede ser diferente al tamaño del sprite para controlar mejor las colisiones
    this.hitboxWidth = 140; // Ancho de la hitbox del disparo
    this.hitboxHeight = 30; // Alto de la hitbox del disparo

    //------------SPRITES----------------
    this.spriteWidth = 200; // Ancho con el que se dibuja visualmente el sprite en pantalla
    this.spriteHeight = 60; // Alto con el que se dibuja visualmente el sprite en pantalla

    //------------OFFSET DEL SPRITE----------------
    // Estos offsets sirven para mover visualmente el sprite
    // respecto al centro de la hitbox.
    this.spriteOffsetX = -20; // Mueve el sprite en el eje X
    this.spriteOffsetY = 0; // Mueve el sprite en el eje Y

    //------------SONIDO----------------
    const laserSound = new Audio('./sonidos/laser.mp3');
    laserSound.play();
  };

  update() {
    // Movimiento horizontal del disparo
    this.x = this.x + this.direction * this.speed;
    this.animateSprite(); // Controlar la animación del sprite
  };

  draw() {
    this.drawSpriteBox(); // Dibujar la caja que contiene el sprite en pantalla
    this.drawSprite(); // Dibujar el sprite del disparo en pantalla
    this.drawHitbox(); // Dibujar la hitbox
  };

  drawHitbox() {
    //-------------DIBUJAMOS LA HITBOX----------------

    // Dibujamos la caja solo para depuración.
    // Cuando el juego esté fino, puedes poner alpha 0 o comentarlo.

    // Como this.x y this.y son el CENTRO de la hitbox,
    // para dibujar el rectángulo tenemos que restar la mitad del ancho y alto.

    this.canvasObject.fillStyle = 'rgb(0, 0, 0, 0)';

    if (this.gameConfig.debug.showHitbox) this.canvasObject.fillStyle = 'rgb(255, 0, 0, 0.6)';

    this.canvasObject.fillRect(
      this.x - this.hitboxWidth / 2,
      this.y - this.hitboxHeight / 2,
      this.hitboxWidth,
      this.hitboxHeight
    );
  }

  drawSpriteBox() {
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

  drawSprite() {
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

    this.canvasObject.save();
    this.canvasObject.globalAlpha = 0.8;

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

    this.canvasObject.restore();
  }

  animateSprite() {
    //-------------ANIMACIÓN----------------

    this.animationCounter++; // Sumamos 1 en cada ciclo de dibujo

    // Cambiamos de frame cada 6 ciclos
    if (this.animationCounter % 6 === 0) this.currentFrame++;

    // Cuando pasamos del último frame, volvemos al primero
    if (this.currentFrame > 4) this.currentFrame = 0;
  }

  checkCollisionEnemy(enemy) {
    //---------------COLISIÓN ENTRE DISPARO Y ENEMIGO----------------

    // Aquí usamos la hitbox del disparo
    // y la hitbox del enemigo.
    // Por eso el enemigo debe tener hitboxWidth e hitboxHeight.

    return (
      // El lado derecho del disparo supera el lado izquierdo del enemigo
      this.x + this.hitboxWidth / 2 > enemy.x - enemy.hitboxWidth / 2 &&

      // El lado izquierdo del disparo está antes del lado derecho del enemigo
      this.x - this.hitboxWidth / 2 < enemy.x + enemy.hitboxWidth / 2 &&

      // La parte superior del disparo está por encima de la parte inferior del enemigo
      this.y - this.hitboxHeight / 2 < enemy.y + enemy.hitboxHeight / 2 &&

      // La parte inferior del disparo está por debajo de la parte superior del enemigo
      this.y + this.hitboxHeight / 2 > enemy.y - enemy.hitboxHeight / 2
    );
  };

}

debugger;