const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
setInterval(game,17);

var level = [
    ['R','R','R','R','R','R','R','R'],
    ['O','O','#','O','O','#','O','O'],
    ['Y','Y','#','Y','Y','#','Y','Y'],
    ['G','#','G','G','G','G','#','G'],
    ['B','B','#','#','#','#','B','B'],
    ['P','P','P','P','P','P','P','P']
];

var brick = {
    x: 0,
    y: 0,
    w: 46,
    h: 16,
    gap: 4
}

const colorMap = {
    'R': 'red',
    'O': 'orange',
    'Y': 'yellow',
    'G': 'green',
    'B': 'blue',
    'P': 'purple',
    '#': 'white'
}

var ball = {
    x: 100,
    y: 300,
    xv: 5,
    yv: 5,
    w: 10,
    h: 10
}

var paddle = {
    x: 200,
    y: 550,
    w: 46,
    h: 16,
    v: 5,
    left: false,
    right: false
}

function game(){

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,c.width,c.height);

    ctx.fillStyle = "white";
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)
    
    for(var col = 0; col < level.length; col++){
        for(var row = 0; row < level[col].length; row++){
            if(level[col][row] != '#'){
                
                brick.x = (brick.w+brick.gap)*row;
                brick.y = 100+(brick.h+brick.gap)*col;

                if(collisionCheck(ball, brick)){

                    level[col][row] = '#';
                    reverseTrajectory(ball, brick);
                }
                
                ctx.fillStyle = colorMap[level[col][row]];
                ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
            }
        }
    }

    ctx.fillStyle = "white";
    ctx.fillRect(ball.x, ball.y, ball.w, ball.h)

    borderCollide();

    if(collisionCheck(ball, paddle)){
        reverseTrajectory(ball, paddle);
    }

    ball.x += ball.xv;
    ball.y += ball.yv;

    if(paddle.left && !(paddle.right) && paddle.x > 0){
        paddle.x -= paddle.v;
    }
    if(paddle.right && !(paddle.left) && paddle.x + paddle.w < 400){
        paddle.x += paddle.v;
    }
}   

function borderCollide(){
    if(ball.x < 0){
        ball.x = 0; ball.xv *= -1;
    }

    if(ball.x + ball.w > c.width){
        ball.x = c.width - ball.w; ball.xv *= -1;
    }

    if(ball.y < 0){
        ball.y = 0; ball.yv *= -1;
    }

    if(ball.y + ball.h > c.height){
        ball.y = 300; ball.x = 100; ball.xv = Math.abs(ball.xv);
    }
}

function collisionCheck(obj1, obj2){
    return (obj1.x > obj2.x && obj1.x < obj2.x + obj2.w ||
    obj1.x + obj1.w > obj2.x && obj1.x + obj1.w < obj2.x + obj2.w) &&
    (obj1.y > obj2.y && obj1.y < obj2.y + obj2.h ||
    obj1.y + obj1.h > obj2.y && obj1.y + obj1.h < obj2.y + obj2.h);
}

function reverseTrajectory(obj1, obj2){

    while(collisionCheck(obj1, obj2)){
        obj1.x -= Math.sign(obj1.xv);
        obj1.y -= Math.sign(obj1.yv);
    }

    if(obj1.x + obj1.w <= obj2.x || obj1.x >= obj2.x + obj2.w){
        obj1.xv *= -1;
    }
    else{
        obj1.yv *= -1;
    }
}

document.addEventListener("keydown", e => {
    if(e.keyCode == 37){
        paddle.left = true;
    }
    if(e.keyCode == 39){
        paddle.right = true;
    }
})

document.addEventListener("keyup", e => {
    if(e.keyCode == 37){
        paddle.left = false;
    }
    if(e.keyCode == 39){
        paddle.right = false;
    }
})