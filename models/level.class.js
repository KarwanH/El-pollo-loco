/**
 * Represents a level in the game.
 */
class Level {
  /**
   * Array containing small enemies.
   * @type {object[]}
   */
  smallEnemies;

  /**
   * Array containing bigger enemies.
   * @type {object[]}
   */
  biggerEnemies;

  /**
   * Array containing end boss objects.
   * @type {object[]}
   */
  endBoss;

  /**
   * Array containing cloud objects.
   * @type {object[]}
   */
  clouds;

  /**
   * Array containing background objects.
   * @type {object[]}
   */
  backgroundObjects;

  /**
   * Array containing bottles on the ground.
   * @type {object[]}
   */
  bottlesOnGround;

  /**
   * Array containing bottles in the air.
   * @type {object[]}
   */
  bottlesInAir;

  /**
   * Array containing coin objects.
   * @type {object[]}
   */
  coins;

  /**
   * x-coordinate representing the end of the level.
   * @type {number}
   */
  endOfLevel_x = 3400;

  /**
   * Constructor for the Level class.
   * @param {object[]} smallEnemies - Array of small enemy objects.
   * @param {object[]} biggerEnemies - Array of bigger enemy objects.
   * @param {object[]} endBoss - Array of end boss objects.
   * @param {object[]} clouds - Array of cloud objects.
   * @param {object[]} backgroundObjects - Array of background objects.
   * @param {object[]} bottlesOnGround - Array of bottles on the ground.
   * @param {object[]} bottlesInAir - Array of bottles in the air.
   * @param {object[]} coins - Array of coin objects.
   */
  constructor(
    smallEnemies,
    biggerEnemies,
    endBoss,
    clouds,
    backgroundObjects,
    bottlesOnGround,
    bottlesInAir,
    coins
  ) {
    this.smallEnemies = smallEnemies;
    this.biggerEnemies = biggerEnemies;
    this.endBoss = endBoss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottlesOnGround = bottlesOnGround;
    this.bottlesInAir = bottlesInAir;
    this.coins = coins;
  }
}
