# Nombre del Proyecto
oh my Gradius!
## Descripción
 Arcade de naves donde podras enfrentarte a una horda de enemigos que no dejaran de atacarte.
 Para poder sobrevivir deberas esquivar a los enemigos y sus ataques haciendo uso de tu capacidad para moverte en 8 direcciones diferentes, y destruir al enemigo con una potente rafaga de disparos. 
 Tu unico objetivo sera SOBREVIVIR.
 Suerte!
## MVP - Tecnología (DOM - CANVAS)

 un videojuego que:
 - tendra un PLAYER;
    - que podra moverse en 4 DIRECCIONES. 
    - que podra DISPARAR una rafaga de disparos.
    - los disparos podran colisionar con el ENEMIGO destruyendolo.
- tendra minimo un TIPO de ENEMIGO ;
    - apareceran desde el lado derecho de la pantalla.
    - se dirigiran al lado izquierdo y desparaceran.
    - podran colisionar con el enemigo.
    - esta colision restara una vida al PLAYER.

- tendra 3 STAGES:
    - Start
    - Game
    - Game over-restart

## Backlog

FONDO DE PANTALLA;
- generar scroll en el fondo para generar sensacion de velocidad

PLAYER;
- movimiento en 8 direcciones.

ENEMIGO 2;
- se movera igual que el enemigo 1 pero:
- parecera siempre por el lado inferior derecho de la pantalla
- ira mas despacio que el enemigo 1
- podra DISPARAR:
    - el DISPARO se originara en la posicion actual del enemigo.
    - el DISPARO se dirigira a la posicion actual del PLAYER y no se modificara.
    - el DISPARO podra colisionar con el player, restandole una vida.


## Estructuras de Datos


Class Game;
- startLoop()
- updateCanvas()
- clearCanvas()
- drawCanvas()
- checkAllCollisions()
- gameOverCallback()

Class Player;
- update()
- draw()
- setdirection()
- checkScreen()
- checkCollisionEnemy()
- loselive()

Class PlayerShoot;
- update()
- draw()

Class Enemy1;
- update()
- draw()


## States y States Transitions

Definicion del las transiciones del juego y del main.

- splashScreen
- gameScreen
- gameoverScreen
---- NO WINSCREEN FOR ANYBODY -----

 function Main();
- buildDom()
- buildSplashScreen()
- buildGameScreen()
- buildGameOver()

## Task

0.prepar archivos js,html y css

1.Definir main.js y construir sus funciones


2.definir Game.js y construir sus funciones.
// sin constrir collissions

3.definir Player.js y construir sus funciones
// sin constrir collissions

4.definir playerShoot.js y construir sus funciones
// sin constrir collissions 

5.definir Enemy1.js y construir sus funciones
// sin constrir collissions

6. definir collissions en:
  6.0 game.js   
  6.1 player.js
  6.2 playershoot.js
  6.3 enemy1.js




## Links

### Miguel Angel Moreno

[Link url](www.linkedin.com/in/miguel-angel-moreno-architect)

### Git

Especificar las url del proyecto y del deploy

[Link Repositorio](https://github.com/MiguelMorenoGit/Ironhack-Module1-GameProject)

[Link Deploy](http://github.com)

### Slides.com

Especificar la url de la presentacion

[Link Slides.com](http://slides.com)

## Instrucciones del juego 

Al finalizar el juego generar las instrucciones



