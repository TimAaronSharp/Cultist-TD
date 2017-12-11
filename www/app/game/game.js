var game = new Phaser.Game(1024, 768, Phaser.AUTO, '');

//gameData will be what's stored in the database. We will need to call down the data for the appropriate level
var gameData = {
    level: {
        name: 'The fall of rivendale',
        map: 'assets/maps/level2.json',
        mapKey: 'level2',
        tilesetImage: 'assets/images/tiles.bmp',
        tilesetImageName: 'level2-tileset',
        tilesetImageKey: 'tiles',
        tilemapLayer: 'Ground',
        buildableTileId: 3,
        enemies: [{ //will need to make sure the schema has all the properties that we are adding below, such as spawnTime and gameObject.
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png'
        }, {
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png'
        }, {
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png'
        }, {
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png'
        }, {
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png'
        }, {
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png'
        }],
        towers: [{
            type: 'tesla',
            sprite: 'assets/images/Tesla-Orb-Anim.gif'
        }],
        // 0,32,64,96,128,160,192,224,256,288,320,352,384,416,448,480,512,544,576,608,640,672,704,736,768,800,832,864,896,928,960,992,1024,1056
        //points - an array that has the path for the enemies to follow. Coordinates in pixels from the top left of the screen.

        points: {
            'x': [0, 110, 220, 220, 220, 220, 330, 440, 550, 660, 770, 880, 990, 1100],
            'y': [700, 700, 700, 590, 480, 380, 380, 380, 380, 380, 380, 380, 380, 380]
        },
        // points: {

        //     'x': [0, 64, 100, 192, 256, 256, 256, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040],
        //     'y': [700, 700, 700, 620, 540, 460, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380]
        // },
        spawnRate: 1000,
        // spawnCountdown: 1000
    }
}

var map, layer, selectedTile
var currentTileProperties = ''
//gameState is where we'll locally keep the data that we pulled down from the database and manipulate it here.
var gameState = {
    spawnableEnemies: [], //spawnableEnemies is where the enemies from the database will be stored when they first get pulled down. Shifted out when spawned.
    activeEnemies: [], //activeEnemies are the enemies that have spawned and are still in play. Spliced out when killed or make it to the player.
    killedEnemies: [], //killedEnemies - enemies will be pushed here when killed.
    successfulEnemies: [], //successfulEnemies - enemies will be pushed here when they make it to the player and are no longer in play.
    enemySprites: []
    // spawnCountdown: 1000 spawnCountdown - works with spawnRate from gameData from database to determine the rate enemies spawn.
}

var PhaserGame = function () {

    this.bmd = null;

    // this.map = null ;
    // this.layer = null;
    this.path = [];

};

PhaserGame.prototype = {
    init: function () {
        this.game.renderer.renderSession.roundPixels = true; //currently not in use for linear interpolation. Might be necessary for other types.
        // this.stage.backgroundColor = '#204090';

    },
    //preload - function that preloads assets before the game starts.
    preload: function () {

        // this.load.tilemap('map', 'assets/pathing-map-test.json', null, Phaser.Tilemap.TILED_JSON);
        // this.load.image('tiles', 'assets/tiles.bmp')
        // game.load.image('map', 'assets/maps/pathing-map-test.png')
        for (let i = 0; i < gameData.level.towers.length; i++) {
            const tower = gameData.level.towers[i];
            game.load.image(tower.type, tower.sprite)

        }
        game.load.image()
        game.load.tilemap(gameData.level.mapKey, gameData.level.map, null, Phaser.Tilemap.TILED_JSON);
        game.load.image(gameData.level.tilesetImageKey, gameData.level.tilesetImage);
        for (let i = 0; i < gameData.level.enemies.length; i++) {
            const enemy = gameData.level.enemies[i];

            game.load.image(enemy.type, enemy.sprite)
            // game.load.image('star', 'assets/images/star.png')
        }


        // this.load.bitmapFont('shmupfont', 'assets/shmupfont.png', 'assets/shmupfont.xml');

    },
    //create - function that creates the game world and everything in it.
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE) //starts the physics system.
        //bmd code allows for the plot to draw the plot points if you don't have the map loaded. Useful when making paths and for debugging.
        this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        this.bmd.addToWorld();

        activeEnemiesGroup = game.add.group();
        activeEnemiesGroup.enableBody = true;
        activeEnemiesGroup.physicsBodyType = Phaser.Physics.ARCADE


        this.stage.backgroundColor = '#787878';
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
        // this.map = this.add.sprite(0, 0, 'map')

        this.generateEnemies()
        this.plot();

        //this for loop would randomize the y points, which we don't want to do, but we can leave it commented for now incase we decide to use it for something?
        // var py = this.points.y;
        // for (let i = 0; i < py.length; i++) {
        //     py[i] = this.rnd.between(32, 432)
        // }
        // this.hint = this.add.bitmapText(8, 444, 'shmupfont', 'Linear', 24);
    },
    //Generates enemies and their sprites from gamedata and pushes them into the spawnableEnemies array.
    generateEnemies() {
        for (let i = 0; i < gameData.level.enemies.length; i++) {
            const enemy = gameData.level.enemies[i];
            enemy.spawnTime = gameData.level.spawnRate * (i + 1)
            enemy.gameObject = this.add.sprite(0, 0, enemy.type)
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
        if (tile.properties.hasTower) {
            console.log('Already have a tower bro!')
        } else if (tile.index != gameData.level.buildableTileId) { //This is hardcoded for the current tileset. Stretch goal: 
            console.log("no go bro")
        } else {
            tile.properties.hasTower = true
            game.add.sprite(tile.x * 32, tile.y * 32, gameData.level.towers[0].type)
        }

        currentTileProperties = JSON.stringify(tile.properties)
        // console.log(tile.properties)
        // console.log(tile)

    },

    moveTileCursor() {
        selectedTile.x = layer.getTileX(game.input.activePointer.worldX) * 32;
        selectedTile.y = layer.getTileY(game.input.activePointer.worldY) * 32;

        // game.debug.text("hi everybody!", 800, 100);
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
            // count++
            // console.log(count, 'x: ', px, 'y: ', py)
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
        this.handleEnemies()
    },
    render() {
        game.debug.text("Tile Properties: " + currentTileProperties, 500, 50)
    },
    //function that runs these functions
    handleEnemies() {
        this.checkEnemySpawn()
        this.moveEnemies()
    },
    //checkEnemySpawn - checks if there is still an enemy in the spawnableEnemies array and checks the current game time vs the spawn time for the enemy.
    checkEnemySpawn() {
        var nextEnemy = gameState.spawnableEnemies[0]
        // console.log('UPDATE:', game.time.now, gameState.spawnableEnemies[0])
        if (nextEnemy && game.time.now >= nextEnemy.spawnTime) {
            this.spawnEnemy(nextEnemy)
        }
    },
    spawnEnemy(enemy) {
        
        enemy.i = 0
        gameState.spawnableEnemies.shift()
        gameState.activeEnemies.push(enemy)
        // activeEnemiesGroup.add(enemy.gameObject) currently testing game object group. Delete if not utilized.
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
        gameState.activeEnemies.splice(gameState.activeEnemies.indexOf(enemy), 1)
        gameState.successfulEnemies.push(enemy)
        //deduct player healh
        enemy.gameObject.kill()
    }

};

game.state.add('Game', PhaserGame, true);