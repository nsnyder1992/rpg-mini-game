class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //load images
    this.loadImages();
    //load spritesheets
    this.loadSpriteSheets();
    //load audio
    this.loadAudio();
    //load tilemap
    this.loadTileMap();
  }

  loadImages() {
    this.load.image("button1", "assets/images/ui/blue_button01.png"); //load image but no animation can be added
    this.load.image("button2", "assets/images/ui/blue_button02.png");
    //load tileset image
    this.load.image("background", "assets/level/background-extruded.png");
  }

  loadSpriteSheets() {
    //can add animation to sprites
    this.load.spritesheet("items", "assets/images/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("monsters", "assets/images/monsters.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("mainCharacter", "assets/images/spear-warrior.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  loadAudio() {
    this.load.audio("goldSound", ["assets/audio/Pickup.wav"]);
    this.load.audio("enemyDeath", ["assets/audio/EnemyDeath.wav"]);
    this.load.audio("playerAttack", ["assets/audio/PlayerAttack.wav"]);
    this.load.audio("playerDamage", ["assets/audio/PlayerDamage.wav"]);
    this.load.audio("playerDeath", ["assets/audio/PlayerDeath.wav"]);
  }

  loadTileMap() {
    //map maded with tiled in JSON
    this.load.tilemapTiledJSON("map", "assets/level/nicks_large_level.json");
  }

  create() {
    this.scene.start("Game");
  }
}
