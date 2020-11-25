let config = {
  type: Phaser.Auto, //webGL or canvas
  width: 800,
  height: 600,
  scene: [BootScene, TitleScene, GameScene, UiScene],
  physics: {
    //physics appllies a physics engine
    default: "arcade", //'arcade', 'matter.js', or 'impact physics'
    arcade: {
      debug: true, //turns on object detection and movement lines
      gravity: {
        y: 0, //adds gravity > 0 to the game in the y direction
      },
    },
  },
  pixelArt: true,
  roundPixels: true,
};

let game = new Phaser.Game(config);
