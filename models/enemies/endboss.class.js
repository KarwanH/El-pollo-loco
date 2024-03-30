/**
 * Represents the end boss character, extending the MovableObject class.
 */
class Endboss extends MovableObject {
  /**
   * Width of the end boss.
   * @type {number}
   */
  width = 300;

  /**
   * Height of the end boss.
   * @type {number}
   */
  height = 300;

  /**
   * Initial y-coordinate of the end boss.
   * @type {number}
   */
  y = 140;

  /**
   * Initial x-coordinate of the end boss.
   * @type {number}
   */
  x = 3420;

  /**
   * Vertical speed of the end boss.
   * @type {number}
   */
  speedY = 5;

  /**
   * Horizontal speed of the end boss.
   * @type {number}
   */
  speed = 25;

  /**
   * Acceleration of the end boss.
   * @type {number}
   */
  acceleration = 5;

  /**
   * Energy level of the end boss.
   * @type {number}
   */
  energy = 100;

  /**
   * Indicates if the end boss is being attacked.
   * @type {boolean}
   */
  beingAttacked = false;

  /**
   * Indicates if the character is detected by the end boss.
   * @type {boolean}
   */
  characterDetected = false;

  /**
   * Indicates if the character is too close to the end boss.
   * @type {boolean}
   */
  tooClose = false;

  /**
   * Indicates if the last jump occurred.
   * @type {boolean}
   */
  lastJump = false;

  /**
   * Ground position for the end boss.
   * @type {number}
   */
  groundPosition = 100;

  /**
   * Cache object for storing images related to the end boss.
   * @type {EndbossCache}
   */
  cache = new EndbossCache();

  /**
   * Time limit for certain actions of the end boss.
   * @type {number}
   */
  timeLimit = 0.8;

  /**
   * Counter for animations.
   * @type {number}
   */
  i = 0;

  /**
   * Identifier for the end boss.
   * @type {any}
   */
  id;

  /**
   * Offset values for collision detection.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 100,
    bottom: 15,
    left: 50,
    right: 50,
  };

  /**
   * Constructor for the Endboss class.
   */
  constructor() {
    super().loadImage(this.cache.IMAGES_ALERT[0]); // Load the initial image for the end boss.
    this.loadAllImagesFromCache(); // Load all images for the end boss from cache.
    this.animate(); // Start the animation.
    this.animations(); // Start other animations.
  }

  /**
   * Initiates the main animation loop for the end boss.
   */
  animate() {
    this.playInterval = setStoppableInterval(this.checks.bind(this), 200); // Start the animation loop with checks.
  }

  /**
   * Initiates various animations for the end boss.
   */
  animations(id) {
    this.alertAnimation(); // Animation for being alert.
    this.walkAnimation(); // Animation for walking.
    this.attackAnimation(); // Animation for attacking.
    this.hurtAnimation(); // Animation for being hurt.
    this.dyingAnimation(id); // Animation for dying.
  }

  /**
   * Animation for being alert.
   */
  alertAnimation() {
    this.playAnimation(this.cache.IMAGES_ALERT); // Play the alert animation.
  }

  /**
   * Animation for walking.
   */
  walkAnimation() {
    this.playAnimation(this.cache.IMAGES_WALKING); // Play the walking animation.
  }

  /**
   * Animation for being hurt.
   */
  hurtAnimation() {
    this.playAnimation(this.cache.IMAGES_HURT); // Play the hurt animation.
  }

  /**
   * Animation for attacking.
   */
  attackAnimation() {
    this.playAnimation(this.cache.IMAGES_ATTACK); // Play the attack animation.
    this.moveLeft(); // Move left while attacking.
  }

  /**
   * Animation for dying.
   */
  dyingAnimation() {
    if (this.i >= 3 || this.isAlive()) return; // Exit if already dead or still alive.
    if (this.i < 2 || this.isDead()) {
      this.playAnimation(this.cache.IMAGES_ENDBOSS_DYING); // Play the dying animation.
      this.i++; // Increment the counter.
    }
    if (!this.aboveGround() && !this.lastJump) {
      this.applyGravity(); // Apply gravity if not above ground.
      this.jump(); // Jump if not above ground.
      this.goesToGrave(2000); // Move towards the ground.
      this.lastJump = true; // Set last jump to true.
      this.loadImage(this.cache.IMAGES_ENDBOSS_DYING[2]); // Load a specific image for dying animation.
    }
    if (this.i == 2) this.lastJump = true; // Set last jump to true if animation in progress.
  }

  /**
   * Checks for various conditions and triggers corresponding animations.
   */
  checks() {
    this.checkBeingAlert(); // Check for being alert.
    this.checkWalking(); // Check for walking.
    this.checkBeingAttacked(); // Check for being attacked.
    this.checkAttackCharacter(); // Check for attacking character.
    this.checkIsBeingKilled(); // Check for being killed.
  }

  /**
   * Checks for walking conditions and triggers walking animation.
   */
  checkWalking() {
    if (this.tooClose || this.isDead()) return; // Exit if too close or already dead.
    if (this.isAlive() && (this.characterDetected || this.beingAttacked)) {
      this.moveLeft(); // Move left if alive and character detected or being attacked.
      this.walkAnimation(); // Play walking animation.
    }
  }

  /**
   * Checks for being alert and triggers alert animation.
   */
  checkBeingAlert() {
    if (!this.characterDetected) this.alertAnimation(); // Play alert animation if character not detected.
  }

  /**
   * Checks for being attacked and triggers hurt animation.
   */
  checkBeingAttacked() {
    if (this.isDead()) return; // Exit if already dead.
    if (this.beingAttacked && this.isInPain(this.timeLimit))
      this.hurtAnimation(); // Play hurt animation if being attacked.
  }

  /**
   * Checks for attacking character and triggers attack animation.
   */
  checkAttackCharacter() {
    if (this.tooClose && this.isAlive()) this.attackAnimation(); // Play attack animation if too close and alive.
  }

  /**
   * Checks for being killed and triggers dying animation.
   */
  checkIsBeingKilled() {
    if (this.isAlive()) return; // Exit if still alive.
    if (this.isDead() && !this.lastJump) {
      this.dyingAnimation(); // Play
    }
  }
}
