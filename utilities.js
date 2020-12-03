function animate() {
  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  ctx4.clearRect(0, 0, canvas.width, canvas.height);
  ctx5.clearRect(0, 0, canvas.width, canvas.height);
  handleRipples();
  ctx2.drawImage(background_lvl2, 0, 0);
  handleParticles();
  grandpa.draw();
  grandpa.update();
 handleObstacles();
  handleScoreBoard();
  ctx4.drawImage(grass, 0, 0);
  frame++;
  requestAnimationFrame(animate);
}
animate();

// event listeners
window.addEventListener('keydown', function (e) {
  keys = [];
  keys[e.keyCode] = true;
  if (keys[37] || keys[38] || keys[39] || keys[40]) {
    grandpa.jump();
  }
});

window.addEventListener('keyup', function (e) {
  delete keys[e.keyCode];
  grandpa.moving = false;
  grandpa.frameX = 0;
});

function scored() {
  score++;
  gameSpeed += 0.05;
  grandpa.x = canvas.width / 2 - grandpa.width / 2;
  grandpa.y = canvas.height - grandpa.height - 40;
}

function handleScoreBoard() {
  ctx4.fillStyle = 'black';
  ctx4.strokeStyle = 'black';
  ctx4.font = '15px Verdana';
  ctx4.strokeText('Saved', 265, 20);
  ctx4.font = '60px Verdana';
  ctx4.fillText(score, 270, 75);
  ctx4.font = '17px Verdana';
  ctx4.strokeText('Dead: ' + infectedCount, 10, 25);
  ctx4.strokeText('Game Speed: ' + gameSpeed.toFixed(1), 444, 25);
}

// collision detection between two rectangles
function collision(first, second) {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  );
}

// Still to do: Game Over + Reset button | StartGame button

// Reset game
function resetGame() {
  grandpa.x = canvas.width / 2 - grandpa.width / 2;
  grandpa.y = canvas.height - grandpa.height - 40;
  infectedCount++;
  gameSpeed = 1;
}

// Game Over function 
function gameOver() {
  if(infectedCount.length === 10 ){
    alert("Game Over! Wanna try again?");
  }
}

