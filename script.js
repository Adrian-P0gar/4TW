const gameCvs = document.getElementById('game');
const  ctx = gameCvs.getContext("2d");
const printCvs = document.getElementById("pictureCanvas");
const printCtx = printCvs.getContext('2d');
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

bg.src = "images/bg3.png";
platter.src  =  "images/plates.png";
bottle.src = "images/bottle2.png";
bgScore.src = "images/bgScore.png";
girl.src= "images/girl/1.1.png";

ctx.rect(pXp, pyp, 50, 50);
ctx.stroke();

function move(e) {
    if (e.keyCode == 39){
        pXp += 45;
        if(pXp > 400) {
           pXp = 399;
         }
    }
    if (e.keyCode == 37){
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
            level = 4;
            speed =  2;
            gravity = 100;
             girl.src= "images/girl/4.1.png"
        }
        if (score == 80){
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


    for(let i = 0; i< bottles.length; i++){

        ctx.drawImage(bottle, bottles[i].x, bottles[i].y);

        bottles[i].y +=speed ;
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

    }



    printCtx.drawImage(bgScore,0,580);
    printCtx.drawImage(girl, 0, 30)
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