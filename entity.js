/**
 * Entity object. Handles adding 'entities' to the game world, which usually represent
 * a variety of in world objects such as characters, platforms, etc. that may be
 * interacted with both directly and indirectly.
 *
 */
class Entity {
	/**
	 * Creates an instance of an entity and adds it to the game world.
	 *
	 * @constructor
	 * @param {any} game A reference to the game engine.
	 * @param {any} x The x coordinate for the entity to be loaded in reference to the
	 *                game world.
	 * @param {any} y The y coordinate for the entity to be loaded in reference to the
	 *                game world.
	 *
	 * @param {any} removed Indicates whether the entity has been removed from world and
	 *                      should be updated
	 */
	constructor(game, x, y) {
		this.game = game;
		this.ctx = this.game.ctx;
		this.x = x;
		this.y = y;
		this.boundX = this.x;
		this.boundY = this.y;
		this.currentHealth = this.health;
		this.isDead = false;
		this.hitB = new Hitbox(
			this.game,
			this.boundX,
			this.boundY,
			this.frameWidth,
			this.frameHeight,
		);

	}

	/** Update handles updating the objects world state. */
	update() {
		// Calls each entity subclasses update method
		this.subClassUpdate();
	}

	/**
	 * Draws the entity within the game world.
	 *
	 * @param {any} ctx A reference to the game context.
	 */
	draw(ctx) {

	}


	// debug tool, draws rectangle around entity on screen
	drawAroundBox() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = "black";
		this.ctx.rect(
			this.hitB.boundX,
			this.hitB.boundY,
			this.hitB.width,
			this.hitB.height
		);
		this.ctx.stroke();
	}

	// Implement this method when Enity is inherited
	handleCollison(other, type) {}

	// Updates Hit Boxes
	updateMyHitBoxes() {
		this.hitB.width = this.frameWidth;
		this.hitB.height = this.frameHeight;
		this.hitB.boundX = this.boundX;
		this.hitB.boundY = this.boundY;
	}

}