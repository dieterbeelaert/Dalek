/**
 * Created by Dieter Beelaert on 2/06/2014.
 */

var dalek = new Image();
dalek.src = 'images/Dalek.png';

var dalekPosition;
var sonicPosition;

var sonicClosedPath = 'images/sonicClosed.png';
var sonicOpenPath = 'images/sonicOpen.png';
var sonic = new Image();
sonic.src = sonicClosedPath;

var imgGameOver = new Image();
imgGameOver.src = 'images/dalekArmy.jpg';

var canvas = document.getElementById('cnvGame');
var ctx = canvas.getContext('2d');

var rows = [250,500,750];
var cols = [250,500,750,1000];

var holeRadius = 100;
var holePositions = [
    {x:125,y:125},
    {x:375,y:125},
    {x:625,y:125},
    {x:875,y:125},
    {x:125,y:375},
    {x:375,y:375},
    {x:625,y:375},
    {x:875,y:375},
    {x:125,y:625},
    {x:375,y:625},
    {x:625,y:625},
    {x:875,y:625}];

var dalekHeight = 200;
var dalekWidth = 200;
var dalekOffsetX = 100;
var dalekOfssetY = 150;

var sonicOffsetX = 33;
var sonicOffsetY = 20;

var isPlaying = false;
var isGameOver = false;
var score = 0;
var misses = 0;
var initialgameSpeed = 1000;
var gameSpeed = initialgameSpeed;
var allowedMissesStarter = 3;

var btnPauseContent = '<i class="glyphicon glyphicon-pause"/> Pause';
var btnPlaycontent =  '<i class="glyphicon glyphicon-play"/> Play' ;

var themeSong = new Audio('audio/Doctor Who Intro 11.mp3');
themeSong.loop = true;

var dalekSounds = [
    new Audio('audio/Destroy.mp3'),
    new Audio('audio/Exterminate.mp3'),
    new Audio('audio/Rant.mp3'),
    new Audio('audio/Buddy off.mp3'),
    new Audio('audio/Emerge.mp3'),
    new Audio('audio/Go stronger.mp3'),
    new Audio('audio/Must Survive.mp3'),
    new Audio('audio/Stay.mp3'),
];

var sonicAudio = new Audio('audio/sonic.mp3');
