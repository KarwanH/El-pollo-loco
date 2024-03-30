class Sounds {
  // Define audio objects for different sounds
  walking_sound = new Audio("./audio/walking.mp3");
  ouch_sound = new Audio("./audio/hurt.mp3");
  smashing_bottle_sound = new Audio("./audio/glass.mp3");
  collect_sound = new Audio("./audio/coin.mp3");
  hit_sound = new Audio("./audio/chickenDead.mp3");

  // Set the volume for all sounds
  setVolume() {
    this.walking_sound.volume = 0.1;
    this.ouch_sound.volume = 0.1;
    this.smashing_bottle_sound.volume = 0.1;
    this.collect_sound.volume = 0.1;
    this.hit_sound.volume = 0.1;
  }

  // Mute all sounds
  muteSounds() {
    this.walking_sound.volume = 0.0;
    this.ouch_sound.volume = 0.0;
    this.smashing_bottle_sound.volume = 0.0;
    this.collect_sound.volume = 0.0;
    this.hit_sound.volume = 0.0;
  }

  /**
   * Function to check and set the sound settings (volume/mute)
   */
  checkSetSounds() {
    soundsOn ? this.setVolume() : this.muteSounds();
  }
}
