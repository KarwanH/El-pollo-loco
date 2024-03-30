/**
 * Represents a splashed bottle object in the game, extending the MovableObject class.
 */
class SplashedBottle extends MovableObject {
  /**
   * Ground position where the splashed bottle rests.
   * @type {number}
   */
  groundPosition = 320;

  /**
   * Reference to the original throwable bottle.
   * @type {object}
   */
  throwableBottle;

  /**
   * Height of the splashed bottle.
   * @type {number}
   */
  height = 100;

  /**
   * Width of the splashed bottle.
   * @type {number}
   */
  width = 100;

  /**
   * Array of image paths for the splashed bottle animation.
   * @type {string[]}
   */
  IMAGES_SPLASHED_BOTTLES = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Constructor for the SplashedBottle class.
   * @param {number} x - The x-coordinate of the splashed bottle.
   * @param {number} y - The y-coordinate of the splashed bottle.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_SPLASHED_BOTTLES[0]); // Load the first image of the splash animation.
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_SPLASHED_BOTTLES); // Pre-load all images for the splash animation.
    this.splashAnimationApplied(); // Start the splash animation.
  }

  /**
   * Applies the splash animation at the specified interval.
   */
  splashAnimationApplied() {
    // Set a repeating interval to animate the splash.
    this.setIntervalId = setStoppableInterval(
      this.splashAnimation.bind(this), // Bind the context of the function to this instance.
      50 // Interval duration in milliseconds.
    );
  }

  /**
   * Animates the splash by cycling through the images.
   */
  splashAnimation() {
    this.playAnimation(this.IMAGES_SPLASHED_BOTTLES); // Play the splash animation.
  }
}
