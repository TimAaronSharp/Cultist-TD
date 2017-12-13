var Enemy = function (worldX, worldY, type, health) {
    this.enemy = game.add.sprite(0, 0, gameData.level.enemies[0].type)
    this.enemy.health = gameData.level.enemies[0].health
    this.enemy.anchor.x = 1
    this.enemy.anchor.y = 1
    this.enemy.spawnTime =  gameData.level.spawnRate
}