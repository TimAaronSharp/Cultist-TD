var game;

// console.log(app)
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game-area');
var baseUrl = 'http://localhost:3000/api/'
var gameDataParam = {
    "level": {
        "levelNumber": 1,
        "name": "The fall of rivendale",
        "startingCurrency": 400,
        "passiveCurrency": 10,
        "map": {
            "height": 24,
            "layers": [
                {
                    "data": [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 31, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 32, 4, 4, 4, 31, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 15, 14, 14, 14, 16, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 18, 18, 18, 18, 18, 18, 18, 18, 32, 4, 4, 4, 31, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 34, 34, 34, 34, 34, 34, 13, 34, 34, 34, 34, 34, 34, 34, 34, 4, 4, 4, 4, 31, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 4, 4, 4, 4, 4, 4, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 33, 33, 33, 33, 33, 33, 12, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 39, 2, 19, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 39, 2, 19, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 9, 9, 9, 9, 9, 2, 2, 19, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 19, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 18, 18, 18, 18, 18, 18, 18, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4],
                    "height": 24,
                    "name": "Ground",
                    "opacity": 1,
                    "type": "tilelayer",
                    "visible": true,
                    "width": 32,
                    "x": 0,
                    "y": 0
                }],
            "nextobjectid": 1,
            "orientation": "orthogonal",
            "renderorder": "left-down",
            "tiledversion": "1.0.3",
            "tileheight": 32,
            "tilesets": [
                {
                    "columns": 10,
                    "firstgid": 1,
                    "image": "..\/..\/..\/..\/test\/path-test\/assets\/maps\/tiles.bmp",
                    "imageheight": 132,
                    "imagewidth": 330,
                    "margin": 0,
                    "name": "tiles",
                    "spacing": 1,
                    "tilecount": 40,
                    "tileheight": 32,
                    "tileproperties":
                        {
                            "3":
                                {
                                    "canBuild": false
                                }
                        },
                    "tilepropertytypes":
                        {
                            "3":
                                {
                                    "canBuild": "bool"
                                }
                        },
                    "tilewidth": 32
                }],
            "tilewidth": 32,
            "type": "map",
            "version": 1,
            "width": 32
        },
        "mapKey": "level1",
        "tilesetImage": "assets/images/tiles.bmp",
        "tilesetImageName": "tiles",
        "tilesetImageKey": "tiles",
        "tilemapLayer": "Ground",
        "buildableTileId": 3,
        "playerLevelHealth": 3,
        "enemies": [
            {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 0,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 0,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 0,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 0,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 0,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 0,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 1,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 1,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 1,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 1,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 1,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 1,
                "currencyValue": 10
            }, {
                "type": "star",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "wave": 1,
                "currencyValue": 10
            }, {
                "type": "fireball",
                "health": 200,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "wave": 2,
                "currencyValue": 20
            }, {
                "type": "fireball",
                "health": 200,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "wave": 2,
                "currencyValue": 20
            }, {
                "type": "fireball",
                "health": 200,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "wave": 2,
                "currencyValue": 20
            }, {
                "type": "fireball",
                "health": 200,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "wave": 2,
                "currencyValue": 20
            }, {
                "type": "fireball",
                "health": 200,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "wave": 2,
                "currencyValue": 20
            }, {
                "type": "fireball",
                "health": 200,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "wave": 2,
                "currencyValue": 20
            }],

        "towers": [{
            "type": "tesla",
            "bullet": "bullet",
            "bulletDamage": 50,
            "fireRate": 2000,
            "cost": 100,
            "buildTime": 120,
            "bulletSprite": "assets/images/bullet.png",
            "sprite": "assets/images/Tesla-Orb-Anim.gif"
        }],
        "points": {
            "x": [0, 110, 220, 220, 220, 220, 330, 440, 550, 660, 770, 880, 990, 1100],
            "y": [700, 700, 700, 590, 480, 380, 380, 380, 380, 380, 380, 380, 380, 380]
        },
        "spawnRate": 20
    },
    "levelNumber": 1
}

game.state.add('Game', PhaserGame);
game.state.start('Game', true, false, gameDataParam)