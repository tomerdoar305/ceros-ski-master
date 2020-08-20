import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from "./Canvas";
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { RhinoManager } from "../Entities/Rhinos/RhinoManager";
import { Rect } from "./Utils";

export class Game {
  gameWindow = null;

  constructor() {
    this.assetManager = new AssetManager();
    this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
    this.skier = new Skier(0, 0);
    this.obstacleManager = new ObstacleManager();
    this.rhinoManager = new RhinoManager();

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  init() {
    this.obstacleManager.placeInitialObstacles();
  }

  async load() {
    await this.assetManager.loadAssets(Constants.ASSETS);
  }

  run() {
    this.canvas.clearCanvas();
    this.updateGameWindow();
    this.drawGameWindow();
    requestAnimationFrame(this.run.bind(this));
  }

  updateGameWindow() {
    this.skier.move();
    const previousGameWindow = this.gameWindow;
    this.calculateGameWindow();
    this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

    //This is a call to place new rhino or to move existing rhinos in the screen
    this.rhinoManager.placeNewRhinoOrMoveExistingRhinos(
      this.skier,
      this.gameWindow,
      previousGameWindow
    );

    this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);

    //This is a call to check if skier got caught by rhino
    this.skier.checkIfSkierGetCaughtByRhino(
      this.rhinoManager,
      this.assetManager
    );
  }

  drawGameWindow() {
    this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

    this.skier.draw(this.canvas, this.assetManager);
    this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    this.rhinoManager.drawRhinos(this.canvas, this.assetManager);
  }

  calculateGameWindow() {
    const skierPosition = this.skier.getPosition();
    const left = skierPosition.x - Constants.GAME_WIDTH / 2;
    const top = skierPosition.y - Constants.GAME_HEIGHT / 2;

    this.gameWindow = new Rect(
      left,
      top,
      left + Constants.GAME_WIDTH,
      top + Constants.GAME_HEIGHT
    );
  }

  handleKeyDown(event) {
    switch (event.which) {
      case Constants.KEYS.LEFT:
        this.skier.turnLeft();
        event.preventDefault();
        break;
      case Constants.KEYS.RIGHT:
        this.skier.turnRight();
        event.preventDefault();
        break;
      case Constants.KEYS.UP:
        this.skier.turnUp();
        event.preventDefault();
        break;
      case Constants.KEYS.DOWN:
        this.skier.turnDown();
        event.preventDefault();
        break;

      // Added by Tomer.........
      case Constants.KEYS.JUMP:
        this.skier.jump();
        event.preventDefault();
        break;
      case Constants.KEYS.RESET_GAME:
        this.resetGame();
        break;
      //..........................
    }
  }

  // Added by Tomer............
  resetGame() {
    this.skier.assetName = Constants.SKIER_DOWN;
    this.skier.direction = Constants.SKIER_DIRECTIONS.DOWN;
    this.skier.speed = Constants.SKIER_STARTING_SPEED;
    this.skier.jumpDirection = Constants.SKIER_DIRECTIONS.DOWN;
    this.skier.skierDistanceCounter = 0;
    this.skier.jumpCounter = 0;
    this.skier.x = 0;
    this.skier.y = 0;
    this.obstacleManager.rhinos = [];
    this.obstacleManager.obstacles = [];
    this.obstacleManager.placeInitialObstacles();
  }
  //..............................
}
