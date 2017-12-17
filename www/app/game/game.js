//REMEMBER TO DELETE THE GAMEDATA ON THE DB AND POST THE NEW ONE

//gameState is where we'll locally keep the data that we pulled down from the database and manipulate it here.


var PhaserGame = function (game) {
    this.bmd = null
    this.path = []
    this.map
    this.layer
    this.selectedTile
    this.towerNumberBox
    this.winLoseText
    this.pauseText
    this.gameClock = 0
    this.gameData
    this.gameOver = false
    this.currentTileProperties = ''
    this.numOfTowers = 1
    this.activeTowerType = 0
    this.gameState = {
        spawnableEnemies: [], //spawnableEnemies is where the enemies from the database will be stored when they first get pulled down. Shifted out when spawned.
        activeEnemies: [], //activeEnemies are the enemies that have spawned and are still in play. Spliced out when killed or make it to the player.
        killedEnemies: [], //killedEnemies - enemies will be pushed here when killed.
        successfulEnemies: [], //successfulEnemies - enemies will be pushed here when they make it to the player and are no longer in play.

        playerHealth: 0,
        enemiesOutOfPlay: 0,
        wallet: 0
    }

    //console.log(gameData)
};
PhaserGame.prototype = {

    init: function (gameDataParam) {
        this.gameData = gameDataParam
        this.game.renderer.renderSession.roundPixels = true; //currently not in use for linear interpolation. Might be necessary for other types.
    },
    //preload - function that preloads assets before the game starts.
    preload: function () {
        this.gameState = {
            spawnableEnemies: [], //spawnableEnemies is where the enemies from the database will be stored when they first get pulled down. Shifted out when spawned.
            activeEnemies: [], //activeEnemies are the enemies that have spawned and are still in play. Spliced out when killed or make it to the player.
            killedEnemies: [], //killedEnemies - enemies will be pushed here when killed.
            successfulEnemies: [], //successfulEnemies - enemies will be pushed here when they make it to the player and are no longer in play.
            playerHealth: this.gameData.level.playerLevelHealth,
            enemiesOutOfPlay: 0,
            wallet: this.gameData.level.startingCurrency
        }
        for (let i = 0; i < this.gameData.level.towers.length; i++) {
            const tower = this.gameData.level.towers[i];
            game.load.image(tower.type, tower.sprite)
            game.load.image(tower.bullet, tower.bulletSprite)
        }
        // game.load.image(gameData.level.towers[0].bullet, gameData.level.towers[0].bulletSprite)
        // game.load.image('bullet', 'assets/images/bullet.png')
        game.load.tilemap(this.gameData.level.mapKey, null, this.gameData.level.map, Phaser.Tilemap.TILED_JSON);
        game.load.image(this.gameData.level.tilesetImageKey, this.gameData.level.tilesetImage);

        for (let i = 0; i < this.gameData.level.enemies.length; i++) {
            const enemy = this.gameData.level.enemies[i];

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
        this.map = game.add.tilemap(this.gameData.level.mapKey);
        this.map.addTilesetImage(this.gameData.level.tilesetImageName, this.gameData.level.tilesetImageKey);
        this.layer = this.map.createLayer(this.gameData.level.tilemapLayer);
        this.layer.resizeWorld();

        //create selected tile box graphic
        this.selectedTile = game.add.graphics(); //creates an empty graphics object.
        this.selectedTile.lineStyle(2, 0xffffff, 1); //sets line style - width, color, opacity.
        this.selectedTile.drawRect(0, 0, 32, 32); //draws a 32px rectangle with the above line style.

        game.input.addMoveCallback(this.moveTileCursor, this); //runs this callback everytime you move the cursor.

        game.input.onDown.add(this.placeTower, this)

        this.drawInterface()
        this.groupCreator()
        this.textCreator()
        this.buttonCreator()
        this.generateEnemies()
        this.plot();
    },
    groupCreator() {
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
        teslaAoe.forEach(game.debug.body, game.debug, 0x000000);

        game.physics.enable(teslaAoe, Phaser.Physics.ARCADE)
    },
    textCreator() {
        // winLose
        this.winLoseText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '100px Arial', fill: '#ffffff' });
        this.winLoseText.anchor.setTo(0.5, 0.5);
        this.winLoseText.visible = false;

        //pause
        this.pauseText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '50px Arial', fill: '#ffffff' });
        this.pauseText.anchor.setTo(0.5, 0.5);
        this.pauseText.visible = false;
    },
    buttonCreator() {
        pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        oneButton = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
        twoButton = game.input.keyboard.addKey(Phaser.Keyboard.TWO)
        threeButton = game.input.keyboard.addKey(Phaser.Keyboard.THREE)

        pauseButton.onDown.add(this.togglePause);
        oneButton.onDown.add(this.changeActiveTowerType, this, null, 0);
        twoButton.onDown.add(this.changeActiveTowerType, this, null, 1);
        threeButton.onDown.add(this.changeActiveTowerType, this, null, 2);
    },
    changeActiveTowerType(key, num) {
        // console.log("Bur Kek")
        if (num > this.gameData.level.towers.length - 1) {
            console.log("Tower number too high bro")
        } else {
            this.activeTowerType = num;
            this.towerNumberBox.x = (25 + num) * 32
        }
    },
    //Generates enemies and their sprites from gamedata and pushes them into the spawnableEnemies array.
    generateEnemies() {
        for (let i = 0; i < this.gameData.level.enemies.length; i++) {
            const enemy = this.gameData.level.enemies[i];
            enemy.spawnTime = this.gameData.level.spawnRate * (i + 1) + (enemy.wave * 600)
            enemy.gameObject = this.add.sprite(0, 0, enemy.type)
            var walk = enemy.gameObject.animations.add('walk')
            enemy.gameObject.animations.play('walk', 30, true);
            enemy.gameObject.originalIndex = i
            enemy.gameObject.health = enemy.health
            enemy.gameObject.currencyValue = enemy.currencyValue
            enemy.gameObject.anchor.set(1, 1)
            this.gameState.spawnableEnemies.push(enemy)
        }
    },
    drawInterface() {

        for (let i = 0; i < this.gameData.level.towers.length; i++) {
            const towerSelectTile = this.gameData.level.towers[i];

            // var tile = this.map.getTile((25 + i), 1, this.layer);
            game.add.sprite(((25 + i) * 32), (0 * 32), towerSelectTile.type)
            // if(activeTowerType)

            this.towerSelectText = game.add.text(((25 + i) * 32), 17, ' ', { font: '13px Arial', fill: '#cccccc' });
            this.towerSelectText.anchor.setTo(0, 0);
            this.towerSelectText.visible = true;

            this.towerSelectText.text = i + 1

        }
        this.towerNumberBox = game.add.graphics(); //creates an empty graphics object.
        this.towerNumberBox.lineStyle(2, 0xffffff, 1); //sets line style - width, color, opacity.
        this.towerNumberBox.beginFill(0x00ff00, 0.2)
        this.towerNumberBox.drawRect(0, 0, 32, 32); //draws a 32px rectangle with the above line style.
        this.towerNumberBox.endFill()
        this.towerNumberBox.x = (25 + this.activeTowerType) * 32

    },
    //gets tile coordinate you are pointing at and attempts to place tower. Will use to check where you can build towers.
    placeTower() {
        var towerData = this.gameData.level.towers[this.activeTowerType]
        var x = this.layer.getTileX(game.input.activePointer.worldX);
        var y = this.layer.getTileY(game.input.activePointer.worldY);

        var tile = this.map.getTile(x, y, this.layer);
        //if else if else - checks to see if the tile already has a tower, and if the tile index(id/type) can be built on.
        if (this.gameState.wallet >= this.gameData.level.towers[this.activeTowerType].cost) {
            //if else if else - checks to see if the tile already has a tower, and if the tile index(id/type) can be built on.
            if (tile.properties.hasTower) {
                console.log('Already have a tower bro!')
            } else if (tile.index != this.gameData.level.buildableTileId) { //This is hardcoded for the current tileset. Stretch goal: 
                console.log("no go bro")
            } else {
                tile.properties.hasTower = true
                new Tower({ tileX: tile.x, tileY: tile.y, towerData: towerData, gameData: this.gameData, gameClock: this.gameClock, numOfTowers: this.numOfTowers, activeTowerType: this.activeTowerType, gameState: this.gameState })
                this.numOfTowers++
                this.gameState.wallet -= this.gameData.level.towers[this.activeTowerType].cost

            }
        } else {
            console.log("Not enough Minerals!")
        }
        this.currentTileProperties = JSON.stringify(tile.properties)
    },
    moveTileCursor() {
        this.selectedTile.x = this.layer.getTileX(game.input.activePointer.worldX) * 32;
        this.selectedTile.y = this.layer.getTileY(game.input.activePointer.worldY) * 32;
    },
    //plot - function that plots out the routes between the points defined in the "points" array.
    plot: function () {
        this.bmd.clear();
        var count = 0

        var x = 1 / game.width; //x becomes a number that is a fraction of the game width. ie) 1 / 1024 becomes 0.0009765625, which is 1/1024th of 1024.
        for (let i = 0; i <= 1; i += x) {

            //Does the math and draws out the routes between the points. First param is the input array of values to interpolate between. Second param is the percentage of interpolation, between 0 and 1. Each time it is run it returns the interpolated value of the point in the array at the percentage(i). Not sure if I understand completely, may have to study it more.
            var px = this.math.linearInterpolation(this.gameData.level.points.x, i);
            var py = this.math.linearInterpolation(this.gameData.level.points.y, i);

            this.path.push({ x: px, y: py })
            //draws the path between the points.
            this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');

        }

        //draws red rectangles at the x:y points for better visibility (can't be seen if map is loaded).
        for (var p = 0; p < this.gameData.level.points.x.length; p++) {
            this.bmd.rect(this.gameData.level.points.x[p] - 3, this.gameData.level.points.y[p] - 3, 6, 6, 'rgba(255, 0, 0, 1)');
        }
    },
    update: function () {
        this.gameClock++;
        this.handleEnemies()
        this.bulletOverlap()
        towers.forEach(function (tower) {
            tower.aquireTarget(tower)
        });
        if (this.gameState.enemiesOutOfPlay == this.gameData.level.enemies.length && !this.gameOver) {
            this.winLoseText.text = "A winner is YOU!"
            this.winLoseText.visible = true;
            game.input.onDown(game.state.start('Level-Start'))
        }
        if (this.gameClock % 300 == 0)
            this.gameState.wallet += this.gameData.level.passiveCurrency;
    },
    updateUserLevel() {

    },
    togglePause() {
        game.paused = !game.paused
        if (game.paused) {
            this.pauseText.text = "Press SPACE to resume"
            this.pauseText.visible = true;
        } else {
            this.pauseText.visible = false;
        }
    },
    render() {
        game.debug.text("Monies: " + this.gameState.wallet, 4, 16)
        teslaAoe.forEach(game.debug.body, game.debug, false, 'rgba(0,0,0, 0.5)', true);

    },
    //function that runs these functions
    handleEnemies() {
        this.checkEnemySpawn()
        this.moveEnemies()
    },
    bulletOverlap() {
        game.physics.arcade.overlap(pellets, activeEnemiesGroup, this.bulletOverlapHandler, null, this)
        game.physics.arcade.overlap(teslaAoe, activeEnemiesGroup, this.bulletOverlapHandler, null, this)

    },
    bulletOverlapHandler(bullet, shotEnemy) {
        // console.log(bullets, thisEnemy)
        // console.log(bullet)
        if (bullet.key != 'teslaTowerBullet') {
            bullet.kill()
        }
        shotEnemy.health -= bullet.bulletDamage;
        console.log("Enemy " + shotEnemy.originalIndex, shotEnemy.health)

        console.log(shotEnemy.health)
        if (shotEnemy.health <= 0) {
            this.gameState.killedEnemies.push(shotEnemy)
            // gameState.killedEnemies.push(gameState.activeEnemies.splice(shotEnemy.originalIndex, 1)[0])
            shotEnemy.kill()
            this.gameState.wallet += shotEnemy.currencyValue
            this.gameState.enemiesOutOfPlay++;
            console.log(this.gameState.enemiesOutOfPlay)
            console.log(this.gameData.level.enemies.length)
        }
    },
    //checkEnemySpawn - checks if there is still an enemy in the spawnableEnemies array and checks the current game time vs the spawn time for the enemy.
    checkEnemySpawn() {
        var nextEnemy = this.gameState.spawnableEnemies[0]
        // console.log('UPDATE:', game.time.now, gameState.spawnableEnemies[0])
        if (nextEnemy && this.gameClock >= nextEnemy.spawnTime) {
            this.spawnEnemy(nextEnemy)
        }
    },
    spawnEnemy(enemy) {

        enemy.i = 0
        this.gameState.spawnableEnemies.shift()
        this.gameState.activeEnemies.push(enemy)
        activeEnemiesGroup.add(enemy.gameObject) //currently testing game object group. Delete if not utilized.
        // console.log(activeEnemiesGroup)
    },
    moveEnemies() {
        for (let i = 0; i < this.gameState.activeEnemies.length; i++) {
            const enemy = this.gameState.activeEnemies[i];
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
            this.gameState.playerHealth -= enemy.playerDamageValue
            console.log("Player health: " + this.gameState.playerHealth)
            this.gameState.enemiesOutOfPlay++;
            console.log(this.gameState.enemiesOutOfPlay)
        }
        this.gameState.successfulEnemies.push(this.gameState.activeEnemies.splice(this.gameState.activeEnemies.indexOf(enemy), 1)[0])
        //deduct player healh
        enemy.gameObject.kill()
        console.log(this.gameState.enemiesOutOfPlay)
        console.log(this.gameData.level.enemies.length)
        if (this.gameState.playerHealth <= 0) {
            this.gameOver = true
            console.log(this.gameOver)
            this.winLoseText.text = "Game Over";
            this.winLoseText.visible = true;
        }
    }

};

// game.state.add('Game', PhaserGame, true);