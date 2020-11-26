class Obstacle {
    constructor(x, y, width, height, speed, type) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.type = type;
    }
    draw() {
      // Draw obstacle
      ctx3.fillStyle = 'blue';
      ctx3.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
      // Move obstacles horizontally and increase speed as score increases. Reason for multiplying is that obstacles will be moving from both signs. If I use + or - I will end up changing the sign.
      this.x += this.speed * gameSpeed;
      // The first reset checks for virus coming from the left and the second from right.
      if (this.speed > 0) {
        if (this.x > canvas.width + this.width) this.x = 0 - this.width;
      } else {
        if (this.x < 0 - this.width) {
          this.x = canvas.width + this.width;
        }
      }
    }
  }
  
  function initObstacles() {
    // Lane 1 - Adding 2 virus
    for (let i = 0; i < 2; i++) {
      // Temporary variable
      let x = i * 350;
      virusArray.push(
        new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, 'virus')
      );
    }
    // Lane 2 - More virus
    for (let i = 0; i < 2; i++) {
      let x = i * 300;
      virusArray.push(
        new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -5, 'virus')
      );
    }
    // Lane 3 - Runs twice and every time it pushes 2 obstacles to the array. Dependiendo que tan wide hago el grid *2 es lo wide que voy a hacer el object
    for (let i = 0; i < 2; i++) {
      let x = i * 400;
      virusArray.push(
        new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, 'virus')
      );
    }
    // Lane 4 - Runs twice - Creates 2 objects
    for (let i = 0; i < 2; i++) {
      let x = i * 400;
      logsArray.push(
        new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log')
      );
    }
    // Lane 5 - Turtles
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
  }
  