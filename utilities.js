// Create a custom function. Clear canvas and pass it canvas dimensions
// Call draw method
// Call grandpa update
// Call itself again to create a loop

function animate() {
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.drawImage(background, 0, 0, canvas.width, canvas.height);
  grandpa.draw();
  grandpa.update();
  handleObstacles();
  handleScore();
  ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}

animate();

// Moving the grandpa with event listeners
window.addEventListener('keydown', function (e) {
  // Set keys to empty array in case in holds some values from before
  keys = [];
  keys[e.keyCode] = true;
  if (keys[37] || keys[38] || keys[39] || keys[40]) {
    grandpa.jump;
  }
});

window.addEventListener('keyup', function (e) {
  delete keys[e.keyCode];
  grandpa.moving = false;
});

function scored() {
  score++;
  gameSpeed += 0.05;
  // Take grandpa back to starting position
  grandpa.x = canvas.width / 2 - grandpa.width / 2;
  grandpa.y = canvas.height - grandpa.height - 40;
}

function handleScore() {
  ctx4.fillStyle = 'black';
  ctx4.strokeStyle = 'black';
  ctx4.font = '20px Montserrat';
  ctx4.strokeText('Saved :', 10, 40);
  ctx4.font = '40px Montserrat';
  ctx4.fillText(score, 86, 40);
  ctx4.font = '21px Montserrat';
  ctx4.strokeText(`Infected: ` + infectedCount, 10, 65);
  ctx4.strokeText('Game Speed: ' + gameSpeed, 10, 85);
}
