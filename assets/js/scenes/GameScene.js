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
    this.createGroups();
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

  createGroups() {
    // create a chest group
    this.chests = this.physics.add.group();
  }

  spawnChest(chestObject) {
    let chest = this.chests.getFirstDead();
    if (!chest) {
      const chest = new Chest(
        this,
        chestObject.x * 2,
        chestObject.y * 2,
        "items",
        0,
        chestObject.gold,
        chestObject.id
      );
      //add chest to group
      this.chests.add(chest);
    } else {
      chest.coins = chestObject.gold;
      chest.id = chestObject.id;
      chest.setPosition(chestObject.x * 2, chestObject.y * 2);
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
    this.events.emit("pickUpChest", chest.id);
  }

  createMap() {
    this.map = new Map(this, "map", "background", "background", "blocked");
  }

  createGameManager() {
    this.events.on("spawnPlayer", (location) => {
      this.createPlayer(location);
      this.addCollisions();
    });

    this.events.on("chestSpawned", (chest) => {
      this.spawnChest(chest);
    });

    this.gameManager = new GameManager(this, this.map.map.objects);
    this.gameManager.setup();
  }
}
