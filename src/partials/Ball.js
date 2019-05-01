import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ballspeed = 0.8;

    this.reset();
  }


  wallCollision() {
    if (this.x - this.radius <= 0 || this.x + this.radius >= this.boardWidth) {
      this.vx = -this.vx;
    } else if (this.y - this.radius <= 0 || this.y + this.radius >= this.boardHeight) {
      this.vy = -this.vy;
    }

  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height)
      let [leftX, rightX, topY, bottomY] = paddle;
      // console.log(leftX, rightX, topY, bottomY); 

      if ((this.x + this.radius >= leftX)
        && (this.x + this.radius <= rightX)
        && (this.y >= topY && this.y <= bottomY)) {
        this.vx = -this.vx;
      }



    } else {

      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height)
      let [leftX, rightX, topY, bottomY] = paddle;

      if ((this.x - this.radius <= rightX)
        && (this.x - this.radius >= leftX)
        && (this.y >= topY && this.y <= bottomY)) {
        this.vx = -this.vx;
      }

    }
  }

  reset(svg) {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    // creates a random number between -5 and 5 that isn't 0
    // This controls the speed and direction of the ball
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));

  }

  goal(player) {
    player.score++;
    this.reset();

    //The first player to get 10 points is declared the winner and the game ask if you would like to play again.

    if (player.score === 10) {
     
      if (player.x === 10) {
        window.confirm("PLAYER 1 WINS! Would you like to play again?");
        (location.reload());
      }else{
        window.confirm("PLAYER 1 WINS! Would you like to play again?");
        (location.reload()); 
      }

    }

    // Increases ball speed by 10% after every goal up to a max speed of 2.5

    if (this.ballspeed <= 2.5) {
      this.ballspeed *= 1.1
      console.log(this.ballspeed)

    }



  }

  render(svg, player1, player2) {
    this.x += this.vx * this.ballspeed;
    this.y += this.vy * this.ballspeed;



    this.wallCollision();
    this.paddleCollision(player1, player2)

    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'fill', 'white');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x); //x of the centre point
    circle.setAttributeNS(null, 'cy', this.y); //y of the centre point
    svg.appendChild(circle);

    //Detect Goal
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }

  }


}
