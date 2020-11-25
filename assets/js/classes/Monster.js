class Monster extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame, id, health, maxHealth) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.id = id;
    this.health = health;
    this.maxHealth = maxHealth;

    //enable physics
    this.scene.physics.world.enable(this);

    //set immovable if another object collides with monster
    this.setImmovable(false);

    //scale monster
    this.setScale(1);

    //collide with world bounds
    this.setCollideWorldBounds(true);

    //add monster to existing scene
    this.scene.add.existing(this);

    //create animations
    //this.createAnims();
  }

  createAnims() {
    //TODO: create animations for each monster
  }

  makeActive() {
    this.setActive(true);
    this.setVisible(true);
    this.body.checkCollision.none = false;
  }

  makeInactive() {
    this.setActive(false);
    this.setVisible(false);
    this.body.checkCollision.none = true;
  }
}
