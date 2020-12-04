# Mini-Game
---

I made this project because I have always wanted to build a game. So I decided to learn using Zenva Academys phaser.io rpg game development series. So this project has some of the backbone of the game developed in the course, but I added more complex sprites and animations to my game.

---

### Scenes:
- Boot: load assets
- Title: title, play button, before the game starts
- Game: main game
- UI: display current gold count

---

### Classes:
- Player: creating the Player game object in the scene and handling the player input, animations, and bounds
- Chest: creating and deleting the Chest object in the scene
- Monster: creating, deleting, and moving the Monster object in the scene, by handling animations, and bounds
- UiButton: 
- Map: creating the diffent layers in the scene. also handles the camera bounds, so the camera stays within the world bounds. Layers include:
    * Background Layer (ground)
    * Blocked Layer (trees, walls, lakes, etc.)

---

### Game Manager
- GameManager: handles all the **behind the scenes** data and manages the communication between the "models" and the "views" 
    - Spawner: generating chests and monsters at specific intervals and max number. It also moves monsters
    - ChestModel: how much gold, location, id
    - MonsterModel: how much gold, location, id, health, maxHealth, attack, random move method and update health method
    - PlayerModel: how much, gold, spawnLocation, id, health, maxHealth, respawn method, and update gold, and health methods
    - utils: place to hold alot of different consts and functions used throughout the program
