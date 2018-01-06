var Tower = function (payload) {

    this.tower = game.add.sprite(payload.tileX * 32, payload.tileY * 32, payload.towerData.type)
    this.tower.tileX = payload.tileX
    this.tower.tileY = payload.tileY
    this.tower.type = payload.towerData.type
    this.tower.towerClock = payload.gameClock
    this.tower.fireRate = payload.towerData.fireRate
    this.tower.prevShot = payload.gameClock
    this.tower.bulletType = payload.towerData.bulletType
    this.tower.bulletDamage = payload.towerData.bulletDamage
    this.tower.fireSound = game.add.audio(payload.towerData.fireSoundKey)
    this.tower.bulletImpactSound = game.add.audio(payload.towerData.bulletImpactSoundKey)
    this.tower.towerRange = payload.towerData.towerRange
    this.tower.towerInstance = payload.numOfTowers
    this.tower.target = null
    this.tower.aquireTarget = function (tower) { //Phaser.Math.Distance
        tower.towerClock++
        if (tower.target) {//Check if tower has target
            tower.fire(tower, tower.target)

            //if yes, check distance
            if (Phaser.Math.distance(tower.x, tower.y, tower.target.x, tower.target.y) > tower.towerRange || !tower.target.alive) {

                tower.target = null
            }
            //if within distance, fire
        } else {//if outside of distance, aquire new target
            for (let i = 0; i < payload.gameState.activeEnemies.length; i++) { //while loop?
                const enemy = payload.gameState.activeEnemies[i].gameObject;
                enemy.name = 'enemy ' + i
                var range = Phaser.Math.distance(tower.x, tower.y, enemy.x, enemy.y)

                if (range < tower.towerRange && enemy.alive) {
                    tower.target = enemy
                    // console.log(tower.towerInstance + ' aquired target ' + enemy.name)
                    break;
                    // this.tower.fire()
                } else {
                    tower.target = null
                }
            }
        }
    }
    this.tower.fire = function (tower, enemy) {
        if (tower.bulletType == "pellet") {
            // debugger
            if (tower.towerClock >= tower.prevShot) {
                pellets.createMultiple(1, payload.towerData.bullet)
                

                var pellet = pellets.getFirstExists(false);
                pellet.bulletImpactSound = game.add.audio(tower.bulletImpactSoundKey)
                pellet.bulletDamage = tower.bulletDamage
                // console.log('Tower ' + tower.towerInstance + " shot " + enemy.name + "! KABOOOOOOOM!!!")
                tower.prevShot = tower.towerClock + tower.fireRate
                pellet.reset(tower.x, tower.y);
                tower.fireSound.play();
                // bullet.body.collideWorldBounds = true;

                game.physics.arcade.moveToObject(pellet, enemy, 500)
            }
        }
        if (tower.bulletType == "aoe") {
            //need to create the radius around the tower for enemies to overlap and take damage.
            if (tower.towerClock >= tower.prevShot) {
                teslaAoe.createMultiple(1, payload.towerData.bullet)
                var teslaShot = teslaAoe.getFirstExists(false)
                teslaShot.bulletImpactSound = game.add.audio(tower.bulletImpactSoundKey)
                // teslaShot.anchor.set(0, -0.39)
                teslaShot.bulletDamage = tower.bulletDamage

                teslaShot.body.setCircle(80, -64, -64);

                tower.prevShot = tower.towerClock + tower.fireRate
                teslaShot.reset(tower.x, tower.y)
                tower.fireSound.play();
                // console.log('Tower ' + tower.towerInstance + " shot " + enemy.name + "! ZAAAAAAAAAAAAP!!!")
            }

        }

    }
    towers.add(this.tower)
    // console.log(this.tower)
}

// Tower.prototype.fire = function () {


// }

// tileX, tileY, type, bulletType, bulletDamage, gameData, gameClock, numOfTowers, activeTowerType