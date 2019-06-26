class Snek extends Entity {
	constructor(game, startX, startY) {
		super(game, startX, startY)
		this.drawAroundHitBox = true;
		this.frameWidth = 20;
		this.frameHeight = 20;
		this.size = 20;
		this.speed = 7;
		this.trail = [];
		this.gameOver = false;
		this.boundX = this.x;
		this.boundY = this.y;
		this.clockTickPassed = 0;
	}

	/**
	 * Draw takes in the game context and uses that to define what update does.
	 *
	 * @param {any} ctx  A reference to the Game Context.
	 */
	draw(ctx) {
		this.drawAroundBox();

		// Draw the tail
		for (let i = 0; i < this.trail.length; i++) {
			this.trail[i].drawHitBox();
		}
	}

	/** Update handles updating the objects world state. */
	subClassUpdate() {
		// console.log(this.x);
		// console.log(this.y);
		this.handleSnekCollision();

		this.updateTail();

		if (this.game.facingDirection == 0) {
			this.x += this.game.clockTick * this.speed * this.size;
			this.boundX += this.game.clockTick * this.speed * this.size;
		} else if (this.game.facingDirection == 1) {
			this.x -= this.game.clockTick * this.speed * this.size;
			this.boundX -= this.game.clockTick * this.speed * this.size;
		} else if (this.game.facingDirection == 2) {
			this.y += this.game.clockTick * this.speed * this.size;
			this.boundY += this.game.clockTick * this.speed * this.size;
		} else if (this.game.facingDirection == 3) {
			this.y -= this.game.clockTick * this.speed * this.size;
			this.boundY -= this.game.clockTick * this.speed * this.size;
		}

		this.boundX = this.x;
		this.boundY = this.y;
		this.updateMyHitBoxes();

	}
	// Updates the location of tail
	updateTail() {
		if (this.trail.length > 0) {
			let last = this.trail.pop();
			this.lastX = last.boundX;
			this.lastY = last.boundY;
			this.trail.unshift(new Hitbox(this.game, this.boundX, this.boundY, this.size, this.size, null));
		}
	}
	// Starts at 1 cause the head is at 1
	handleSnekCollision() {
		for (let i = 1; i < this.game.entities.length; i++) {
			let other = this.game.entities[i];
			if (other instanceof Ball && this.hitB.collision(other.hitB)) {
				console.log("I hit a ball");
				console.log(this.trail.length);
				// Remove ball and add a new one at a new spot
				this.game.entities.splice(i, 1);
				this.game.entities.push(this.game.returnRandomBall());


				if (this.trail.length > 0) {
					this.trail.push(new Hitbox(this.game, this.lastX, this.lastY, this.size, this.size, null));

				} else {
					this.trail.push(new Hitbox(this.game, this.lastX, this.lastY, this.size, this.size, null));
				}
			} else if (this.hitB.collision(other.hitB)) {
				console.log("im hit");
			}

		}
		if (this.x > this.game.canvasWidth || this.x < 0 ||
			this.y > this.game.canvasHeight - 1 || this.y < 0) {

			this.gameOver = true;
			console.log("game over");
		}
		for (let i = 0; i < this.trail.length - 1; i++) {
			let p = this.trail[i];
			if (p.boundX == this.boundX && p.boundY == this.boundY) {
				this.gameOver = true;
				console.log("game over");
			}
		}
	}


}