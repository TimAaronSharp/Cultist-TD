var Tower = function (tileX, tileY, type, bulletType) {
    this.tower = game.add.sprite(tileX * 32, tileY * 32, gameData.level.towers[activeTowerType].type)
    this.tower.tileX = tileX
    this.tower.tileY = tileY
    this.tower.type = type
    this.tower.fireRate = gameData.level.towers[activeTowerType].fireRate
    this.tower.prevShot = gameClock
    this.tower.bulletType = bulletType
    this.tower.towerRange = gameData.level.towers[activeTowerType].towerRange
    this.tower.towerInstance = numOfTowers
    this.tower.target = null
    this.tower.aquireTarget = function (tower) { //Phaser.Math.Distance

        if (tower.target) {//Check if tower has target

            tower.fire(tower, tower.target)

            //if yes, check distance
            if (Phaser.Math.distance(tower.x, tower.y, tower.target.x, tower.target.y) > tower.towerRange || !tower.target.alive) {

                tower.target = null
            }
            //if within distance, fire
        } else {//if outside of distance, aquire new target
            for (let i = 0; i < gameState.activeEnemies.length; i++) { //while loop?
                const enemy = gameState.activeEnemies[i].gameObject;
                enemy.name = 'enemy ' + i
                var range = Phaser.Math.distance(tower.x, tower.y, enemy.x, enemy.y)

                if (range < tower.towerRange && enemy.alive) {
                    tower.target = enemy
                    console.log(tower.towerInstance + ' aquired target ' + enemy.name)
                    break;
                    // this.tower.fire()
                } else {
                    tower.target = null
                }
            }
        }
    }
    this.tower.fire = function (tower, enemy) {
        // console.log(tower.bulletType)
        if (tower.bulletType == "pellet") {
            if (gameClock >= tower.prevShot) {
                pellets.createMultiple(1, gameData.level.towers[activeTowerType].bullet)

                var pellet = pellets.getFirstExists(false);
                console.log('Tower ' + tower.towerInstance + " shot " + enemy.name + "! KABOOOOOOOM!!!")
                tower.prevShot = gameClock + tower.fireRate
                pellet.reset(tower.x, tower.y);
                // bullet.body.collideWorldBounds = true;

                game.physics.arcade.moveToObject(pellet, enemy, 500)
            }
        }
        if (tower.bulletType == "aoe") {
            //need to create the radius around the tower for enemies to overlap and take damage.
            if (gameClock >= tower.prevShot) {
                teslaAoe.createMultiple(1, gameData.level.towers[activeTowerType].bullet)
                var teslaShot = teslaAoe.getFirstExists(false)
                teslaShot.body.setCircle(48);
                tower.prevShot = gameClock + tower.fireRate
                teslaShot.reset(tower.x, tower.y)
                console.log('Tower ' + tower.towerInstance + " shot " + enemy.name + "! ZAAAAAAAAAAAAP!!!")
            }

        }

    }
    towers.add(this.tower)
    console.log(this.tower)
}

// Tower.prototype.fire = function () {


// }

