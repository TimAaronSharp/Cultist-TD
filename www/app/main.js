var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game-area');
var baseUrl = 'http://localhost:3000/api/'
// var gameDataParam = {}
var testingVar = "Hey I'm a test!"
// game.stage.scale.pageAlignHorizontally = true;
// game.stage.scale.pageAlignVertically = true;
// game.stage.scale.refresh();

// var WelcomeScreen = function () {

// }

// WelcomeScreen.prototype = {
//     preload: function () {
//         game.stage.scale.pageAlignHorizontally = true;
//         game.stage.scale.pageAlignVertically = true;
//         game.stage.scale.refresh();
//     },
//     update: function(){
//         getGameData()
//     }
// }
// game.state.add("WelcomeScreen", WelcomeScreen, true)
function getGameData() {

    var currentUserLevel

    game.state.add("Level-Start", LevelStart)
    game.state.add('Game', PhaserGame);
    currentUserLevel = app.controllers.authController.getUserLevel()
    if (currentUserLevel == 0) {
        game.state.start('Level-Start', true, false, currentUserLevel)
    }
    else {
        $.get(baseUrl + 'gameData/' + currentUserLevel)

            .then(res => {
                console.log("hi-dee hi-dee hoooooooo " + res)
                game.state.start('Level-Start', true, false, res)
            })
    }
}

getGameData()

