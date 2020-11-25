class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene; //the scene this player will be added to
    this.velocity = 125; //velocity when moving our player

    //enable physics
    this.scene.physics.world.enable(this);
    //set immovable if another object collides with our player
    this.setImmovable(false);

    //scale our player
    this.setScale(1);

    //collide with world bounds
    this.setCollideWorldBounds(true);

    //add player to our existing scene
    this.scene.add.existing(this);

    //create animations
    this.createAnims();

    //have camera follow the player
    this.scene.cameras.main.startFollow(this);
  }

  update(cursors, altCursors) {
    //define keys for movement
    let down = cursors.down.isDown || altCursors.S.isDown;
    let up = cursors.up.isDown || altCursors.W.isDown;
    let right = cursors.right.isDown || altCursors.D.isDown;
    let left = cursors.left.isDown || altCursors.A.isDown;
    let space = cursors.space.isDown;
    let shift = cursors.shift.isDown;

    //get current direction the player is facing
    let currentAnim = this.anims.getCurrentKey();

    //walking logic
    if (left && up) {
      this.body.setVelocity(-this.velocity, -this.velocity);
      this.anims.play("left", true);
    } else if (left && down) {
      this.body.setVelocity(-this.velocity, this.velocity);
      this.anims.play("left", true);
    } else if (right && up) {
      this.body.setVelocity(this.velocity, -this.velocity);
      this.anims.play("right", true);
    } else if (right && down) {
      this.body.setVelocity(this.velocity, this.velocity);
      this.anims.play("right", true);
    } else if (left) {
      this.body.setVelocity(-this.velocity, 0);
      this.anims.play("left", true);
    } else if (right) {
      this.body.setVelocity(this.velocity, 0);
      this.anims.play("right", true);
    } else if (up) {
      this.body.setVelocity(0, -this.velocity);
      this.anims.play("up", true);
    } else if (down) {
      this.body.setVelocity(0, this.velocity);
      this.anims.play("down", true);
    } else if (space && currentAnim == "up") {
      this.body.setVelocity(0);
      this.anims.chain("spearBack");
      this.anims.stop();
    } else if (space && currentAnim == "left") {
      this.body.setVelocity(0);
      this.anims.chain("spearLeft");
      this.anims.stop();
    } else if (space && currentAnim == "down") {
      this.body.setVelocity(0);
      this.anims.chain("spearFront");
      this.anims.stop();
    } else if (space && currentAnim == "right") {
      this.body.setVelocity(0);
      this.anims.chain("spearRight");
      this.anims.stop();
    } else if (space && currentAnim == undefined) {
      this.anims.play("spearFront", true);
    } else if (space) {
      this.anims.play(currentAnim, true);
    } else {
      this.body.setVelocity(0);
      this.anims.stop();
    }
  }

  createAnims() {
    //movement
    this.createWalkingAnims();
    //attacks
    this.createSpearAttack();
  }

  createWalkingAnims() {
    //create Walking movement
    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 117,
        end: 125,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "turn",
      frames: [{ key: "mainCharacter", frame: 240 }],
      frameRate: 10,
    });

    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 143,
        end: 151,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "up",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 104,
        end: 112,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "down",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 130,
        end: 138,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createSpearAttack() {
    //create spear attack in all for directions
    this.scene.anims.create({
      key: "spearBack",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 52,
        end: 59,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "spearLeft",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 65,
        end: 72,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "spearFront",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 78,
        end: 85,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "spearRight",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 91,
        end: 98,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createSwordAttack() {
    //create oversized weapon attacks
    let swordBack = this.scene.anims.create({
      key: "swordBack",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 529,
        end: 544,
      }),
      frameRate: 10,
      repeat: -1,
    });

    let swordLeft = this.scene.anims.create({
      key: "swordLeft",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 601,
        end: 616,
      }),
      frameRate: 10,
      repeat: -1,
    });

    let swordFront = this.scene.anims.create({
      key: "swordFront",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 673,
        end: 688,
      }),
      frameRate: 10,
      repeat: -1,
    });

    let swordRight = this.scene.anims.create({
      key: "swordRight",
      frames: this.scene.anims.generateFrameNumbers("mainCharacter", {
        start: 745,
        end: 760,
      }),
      frameRate: 10,
      repeat: -1,
    });

    removeFrames(swordBack, 3);
    removeFrames(swordLeft, 3);
    removeFrames(swordFront, 3);
    removeFrames(swordRight, 3);

    function removeFrames(anim, interval) {
      let remove = [];
      for (let i in anim.frames) {
        i % interval != 0 ? remove.push(anim.getFrameAt(i)) : remove;
      }

      for (let frame of remove) {
        anim.removeFrame(frame);
      }
      return anim;
    }
  }
}
