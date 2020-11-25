class Map {
  constructor(scene, key, tileSetName, bgLayerName, blockedLayerName) {
    this.scene = scene; //scene this map belongs to
    this.key = key; //tiled json file key name
    this.tileSetName = tileSetName; //tiled tileset image key name
    this.bgLayerName = bgLayerName; // the name of the layer created in tiled for the map background
    this.blockedLayerName = blockedLayerName; // the name of the layer created in tiled for the map blockedLayerName
    this.createMap();
  }

  createMap() {
    //create the tile MAP
    this.map = this.scene.make.tilemap({ key: this.key });

    //add the tileset image to  map
    this.tiles = this.map.addTilesetImage(
      this.tileSetName,
      this.bgLayerName,
      32,
      32,
      1,
      2
    );
    //create background image
    this.backgroundLayer = this.map.createStaticLayer(
      this.bgLayerName,
      this.tiles,
      0,
      0
    );
    this.backgroundLayer.setScale(2);

    //create blocked layer
    this.blockedLayer = this.map.createStaticLayer(
      this.blockedLayerName,
      this.tiles,
      0,
      0
    );
    this.blockedLayer.setScale(2);
    this.blockedLayer.setCollisionByExclusion([-1]);

    //update world bounds
    this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
    this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;

    //limit camera bounds to size of map
    this.scene.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels * 2,
      this.map.heightInPixels * 2
    );
  }
}
