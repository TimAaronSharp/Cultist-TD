

//gameData will be what's stored in the database. We will need to call down the data for the appropriate level
// var gameData = {
//     "level": {
//         "levelNumber": 1,
//         "name": "The fall of rivendale",
//         "startingCurrency": 400,
//         "passiveCurrency": 10,
//         "map": {
//             "height": 24,
//             "layers": [
//                 {
//                     "data": [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 31, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 3, 3, 3, 3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 32, 4, 4, 4, 31, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 15, 14, 14, 14, 16, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 18, 18, 18, 18, 18, 18, 18, 18, 32, 4, 4, 4, 31, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 34, 34, 34, 34, 34, 34, 13, 34, 34, 34, 34, 34, 34, 34, 34, 34, 4, 4, 4, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 4, 4, 4, 4, 4, 4, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 33, 33, 33, 33, 33, 33, 12, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 39, 2, 19, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 39, 2, 19, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 9, 9, 9, 9, 9, 2, 2, 19, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 19, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 18, 18, 18, 18, 18, 18, 18, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 32, 4, 4, 4, 4, 4],
//                     "height": 24,
//                     "name": "Ground",
//                     "opacity": 1,
//                     "type": "tilelayer",
//                     "visible": true,
//                     "width": 32,
//                     "x": 0,
//                     "y": 0
//                 }],
//             "nextobjectid": 1,
//             "orientation": "orthogonal",
//             "renderorder": "left-down",
//             "tiledversion": "1.0.3",
//             "tileheight": 32,
//             "tilesets": [
//                 {
//                     "columns": 10,
//                     "firstgid": 1,
//                     "image": "tiles.bmp",
//                     "imageheight": 132,
//                     "imagewidth": 330,
//                     "margin": 0,
//                     "name": "tiles",
//                     "spacing": 1,
//                     "tilecount": 40,
//                     "tileheight": 32,
//                     "tileproperties":
//                         {
//                             "3":
//                                 {
//                                     "canBuild": false
//                                 }
//                         },
//                     "tilepropertytypes":
//                         {
//                             "3":
//                                 {
//                                     "canBuild": "bool"
//                                 }
//                         },
//                     "tilewidth": 32
//                 }],
//             "tilewidth": 32,
//             "type": "map",
//             "version": 1,
//             "width": 32
//         },
//         "mapKey": "level1",
//         "tilesetImage": "assets/images/tiles.bmp",
//         "tilesetImageName": "tiles",
//         "tilesetImageKey": "tiles",
//         "tilemapLayer": "Ground",
//         "buildableTileId": 3,
//         "playerLevelHealth": 3,
//         "enemies": [
//             {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 0,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 0,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 0,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 0,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 0,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 0,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 1,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 1,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 1,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 1,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 1,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 1,
//                 "currencyValue": 10
//             }, {
//                 "type": "star",
//                 "health": 100,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/star.png",
//                 "wave": 1,
//                 "currencyValue": 10
//             }, {
//                 "type": "fireball",
//                 "health": 200,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/fireball_1.png",
//                 "wave": 2,
//                 "currencyValue": 20
//             }, {
//                 "type": "fireball",
//                 "health": 200,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/fireball_1.png",
//                 "wave": 2,
//                 "currencyValue": 20
//             }, {
//                 "type": "fireball",
//                 "health": 200,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/fireball_1.png",
//                 "wave": 2,
//                 "currencyValue": 20
//             }, {
//                 "type": "fireball",
//                 "health": 200,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/fireball_1.png",
//                 "wave": 2,
//                 "currencyValue": 20
//             }, {
//                 "type": "fireball",
//                 "health": 200,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/fireball_1.png",
//                 "wave": 2,
//                 "currencyValue": 20
//             }, {
//                 "type": "fireball",
//                 "health": 200,
//                 "playerDamageValue": 1,
//                 "sprite": "assets/images/fireball_1.png",
//                 "wave": 2,
//                 "currencyValue": 20
//             }],

//         "towers": [{
//             "type": "tesla",
//             "bullet": "bullet",
//             "bulletDamage": 50,
//             "fireRate": 2000,
//             "cost": 100,
//             "buildTime": 120,
//             "bulletSprite": "assets/images/bullet.png",
//             "sprite": "assets/images/Tesla-Orb-Anim.gif"
//         }],
//         "points": {
//             "x": [0, 110, 220, 220, 220, 220, 330, 440, 550, 660, 770, 880, 990, 1100],
//             "y": [700, 700, 700, 590, 480, 380, 380, 380, 380, 380, 380, 380, 380, 380]
//         },
//         "spawnRate": 20
//     }
// }



var map, layer, selectedTile, winLoseText, pauseText, gameData
var gameOver = false
var gameClock = 0;
var currentTileProperties = ''
var numOfTowers = 1
var activeTowerType = 0
var gameState = {}

var gameState = {
    spawnableEnemies: [], //spawnableEnemies is where the enemies from the database will be stored when they first get pulled down. Shifted out when spawned.
    activeEnemies: [], //activeEnemies are the enemies that have spawned and are still in play. Spliced out when killed or make it to the player.
    killedEnemies: [], //killedEnemies - enemies will be pushed here when killed.
    successfulEnemies: [], //successfulEnemies - enemies will be pushed here when they make it to the player and are no longer in play.
    playerHealth: 0,
    enemiesOutOfPlay: 0,
    wallet: 0
}
//gameState is where we'll locally keep the data that we pulled down from the database and manipulate it here.

var PhaserGame = function (game) {
    this.bmd = null;
    this.path = [];


    //console.log(gameData)
};
PhaserGame.prototype = {

    init: function (gameDataParam) {
        gameData = gameDataParam
        this.game.renderer.renderSession.roundPixels = true; //currently not in use for linear interpolation. Might be necessary for other types.
    },
    //preload - function that preloads assets before the game starts.
    preload: function () {
        gameState = {
            spawnableEnemies: [], //spawnableEnemies is where the enemies from the database will be stored when they first get pulled down. Shifted out when spawned.
            activeEnemies: [], //activeEnemies are the enemies that have spawned and are still in play. Spliced out when killed or make it to the player.
            killedEnemies: [], //killedEnemies - enemies will be pushed here when killed.
            successfulEnemies: [], //successfulEnemies - enemies will be pushed here when they make it to the player and are no longer in play.
            playerHealth: gameData.level.playerLevelHealth,
            enemiesOutOfPlay: 0,
            wallet: gameData.level.startingCurrency
        }
        for (let i = 0; i < gameData.level.towers.length; i++) {
            const tower = gameData.level.towers[i];
            game.load.image(tower.type, tower.sprite)
            game.load.image(tower.bullet, tower.bulletSprite)
        }
        // game.load.image(gameData.level.towers[0].bullet, gameData.level.towers[0].bulletSprite)
        // game.load.image('bullet', 'assets/images/bullet.png')
        game.load.tilemap(gameData.level.mapKey, null, gameData.level.map, Phaser.Tilemap.TILED_JSON);
        game.load.image(gameData.level.tilesetImageKey, gameData.level.tilesetImage);

        for (let i = 0; i < gameData.level.enemies.length; i++) {
            const enemy = gameData.level.enemies[i];

            game.load.spritesheet(enemy.type, enemy.sprite, 32, 36, 12)
        }
    },

    //create - function that creates the game world and everything in it.
    create: function () {
        this.game.scale.pageAlignHorizontally = true; this.game.scale.pageAlignVertically = true; this.game.scale.refresh();

        game.physics.startSystem(Phaser.Physics.ARCADE) //starts the physics system.
        //bmd code allows for the plot to draw the plot points if you don't have the map loaded. Useful when making paths and for debugging.
        this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        this.bmd.addToWorld();

        this.stage.backgroundColor = '#000000';
        map = game.add.tilemap(gameData.level.mapKey);
        map.addTilesetImage(gameData.level.tilesetImageName, gameData.level.tilesetImageKey);
        layer = map.createLayer(gameData.level.tilemapLayer);
        layer.resizeWorld();

        //create selected tile box graphic
        selectedTile = game.add.graphics(); //creates an empty graphics object.
        selectedTile.lineStyle(2, 0xffffff, 1); //sets line style - width, color, opacity.
        selectedTile.drawRect(0, 0, 32, 32); //draws a 32px rectangle with the above line style.

        game.input.addMoveCallback(this.moveTileCursor, this); //runs this callback everytime you move the cursor.

        game.input.onDown.add(this.placeTower, this)

        activeEnemiesGroup = game.add.group();
        activeEnemiesGroup.enableBody = true;
        activeEnemiesGroup.physicsBodyType = Phaser.Physics.ARCADE
        game.physics.enable(activeEnemiesGroup, Phaser.Physics.ARCADE)

        towers = game.add.group();

        //lookup how to kill sprites when they leave visible world bounds
        pellets = game.add.group();
        pellets.enableBody = true;
        pellets.physicsBodyType = Phaser.Physics.ARCADE
        pellets.setAll('anchor.x', 0.5)
        pellets.setAll('anchor.y', 0.5)
        game.physics.enable(pellets, Phaser.Physics.ARCADE)

        teslaAoe = game.add.group();
        teslaAoe.enableBody = true;
        teslaAoe.physicsBodyType = Phaser.Physics.ARCADE
        teslaAoe.setAll('body.setCircle', 48)
        teslaAoe.setAll('anchor.x', 0.5)
        teslaAoe.setAll('anchor.y', 0.5)
        game.physics.enable(teslaAoe, Phaser.Physics.ARCADE)

        //text

        // winLose
        winLoseText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '100px Arial', fill: '#ffffff' });
        winLoseText.anchor.setTo(0.5, 0.5);
        winLoseText.visible = false;

        //pause
        pauseText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '50px Arial', fill: '#ffffff' });
        pauseText.anchor.setTo(0.5, 0.5);
        pauseText.visible = false;

        //buttons
        pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        oneButton = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
        twoButton = game.input.keyboard.addKey(Phaser.Keyboard.TWO)
        threeButton = game.input.keyboard.addKey(Phaser.Keyboard.THREE)

        pauseButton.onDown.add(this.togglePause);
        oneButton.onDown.add(this.changeActiveTowerType, this, null, 0);
        twoButton.onDown.add(this.changeActiveTowerType, this, null, 1);
        threeButton.onDown.add(this.changeActiveTowerType, this, null, 2);

        this.generateEnemies()
        this.plot();
    },
    changeActiveTowerType(key, num) {
        console.log(num)
        // console.log("Bur Kek")
        if (num > gameData.level.towers.length - 1) {
            // activeTowerType = gameData.level.towers[activeTowerType]
            console.log("Tower number too high bro")
        } else {
            activeTowerType = num;
        }
    },
    //Generates enemies and their sprites from gamedata and pushes them into the spawnableEnemies array.
    generateEnemies() {
        for (let i = 0; i < gameData.level.enemies.length; i++) {
            const enemy = gameData.level.enemies[i];
            enemy.spawnTime = gameData.level.spawnRate * (i + 1) + (enemy.wave * 600)
            enemy.gameObject = this.add.sprite(0, 0, enemy.type)
            var walk = enemy.gameObject.animations.add('walk')
            enemy.gameObject.animations.play('walk', 30, true);
            enemy.gameObject.originalIndex = i
            enemy.gameObject.health = enemy.health
            enemy.gameObject.currencyValue = enemy.currencyValue
            enemy.gameObject.anchor.set(1, 1)
            gameState.spawnableEnemies.push(enemy)
        }
    },
    //gets tile coordinate you are pointing at and attempts to place tower. Will use to check where you can build towers.
    placeTower() {
        var x = layer.getTileX(game.input.activePointer.worldX);
        var y = layer.getTileY(game.input.activePointer.worldY);

        var tile = map.getTile(x, y, layer);
        //if else if else - checks to see if the tile already has a tower, and if the tile index(id/type) can be built on.
        if (gameState.wallet >= gameData.level.towers[activeTowerType].cost) {
            //if else if else - checks to see if the tile already has a tower, and if the tile index(id/type) can be built on.
            if (tile.properties.hasTower) {
                console.log('Already have a tower bro!')
            } else if (tile.index != gameData.level.buildableTileId) { //This is hardcoded for the current tileset. Stretch goal: 
                console.log("no go bro")
            } else {
                tile.properties.hasTower = true
                new Tower(tile.x, tile.y, gameData.level.towers[activeTowerType].type, gameData.level.towers[activeTowerType].bulletType)
                numOfTowers++
                gameState.wallet -= gameData.level.towers[activeTowerType].cost
                // game.add.sprite(tile.x * 32, tile.y * 32, gameData.level.towers[0].type)
            }
        } else {
            console.log("Not enough Minerals!")
        }
        currentTileProperties = JSON.stringify(tile.properties)
    },
    moveTileCursor() {
        selectedTile.x = layer.getTileX(game.input.activePointer.worldX) * 32;
        selectedTile.y = layer.getTileY(game.input.activePointer.worldY) * 32;
    },
    //plot - function that plots out the routes between the points defined in the "points" array.
    plot: function () {
        this.bmd.clear();
        var count = 0

        var x = 1 / game.width; //x becomes a number that is a fraction of the game width. ie) 1 / 1024 becomes 0.0009765625, which is 1/1024th of 1024.
        for (let i = 0; i <= 1; i += x) {

            //Does the math and draws out the routes between the points. First param is the input array of values to interpolate between. Second param is the percentage of interpolation, between 0 and 1. Each time it is run it returns the interpolated value of the point in the array at the percentage(i). Not sure if I understand completely, may have to study it more.
            var px = this.math.linearInterpolation(gameData.level.points.x, i);
            var py = this.math.linearInterpolation(gameData.level.points.y, i);

            this.path.push({ x: px, y: py })
            //draws the path between the points.
            this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');

        }

        //draws red rectangles at the x:y points for better visibility (can't be seen if map is loaded).
        for (var p = 0; p < gameData.level.points.x.length; p++) {
            this.bmd.rect(gameData.level.points.x[p] - 3, gameData.level.points.y[p] - 3, 6, 6, 'rgba(255, 0, 0, 1)');
        }
    },
    update: function () {
        gameClock++;
        this.handleEnemies()
        this.bulletOverlap()
        towers.forEach(function (tower) {
            tower.aquireTarget(tower)
        });
        if (gameState.enemiesOutOfPlay == gameData.level.enemies.length && !gameOver) {
            winLoseText.text = "A winner is YOU!"
            winLoseText.visible = true;
            // console.log(winLoseText)
        }
        if (gameClock % 300 == 0)
            gameState.wallet += gameData.level.passiveCurrency;
    },
    togglePause() {
        game.paused = !game.paused
        if (game.paused) {
            pauseText.text = "Press SPACE to resume"
            pauseText.visible = true;
        } else {
            pauseText.visible = false;
        }
    },
    render() {
        game.debug.text("Monies: " + gameState.wallet, 500, 50)
    },
    //function that runs these functions
    handleEnemies() {
        this.checkEnemySpawn()
        this.moveEnemies()
    },
    bulletOverlap() {
        game.physics.arcade.overlap(bullets, activeEnemiesGroup, this.bulletOverlapHandler, null, this)

    },
    bulletOverlapHandler(bullet, shotEnemy) {
        // console.log(bullets, thisEnemy)
        bullet.kill()
        shotEnemy.health -= gameData.level.towers[activeTowerType].bulletDamage;
        // console.log(shotEnemy.health)
        if (shotEnemy.health <= 0) {
            gameState.killedEnemies.push(shotEnemy)
            // gameState.killedEnemies.push(gameState.activeEnemies.splice(shotEnemy.originalIndex, 1)[0])
            shotEnemy.kill()
            gameState.wallet += shotEnemy.currencyValue
            gameState.enemiesOutOfPlay++;
            console.log(gameState.enemiesOutOfPlay)
            console.log(gameData.level.enemies.length)
        }
    },
    //checkEnemySpawn - checks if there is still an enemy in the spawnableEnemies array and checks the current game time vs the spawn time for the enemy.
    checkEnemySpawn() {
        var nextEnemy = gameState.spawnableEnemies[0]
        // console.log('UPDATE:', game.time.now, gameState.spawnableEnemies[0])
        if (nextEnemy && gameClock >= nextEnemy.spawnTime) {
            this.spawnEnemy(nextEnemy)
        }
    },
    spawnEnemy(enemy) {

        enemy.i = 0
        gameState.spawnableEnemies.shift()
        gameState.activeEnemies.push(enemy)
        activeEnemiesGroup.add(enemy.gameObject) //currently testing game object group. Delete if not utilized.
        // console.log(activeEnemiesGroup)
    },
    moveEnemies() {
        for (let i = 0; i < gameState.activeEnemies.length; i++) {
            const enemy = gameState.activeEnemies[i];
            enemy.gameObject.x = this.path[enemy.i].x
            enemy.gameObject.y = this.path[enemy.i].y
            enemy.i++

            if (enemy.i >= this.path.length - 1) { // double check this
                this.enemyHitPlayer(enemy)
            }
        }
    },
    enemyHitPlayer(enemy) {
        if (enemy.gameObject.alive) {
            gameState.playerHealth -= enemy.playerDamageValue
            console.log("Player health: " + gameState.playerHealth)
            gameState.enemiesOutOfPlay++;
            console.log(gameState.enemiesOutOfPlay)
        }
        gameState.successfulEnemies.push(gameState.activeEnemies.splice(gameState.activeEnemies.indexOf(enemy), 1)[0])
        //deduct player healh
        enemy.gameObject.kill()
        console.log(gameState.enemiesOutOfPlay)
        console.log(gameData.level.enemies.length)
        if (gameState.playerHealth <= 0) {
            gameOver = true
            console.log(gameOver)
            winLoseText.text = "Game Over";
            winLoseText.visible = true;
        }
    }
};

// game.state.add('Game', PhaserGame, true);