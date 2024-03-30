/**
 * Represents a dying chick in the game, extending the MovableObject class.
 */
class ChickDies extends MovableObject {
  /**
   * Array containing paths to images for the dying chick animation.
   * @type {string[]}
   */
  IMAGES_CHICK_DIES = ["./img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Constructor for the ChickDies class.
   * @param {number} x - Initial x-coordinate of the dying chick.
   * @param {number} y - Initial y-coordinate of the dying chick.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_CHICK_DIES[0]); // Load the image of the dying chick.
    this.x = x; // Set the initial x-coordinate.
    this.y = y; // Set the initial y-coordinate.
    this.height = 75; // Set the height of the dying chick.
    this.width = 75; // Set the width of the dying chick.
    this.loadImages(this.IMAGES_CHICK_DIES); // Load images for the dying chick animation.
  }
}
