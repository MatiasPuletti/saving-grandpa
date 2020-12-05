class Obstacle {
  constructor(x, y, width, height, speed, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
    this.frameX = 0;
    this.frameY = 0;
    this.randomise = Math.floor(Math.random() * 30 + 30);
    this.carType = Math.floor(Math.random() * numberOfCars);
  }
  draw() {
    if (this.type === 'turtle') {
      if (frame % this.randomise === 0) {
        if (this.frameX >= 1) this.frameX = 0;
        else this.frameX++;
      }
      ctx1.drawImage(
        turtle,
        this.frameX * 70,
        this.frameY * 70,
        70,
        70,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (this.type === 'log') {
      ctx1.drawImage(log, this.x, this.y, this.width, this.height);
    } else {
      ctx2.drawImage(
        car,
        this.frameX * this.width,
        this.carType * this.height,
        grid * 2,
        grid,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
  update() {
    this.x += this.speed * gameSpeed;
    if (this.speed > 0) {
      if (this.x > canvas.width + this.width) {
        this.x = 0 - this.width;
        this.carType = Math.floor(Math.random() * numberOfCars);
      }
    } else {
      this.frameX = 1;
      if (this.x < 0 - this.width) {
        this.x = canvas.width + this.width;
        this.carType = Math.floor(Math.random() * numberOfCars);
      }
    }
  }
}

function initObstacles() {
  // lane 1
  for (let i = 0; i < 2; i++) {
    let x = i * 350;
    virusArray.push(
      new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, 'car')
    );
  }
  // lane 2
  for (let i = 0; i < 2; i++) {
    let x = i * 300;
    virusArray.push(
      new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, 'car')
    );
  }
  // lane 3
  for (let i = 0; i < 2; i++) {
    let x = i * 400;
    virusArray.push(
      new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, 'car')
    );
  }
  // lane 4
  for (let i = 0; i < 2; i++) {
    let x = i * 400;
    logsArray.push(
      new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log')
    );
  }
  // lane 5
  for (let i = 0; i < 3; i++) {
    let x = i * 200;
    logsArray.push(
      new Obstacle(x, canvas.height - grid * 6 - 20, grid, grid, 1, 'turtle')
    );
  }
}
initObstacles();

function handleObstacles() {
  for (let i = 0; i < virusArray.length; i++) {
    virusArray[i].update();
    virusArray[i].draw();
  }
  for (let i = 0; i < logsArray.length; i++) {
    logsArray[i].update();
    logsArray[i].draw();
  }
  // collision with car
  for (let i = 0; i < virusArray.length; i++) {
    if (collision(grandpa, virusArray[i])) {
      ctx4.drawImage(
        collisions,
        0,
        100,
        100,
        100,
        grandpa.x,
        grandpa.y,
        50,
        50
      );
      hitSound.play();
      resetGame();
    }
  }
  // collisions with logs/turles
  if (grandpa.y < 250 && grandpa.y > 100) {
    safe = false;

    for (let i = 0; i < logsArray.length; i++) {
      if (collision(grandpa, logsArray[i])) {
        grandpa.x += logsArray[i].speed;
        safe = true;
      }
    }
    if (!safe) {
      for (let i = 0; i < 30; i++) {
        ripplesArray.unshift(new Particle(grandpa.x, grandpa.y));
      }
      resetGame();
    }
  }
}
