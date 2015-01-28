
var starfish = {
  x: 40,
  y: 200,
  alive: true,
  won: false,
  canMove: true,
};

var alien = {
  x: 560,
  y: 80,
  alive: true,
};

var alien2 = {
  x: 560,
  y: 200,
  alive: true,
};

var alien3 = {
  x: 560,
  y: 320,
  alive: true,
};

document.getElementById("up").onclick = function() {move(38);};
document.getElementById("down").onclick = function() {move(40);};
document.getElementById("right").onclick = function() {move(39);};
document.getElementById("left").onclick = function() {move(37);};

var starfishImg = document.getElementById("starfish");
var alienImg = document.getElementById("alien");
var alienImg2 = document.getElementById("alien2");
var alienImg3 = document.getElementById("alien3");



var alienCount = 3;

function move(direction){
  if (starfish.canMove){
    console.log('moving');
    ai_move(alien, alienImg);
    ai_move(alien2, alienImg2);
    ai_move(alien3, alienImg3);
    if (direction.keyCode === 38 || direction === 38 || direction.keyCode === 73){ // move up
      if (starfish.y > 0){
        starfish.y = (starfish.y - 40);
        starfishImg.style.top = (starfish.y + "px");
      }
    }else if (direction.keyCode === 40 || direction === 40 || direction.keyCode === 75){ // move down
      if (starfish.y < 440){
        starfish.y = (starfish.y + 40);
        starfishImg.style.top = (starfish.y + "px");
      }
    }else if (direction.keyCode === 39 || direction == 39 || direction.keyCode === 76){ // move right
      if (starfish.x < 600){
        starfish.x = (starfish.x + 40);
        starfishImg.style.left = (starfish.x + "px");
      }

    }else if (direction.keyCode === 37 || direction == 37 || direction.keyCode === 74){ // move left
      if (starfish.x > 0){
        starfish.x = (starfish.x - 40);
        starfishImg.style.left = (starfish.x + "px");
      }
    }
    status(alien, alienImg);
    status(alien2, alienImg2);
    status(alien3, alienImg3);
    setTimeout(function(){
      starfish.canMove = true;
    }, 200)
    starfish.canMove = false;
  }
}

function ai_move(player, playerImg){
  var random = Math.floor((Math.random() * 4) + 1);
  // move up
  if (random === 1){
    if (player.y > 0){
      player.y = (player.y - 40);
      playerImg.style.top = (player.y + "px");
    }
  }else if (random === 2){
    // move down
    if (player.y < 440){
      player.y = (player.y + 40);
      playerImg.style.top = (player.y + "px");
    }
  }else if (random === 3){
    // move right
    if (player.x < 600){
      player.x = (player.x + 40);
      playerImg.style.left = (player.x + "px");
    }
 }else{
    //move left
    if (player.x > 0){
      player.x = (player.x - 40);
      playerImg.style.left = (player.x + "px");
    }
 }
}

function status(enemy, enemyImg){
  if (starfish.x === enemy.x && starfish.y === enemy.y && enemy.alive){
    alienCount -= 1;
    enemy.alive = false;
    console.log ('DIE!');
    setTimeout(function(){
      console.log('killing alien');

      enemyImg.style.opacity = "0";
      enemyImg.style.transform = 'rotate(360deg) scale(5)';
      if (alienCount < 1){
        alert("Congratulations you killed the evil Space-Squid-Squad. Now you're free to roam the galaxy in peace... YOU WIN!");
      } else {
        alert("You killed an evil Space-Squid!");
      }
    }, 400);
  }
}



document.onkeydown = move;
