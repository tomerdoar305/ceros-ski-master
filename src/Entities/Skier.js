import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
  assetName = Constants.SKIER_DOWN;

  direction = Constants.SKIER_DIRECTIONS.DOWN;
  speed = Constants.SKIER_STARTING_SPEED;

  // Added by Tomer.............
  jumpDirection = Constants.SKIER_DIRECTIONS.DOWN; //Init jump direction start
  skierDistanceCounter = 0; //Counter distance for the skier
  jumpCounter = 0; //Counter for skier jump
  //............................

  constructor(x, y) {
    super(x, y);
  }

  setDirection(direction) {
    this.direction = direction;
    this.updateAsset();
  }

  updateAsset() {
    this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
  }

  move() {
    switch (this.direction) {
      case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
        this.moveSkierLeftDown();
        break;
      case Constants.SKIER_DIRECTIONS.DOWN:
        this.moveSkierDown();
        break;
      case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
        this.moveSkierRightDown();
        break;
      // Added by Tomer.........
      case Constants.SKIER_DIRECTIONS.JUMP:
        this.setJumpPosition();
        break;
      //........................
    }
  }

  moveSkierLeft() {
    this.x -= Constants.SKIER_STARTING_SPEED;
    this.increaseSkierDistanceCounter();
  }

  moveSkierLeftDown() {
    this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.increaseSkierDistanceCounter();
  }

  moveSkierDown() {
    this.y += this.speed;
    this.increaseSkierDistanceCounter();
  }

  moveSkierRightDown() {
    this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.increaseSkierDistanceCounter();
  }

  moveSkierRight() {
    this.x += Constants.SKIER_STARTING_SPEED;
    this.increaseSkierDistanceCounter();
  }

  moveSkierUp() {
    this.y -= Constants.SKIER_STARTING_SPEED;
    this.increaseSkierDistanceCounter();
  }

  /*
    This function move the skier to the left only if the skier is not in jumping position 
    (because he cant move left if he is in the air).
    It also checks if the skier is in crash position (that is the bug that needed to be fixed).
  */
  turnLeft() {
    if (this.direction !== Constants.SKIER_DIRECTIONS.JUMP) {
      if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
        this.moveSkierLeft();
      } else {
        if (this.direction == Constants.SKIER_DIRECTIONS.CRASH) {
          this.moveSkierDownAfterCrashing();
          this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        } else {
          this.setDirection(this.direction - 1);
        }
      }
    }
  }

  turnRight() {
    if (this.direction !== Constants.SKIER_DIRECTIONS.JUMP) {
      if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
        this.moveSkierRight();
      } else {
        this.setDirection(this.direction + 1);
      }
    }
  }

  turnUp() {
    if (
      this.direction === Constants.SKIER_DIRECTIONS.LEFT ||
      this.direction === Constants.SKIER_DIRECTIONS.RIGHT
    ) {
      this.moveSkierUp();
    }
  }

  turnDown() {
    if (this.direction !== Constants.SKIER_DIRECTIONS.JUMP) {
      this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }
  }

  checkIfSkierHitObstacle(obstacleManager, assetManager) {
    const asset = assetManager.getAsset(this.assetName);
    const skierBounds = new Rect(
      this.x - asset.width / 2,
      this.y - asset.height / 2,
      this.x + asset.width / 2,
      this.y - asset.height / 4
    );

    const collision = obstacleManager.getObstacles().find((obstacle) => {
      const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
      const obstaclePosition = obstacle.getPosition();
      const obstacleBounds = new Rect(
        obstaclePosition.x - obstacleAsset.width / 2,
        obstaclePosition.y - obstacleAsset.height / 2,
        obstaclePosition.x + obstacleAsset.width / 2,
        obstaclePosition.y
      );

      return intersectTwoRects(skierBounds, obstacleBounds);
    });

    if (collision) {
      // Case that the skier is getting on a ramp and start jumping
      if (
        this.direction !== Constants.SKIER_DIRECTIONS.JUMP &&
        collision.assetName === Constants.JUMP_RAMP
      ) {
        this.jump();
      }
      // Case that the skier is jumping on top of Rocks
      else if (
        (collision.assetName === Constants.ROCK1 ||
          collision.assetName === Constants.ROCK2) &&
        this.direction === Constants.SKIER_DIRECTIONS.JUMP
      ) {
        return;
      }
      // Case that the skier is hitting a Obstacle (trees or rocks)
      else if (collision.assetName !== Constants.JUMP_RAMP) {
        this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        this.jumpCounter = 0;
      }
    }
  }

  // This is a function that count the distance of the skier.
  increaseSkierDistanceCounter() {
    this.skierDistanceCounter++;
  }

  // This is a function that move the skier down after he got crashed by a rock or a tree
  moveSkierDownAfterCrashing() {
    this.y += Constants.SKIER_MOVING_FORWARD_DISTANCE_AFTER_CRASHING;
    this.increaseSkierDistanceCounter();
  }

  /* 
    This is a function that getting execute when the jump key is pressed.
    Its only get execute if the skier is not in jumping process and not crashed. 
  */
  jump() {
    if (
      this.jumpCounter === 0 &&
      this.direction !== Constants.SKIER_DIRECTIONS.CRASH
    ) {
      this.jumpDirection = this.direction;
      this.setDirection(Constants.SKIER_DIRECTIONS.JUMP);
    }
  }

  /* 
    This function is for setting the animations of the jump (when the skier is in the air)
  */
  setJumpPosition() {
    if (0 <= this.jumpCounter && this.jumpCounter < 20) {
      this.setSkierToTheRightDirectionOnJump(false);
      this.assetName = Constants.SKIER_JUMP_2;
      this.jumpCounter++;
    } else if (20 <= this.jumpCounter && this.jumpCounter < 30) {
      this.setSkierToTheRightDirectionOnJump(false);
      this.assetName = Constants.SKIER_JUMP_3;
      this.jumpCounter++;
    } else if (30 <= this.jumpCounter && this.jumpCounter < 40) {
      this.setSkierToTheRightDirectionOnJump(false);
      this.assetName = Constants.SKIER_JUMP_4;
      this.jumpCounter++;
    } else if (40 <= this.jumpCounter && this.jumpCounter < 50) {
      this.setSkierToTheRightDirectionOnJump(false);
      this.assetName = Constants.SKIER_JUMP_5;
      this.jumpCounter++;
    } else {
      this.jumpCounter = 0;
      this.setSkierToTheRightDirectionOnJump(true);
    }
  }

  /* 
    This function to move the skier to the right direction when he is jumping on the air
  */
  setSkierToTheRightDirectionOnJump(endjump) {
    if (this.jumpDirection == Constants.SKIER_DIRECTIONS.LEFT_DOWN) {
      this.moveSkierLeftDown();
    } else if (this.jumpDirection == Constants.SKIER_DIRECTIONS.RIGHT_DOWN) {
      this.moveSkierRightDown();
    } else {
      this.moveSkierDown();
    }
    if (endjump) {
      switch (this.jumpDirection) {
        case Constants.SKIER_DIRECTIONS.LEFT:
        case Constants.SKIER_DIRECTIONS.RIGHT:
          this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
          break;
        default:
          this.setDirection(this.jumpDirection);
          break;
      }
    }
  }

  /* 
    This function is to check if the if there is a rhino on the screen that caught the skier.
  */
  checkIfSkierGetCaughtByRhino(rhinoManager, assetManager) {
    const asset = assetManager.getAsset(this.assetName);
    const skierBounds = new Rect(
      this.x - asset.width / 2,
      this.y - asset.height / 2,
      this.x + asset.width / 2,
      this.y - asset.height / 4
    );

    const rhinoThatCaughtTheSkier = rhinoManager.getRhinos().find((rhino) => {
      const rhinoAsset = assetManager.getAsset(rhino.getAssetName());
      const rhinoPosition = rhino.getPosition();
      const rhinoBounds = new Rect(
        rhinoPosition.x - rhinoAsset.width / 2,
        rhinoPosition.y - rhinoAsset.height / 2,
        rhinoPosition.x + rhinoAsset.width / 2,
        rhinoPosition.y
      );

      return intersectTwoRects(skierBounds, rhinoBounds);
    });

    if (rhinoThatCaughtTheSkier) {
      rhinoThatCaughtTheSkier.changeRhinoCatchesSkierAsset();
      rhinoManager.stopRhinosRunning(rhinoThatCaughtTheSkier);
      this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
    }
  }
}
