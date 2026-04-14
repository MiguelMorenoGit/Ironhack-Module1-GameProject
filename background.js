//@ts-nocheck     
'use strict';

class Background {
  /**
   * @param {HTMLCanvasElement} canvas
   */

  constructor(canvas){
    this.canvas= canvas;
    this.canvasObject = this.canvas.getContext('2d');
    // Comprobamos que se ha obtenido el contexto 2D del canvas
    if (!this.canvasObject) {
      throw new Error('No se pudo obtener el contexto 2D del canvas en Background');
    }

    /** @type {null | Parallax1} */
    this.parallax1 = null;

    /** @type {null | Parallax2} */
    this.parallax2 = null;

    /** @type {Cloud[]} */
    this.clouds = [];

    /** @type {number} */
    this.speedGame = 3;

    // Guardamos el id del requestAnimationFrame
    /** @type {number | null} */
    this.animationId = null;

    // Flag para impedir que siga vivo al salir
    /** @type {boolean} */
    this.isRunning = false;
  };

  startLoop(){

    // Evita lanzar 2 loops del mismo background
    if (this.animationId !== null) return;
    
    this.parallax2 = new Parallax2(this.canvas);
    this.parallax1 = new Parallax1(this.canvas);
    this.isRunning = true;
    
    
    const loop = () => {

      // Si se ha parado, no seguimos
      if (!this.isRunning) return;

      if(Math.random() > 0.75) {
        const y = Math.random()*this.canvas.height;
        this.clouds.push(new Cloud(this.canvas,y));
      };

      this.clearCanvas ();
      this.drawCanvas ();
      this.checkAllCollisions();
      this.updateCanvas();

      // Guardamos el nuevo animationId
      this.animationId = window.requestAnimationFrame(loop);

    };
    
    
    this.animationId = window.requestAnimationFrame(loop);
    
  };

  // Método real para detener el fondo
  stopLoop() {
    this.isRunning = false;

    if (this.animationId !== null) {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // Limpiamos nubes acumuladas al salir
    this.clouds = [];
  }

  updateCanvas(){
    
    if(this.parallax1) this.parallax1.update();
    if(this.parallax2) this.parallax2.update();
    
    this.clouds.forEach((cloud)=>{cloud.update()}); // actualizamos las nubes
  
  };

  clearCanvas(){
    this.canvasObject.clearRect(0,0,this.canvas.width,this.canvas.height);
   
  };

  drawCanvas(){

    if (this.parallax1) this.parallax1.draw();
    if (this.parallax2) this.parallax2.draw();
    
    this.clouds.forEach((cloud)=>{cloud.draw()}); // dibujamos las nubes
  };

  checkAllCollisions(){
    // Limpiamos nubes que hayan salido del canvas
    this.clouds = this.clouds.filter ((cloud) => {
      // x > 0 esta dentro del canvas, x = o es el borde izquierdo del canvas
      return cloud.x - cloud.size / 2 > 0; 
    });
  };
  
};