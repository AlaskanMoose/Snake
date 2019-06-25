class Snek extends Entity {
	constructor(game, startX, startY) {
		super(game, startX, startY)
		this.drawAroundHitBox = true;
		this.frameWidth = 50;
		this.frameHeight = 50;
		this.size = 50;
		this.speed = 275;
		this.trail = [];
		this.length = 1;
		this.tail = null;
	}

	/**
	 * Draw takes in the game context and uses that to define what update does.
	 *
	 * @param {any} ctx  A reference to the Game Context.
	 */
	draw(ctx) {
		this.drawAroundBox();

	}

	/** Update handles updating the objects world state. */
	subClassUpdate() {

		if (this.game.moving && this.game.facingDirection == 0) {
			this.x += this.game.clockTick * this.speed;
		}
		if (this.game.moving && this.game.facingDirection == 1) {
			this.x -= this.game.clockTick * this.speed;
		}
		if (this.game.moving && this.game.facingDirection == 2) {
			this.y += this.game.clockTick * this.speed;
		}
		if (this.game.moving && this.game.facingDirection == 3) {
			this.y -= this.game.clockTick * this.speed;
		}
		this.boundX = this.x;
		this.boundY = this.y;

		this.updateMyHitBoxes();
	}

	handleSnekCollision()[

	]
}