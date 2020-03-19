const gameCvs = document.getElementById('game');
const  ctx = gameCvs.getContext("2d");
const printCvs = document.getElementById("pictureCanvas");
const printCtx = printCvs.getContext('2d');
const newGameCvs = document.getElementById("newGame");
const printNewGame = newGameCvs.getContext("2d");
let pXp = 200;
const pyp = 650;

const bg = new Image();
const platter = new Image();
const bottle = new Image();
let score = 0;
let life = 3;
const bgScore = new Image();
let speed =  2;
let gravity = 180;
let level = 1;
let girl = new Image();
const gameOver = new Image();
const newGame = new Image();
let left = 39;
let right = 37;
const win = new Image();

win.src = "images/win2.png";
newGame.src =  "images/ng1.png";
gameOver.src = "images/gameOver2.png";
bg.src = "images/bg3.png";
platter.src  =  "images/plates.png";
bottle.src = "images/bottle2.png";
bgScore.src = "images/bgScore.png";
girl.src= "images/girl/1.1.png";
newGame.style.cursor = "pointer";

ctx.rect(pXp, pyp, 50, 50);
ctx.stroke();

function move(e) {
    if (e.keyCode == left){
        pXp += 45;
        if(pXp > 400) {
           pXp = 399;
         }
    }
    if (e.keyCode == right){
        pXp -= 45;
        if(pXp < 0) {
            pXp = 1;
        }
    }
    gameCvs.width = gameCvs.width;
}

document.onkeydown = move;

let bottles = [];

bottles[0] = {
    x: 230,
    y: -10
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

 function changeLevel(){
        if (score == 20){

            level = 2;
            speed = 2;
            gravity = 150;
            girl.src= "images/girl/2.1.png"
        }
        if (score == 40){
            level = 3;
            speed =  2;
            gravity = 130;
             girl.src= "images/girl/3.1.png"
        }
        if (score == 60){
            left = 37;
            right = 39;
            level = 4;
            speed =  2;
            gravity = 100;
             girl.src= "images/girl/4.1.png"
        }
        if (score == 80){
            left = 39;
            right = 37;
            level = 5;
            speed =  2;
            gravity = 80;
             girl.src= "images/girl/5.1.png"
        }
        if(score == 100) {
            level = 6;
            speed =  2;
            gravity = 60;
            girl.src= "images/girl/6.1.png"

        }
}


function draw() {

    ctx.drawImage(bg,0,0);
    ctx.drawImage(platter, pXp, pyp);
    printCtx.drawImage(bgScore,0,580);

    printCtx.drawImage(girl, 0, 30)

    if (life <= 0) {
            ctx.drawImage(gameOver,0,0);
            printNewGame.drawImage(newGame,0,0);
            newGameCvs.style.cursor = "pointer";
            newGameCvs.onmousedown = function (e) {
                document.location.reload();
            }
        } else if (level == 6){
        ctx.drawImage(win,0,0);
    }
        else {

    for(let i = 0; i< bottles.length; i++){

        ctx.drawImage(bottle, bottles[i].x, bottles[i].y);

        bottles[i].y +=speed;
        if(bottles[i].y == gravity) {
            bottles.push( {
                x: getRandomInt(450) ,
                y : -10

            });

        }

        if ( bottles[i].x >= (pXp - 50) && bottles[i].x <= (pXp+ 100) && (bottles[i].y <= 740 && bottles[i].y >= 580 )){
             bottles.splice(i,1);
            score++;
            changeLevel();
         }
        if ( bottles[i].y >= 700 && (bottles[i].x <= (pXp - 50) || bottles[i].x >= (pXp+ 100) )){
            bottles.splice(i,1);
            life--;

        }

    }}

    printCtx.fillStyle = "#FFFCED";
    printCtx.font = "20px Verdana";
    printCtx.fillText("Level : "+level,200,gameCvs.height - 60, );

    printCtx.fillStyle = "#FFFCED";
    printCtx.font = "20px Verdana";
    printCtx.fillText("Score : "+score,200,gameCvs.height - 20, );

    printCtx.fillStyle = "##FFFCED";
    printCtx.font = "20px serif";
    printCtx.fillText("Life : "+life,200,gameCvs.height - 40);

    requestAnimationFrame(draw);
}




draw();
