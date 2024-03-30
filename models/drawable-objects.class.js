/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
  /**
   * Initial x position of the object.
   * @type {number}
   */
  x = 10;

  /**
   * Initial y position of the object.
   * @type {number}
   */
  y = 80;

  /**
   * Height of the object.
   * @type {number}
   */
  height = 250;

  /**
   * Width of the object.
   * @type {number}
   */
  width = 120;

  /**
   * Image object representing the drawable object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Cache for storing images.
   * @type {object}
   */
  imageCache = {};

  /**
   * Index of the current image.
   * @type {number}
   */
  currentImage = 0;
  /**
   * Loads an image from the given path.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image(); // Image() = document.getElementById('').innerHTML = <img src="path" alt="" />
    this.img.src = path;
  }

  /**
   * Loads images from an array of paths.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Loads all images from the cache.
   */
  loadAllImagesFromCache() {
    Object.values(this.cache).forEach((source) => {
      if (Array.isArray(source)) {
        this.loadImages(source);
      }
    });
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the world on the canvas.
   */

  drawWorld() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Inhalt von Canvas wird gelöscht
    this.ctx.translate(this.camera_x, 0);
    this.drawNature();
    this.ctx.translate(-this.camera_x, 0); //backwards
    this.drawFixedObjects();
    this.ctx.translate(this.camera_x, 0); // forwards
    this.drawMovableObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.requestFrame();
  }

  /**
   * Requests animation frame for continuous rendering.
   */
  requestFrame() {
    let self = this;
    requestAnimationFrame(() => {
      self.drawWorld();
    });
  }

  /**
   * Draws the background of the world.
   */
  drawNature() {
    this.addObjectsToCanvas(this.level.backgroundObjects);
    this.addObjectsToCanvas(this.level.clouds);
  }

  /**
   * Draws fixed objects on the canvas.
   */
  drawFixedObjects() {
    this.drawStatusBarEndBossIfFightStarted();
    this.addToCanvas(this.healthStatusBar);
    this.addToCanvas(this.bottlesStatusBar);
    this.addToCanvas(this.coinsStatusBar);
  }

  /**
   * Draws the end boss status bar if the fight has started.
   */
  drawStatusBarEndBossIfFightStarted() {
    if (this.endbossGetsAnnoyed()) {
      this.addToCanvas(this.statusBarEndboss);
      this.addToCanvas(this.overlayIconStatusBarEndboss);
    }
  }

  endbossGetsAnnoyed() {
    return (
      this.level.endBoss[0].characterDetected ||
      this.level.endBoss[0].beingAttacked
    );
  }

  /**
   * Draws movable objects on the canvas.
   */
  drawMovableObjects() {
    this.addEnemiesToCanvas();
    this.addCollectiblesToCanvas();
    this.addDestroyedCollectiblesToCanvas();
    this.addObjectsToCanvas(this.deadEnemies);
    this.addToCanvas(this.character);
  }

  /**
   * Adds enemies to the canvas.
   */
  addEnemiesToCanvas() {
    this.addObjectsToCanvas(this.level.smallEnemies);
    this.addObjectsToCanvas(this.level.biggerEnemies);
    this.addObjectsToCanvas(this.level.endBoss);
  }

  /**
   * Adds collectibles to the canvas.
   */
  addCollectiblesToCanvas() {
    this.addObjectsToCanvas(this.level.bottlesOnGround);
    this.addObjectsToCanvas(this.level.bottlesInAir);
    this.addObjectsToCanvas(this.level.coins);
  }

  /**
   * Adds destroyed collectibles to the canvas.
   */
  addDestroyedCollectiblesToCanvas() {
    this.addObjectsToCanvas(this.throwableObject);
    this.addObjectsToCanvas(this.splashedBottle);
  }

  /**
   * Adds objects to the canvas from an array.
   * @param {object[]} objects - Array of objects to be drawn on canvas.
   */
  addObjectsToCanvas(objects) {
    objects.forEach((object) => {
      this.addToCanvas(object);
    });
  }

  /**
   * Adds an object to the canvas.
   * @param {object} movableObject - The object to be drawn on canvas.
   */
  addToCanvas(movableObject) {
    if (movableObject.otherDirection || movableObject == this.statusBarEndboss)
      this.flipImage(movableObject);

    movableObject.draw(this.ctx);

    if (movableObject.otherDirection || movableObject == this.statusBarEndboss)
      this.flipImageBack(movableObject);
  }

  /**
   * Flips the image horizontally if the object is facing the other direction.
   * @param {object} movableObject - The object whose image needs to be flipped.
   */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  /**
   * Flips the image back to its original orientation.
   * @param {object} movableObject - The object whose image needs to be flipped back.
   */
  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }

  /**
   * Determines the image index for the collectible objects bar based on the collected amount.
   * @param {number} collectedAmount - The amount of collectibles collected.
   * @returns {number} - The index of the image to be displayed.
   */
  resolveImageIndexCollectableObjectsBar(collectedAmount) {
    switch (true) {
      case collectedAmount < 2:
        return 0;
      case collectedAmount <= 2:
        return 1;
      case collectedAmount <= 4:
        return 2;
      case collectedAmount <= 6:
        return 3;
      case collectedAmount <= 8:
        return 4;
      case collectedAmount <= 10:
      case collectedAmount > 10:
        return 5;
    }
  }

  /**
   * Determines the image index for the health bar of the character or end boss based on the percentage.
   * @returns {number} - The index of the image to be displayed.
   */
  resolveImageIndexHealthBar() {
    switch (true) {
      case this.percentage == 100:
        return 5;
      case this.percentage > 80:
        return 4;
      case this.percentage > 60:
        return 3;
      case this.percentage > 40:
        return 2;
      case this.percentage >= 20:
        return 1;
      default:
        return 0;
    }
  }
}
