var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game-area');
var baseUrl = 'http://localhost:3000/api/'

var gameDataParam = {}
var gameDataParamTest = {
    "level": {
        "buildableTileId": [
            474,
            475,
            453,
            454
        ],
        "mapKey": "level2",
        "levelNumber": 2,
        "name": "The fall of rivendale",
        "startingCurrency": 1000,
        "passiveCurrency": 10,
        "map": {
            "height": 24,
            "layers": [
                {
                    "data": [442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 474, 521, 538, 523, 474, 453, 454, 475, 453, 454, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 453, 454, 453, 454, 475, 521, 560, 523, 474, 453, 521, 559, 523, 453, 474, 475, 453, 474, 475, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 474, 475, 474, 475, 454, 521, 518, 523, 453, 474, 521, 517, 523, 474, 453, 454, 474, 474, 475, 474, 500, 501, 501, 501, 501, 501, 501, 501, 501, 501, 483, 474, 453, 454, 453, 454, 475, 521, 539, 523, 474, 453, 521, 538, 523, 453, 474, 475, 474, 475, 454, 453, 521, 560, 558, 559, 560, 558, 559, 560, 558, 559, 523, 453, 474, 475, 474, 475, 454, 521, 560, 523, 453, 474, 521, 559, 523, 474, 475, 474, 475, 474, 475, 474, 521, 518, 524, 543, 543, 543, 543, 543, 525, 517, 523, 474, 453, 454, 453, 454, 475, 521, 518, 523, 474, 453, 521, 517, 523, 453, 454, 453, 454, 453, 454, 453, 521, 539, 523, 453, 454, 453, 454, 453, 521, 538, 523, 453, 474, 475, 474, 475, 454, 521, 539, 523, 453, 474, 521, 538, 545, 501, 501, 501, 501, 501, 501, 501, 546, 560, 523, 474, 453, 454, 454, 474, 521, 559, 523, 474, 453, 454, 453, 454, 475, 521, 560, 523, 474, 453, 521, 559, 560, 558, 559, 560, 558, 559, 560, 558, 559, 560, 523, 453, 474, 475, 475, 453, 521, 517, 523, 453, 453, 453, 454, 475, 454, 521, 518, 523, 453, 474, 503, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 504, 474, 453, 454, 454, 474, 521, 538, 523, 474, 453, 454, 475, 474, 475, 521, 539, 523, 474, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 474, 475, 475, 453, 521, 559, 523, 453, 453, 454, 454, 453, 454, 521, 560, 523, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 454, 474, 521, 517, 523, 474, 474, 475, 475, 474, 475, 521, 518, 523, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 475, 453, 521, 538, 523, 453, 453, 454, 454, 482, 501, 546, 539, 523, 453, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 521, 559, 523, 474, 474, 475, 475, 521, 558, 559, 560, 523, 474, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 521, 517, 523, 453, 453, 454, 454, 521, 516, 524, 543, 504, 453, 474, 482, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 546, 538, 523, 474, 474, 475, 475, 521, 537, 523, 474, 475, 474, 453, 521, 558, 559, 560, 558, 559, 560, 558, 559, 560, 558, 559, 560, 558, 559, 560, 558, 559, 560, 559, 523, 453, 453, 454, 454, 521, 558, 545, 501, 483, 453, 474, 521, 518, 524, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 544, 474, 474, 475, 475, 521, 516, 517, 518, 523, 474, 453, 521, 539, 523, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 453, 454, 454, 503, 543, 525, 539, 523, 453, 474, 521, 560, 523, 474, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 474, 475, 475, 474, 475, 521, 560, 523, 474, 453, 521, 518, 523, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 453, 454, 521, 518, 523, 453, 474, 521, 539, 545, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 546, 539, 523, 474, 453, 521, 560, 558, 559, 560, 558, 559, 560, 558, 559, 560, 558, 559, 560, 558, 559, 560, 558, 559, 560, 558, 559, 560, 558, 559, 560, 558, 559, 560, 523, 453, 474, 503, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 543, 504, 474],
                    "height": 24,
                    "name": "TileLayer1",
                    "opacity": 1,
                    "type": "tilelayer",
                    "visible": true,
                    "width": 32,
                    "x": 0,
                    "y": 0
                },
                {
                    "data": [442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 3221225504, 442, 442, 442, 47, 442, 442, 876, 442, 442, 68, 140, 78, 79, 80, 78, 79, 80, 78, 79, 80, 79, 69, 442, 442, 442, 442, 3221225504, 442, 442, 442, 47, 3221225519, 442, 442, 442, 32, 442, 442, 442, 442, 442, 83, 155, 93, 94, 95, 93, 94, 95, 93, 94, 95, 94, 84, 442, 442, 442, 442, 3221225519, 442, 442, 442, 32, 3221225504, 442, 442, 442, 47, 442, 442, 442, 442, 442, 52, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 32, 442, 442, 442, 442, 3221225504, 442, 442, 442, 47, 3221225519, 442, 442, 442, 62, 442, 442, 442, 442, 66, 67, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 47, 442, 442, 442, 442, 3221225519, 442, 442, 442, 32, 3221225504, 442, 442, 442, 77, 78, 79, 80, 80, 81, 82, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 32, 442, 442, 442, 442, 3221225504, 442, 442, 442, 47, 3221225519, 442, 442, 442, 92, 93, 94, 95, 95, 96, 891, 442, 442, 442, 3, 4, 5, 4, 6, 442, 442, 442, 47, 442, 442, 442, 442, 3221225519, 442, 442, 442, 32, 3221225504, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 47, 442, 442, 442, 3221225519, 442, 442, 442, 32, 442, 442, 442, 442, 3221225504, 442, 442, 442, 47, 3221225519, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 32, 442, 442, 442, 3221225504, 442, 442, 442, 47, 442, 442, 442, 442, 3221225519, 442, 442, 442, 32, 3221225504, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 47, 442, 442, 442, 3221225519, 442, 442, 442, 32, 442, 442, 442, 66, 67, 442, 442, 442, 47, 21, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 18, 442, 442, 442, 3221225504, 442, 442, 442, 47, 442, 442, 1610612805, 81, 82, 442, 442, 442, 32, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 3221225519, 442, 442, 442, 32, 442, 442, 2147483732, 96, 891, 442, 442, 442, 47, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 2147483710, 442, 442, 442, 47, 442, 442, 3221225504, 442, 442, 442, 442, 442, 32, 1610612805, 2147483729, 2147483729, 2147483728, 2147483729, 2147483728, 2147483729, 2147483728, 2147483729, 2147483728, 2147483729, 2147483728, 2147483729, 2147483728, 2147483729, 2147483728, 2147483729, 2147483728, 2147483725, 442, 442, 442, 32, 442, 442, 3221225519, 442, 442, 442, 442, 442, 47, 2147483732, 2147483744, 2147483744, 2147483743, 2147483744, 2147483743, 2147483744, 2147483743, 2147483744, 2147483743, 2147483744, 2147483743, 2147483744, 2147483743, 2147483744, 2147483743, 2147483744, 2147483743, 2147483740, 442, 442, 442, 47, 442, 442, 3221225504, 442, 442, 3, 4, 5, 99, 3221225519, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 32, 442, 442, 3221225519, 442, 442, 536870916, 442, 442, 442, 3221225504, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 47, 442, 442, 3221225504, 442, 442, 1610612739, 3221225476, 3221225477, 3221225570, 3221225519, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 32, 442, 442, 3221225519, 442, 442, 442, 442, 442, 47, 3221225504, 442, 442, 442, 3, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 99, 442, 442, 3221225504, 442, 442, 442, 442, 442, 32, 3221225519, 442, 442, 442, 47, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 98, 5, 6, 442, 442, 442, 47, 3221225504, 442, 442, 442, 3221225478, 1073741828, 1073741829, 1073741828, 1073741829, 1073741828, 1073741829, 1073741828, 1073741829, 1073741828, 1073741829, 1073741828, 1073741829, 1073741828, 1073741829, 1073741828, 1073741829, 1073741828, 1073741829, 1073741828, 1073741829, 1073741828, 3221225477, 2684354566, 442, 442, 442, 32, 3221225519, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 47, 3221225504, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 32, 98, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 99],
                    "height": 24,
                    "name": "TileLayer2",
                    "opacity": 1,
                    "type": "tilelayer",
                    "visible": true,
                    "width": 32,
                    "x": 0,
                    "y": 0
                },
                {
                    "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    "height": 24,
                    "name": "TileLayer3",
                    "opacity": 1,
                    "type": "tilelayer",
                    "visible": true,
                    "width": 32,
                    "x": 0,
                    "y": 0
                }],
            "nextobjectid": 1,
            "orientation": "orthogonal",
            "renderorder": "left-down",
            "tiledversion": "1.0.3",
            "tileheight": 32,
            "tilesets": [
                {
                    "columns": 15,
                    "firstgid": 1,
                    "image": "assets/maps/Cliff_tileset.png",
                    "imageheight": 518,
                    "imagewidth": 503,
                    "margin": 0,
                    "name": "Cliff_tileset",
                    "spacing": 0,
                    "tilecount": 240,
                    "tileheight": 32,
                    "tilewidth": 32
                },
                {
                    "columns": 11,
                    "firstgid": 241,
                    "image": "assets/maps/Extra_Unfinished4.png",
                    "imageheight": 266,
                    "imagewidth": 360,
                    "margin": 0,
                    "name": "Extra_Unfinished4",
                    "spacing": 0,
                    "tilecount": 88,
                    "tileheight": 32,
                    "tilewidth": 32
                },
                {
                    "columns": 9,
                    "firstgid": 329,
                    "image": "assets/maps/graphics-tiles-waterflow.png",
                    "imageheight": 293,
                    "imagewidth": 319,
                    "margin": 0,
                    "name": "graphics-tiles-waterflow",
                    "spacing": 0,
                    "tilecount": 81,
                    "tileheight": 32,
                    "tilewidth": 32
                },
                {
                    "columns": 21,
                    "firstgid": 410,
                    "image": "assets/maps/ground_tiles.png",
                    "imageheight": 701,
                    "imagewidth": 672,
                    "margin": 0,
                    "name": "ground_tiles",
                    "spacing": 0,
                    "tilecount": 441,
                    "tileheight": 32,
                    "tileproperties":
                        {
                            "43":
                                {
                                    "canBuild": true
                                },
                            "44":
                                {
                                    "canBuild": true
                                },
                            "64":
                                {
                                    "canBuild": true
                                },
                            "65":
                                {
                                    "canBuild": true
                                }
                        },
                    "tilepropertytypes":
                        {
                            "43":
                                {
                                    "canBuild": "bool"
                                },
                            "44":
                                {
                                    "canBuild": "bool"
                                },
                            "64":
                                {
                                    "canBuild": "bool"
                                },
                            "65":
                                {
                                    "canBuild": "bool"
                                }
                        },
                    "tilewidth": 32
                },
                {
                    "columns": 14,
                    "firstgid": 851,
                    "image": "assets/maps/object- layer.png",
                    "imageheight": 219,
                    "imagewidth": 477,
                    "margin": 0,
                    "name": "object- layer",
                    "spacing": 0,
                    "tilecount": 84,
                    "tileheight": 32,
                    "tilewidth": 32
                }],
            "tilewidth": 32,
            "type": "map",
            "version": 1,
            "width": 32
        },
        "playerLevelHealth": 3,
        "enemies": [
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 0,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 0,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 0,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 0,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 0,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 0,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 1,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 1,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 1,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 1,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 1,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 1,
                "currencyValue": 10
            },
            {
                "type": "ninja",
                "health": 100,
                "playerDamageValue": 1,
                "sprite": "assets/images/ninja_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 1,
                "currencyValue": 10
            },
            {
                "type": "knight",
                "health": 150,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 2,
                "currencyValue": 20
            },
            {
                "type": "knight",
                "health": 150,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 2,
                "currencyValue": 20
            },
            {
                "type": "knight",
                "health": 150,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 2,
                "currencyValue": 20
            },
            {
                "type": "knight",
                "health": 150,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 2,
                "currencyValue": 20
            },
            {
                "type": "knight",
                "health": 150,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 2,
                "currencyValue": 20
            },
            {
                "type": "knight",
                "health": 150,
                "playerDamageValue": 1,
                "sprite": "assets/images/warrior_m.png",
                "spriteAnchors": {
                    "x": 1,
                    "y": 1
                },
                "animations": {
                    "walkUp": {
                        "frames": [0, 1, 2, 1],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkDown": {
                        "frames": [6, 7, 8, 7],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkLeft": {
                        "frames": [9, 10, 11, 10],
                        "frameRate": 10,
                        "loop": true
                    },
                    "walkRight": {
                        "frames": [3, 4, 5, 4],
                        "frameRate": 10,
                        "loop": true
                    }
                },
                "hurtSoundKey": "enemyHurt",
                "hurtSound": "assets/sounds/hurt.m4a",
                "deathSoundKey": "enemyDeath",
                "deathSound": "assets/sounds/Hdead.m4a",
                "wave": 2,
                "currencyValue": 20
            }
        ],
        "towers": [
            {
                "type": "teslaTower",
                "bullet": "teslaTowerBullet",
                "bulletType": "aoe",
                "bulletDamage": 0.25,
                "fireRate": 10800,
                "towerRange": 1024,
                "fireSoundKey": "teslaFireSound",
                "fireSound": "assets/sounds/teslaFire.m4a",
                "bulletImpactSound": "assets/sounds/teslaImpact.m4a",
                "bulletImpactSoundKey": "teslaImpact",
                "cost": 25,
                "buildTime": 120,
                "bulletSprite": "assets/images/teslaTower.png",
                "sprite": "assets/images/teslaTower.png",
                "buildSound": "assets/sounds/towerPlacement.m4a",
                "buildSoundKey": "teslaBuildSound"
            },
            {
                "type": "bulletTower",
                "bullet": "bulletTowerBullet",
                "bulletType": "pellet",
                "bulletDamage": 50,
                "fireRate": 120,
                "towerRange": 200,
                "fireSoundKey": "bulletFireSound",
                "fireSound": "assets/sounds/bulletFire.m4a",
                "bulletImpactSound": "assets/sounds/bulletImpact.m4a",
                "bulletImpactSoundKey": "bulletImpact",
                "cost": 100,
                "buildTime": 120,
                "bulletSprite": "assets/images/bullet.png",
                "sprite": "assets/images/bulletTower.png",
                "buildSound": "assets/sounds/towerPlacement.m4a",
                "buildSoundKey": "bulletBuildSound"
            }
        ],
        "points": {
            "x": [
                96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 124, 151, 178, 206, 234, 261, 284, 316, 343, 371, 391, 416, 416, 416, 416, 416, 446, 476, 506, 536, 570, 603, 636, 670, 670, 670, 670, 670, 670, 670, 670, 670, 670, 670, 670, 670, 635, 599, 564, 528, 494, 457, 424, 384, 349, 315, 280, 244, 208, 173, 135, 96, 96, 96, 96, 96, 96, 96, 132, 168, 204, 240, 276, 312, 348, 384, 420, 456, 492, 528, 564, 600, 636, 672, 708, 744, 780, 816, 852, 888, 924, 960, 960, 960, 960, 960, 930, 900, 900, 900, 900, 900, 930, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960
            ],
            "y": [
                0, 24, 47, 71, 95, 119, 142, 166, 190, 213, 237, 259, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 250, 220, 190, 160, 160, 160, 160, 160, 160, 160, 160, 160, 193, 227, 260, 295, 330, 362, 392, 428, 460, 495, 520, 545, 545, 545, 545, 545, 545, 545, 545, 545, 545, 545, 545, 545, 545, 545, 545, 545, 576, 607, 638, 669, 699, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 693, 655, 617, 580, 580, 580, 547, 513, 479, 445, 445, 445, 408, 371, 334, 297, 260, 223, 186, 149, 112, 75, 37, 0
            ]
        },
        "spawnRate": 20
    },
    "levelNumber": 2
}

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
    // currentUserLevel = app.controllers.authController.getUserLevel()
    // if (currentUserLevel == 0) {
    //     game.state.start('Level-Start', true, false, currentUserLevel)
    // }
    // else {
    //     $.get(baseUrl + 'gameData/' + currentUserLevel)

    //         .then(res => {
    //             // console.log("hi-dee hi-dee hoooooooo " + res)
    //             game.state.start('Level-Start', true, true, res)
    //         })
    //     game.state.start('Level-Start', true, true, gameDataParamTest)
    // }
    game.state.start('Level-Start', true, true, gameDataParamTest) //This line not needed when you restore the above
}


getGameData()
