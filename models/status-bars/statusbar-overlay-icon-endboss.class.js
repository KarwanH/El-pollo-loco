class OverlayIconEndboss extends DrawableObject {
  // Position and dimensions of the overlay icon
  x = 890;
  y = 0;
  width = 70;
  height = 70;

  // Path to the image representing the overlay icon
  IMAGE = ["img/7_statusbars/3_icons/icon_health_endboss.png"];

  constructor() {
    // Call the constructor of the parent class
    super();
    // Load the image defined in IMAGE
    this.loadImage(this.IMAGE);
  }
}
