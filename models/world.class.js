class World extends DrawableObject {
  // Initialize game elements
  character = new Character();
  throwableObject = [];
  splashedBottle = [];
  deadEnemies = [];
  healthStatusBar = new HealthStatusBar();
  bottlesStatusBar = new BottlesStatusBar();
  coinsStatusBar = new CoinsStatusBar();
  statusBarEndboss = new HealthStatusBarEndBoss();
  overlayIconStatusBarEndboss = new OverlayIconEndboss();
  sounds = new Sounds();
  movableObject = new MovableObject();

  level = level1; // Set initial level
  gameEnds = false; // Flag to indicate if the game has ended
  canvas;
  ctx;
  keyboard;
  camera_x = -100; // Initial camera position

  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.drawWorld(); // Draw the initial state of the world
    this.setWorld(); // Set up initial world settings
    this.run(); // Start the game loop
    this.sounds.setVolume(); // Set initial volume for sounds
  }

  // Set up initial world settings
  setWorld() {
    this.character.world = this; // Set the world reference for the character
  }

  // Start the game loop
  run() {
    this.playinterval = setStoppableInterval(this.checks.bind(this), 40); // Check game conditions every 40 milliseconds
  }

  // Check various game conditions
  checks() {
    this.checkCollsionWithEnemies(); // Check collisions with enemies
    this.checkCollsionWithCollectableObjects(); // Check collisions with collectible objects
    this.checkCharacterMakingEndbossWild(); // Check character's proximity to end boss
    this.checkBottleHitsGround(); // Check if bottles hit the ground
    this.checkBottleHitsEnemy(); // Check if bottles hit enemies
    this.checkCharacterGetDetectedByEndboss(); // Check if character is detected by end boss
    this.checksRightEndScreen(); // Check if the game should end
    this.sounds.checkSetSounds(); // Check and set sounds based on game settings
  }

  // Check collisions with enemies
  checkCollsionWithEnemies() {
    this.checkCollisionsWithSmallEnemies(); // Check collisions with small enemies
    this.checkCollisionsWithBiggerEnemies(); // Check collisions with bigger enemies
    this.checkCollisionsWithEndBossEnemies(); // Check collisions with end boss enemies
    this.checkKillEnemyByJump(); // Check if enemy is killed by character's jump
  }

  // Check collisions with small enemies
  checkCollisionsWithSmallEnemies() {
    this.level.smallEnemies.forEach((enemy) => {
      if (this.character.aboveGround()) return;
      if (this.character.isColliding(enemy)) {
        this.character.injury(0.5);
        this.healthStatusBar.setPercentage(this.character.energy);
      }
    });
  }

  // Check collisions with bigger enemies
  checkCollisionsWithBiggerEnemies() {
    this.level.biggerEnemies.forEach((enemy) => {
      this.character.isColliding(enemy)
        ? (this.character.injury(1),
          this.healthStatusBar.setPercentage(this.character.energy))
        : null;
    });
  }

  // Check collisions with end boss enemies
  checkCollisionsWithEndBossEnemies() {
    this.level.endBoss.forEach((enemy) => {
      this.character.isColliding(enemy)
        ? (this.character.injury(5),
          this.healthStatusBar.setPercentage(this.character.energy))
        : null;
    });
  }

  // Check if enemy is killed by character's jump
  checkKillEnemyByJump() {
    this.checkHitsChickOnTop();
    this.checkHitsChickenOnTop();
  }

  // Check if character hits small enemies from top
  checkHitsChickOnTop() {
    this.level.smallEnemies.forEach((chick, i) => {
      this.character.isColliding(chick) &&
      this.character.speedY < 0 &&
      this.character.aboveGround(this.sounds.hit_sound.play())
        ? (this.chickDies(chick, i), this.character.jump())
        : null;
    });
  }

  // Check if character hits bigger enemies from top
  checkHitsChickenOnTop() {
    this.level.biggerEnemies.forEach((chicken, i) => {
      this.character.isColliding(chicken) &&
      this.character.speedY < 0 &&
      this.character.aboveGround(this.sounds.hit_sound.play())
        ? (this.chickenDies(chicken, i), this.character.jump())
        : null;
    });
  }

  // Check collisions with collectible objects
  checkCollsionWithCollectableObjects() {
    this.checkCollisionsWithBottlesOnGround(); // Check collisions with bottles on ground
    this.checkCollisionsWithBottlesInAir(); // Check collisions with bottles in air
    this.checkCollisionsWithCoins(); // Check collisions with coins
  }

  // Check collisions with bottles on ground
  checkCollisionsWithBottlesOnGround() {
    this.level.bottlesOnGround.forEach((bottlesOnGround, i) => {
      if (this.cannotCarryMoreBottles()) return;
      if (this.character.isColliding(bottlesOnGround)) {
        this.takeBottleOnGroundFromMap(i);
        this.updateIncreaseStatusBarBottles();
        this.sounds.collect_sound.play();
      }
    });
  }

  // Check collisions with bottles in air
  checkCollisionsWithBottlesInAir() {
    if (this.cannotCarryMoreBottles()) return; // Pepe can carry more than 10 bottles at the time
    this.level.bottlesInAir.forEach((objectInAir, i) => {
      if (this.character.isColliding(objectInAir)) {
        this.collectBottleFromAirProcess(i);
        this.sounds.collect_sound.play();
      }
    });
  }

  // Check if Pepe can't carry more bottles
  cannotCarryMoreBottles() {
    return this.bottlesStatusBar.collectedBottles == 10;
  }

  // Remove bottles taken from ground from map
  takeBottleOnGroundFromMap(i) {
    this.level.bottlesOnGround.splice(i, 1);
  }

  // Process collecting bottle from air
  collectBottleFromAirProcess(i) {
    this.takeBottleInAirFromMap(i);
    this.updateIncreaseStatusBarBottles();
    this.sounds.collect_sound.play();
  }

  // Remove collected bottles from air from map
  takeBottleInAirFromMap(i) {
    this.level.bottlesInAir.splice(i, 1);
  }

  // Update bottle status bar when collecting bottles
  updateIncreaseStatusBarBottles() {
    this.bottlesStatusBar.collectedBottles++;
    this.bottlesStatusBar.setAmountBottles(
      this.bottlesStatusBar.collectedBottles
    );
  }

  // Update bottle status bar when using bottles
  updateDecreaseStatusBarBottles() {
    this.bottlesStatusBar.collectedBottles--;
    this.bottlesStatusBar.setAmountBottles(
      this.bottlesStatusBar.collectedBottles
    );
  }

  // Check collisions with coins
  checkCollisionsWithCoins() {
    this.level.coins.forEach((coins, i) => {
      if (this.character.isColliding(coins)) {
        this.takesCoinOffMap(i);
        this.updateCoinStatusBar();
        this.sounds.collect_sound.play();
      }
    });
  }

  // Remove collected coins from map
  takesCoinOffMap(i) {
    this.level.coins.splice(i, 1);
  }

  // Update coin status bar when collecting coins
  updateCoinStatusBar() {
    this.coinsStatusBar.collectedCoins++;
    this.coinsStatusBar.setAmountCoins(this.coinsStatusBar.collectedCoins);
  }

  // Check if no bottles are collected
  noBottlesCollected() {
    return this.bottlesStatusBar.collectedBottles == 0;
  }

  // Check if bottles hit the ground
  checkBottleHitsGround() {
    this.throwableObject.forEach((bottle) => {
      if (bottle.y > 300) {
        this.smashingBottleAnimation(bottle);
      }
    });
  }

  // Perform animation for smashing bottle
  bottleSmashes(bottleObj) {
    let bottle = new SplashedBottle(bottleObj.x, bottleObj.y);
    this.throwableObject.splice(bottleObj, 1);
    this.splashedBottle.push(bottle);
    setTimeout(() => {
      this.splashedBottle.splice(bottle);
    }, 500);
  }

  // Check if bottles hit enemies
  checkBottleHitsEnemy() {
    this.checkBottleHitsChick();
    this.checkBottleHitsChicken();
    this.checkBottleHitsEndboss();
  }

  // Check if bottles hit small enemies
  checkBottleHitsChick() {
    this.throwableObject.forEach((bottle) => {
      this.level.smallEnemies.forEach((enemy, i) => {
        if (bottle.isColliding(enemy)) {
          this.chickDies(enemy, i);
          this.smashingBottleAnimation(bottle);
        }
      });
    });
  }

  // Check if small enemies are killed by bottles
  chickDies(enemy, position) {
    let deadChick = new ChickDies(enemy.x, enemy.y);
    this.level.smallEnemies.splice(position, 1);
    this.deadEnemies.push(deadChick);
    setTimeout(() => {
      this.deadEnemies.splice(0, 1);
    }, 2000);
  }

  // Check if bottles hit bigger enemies
  checkBottleHitsChicken() {
    this.throwableObject.forEach((bottle) => {
      this.level.biggerEnemies.forEach((enemy, i) => {
        if (bottle.isColliding(enemy)) {
          this.chickenDies(enemy, i);
          this.smashingBottleAnimation(bottle);
        }
      });
    });
  }

  // Check if bigger enemies are killed by bottles
  chickenDies(enemy, i) {
    let deadChicken = new ChickenDies(enemy.x, enemy.y);
    this.level.biggerEnemies.splice(i, 1);
    this.deadEnemies.push(deadChicken);
    setTimeout(() => {
      this.deadEnemies.splice(0, 1);
    }, 2000);
  }

  // Check if end boss is hit by bottles
  checkBottleHitsEndboss() {
    this.throwableObject.forEach((bottle) => {
      this.level.endBoss.forEach((enemy, i) => {
        if (bottle.isColliding(enemy)) {
          this.endbossLoosesEnergy(i);
          this.sounds.hit_sound.play();
          this.updatingHealthbarOfEndboss(i);
          this.smashingBottleAnimation(bottle);
          this.setsEndBossBeingAttackedByCharacter();
        }
        if (this.level.endBoss[i].isDead()) {
          this.stopEndboss(i);
        }
      });
    });
  }

  // Decrease end boss energy when hit by bottles
  endbossLoosesEnergy(i) {
    this.level.endBoss[i].injury(20);
  }

  // Update health bar of end boss when hit by bottles
  updatingHealthbarOfEndboss(i) {
    this.statusBarEndboss.setPercentage(this.level.endBoss[i].energy);
  }

  // Perform animation for smashing bottle
  smashingBottleAnimation(bottle) {
    this.bottleSmashes(bottle);
    this.sounds.smashing_bottle_sound.play();
  }

  // Stop end boss movement when defeated
  stopEndboss(i) {
    this.level.endBoss[i].speed = 0;
  }

  // Check if character is detected by end boss
  checkCharacterGetDetectedByEndboss() {
    if (this.character.x > 3000) {
      this.endBossDetectedCharacter();
    }
  }

  // Set end boss state to detected character
  endBossDetectedCharacter() {
    this.level.endBoss[0].characterDetected = true;
  }

  // Set end boss state to being attacked by character
  setsEndBossBeingAttackedByCharacter() {
    this.level.endBoss[0].beingAttacked = true;
  }

  // Check character's proximity to end boss
  checkCharacterMakingEndbossWild() {
    this.notEnoughDistance() && this.character.isAlive()
      ? this.setCharacterTooClose()
      : this.setCharacterNotTooClose();
  }

  // Check if character is too close to end boss
  notEnoughDistance() {
    return this.level.endBoss[0].x - this.character.x < 50;
  }

  // Set end boss state to not being too close
  setCharacterNotTooClose() {
    this.level.endBoss[0].tooClose = false;
  }

  // Set end boss state to being too close
  setCharacterTooClose() {
    this.level.endBoss[0].tooClose = true;
  }

  // Check if the game should end
  checksRightEndScreen() {
    if (this.level.endBoss[0].isDead()) this.showEndScreen("endScreen"); // Show end screen if end boss is dead
    if (this.level.endBoss[0].isDead()) return;
    if (this.character.isDead()) this.showEndScreen("loosesEndScreen"); // Show end screen if character is dead
  }

  // Show the end screen
  showEndScreen(screenId) {
    document.getElementById(screenId).classList.remove("d-none");
    document.getElementById("restart").classList.remove("d-none");
    this.gameEnds = true; // Set gameEnds flag to true
    this.stopAllIntervals(); // Stop all intervals
  }

  // Stop all intervals
  stopAllIntervals() {
    setTimeout(() => {
      intervallIds.forEach((id) => {
        clearInterval(id);
      });
    }, 3000); // Stop intervals after 3 seconds
  }
}
