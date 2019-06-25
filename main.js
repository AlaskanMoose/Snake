var AM = new AssetManager();


AM.queueDownload("./img/coolbackground.png");


AM.downloadAll(function () {
	window.onload = function () {
		// Load game world. This is the top layer
		var canvas = document.getElementById("gameWorld");
		var gameCtx = canvas.getContext("2d");

		var gameEngine = new GameEngine();

		gameCtx.canvas.focus();

		// Send canvas' to game engine
		gameEngine.init(
			gameCtx,
			AM
		);
		gameEngine.start();

		console.log("All Done!");
	};
});