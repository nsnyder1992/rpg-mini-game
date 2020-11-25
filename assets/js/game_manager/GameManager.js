class GameManager {
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;

    this.spawners = {};
    this.chests = {};

    this.playerLocations = [];
    this.chestLocations = {};
    this.monsterLocations = {};
  }

  setup() {
    this.parseMapData();
    this.setupEventListeners();
    this.setupSpawners();
    this.spawnPlayer();
  }

  parseMapData() {
    this.mapData.forEach((layer) => {
      if (layer.name === "player_locations") {
        layer.objects.forEach((obj) => {
          this.playerLocations.push([obj.x, obj.y]);
        });
      } else if (layer.name === "chest_locations") {
        layer.objects.forEach((obj) => {
          var spawner = getTiledProperty(obj, "spawner");
          if (this.chestLocations[spawner]) {
            this.chestLocations[spawner].push([obj.x, obj.y]);
          } else {
            this.chestLocations[spawner] = [[obj.x, obj.y]];
          }
        });
      } else if (layer.name === "monster_locations") {
        layer.objects.forEach((obj) => {
          var spawner = getTiledProperty(obj, "spawner");
          if (this.monsterLocations[spawner]) {
            this.monsterLocations[spawner].push([obj.x, obj.y]);
          } else {
            this.monsterLocations[spawner] = [[obj.x, obj.y]];
          }
        });
      }
    });
  }

  setupEventListeners() {
    this.scene.events.on("pickUpChest", (chestId) => {
      //update the spawner
      if (this.chests[chestId]) {
        this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
      }
    });
  }

  setupSpawners() {
    //create chest spawners
    Object.keys(this.chestLocations).forEach((key) => {
      const config = {
        spawnerInterval: 3000,
        limit: 3,
        spawnerType: "CHEST",
        id: `chest-${key}`,
      };

      const spawner = new Spawner(
        config,
        this.chestLocations[key],
        this.addChest.bind(this),
        this.deleteChest.bind(this)
      );
      this.spawners[spawner.id] = spawner;
    });
  }

  spawnPlayer() {
    let location = this.playerLocations[
      Math.floor(Math.random() * this.playerLocations.length)
    ];
    this.scene.events.emit("spawnPlayer", location);
  }

  addChest(chestId, chest) {
    this.chests[chestId] = chest;
    this.scene.events.emit("chestSpawned", chest);
  }

  deleteChest(chestId) {
    delete this.chests[chestId];
  }
}
