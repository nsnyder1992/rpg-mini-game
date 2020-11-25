class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.scene.launch("Ui"); //use launch to run scenes in parallel
    this.score = 0;
  }

  create() {
    this.createMap();
    this.createAudio();
    this.createChests();
    this.createInput();

    this.createGameManager();
  }

  update() {
    if (this.player) this.player.update(this.cursors, this.altCursors);
  }

  createAudio() {
    this.goldPickupAudio = this.sound.add("goldSound", {
      loop: false,
      volume: 0.2,
    });
  }

  createPlayer(location) {
    this.player = new Player(
      this,
      location[0] * 2,
      location[1] * 2,
      "mainCharacter",
      130
    );
  }

  createChests() {
    //create a chest group
    this.chests = this.physics.add.group();
    //create chest positions array
    this.chestPositions = [
      [100, 100],
      [200, 200],
      [300, 300],
      [400, 400],
      [500, 500],
    ];
    //specify the max number of chest we can have
    this.maxNumberOfChests = 3;
    //spawn a chest
    for (let i = 0; i < this.maxNumberOfChests; i++) {
      this.spawnChest();
    }
  }

  spawnChest() {
    const location = this.chestPositions[
      Math.floor(Math.random() * this.chestPositions.length)
    ];

    let chest = this.chests.getFirstDead();
    if (!chest) {
      const chest = new Chest(this, location[0], location[1], "items", 0);
      //add chest to group
      this.chests.add(chest);
    } else {
      chest.setPosition(location[0], location[1]);
      chest.makeActive();
    }
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.altCursors = this.input.keyboard.addKeys("W,S,A,D");
  }

  addCollisions() {
    //check for collision between the player and the tiled blocked layer
    this.physics.add.collider(this.player, this.map.blockedLayer);
    //check for collision between the player and the chests
    this.physics.add.overlap(
      this.player,
      this.chests,
      this.collectChest,
      null,
      this
    );
  }

  collectChest(player, chest) {
    //play gold pickup sound
    this.goldPickupAudio.play();
    //update score
    this.score += chest.coins;
    //update score in the ui
    this.events.emit("updateScore", this.score);
    //make chest game object inactive
    chest.makeInactive();
    //spawn a new chest
    this.time.delayedCall(1000, this.spawnChest, [], this);
  }

  createMap() {
    this.map = new Map(this, "map", "background", "background", "blocked");
  }

  createGameManager() {
    this.events.on("spawnPlayer", (location) => {
      this.createPlayer(location);
      this.addCollisions();
    });
    this.gameManager = new GameManager(this, this.map.map.objects);
    this.gameManager.setup();
  }
}
