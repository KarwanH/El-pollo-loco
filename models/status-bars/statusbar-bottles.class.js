class BottlesStatusBar extends DrawableObject {
  // Array of paths to images representing different levels of bottle collection
  IMAGES = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  // Property to store the number of collected bottles
  collectedBottles = 0;

  constructor() {
    super();
    // Load the images defined in IMAGES array
    this.loadImages(this.IMAGES);
    // Initial position and dimensions of the status bar
    this.x = 15;
    this.y = 45;
    this.width = 200;
    this.height = this.width * 0.265;
    // Set the initial amount of bottles collected
    this.setAmountBottles(0);
  }

  // Method to update the number of collected bottles and set the appropriate image
  setAmountBottles(collectedBottles) {
    this.collectedBottles = collectedBottles;
    // Determine the path of the image based on the number of collected bottles
    let path =
      this.IMAGES[
        this.resolveImageIndexCollectableObjectsBar(collectedBottles)
      ];
    // Set the image of the status bar
    this.img = this.imageCache[path];
  }
}
