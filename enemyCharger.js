'use strict';

class EnemyCharger {
  constructor(canvas, y, speed) {
    this.gameConfig = CONFIG; // Para controlar hitbox y caja visual del sprite para depuración

    this.canvas = canvas; // Guardamos el canvas completo para poder consultar su ancho y alto
    this.canvasObject = this.canvas.getContext('2d'); // Guardamos el contexto 2D, que es lo que usamos para dibujar

    //------------POSICION DEL ENEMIGO EN PANTALLA----------------
    // Igual que en Player, x e y representan el CENTRO de la hitbox
    this.x = this.canvas.width;
    this.y = y;

    //------------MOVIMIENTO DEL ENEMIGO----------------
    this.speed = speed; // Velocidad horizontal del enemigo
    this.speedHeight = 2; // Velocidad del movimiento vertical en zig-zag
    this.direction = -1; // Se mueve hacia la izquierda
    this.limitHeight = 50 + Math.floor(Math.random() * 100); // Cuánto sube y baja respecto a su origen
    this.isUp = true; // Controla si ahora mismo sube o baja
    this.originY = y; // Posición Y inicial, usada como referencia para el movimiento vertical

    //------------IMAGENES Y ANIMACIÓN----------------
    this.img = imgEnemy1; // Imagen estática del enemigo, por si la necesitas en otro momento
    this.imgGif = imgEnemy1Gif; // Spritesheet o imagen animada del enemigo
    this.currentFrame = 0; // Frame actual de la animación
    this.animationCounter = 0; // Contador que controla cuándo cambiar al siguiente frame
    this.frameWidth = 100; // Ancho del frame dentro del spritesheet
    this.frameHeight = 150; // Alto del frame dentro del spritesheet

    //------------HITBOX / CAJA DE COLISION----------------
    // Puede ser diferente al tamaño del sprite para controlar mejor las colisiones
    this.hitboxWidth = 120; // Ancho de la hitbox
    this.hitboxHeight = 120; // Alto de la hitbox

    //------------SPRITES----------------
    this.spriteWidth = 150; // Ancho con el que se dibuja visualmente el sprite en pantalla
    this.spriteHeight = 150; // Alto con el que se dibuja visualmente el sprite en pantalla

    //------------OFFSET DEL SPRITE----------------
    // Estos offsets sirven para mover visualmente el sprite
    // respecto al centro de la hitbox.
    this.spriteOffsetX = 0; // Mueve el sprite en el eje X
    this.spriteOffsetY = 0; // Mueve el sprite en el eje Y
  };

  update() {
    // Movimiento horizontal del enemigo
    this.x = this.x + this.direction * this.speed;

    // Movimiento vertical tipo zig-zag
    if (this.isUp) {
      this.y = this.y - this.speedHeight;

      if (this.y < this.originY - this.limitHeight) {
        this.isUp = false;
      }
    } else {
      this.y = this.y + this.speedHeight;

      if (this.y > this.originY + this.limitHeight) {
        this.isUp = true;
      }
    }
  };

  updateSpeed(newSpeed) {
    // Aumenta la velocidad actual del enemigo
    this.speed = this.speed + newSpeed;
  }

  draw() {
    this.drawHitbox(); // Dibujar la hitbox
    this.drawSpriteBox(); // Dibujar la caja que contiene el sprite en pantalla
    this.drawSprite(); // Dibujar el sprite del enemigo en pantalla
    this.animateSprite(); // Controlar la animación del sprite
  };

  drawHitbox() {
    //-------------DIBUJAMOS LA HITBOX----------------

    // Dibujamos la caja verde solo para depuración.
    // Cuando el juego esté fino, puedes poner alpha 0 o comentarlo.

    // Como this.x y this.y son el CENTRO de la hitbox,
    // para dibujar el rectángulo tenemos que restar la mitad del ancho y alto.

    this.canvasObject.fillStyle = 'rgb(0, 0, 0, 0)';

    if (this.gameConfig.debug.showHitbox) this.canvasObject.fillStyle = 'rgb(0, 255, 0, 0.5)';

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

  animateSprite() {
    //-------------ANIMACIÓN----------------

    this.animationCounter++; // Sumamos 1 en cada ciclo de dibujo

    // Cambiamos de frame cada 3 ciclos
    if (this.animationCounter % 3 === 0) this.currentFrame++;

    // Cuando pasamos del último frame, volvemos al primero
    if (this.currentFrame > 11) this.currentFrame = 0;
  }

  checkCollisionEnemy(enemy) {
    //---------------COLISIÓN ENTRE ENEMIGOS----------------

    // Aquí ya usamos hitbox propia para este enemigo.
    // Si el otro enemigo todavía usa size, esta función no serviría bien.
    // Lo ideal es que todos los enemigos terminen usando
    // hitboxWidth e hitboxHeight.

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

debugger;











debugger;