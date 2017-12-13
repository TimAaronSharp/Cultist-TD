var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game-area');

//gameData will be what's stored in the database. We will need to call down the data for the appropriate level
var gameData = {
    level: {
        name: 'The fall of rivendale',
        map: 'assets/maps/level1.json',
        mapKey: 'level1',
        tilesetImage: 'assets/images/tiles.bmp',
        tilesetImageName: 'tiles',
        tilesetImageKey: 'tiles',
        tilemapLayer: 'Ground',
        buildableTileId: 3,
        enemies: [{ //will need to make sure the schema has all the properties that we are adding below, such as spawnTime and gameObject.
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png',
            name: 'star 1'
        }, {
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png',
            name: 'star 2'
        },
        {
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png',
            name: 'star 3'
        }, {
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png',
            name: 'star 4'
        }, {
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png',
            name: 'star 5'
        }, {
            type: 'star',
            health: 100,
            sprite: 'assets/images/star.png',
            name: 'star 6'
        }
        ],
        towers: [{
            type: 'tesla',
            bullet: 'bullet',
            fireRate: 2000,
            bulletSprite: 'assets/images/bullet.png',
            sprite: 'assets/images/Tesla-Orb-Anim.gif'
        }],
        // 0,32,64,96,128,160,192,224,256,288,320,352,384,416,448,480,512,544,576,608,640,672,704,736,768,800,832,864,896,928,960,992,1024,1056
        //points - an array that has the path for the enemies to follow. Coordinates in pixels from the top left of the screen.
        points: {
            'x': [0, 110, 220, 220, 220, 220, 330, 440, 550, 660, 770, 880, 990, 1100],
            'y': [700, 700, 700, 590, 480, 380, 380, 380, 380, 380, 380, 380, 380, 380]
        },
        spawnRate: 1000,
    }
}

var map, layer, selectedTile
var currentTileProperties = ''
var numOfTowers = 1
//gameState is where we'll locally keep the data that we pulled down from the database and manipulate it here.
var gameState = {
    spawnableEnemies: [], //spawnableEnemies is where the enemies from the database will be stored when they first get pulled down. Shifted out when spawned.
    activeEnemies: [], //activeEnemies are the enemies that have spawned and are still in play. Spliced out when killed or make it to the player.
    killedEnemies: [], //killedEnemies - enemies will be pushed here when killed.
    successfulEnemies: [], //successfulEnemies - enemies will be pushed here when they make it to the player and are no longer in play.
    enemySprites: []
}

var PhaserGame = function () {
    this.bmd = null;
    this.path = [];
};
PhaserGame.prototype = {

    init: function () {
        this.game.renderer.renderSession.roundPixels = true; //currently not in use for linear interpolation. Might be necessary for other types.
    },
    //preload - function that preloads assets before the game starts.
    preload: function () {
        for (let i = 0; i < gameData.level.towers.length; i++) {
            const tower = gameData.level.towers[i];
            game.load.image(tower.type, tower.sprite)
            // game.load.image(tower.bullet, tower.bulletSprite)
        }
        // game.load.image('bullet', 'assets/images/bullet.png')
        game.load.tilemap(gameData.level.mapKey, gameData.level.map, null, Phaser.Tilemap.TILED_JSON);
        game.load.image(gameData.level.tilesetImageKey, gameData.level.tilesetImage);

        for (let i = 0; i < gameData.level.enemies.length; i++) {
            const enemy = gameData.level.enemies[i];

            game.load.image(enemy.type, enemy.sprite)
        }
    },

    //create - function that creates the game world and everything in it.
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE) //starts the physics system.
        //bmd code allows for the plot to draw the plot points if you don't have the map loaded. Useful when making paths and for debugging.
        this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        this.bmd.addToWorld();

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

        spawnableEnemiesGroup = game.add.group();
        spawnableEnemiesGroup.enableBody = true;
        spawnableEnemiesGroup.physicsBodyType = Phaser.Physics.ARCADE

        activeEnemiesGroup = game.add.group();
        activeEnemiesGroup.enableBody = true;
        activeEnemiesGroup.physicsBodyType = Phaser.Physics.ARCADE
        game.physics.enable(activeEnemiesGroup, Phaser.Physics.ARCADE)

        towers = game.add.group();
        
        // bullets = game.add.group();
        

        // bullets.setAll('position.x', 220)
        // bullets.setAll('position.y', 580)
        // game.physics.enable(bullets, Phaser.Physics.ARCADE)

        // colTest.enableBody = true;
        // colTest.physicsBodyType = Phaser.Physics.ARCADE

        // console.log(colTest)
        this.generateEnemies()
        this.plot();
    },
    //Generates enemies and their sprites from gamedata and pushes them into the spawnableEnemies array.
    generateEnemies() {
        // spawnableEnemiesGroup.forEach(function(enemy){
        //     new Enemy(0,0)
        //     gameState.spawnableEnemies.push(enemy)
        // })
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
            new Tower(tile.x, tile.y, gameData.level.towers[0].type)
            numOfTowers++
            // game.add.sprite(tile.x * 32, tile.y * 32, gameData.level.towers[0].type)
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
        this.handleEnemies()
        // this.bulletOverlap()
        towers.forEach(function (tower) {
            tower.aquireTarget(tower)
        });
        // game.physics.arcade.overlap(colTest, activeEnemiesGroup, this.colHandler, null, this)
        // this.collisionCheck()

    },
    render() {
        game.debug.text("Tile Properties: " + currentTileProperties, 500, 50)
    },
    //function that runs these functions
    handleEnemies() {
        this.checkEnemySpawn()
        this.moveEnemies()
    },
    // bulletOverlap() {
    //     game.physics.arcade.overlap(bullets, activeEnemiesGroup, this.bulletOverlapHandler, null, this)

    // },
    bulletOverlapHandler(bullet, thisEnemy) {
        // console.log(bullets, thisEnemy)
        bullet.kill()
        thisEnemy.kill()
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
        activeEnemiesGroup.add(enemy.gameObject) //currently testing game object group. Delete if not utilized.
        console.log(activeEnemiesGroup)
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