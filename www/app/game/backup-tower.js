var Tower = function (tileX, tileY, type) {
    this.tower = game.add.sprite(tileX * 32, tileY * 32, gameData.level.towers[0].type)
    this.tower.tileX = tileX
    this.tower.tileY = tileY
    this.tower.type = type
    this.tower.fireRate = gameData.level.towers[0].fireRate
    this.tower.prevShot = game.time.now + gameData.level.towers[0].fireRate
    this.tower.towerInstance = numOfTowers
    this.tower.fire = function (tower) {
        // bullets.createMultiple(5, gameData.level.towers[0].bullet, 0, false)
        // debugger
        if (game.time.now > tower.prevShot) {
            console.log('Tower ' + tower.towerInstance + " fired! KABOOOOOOOM!!!")
            tower.prevShot = game.time.now + tower.fireRate
        }

    }
    towers.add(this.tower)
    console.log(this.tower)
}

// Tower.prototype.fire = function () {


// }