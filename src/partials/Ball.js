import {SVG_NS} from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.speed = 15;

    this.reset();
  }

  wallCollision(){
    if (this.x - this.radius <= 0 || this.x + this.radius >= this.boardWidth){
      this.vx = -this.vx;
    } else if (this.y - this.radius <= 0 || this.y + this.radius >= this.boardHeight){
      this.vy = -this.vy;
    }

  }

  reset(svg){
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    // creates a random number between -5 and 5 that isn't 0

    this.vy = 0;
    while(this.vy === 0){
    this.vy = Math.floor(Math.random() * 10 - 5);
  }
    this.vx = this.direction * (6 - Math.abs(this.vy));
    
  }

    render(svg) {
      this.x += this.vx;
      this.y += this.vy;

      this.wallCollision();

      let circle = document.createElementNS(SVG_NS, 'circle');
          circle.setAttributeNS(null, 'fill', 'white');
          circle.setAttributeNS(null, 'r', this.radius);
          circle.setAttributeNS(null, 'cx', this.x); //x of the centre point
          circle.setAttributeNS(null, 'cy', this.y); //y of the centre point
          svg.appendChild(circle);

    }
  }