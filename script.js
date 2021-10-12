

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x : 8 * box ,
    y : 8 * box 
}

let direction = "right";


let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}


//Criando o espaço principal do jogo
function criarBG(){
    context.fillStyle = "Black";
    context.fillRect(0,0,16 * box, 16 * box);
}

// método para criar a cobra
function criarCobra(){
    for (i=0 ; i < snake.length; i++){
        
        context.fillStyle = "red";
        context.fillRect(snake[i].x,snake[i].y, box,box);
    }
}

function drawfood(){
    context.fillStyle = "white";
    context.fillRect(food.x,food.y, box,box);
}

document.addEventListener('keydown',update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction='left';
    if(event.keyCode == 38 && direction != "down") direction='up';
    if(event.keyCode == 39 && direction != "left") direction='right';
    if(event.keyCode == 40 && direction != "up") direction='down';
}

//funçao para iniciar o jogo

function iniciarJogo(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0  && direction == "left") snake[0].x = 15* box;
    if(snake[0].y > 15* box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;

    for(i = 1 ; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("gamer over :(");
    }
    }

    criarBG();
    criarCobra();
    drawfood();
    let pos_x = snake[0].x;
    let pos_y = snake[0].y;

    if(direction == "right") pos_x += box;
    if(direction == "left") pos_x -= box;
    if(direction == "up") pos_y -= box;
    if(direction == "down") pos_y += box;

    if(pos_x != food.x  || pos_y != food.y){
        snake.pop();

    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }


    let novaCabeca = {
        x: pos_x,
        y: pos_y
    }

    snake.unshift(novaCabeca);
    document.getElementById("tamanho").innerHTML = snake.length;
}

// a cada 100ms o jogo é reiniciado e assim não temos o travamento
let jogo = setInterval(iniciarJogo,100);

//Informando o tamanho da cobra
