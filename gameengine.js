/**
 * GameEngine is the... game engine of the game world. Acts as the interface between
 * a user and the game world.
 */
class GameEngine {
	/**
	 *  Initializes fields for the GameEngine. This includes creating an array for the
	 *  potential entities that will get loaded into the world, and declaring a game
	 *  context that will eventually get intialized.
	 *
	 *  @constructor
	 */
	constructor() {
		this.entities = [];
		this.ctx = null;
		this.canvasWidth = null;
		this.canvasHeight = null;
		this.drawAroundHitBox = false;
		this.size = 20;
	}

	/**
	 * Initializes the game worlds event listeners and functions for controlling
	 * animation.
	 *
	 * @param {any} ctx A reference to the game context.
	 */
	init(
		gameCtx,
		assetManager
	) {
		// initialize game world features. Context, timer, canvas width and height, etc.
		this.ctx = gameCtx;
		this.AM = assetManager;
		this.canvasWidth = this.ctx.canvas.width;
		this.canvasHeight = this.ctx.canvas.height;
		this.timer = new Timer();

		// Initialize snek
		this.snek = new Snek(this, 100, 100);
		this.addEntity(this.snek);

		// Initialize ball
		this.addEntity(this.returnRandomBall());

		// Set listeners
		this.initializeEventListeners();

		console.log("game initialized");
	}

	/** Starts the game world by getting the loop and callback circle started. */
	start() {
		console.log("starting game");
		let that = this;
		(function gameLoop() {
			that.loop();
			requestAnimationFrame(gameLoop, that.ctx.canvas);
		})();
	}

	/**
	 * The meat and potatoes of the game world. Adds entities to the game.
	 */
	addEntity(entity) {
		console.log("added entity");
		this.entities.push(entity);
	}

	/**
	 *  Calls all of the entities draw function that have been added to the engines
	 *  entity[] array.
	 */
	draw() {
		// normal draw function for each entity. We didn't make this.
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.ctx.save();
		for (let i = 0; i < this.entities.length; i++) {
			this.entities[i].draw(this.ctx);
		}
		this.ctx.restore();

		// Trying to make a debug tool for hit boxes. In Work.
		for (let i = 0; i < this.entities.length; i++) {
			if (this.drawAroundHitBox) {
				this.entities[i].drawAroundHitBox = !this.entities[i].drawAroundHitBox;
			}
		}
	}

	/** Handles updating the entities world state. */
	update() {
		if (this.snek.gameOver == true) {
			this.entities = [];
			this.snek = new Snek(this, 100, 100);
			this.addEntity(this.snek);
			this.addEntity(this.returnRandomBall());
			this.facingDirection = 10;
		}
		let entitiesCount = this.entities.length;

		for (let i = 0; i < entitiesCount; i++) {
			let entity = this.entities[i];
			entity.update();
		}
	}

	/** Keeps the world ticking. */
	loop() {
		// everyone's clock tick besides blink
		this.clockTick = this.timer.tick();

		// As loop is continuously called, drive the game for all
		this.update();
		this.draw();
	}


	/** Initializes event listeners for game. */
	initializeEventListeners() {
		// use that to refer to other classes use of these listeners
		const that = this;

		// Event Listeners
		this.ctx.canvas.addEventListener(
			"mousedown",
			e => {
				switch (e.button) {
					case 0:
						that.levelStarted = true;
						break;
					default:
						break;
				}
			},
			false
		);

		// Event Listeners
		this.ctx.canvas.addEventListener(
			"keydown",
			e => {
				switch (e.key) {
					case "ArrowRight":
						if (that.facingDirection == 1 && that.snek.trail.length > 0)
							that.snek.gameOver = true;
						that.facingDirection = 0;
						break;
					case "ArrowLeft":
						if (that.facingDirection == 0 && that.snek.trail.length > 0)
							that.snek.gameOver = true;
						that.facingDirection = 1;
						break;
					case "ArrowDown":
						if (that.facingDirection == 3 && that.snek.trail.length > 0)
							that.snek.gameOver = true;
						that.facingDirection = 2;
						break;
					case "ArrowUp":
						if (that.facingDirection == 2 && that.snek.trail.length > 0)
							that.snek.gameOver = true;
						that.facingDirection = 3;
						break;

					default:
						break;
				}
				e.preventDefault();
			},
			false
		);

		this.ctx.canvas.addEventListener(
			"keyup",
			e => {
				switch (e.key) {
					case "ArrowRight":
						that.moving = false;
						break;
					case "ArrowLeft":
						that.moving = false;
						break;
					case "ArrowDown":
						that.moving = false;
						break;
					case "ArrowUp":
						that.moving = false;
						break;

					default:
						break;
				}
				e.preventDefault();
			},
			false
		);
	}
	returnRandomBall() {
		let cols = Math.floor((this.canvasWidth - 50) / this.size);
		let rows = Math.floor((this.canvasHeight - 50) / this.size);
		let randomX = this.getRandomInt(cols) * this.size;
		let randomY = this.getRandomInt(rows) * this.size;
		return new Ball(this, randomX, randomY);
	}
	getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}
}

// This helps discover what type of browser it will be communicating with
window.requestAnimFrame = (function () {
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback, element) {
			window.setTimeout(callback, 1000 / 60);
		}
	);
})();