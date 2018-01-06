//REMEMBER TO DELETE THE GAMEDATA ON THE DB AND POST THE NEW ONE

//gameState is where we'll locally keep the data that we pulled down from the database and manipulate it here.

//Hey there! This is a test to see if this repo is separate from the one I forked it from!
var PhaserGame = function (game) {
    this.bmd = null
    this.path = []
    this.map
    this.bottomLayer
    this.midLayer
    this.topLayer
    this.selectedTile
    this.towerNumberBox
    this.winLoseText
    this.pauseText
    this.gameClock = 0
    this.gameData
    this.finalLevel
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
            game.load.image(tower.bullet, tower.bulletSprite);
            game.load.audio(tower.fireSoundKey, tower.fireSound);
            game.load.audio(tower.buildSoundKey, tower.buildSound);
        }
        // game.load.image(gameData.level.towers[0].bullet, gameData.level.towers[0].bulletSprite)
        // game.load.image('bullet', 'assets/images/bullet.png')
        game.load.tilemap(this.gameData.level.mapKey, null, this.gameData.level.map, Phaser.Tilemap.TILED_JSON);

        // game.load.image(this.gameData.level.tilesetImageKey, this.gameData.level.tilesetImage);
        for (let i = 0; i < this.gameData.level.map.tilesets.length; i++) {
            var tileset = this.gameData.level.map.tilesets[i]
            game.load.image(tileset.name, tileset.image);
        }

        for (let i = 0; i < this.gameData.level.enemies.length; i++) {
            const enemy = this.gameData.level.enemies[i];

            game.load.spritesheet(enemy.type, enemy.sprite, 32, 36, 12)
            game.load.audio(enemy.hurtSoundKey, enemy.hurtSound);
            game.load.audio(enemy.deathSoundKey, enemy.deathSound);
        }
    },

    //create - function that creates the game world and everything in it.
    create: function () {
        this.game.scale.pageAlignHorizontally = true; this.game.scale.pageAlignVertically = true; this.game.scale.refresh();
        this.finalLevel = app.controllers.authController.getFinalLevel();

        game.physics.startSystem(Phaser.Physics.ARCADE) //starts the physics system.
        //bmd code allows for the plot to draw the plot points if you don't have the map loaded. Useful when making paths and for debugging.
        this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        this.bmd.addToWorld();

        this.stage.backgroundColor = '#000000';
        this.map = game.add.tilemap(this.gameData.level.mapKey);

        for (let i = 0; i < gameData.level.map.tilesets.length; i++) {
            var tileset = gameData.level.map.tilesets[i];

            this.map.addTilesetImage(tileset.name, tileset.name);
            // this.map.addTilesetImage(tileset.name, tilesetImageKey);

        }
        this.bottomLayer = this.map.createLayer(this.gameData.level.map.layers[0].name);
        this.midLayer = this.map.createLayer(this.gameData.level.map.layers[1].name);

        this.bottomLayer.resizeWorld();

        //create selected tile box graphic
        this.selectedTile = game.add.graphics(); //creates an empty graphics object.
        this.selectedTile.lineStyle(2, 0xffffff, 1); //sets line style - width, color, opacity.
        this.selectedTile.drawRect(0, 0, 32, 32); //draws a 32px rectangle with the above line style.

        game.input.addMoveCallback(this.moveTileCursor, this); //runs this callback everytime you move the cursor.

        game.input.onDown.add(this.placeTower, this)

        this.drawInterface()
        this.groupCreator()
        this.buttonCreator()
        this.generateEnemies()
        this.topLayer = this.map.createLayer(this.gameData.level.map.layers[2].name); //created after enemies so they can walk under them, ie trees/clouds.
        this.textCreator()
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
        this.winLoseText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '50px Press Start 2P', fill: '#ffffff' });
        this.winLoseText.anchor.setTo(0.5, 0.5);
        this.winLoseText.visible = false;

        // click to try again
        this.tryAgainText = game.add.text(game.world.centerX, game.world.centerY + 100, ' ', { font: '25px Press Start 2P', fill: '#ffffff' });
        this.tryAgainText.anchor.setTo(0.5, 0.5);
        this.tryAgainText.visible = false;

        //click to start next level
        this.startNextLevelText = game.add.text(game.world.centerX, game.world.centerY + 100, ' ', { font: '25px Press Start 2P', fill: '#ffffff' });
        this.startNextLevelText.anchor.setTo(0.5, 0.5);
        this.startNextLevelText.visible = false;

        //pause
        this.pauseText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '40px Press Start 2P', fill: '#ffffff' });
        this.pauseText.anchor.setTo(0.5, 0.5);
        this.pauseText.visible = false;
    },
    buttonCreator() {
        pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        oneButton = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
        twoButton = game.input.keyboard.addKey(Phaser.Keyboard.TWO)
        threeButton = game.input.keyboard.addKey(Phaser.Keyboard.THREE)

        pauseButton.onDown.add(this.togglePause, this, null, this.pauseText);
        oneButton.onDown.add(this.changeActiveTowerType, this, null, 0);
        twoButton.onDown.add(this.changeActiveTowerType, this, null, 1);
        threeButton.onDown.add(this.changeActiveTowerType, this, null, 2);
    },
    changeActiveTowerType(key, num) {
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
            enemy.gameObject.hurtSound = game.add.audio(enemy.hurtSoundKey)
            enemy.gameObject.deathSound = game.add.audio(enemy.deathSoundKey)
            var walkUp = enemy.gameObject.animations.add('walkUp', [0, 1, 2, 1], 10, true);
            var walkDown = enemy.gameObject.animations.add('walkDown', [6, 7, 8, 7], 10, true);
            var walkLeft = enemy.gameObject.animations.add('walkLeft', [9, 10, 11, 10], 10, true);
            var walkRight = enemy.gameObject.animations.add('walkRight', [3, 4, 5, 4], 10, true);
            enemy.gameObject.lastX = enemy.gameObject.x
            enemy.gameObject.lastY = enemy.gameObject.y
            enemy.gameObject.currentDirection = ''
            // enemy.gameObject.animations.play('walkRight');
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
        var x = this.bottomLayer.getTileX(game.input.activePointer.worldX);
        var y = this.bottomLayer.getTileY(game.input.activePointer.worldY);

        var tile = this.map.getTile(x, y, this.bottomLayer);
        var midTile = this.map.getTile(x, y, this.midLayer);
        console.log(midTile.index);
        //if else if else - checks to see if the tile already has a tower, and if the tile index(id/type) can be built on.
        if (this.gameState.wallet >= this.gameData.level.towers[this.activeTowerType].cost) {
            //if else if else - checks to see if the tile already has a tower, and if the tile index(id/type) can be built on.
            if (tile.properties.hasTower) {
                console.log('Already have a tower bro!')
            } else if (!this.gameData.level.buildableTileId.includes(tile.index)) {
                console.log("no go bro")
            } else if (midTile.index != 442) {
                console.log("no go bro")
            } else {
                var towerPlacementSound = game.add.audio(towerData.buildSoundKey)
                towerPlacementSound.play();
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
        this.selectedTile.x = this.bottomLayer.getTileX(game.input.activePointer.worldX) * 32;
        this.selectedTile.y = this.bottomLayer.getTileY(game.input.activePointer.worldY) * 32;
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
        this.winLoseCheck();
        // game.input.onDown(game.state.start('Level-Start'))
        if (this.gameClock % 300 == 0)
            this.gameState.wallet += this.gameData.level.passiveCurrency;
    },
    startNextLevel() {
        game.state.start('Level-Start', true, false, this.gameData)
    },
    updateUserLevel() {
        app.controllers.authController.updateUserLevel()
    },
    winLoseCheck() {
        if (this.gameState.enemiesOutOfPlay == this.gameData.level.enemies.length && !this.gameOver) {
            if (this.gameData.levelNumber == this.finalLevel) {
                this.winLoseText.text = "Congratulations!"
                this.winLoseText.visible = true;
                this.startNextLevelText.text = "You beat the game! Click to restart.";
                this.startNextLevelText.visible = true;
                game.input.onDown.add(this.updateUserLevel, this)
            } else {
                this.winLoseText.text = "A winner is YOU!"
                this.winLoseText.visible = true;
                this.startNextLevelText.text = "Click to start next level";
                this.startNextLevelText.visible = true;
                game.input.onDown.add(this.updateUserLevel, this)
            }
        }

        if (this.gameState.playerHealth <= 0) {
            this.gameOver = true
            // console.log(this.gameOver)
            this.winLoseText.text = "Game Over";
            this.winLoseText.visible = true;
            this.tryAgainText.text = "Click to try again";
            this.tryAgainText.visible = true;
            game.input.onDown.add(getGameData, this)
            // getGameData();

        }
    },
    togglePause(testString) {
        console.log(this.pauseText);
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
            shotEnemy.hurtSound.play();
        }
        shotEnemy.health -= bullet.bulletDamage;
        if (bullet.key == "teslaTowerBullet" && this.gameClock % 30 == 0) {
            shotEnemy.hurtSound.play();
        }

        // console.log("Enemy " + shotEnemy.originalIndex, shotEnemy.health)

        // console.log(shotEnemy.health)
        if (shotEnemy.health <= 0) {
            this.gameState.killedEnemies.push(shotEnemy)
            // gameState.killedEnemies.push(gameState.activeEnemies.splice(shotEnemy.originalIndex, 1)[0])
            shotEnemy.kill()
            shotEnemy.deathSound.play();
            this.gameState.wallet += shotEnemy.currencyValue
            this.gameState.enemiesOutOfPlay++;
            // console.log(this.gameState.enemiesOutOfPlay)
            // console.log(this.gameData.level.enemies.length)
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
            enemy.gameObject.lastX = enemy.gameObject.x
            enemy.gameObject.lastY = enemy.gameObject.y
            enemy.gameObject.x = this.path[enemy.i].x
            enemy.gameObject.y = this.path[enemy.i].y
            enemy.i++

            if (enemy.gameObject.lastX < enemy.gameObject.x) {
                enemy.gameObject.currentDirection = 'walkRight'
            } else if (enemy.gameObject.lastX > enemy.gameObject.x) {
                enemy.gameObject.currentDirection = 'walkLeft'
            } else if (enemy.gameObject.lastY < enemy.gameObject.y) {
                enemy.gameObject.currentDirection = 'walkDown'
            } else if (enemy.gameObject.lastY > enemy.gameObject.y) {
                enemy.gameObject.currentDirection = 'walkUp'
            }
            enemy.gameObject.animations.play(enemy.gameObject.currentDirection);

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
        // console.log(this.gameState.enemiesOutOfPlay)
        // console.log(this.gameData.level.enemies.length)
        this.winLoseCheck();
    }

};

// game.state.add('Game', PhaserGame, true);