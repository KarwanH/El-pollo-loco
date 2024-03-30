class HealthStatusBarEndBoss extends DrawableObject {
  // Array of paths to images representing different levels of health
  IMAGES = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png", // 0%
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png", // 20%
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png", // 40%
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png", // 60%
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png", // 80%
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png", // 100%
  ];

  // Property to store the health percentage
  percentage = 100;

  constructor() {
    // Call the constructor of the parent class
    super();
    // Load the images defined in IMAGES array
    this.loadImages(this.IMAGES);
    // Initial position and dimensions of the status bar
    this.x = 550;
    this.y = 0;
    this.width = 200;
    this.height = this.width * 0.265;
    // Set the initial health percentage
    this.setPercentage(100);
  }

  // Method to update the health percentage and set the appropriate image
  setPercentage(percentage) {
    this.percentage = percentage;
    // Determine the path of the image based on the health percentage
    let path = this.IMAGES[this.resolveImageIndexHealthBar()];
    // Set the image of the status bar
    this.img = this.imageCache[path];
  }
}
