/**
 * Represents bottles on the ground in the game, extending the MovableObject class.
 */
class BottlesOnGround extends MovableObject {
  /**
   * Height of the bottles on the ground.
   * @type {number}
   */
  height = 90;

  /**
   * Width of the bottles on the ground.
   * @type {number}
   */
  width = 90;

  /**
   * Initial y-coordinate of the bottles on the ground.
   * @type {number}
   */
  y = 340;

  /**
   * Offset values for collision detection.
   * @type {Object}
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 25,
  };

  /**
   * Constructor for the BottlesOnGround class.
   */
  constructor() {
    super().loadImage("./img/6_salsa_bottle/1_salsa_bottle_on_ground.png"); // Load the image of the bottle on the ground.
    this.x = 2500 + Math.random() * 200; // Set a random x-coordinate within a range.
  }
}
