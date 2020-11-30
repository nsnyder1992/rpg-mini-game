###README

---

I made this project because I have always wanted to build a Game. So I decided to learn using Zenva Academys phaser.io rpg game development series. So this projects has the backbone of the game developed in the course, but added more complex sprites and animations to my game.

---

##Scenes:
-Boot: load assets
-Title: title, play button
-Game: main logic
-UI: display current gold count

---

##Classes:
-Player: creating the player game object, handle the player input
-Chest: creating the chest object, how much gold
-GameManager: parsing json for spawning locations for player, chests and monsters
    -Spawner: generating chests and monsters at specific intervals and max number
        -ChestModel: how much gold, location, chestId
