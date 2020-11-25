Scenes:
-Boot: load assets
-Title: title, play button
-Game: main logic
-UI: display current gold count

Classes:
-Player: creating the player game object, handle the player input
-Chest: creating the chest object, how much gold
-GameManager: parsing json for spawning locations for player, chests and monsters
---Spawner: generating chests and monsters at specific intervals and max number
------ChestModel: how much gold, location, chestId
