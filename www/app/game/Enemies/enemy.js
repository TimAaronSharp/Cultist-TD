// var Enemy = function (worldX, worldY, type, health) {
//     this.enemy = game.add.sprite(0, 0, gameData.level.enemies[0].type)
//     this.enemy.health = gameData.level.enemies[0].health
//     this.enemy.anchor.x = 1
//     this.enemy.anchor.y = 1
//     this.enemy.spawnTime =  gameData.level.spawnRate
// }

var Enemy = function (payload) {
    this.spawnTime = payload.spawnRate * (payload.originalIndex + 1) + (payload.enemy.wave * 600)
    this.gameObject = payload.game.add.sprite(0, 0, payload.enemy.type)
    this.gameObject.hurtSound = payload.game.add.audio(payload.enemy.hurtSoundKey)
    this.gameObject.deathSound = payload.game.add.audio(payload.enemy.deathSoundKey)
    this.gameObject.animations.add('walkUp', payload.enemy.animations.walkUp.frames, payload.enemy.animations.walkUp.frameRate, payload.enemy.animations.walkUp.loop);
    this.gameObject.animations.add('walkDown', payload.enemy.animations.walkDown.frames, payload.enemy.animations.walkDown.frameRate, payload.enemy.animations.walkDown.loop);
    this.gameObject.animations.add('walkLeft', payload.enemy.animations.walkLeft.frames, payload.enemy.animations.walkLeft.frameRate, payload.enemy.animations.walkLeft.loop);
    this.gameObject.animations.add('walkRight', payload.enemy.animations.walkRight.frames, payload.enemy.animations.walkRight.frameRate, payload.enemy.animations.walkRight.loop);
    this.gameObject.lastX = this.gameObject.x
    this.gameObject.lastY = this.gameObject.y
    this.gameObject.currentDirection = ''
    this.gameObject.originalIndex = payload.originalIndex
    this.gameObject.health = payload.enemy.health
    this.playerDamageValue = payload.enemy.playerDamageValue
    this.gameObject.currencyValue = payload.enemy.currencyValue
    this.gameObject.anchor.set(payload.enemy.spriteAnchors.x, payload.enemy.spriteAnchors.y)
}

//Convert enemy data to a dictionary of enemy types, add wave data (dictionary? array?) with an array of what enemies spawn in the wave, their order and their type. (and maybe account for spawntime)