//WILL NEED TO BE A SCREEN THAT YOU CLICK ON TO START THE GAME/LEVEL, SO THE GAMETIME DOESN'T ACCUMULATE WHILE THE PAGE IS STILL LOADING AND ENEMIES SPAWN AT THE SAME TIME.

var gameData
var LevelStart = function () {


}
LevelStart.prototype = {
    init: function (gameDataParam) {
        gameData = gameDataParam
    },
    preload: function () {
        this.game.scale.pageAlignHorizontally = true; this.game.scale.pageAlignVertically = true;this.game.scale.refresh();


    },
    create: function () {
        
        this.stage.backgroundColor = '#000000'
        levelStartText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '25px Press Start 2P', fill: '#ffffff' });
        levelStartText.anchor.setTo(0.5, 0.5);
        levelStartText.visible = false;
        setTimeout(() => { levelStartText.visible = true; }, 500)
        if (gameData == 0) {
            levelStartText.text = "Please Login to Play!"

        } else {
            levelStartText.text = "Click to Start Level " + gameData.levelNumber + "!"
            game.input.onDown.add(this.startGame, this)
        }
    },
    startGame: function () {
        game.state.start('Game', true, false, gameData)
    }
}

//different towers / selection mechanism
//persistant score?
//inbetween level persistant descisions (shop and/or upgrades and/or repairs)
//