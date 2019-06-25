class Ball extends Entity {
	constructor(game, startX, startY) {
		super(game, startX, startY);
		this.frameWidth = 50;
		this.frameHeight = 50;
		this.size = 50;
	}
	draw(ctx) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = "green";
		this.ctx.rect(
			this.hitB.boundX,
			this.hitB.boundY,
			this.hitB.width,
			this.hitB.height
		);
		this.ctx.stroke();
	}

	/** Update handles updating the objects world state. */
	subClassUpdate() {
		this.updateMyHitBoxes();


		this.boundX = this.x;
		this.boundY = this.y;
	}
	updateMyHitBoxes() {
		this.hitB.width = this.frameWidth;
		this.hitB.height = this.frameHeight;
		this.hitB.boundX = this.boundX + 15;
		this.hitB.boundY = this.boundY;
	}
}