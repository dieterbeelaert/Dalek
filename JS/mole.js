/**
 * Created by Dieter Beelaert on 2/06/2014.
 */
$(document).ready(function(){
    redraw();
    updateView();

    themeSong.play();
    $(document).on('mousemove','#cnvGame',function(event) {
        sonicPosition = {x:event.offsetX - sonicOffsetX,y:event.offsetY - sonicOffsetY};
        redraw();
    });

    $(document).on('mousedown','#cnvGame',function(event){
        sonic.src = sonicOpenPath;
        sonicAudio.play();
        sonicScrewDriver(event.offsetX,event.offsetY);
        redraw();
    });

    $(document).on('mouseup','#cnvGame, #imgSonic',function(){
        sonic.src = sonicClosedPath;
        sonicAudio.pause();
        sonicAudio.currentTime = 0.4;
        redraw();
    });

    $(document).on('click','#btnStartStop',function(){
       isPlaying = !isPlaying;
       if(isPlaying){
           $('#btnStartStop').html(btnPauseContent);
           startGame();
       }else{
            $('#btnStartStop').html(btnPlaycontent);
       }
    });

});

//dalek detection functions
function sonicScrewDriver(x,y){
    if(getSonicArea(x,y) === dalekPosition){
        score ++;
        dalekPosition = null;
        speedUp();
    }
}

function getSonicArea(x,y){
       //get column
        var col;
       for(var i = 0; i < cols.length; i++){
          if(x <= cols[i]){
              col = i;
              break;
          }
       }

        //get row
        var row;
        for(var i = 0; i < rows.length; i++){
            if(y <= rows[i]){
                row = i;
                break;
            }
        }

        //get index
        return (row * cols.length) + col;
}


//Drawing methods
function redraw(){

    updateView();
    if(!isGameOver) {
        resetView();
        drawHoles();
        if (dalekPosition != null)
            drawDalek(dalekPosition);
        if (sonicPosition != null)
            drawSonic(sonicPosition.x, sonicPosition.y);
    }
}

function drawSonic(x,y){
    ctx.drawImage(sonic,x,y);
}
function drawHoles(){
    for(var i = 0; i < holePositions.length; i++){
        var hole = holePositions[i];
        drawHole(hole.x,hole.y,holeRadius);
    }
}

function drawHole(x,y,radius){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI,false);
    ctx.fill();
}

function drawDalek(holeNumber){
    var x = holePositions[holeNumber].x - dalekOffsetX;
    var y = holePositions[holeNumber].y - dalekOfssetY;
    ctx.drawImage(dalek,x,y,dalekWidth,dalekHeight)
}

 function resetView(){
     clear();
     drawHoles();
 }
function clear(){
    canvas.width = canvas.width;
}

//dalek loops
function loopDalek(index){
    dalekPosition = index;
    redraw();
    var next = index < holePositions.length -1 ? index+1 : 0;
    setTimeout(function(){loopDalek(next)},200);
}

function randomDalekLoop(){
    if(dalekPosition !== null){
        misses++;
        checkIfLost();
    }
    drawRandomDalek();
    redraw();
    if(isPlaying) {
        setTimeout(randomDalekLoop, gameSpeed);
    }
}

//other gaming methods
function speedUp(){
    if(gameSpeed > 100){
        gameSpeed -= 20;
    }
}

function updateView(){
    var btnContent = isPlaying ? btnPauseContent :btnPlaycontent
    $('#btnStartStop').html(btnContent);
    $('#lblDisabled').html(score);
    $('#lblEscaped').html(misses);
}

function drawRandomDalek(){
    playDalekSound();
    dalekPosition = (Math.round(Math.random() * (holePositions.length -1)));
    redraw();
}

function startGame(){
    if(isGameOver)
        reset();
   drawRandomDalek();
    setTimeout(randomDalekLoop,gameSpeed);
    isGameOver = false;
}

function checkIfLost(){
    var totalDaleks = score + misses;
    var allowedMisses = allowedMissesStarter;
    if(totalDaleks > 10){
        allowedMisses = allowedMissesStarter + (Math.round((totalDaleks / 10)) +1)
    }
    if(misses >= allowedMisses){
       gameOver();
    }
}

function gameOver(){
    isPlaying = false;
    ctx.drawImage(imgGameOver,0,0,canvas.width,canvas.height);
    isGameOver = true;
}

function reset(){
    misses = 0;
    score = 0;
    gameSpeed = initialgameSpeed;
}

function playDalekSound(){
    var toPlay = Math.round(Math.random() * (dalekSounds.length -1)) ;
    console.log(toPlay);
    if(Math.round(Math.random() * 10) % 3 === 0){
        dalekSounds[toPlay].play();
    }
}
