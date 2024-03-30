/**
 * Represents a character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
  /**
   * Speed of the character.
   * @type {number}
   */
  speed = 16;

  /**
   * Initial y position of the character.
   * @type {number}
   */
  y = 180;

  /**
   * Reference to the game world.
   * @type {World}
   */
  world;

  /**
   * Instance of the Sounds class for managing sounds.
   * @type {Sounds}
   */
  sounds = new Sounds();

  /**
   * Instance of the CharacterCache class for caching character images.
   * @type {CharacterCache}
   */
  cache = new CharacterCache();

  /**
   * Flag indicating if the character is inactive.
   * @type {boolean}
   */
  isInactive = false;

  /**
   * Energy level of the character.
   * @type {number}
   */
  energy = 100;

  /**
   * Timestamp of the last bottle throw.
   * @type {number}
   */
  lastThrow = 0;

  /**
   * Time limit between consecutive throws.
   * @type {number}
   */
  timeLimit = 0.1;

  /**
   * Offset values for character bounding box.
   * @type {object}
   */
  offset = {
    top: 150,
    bottom: -5,
    left: 25,
    right: 25,
  };

  /**
   * Constructs a new Character object.
   */
  constructor() {
    // Call the constructor of the parent class
    super().loadImage(this.cache.IMAGES_WALKING[0]);

    // Load all images from cache
    this.loadAllImagesFromCache();

    // Apply gravity to the character
    this.applyGravity();

    // Start animations for the character
    this.animate();

    // Set volume for sounds
    this.sounds.setVolume();

    // Initialize long idle counter
    this.longIdleCounter = 0;
  }

  /**
   * Start animation loop for the character.
   */
  animate() {
    this.playInterval = setStoppableInterval(this.checks.bind(this), 50);
  }

  /**
   * Perform various checks and actions for the character.
   */
  checks() {
    this.checkWalking();
    this.checkWalkingRight();
    this.checkWalkingLeft();
    this.checkWalkingSound();
    this.checkJumping();
    this.checkIsIdling();
    this.checkIsLongIdling();
    this.checkStopLongIdling();
    this.checkThrowing();
    this.checkReactionToInjury();
    this.checkIsBeingKilled();
    this.setCameraForCharacter();
    this.sounds.checkSetSounds();
  }

  /**
   * Perform all animations for the character.
   */
  animations() {
    this.walkingAnimation();
    this.jumpingAnimation();
    this.idlingAnimation();
    this.longIdlingAnimation();
    this.beingInPainAnimation();
    this.dyingAnimation();
  }

  /**
   * Check if the character is walking.
   */
  checkWalking() {
    (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
    this.objectOnGround()
      ? this.walkingAnimation()
      : this.sounds.walking_sound.pause();
  }

  /**
   * Check if the character is walking to the right.
   */
  checkWalkingRight() {
    this.world.keyboard.RIGHT && this.x < this.world.level.endOfLevel_x
      ? (this.moveRight(), this.forwards(), this.sounds.walking_sound.play())
      : null;
  }

  /**
   * Check if the character is walking to the left.
   */
  checkWalkingLeft() {
    this.world.keyboard.LEFT && this.x > -50
      ? (this.moveLeft(), this.backwards(), this.sounds.walking_sound.play())
      : null;
  }

  /**
   * Check if the character is walking and above ground.
   */
  checkWalkingSound() {
    this.aboveGround() || this.isInPain()
      ? this.sounds.walking_sound.pause()
      : null;
  }

  /**
   * Check if the character is jumping.
   */
  checkJumping() {
    if (this.aboveGround()) {
      this.jumpingAnimation();
    }
    if (this.aboveGround()) return;
    if (this.world.keyboard.UP) {
      this.jump();
    }
    if (this.objectOnGround) this.airStatus = false;
  }

  /**
   * Check if the character is idling.
   */
  checkIsIdling() {
    if (
      this.isInactive ||
      this.isMoving() ||
      this.isDead() ||
      this.aboveGround()
    ) {
      this.longIdleCounter = 0; // Reset counter on activity
      return;
    }

    this.idlingAnimation();

    setTimeout(() => {
      this.isInactive = true;
    }, 5000);
  }

  /**
   * Check if the character is idling for a long time.
   */
  checkIsLongIdling() {
    if (
      !this.isInactive ||
      this.isMoving() ||
      this.isDead() ||
      this.aboveGround()
    ) {
      this.longIdleCounter = 0; // Reset counter on activity
      return;
    }

    this.longIdlingAnimation();

    // Increment counter here
    this.longIdleCounter += 1;
  }

  /**
   * Check if the character should stop long idling.
   */
  checkStopLongIdling() {
    if (this.isMoving() || this.aboveGround()) {
      this.isInactive = false;
      this.longIdleCounter = 0; // Reset counter on movement
    }
  }

  /**
   * Check if the character can throw bottles.
   */
  checkThrowing() {
    let bottle = new ThrowableObjects(this.x + 60, this.y + 100);
    if (this.noBottleToThrow()) return;
    if (!this.throwAllowed()) return;
    if (this.world.keyboard.D && this.isAlive() && this.headingForwards()) {
      this.throwBottle(bottle);
      this.world.updateDecreaseStatusBarBottles();
      this.lastThrow = new Date().getTime();
    }
  }

  /**
   * Throw a bottle.
   * @param {ThrowableObjects} bottle - The bottle object to throw.
   */
  throwBottle(bottle) {
    this.world.throwableObject.push(bottle);
  }

  /**
   * Check if the character has no bottles to throw.
   */
  noBottleToThrow() {
    return this.world.noBottlesCollected();
  }

  /**
   * Check if no bottles are collected.
   */
  noBottlesCollected() {
    return this.world.bottlesStatusBar.collectedBottles == 0;
  }

  /**
   * Check if the character can throw a bottle based on time limit.
   */

  throwAllowed() {
    let timepassed = new Date().getTime() - this.lastThrow;
    timepassed = timepassed / 1000; //divide 1000 to get seconds
    return timepassed > 0.5; //seconds
  }

  /**
   * Check the reaction of the character to injury.
   */

  checkReactionToInjury() {
    if (this.isDead()) return;
    if (this.isAlive()) this.checkIsBeingHurt();
  }

  /**
   * Check if the character is being hurt.
   */
  checkIsBeingHurt() {
    if (this.aboveGround()) return;
    if (this.isInPain(this.timeLimit)) {
      this.beingInPainAnimation();
      this.sounds.ouch_sound.play();
    }
  }

  /**
   * Check if the character is being killed.
   */
  checkIsBeingKilled() {
    if (this.isDead()) {
      this.applyGravity();
      this.jump();
      this.goesToGrave(1000);
      this.dyingAnimation();
    }
  }

  /**
   * Adjust the camera position to follow the character.
   */
  setCameraForCharacter() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Perform walking animation for the character.
   */
  walkingAnimation() {
    this.playAnimation(this.cache.IMAGES_WALKING);
  }

  /**
   * Perform jumping animation for the character.
   */
  jumpingAnimation() {
    this.playAnimation(this.cache.IMAGES_JUMPING);
  }

  /**
   * Perform idling animation for the character.
   */
  idlingAnimation() {
    this.playAnimation(this.cache.IMAGES_IDLE);
  }

  /**
   * Perform long idling animation for the character.
   */
  longIdlingAnimation() {
    this.playAnimation(this.cache.IMAGES_LONG_IDLE);
  }

  /**
   * Perform being in pain animation for the character.
   */
  beingInPainAnimation() {
    this.playAnimation(this.cache.IMAGES_INPAIN);
  }

  /**
   * Perform dying animation for the character.
   */
  dyingAnimation() {
    this.playAnimation(this.cache.IMAGES_DEAD);
  }

  /**
   * Check if the character is active.
   */
  isActive() {
    return (this.isInactive = false);
  }

  /**
   * Check if the character is moving.
   */
  isMoving() {
    return (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.UP ||
      this.world.keyboard.D
    );
  }
}
