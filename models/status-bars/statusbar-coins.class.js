class CoinsStatusBar extends DrawableObject {
  // Array of paths to images representing different levels of coin collection
  IMAGES = [
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  // Property to store the number of collected coins
  collectedCoins = 0;

  constructor() {
    // Call the constructor of the parent class
    super();
    // Load the images defined in IMAGES array
    this.loadImages(this.IMAGES);
    // Initial position and dimensions of the status bar
    this.x = 15;
    this.y = 90;
    this.width = 200;
    this.height = this.width * 0.265;
    // Set the initial amount of coins collected
    this.setAmountCoins(0);
  }

  // Method to update the number of collected coins and set the appropriate image
  setAmountCoins(collectedCoins) {
    this.collectedCoins = collectedCoins;
    // Determine the path of the image based on the number of collected coins
    let path =
      this.IMAGES[this.resolveImageIndexCollectableObjectsBar(collectedCoins)];
    // Set the image of the status bar
    this.img = this.imageCache[path];
  }
}
