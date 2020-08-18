import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
  assetName = Constants.SKIER_DOWN;

  direction = Constants.SKIER_DIRECTIONS.DOWN;
  speed = Constants.SKIER_STARTING_SPEED;

  //.....Added by Tomer 5/14....
  jumpDirection = Constants.SKIER_DIRECTIONS.DOWN; //init jump direction start
  skierDistanceCounter = 0; //Counter the skier sking till he gets caught by rhino
  jumpCounter = 0; //Counter for skier jump
  catchByRhinoCounter = 0; //Counter for the skier getting eaten by rhino
  crashingRecordCounter = 0; //Counter that count the times that the skier get crashed
  lastCrash = null; //Record for the last collision that cause the skier to get crashed
  //............................

  constructor(x, y) {
    super(x, y);
  }

  setDirection(direction) {
    console.log("direction: ", direction);
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
      //.....Added by Tomer 5/14..........
      case Constants.SKIER_DIRECTIONS.JUMP:
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
        break;
    }
  }

  moveSkierLeft() {
    this.x -= Constants.SKIER_STARTING_SPEED;
  }

  moveSkierLeftDown() {
    this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
  }

  moveSkierDown() {
    this.y += this.speed;
  }

  moveSkierRightDown() {
    this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
  }

  moveSkierRight() {
    this.x += Constants.SKIER_STARTING_SPEED;
  }

  moveSkierUp() {
    this.y -= Constants.SKIER_STARTING_SPEED;
  }

  turnLeft() {
    if (this.jumpCounter === 0) {
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
    if (this.jumpCounter === 0) {
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
    if (this.jumpCounter === 0) {
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
      this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
      this.jumpCounter = 0;
    }
  }

  //Added by Tomer 8/17.....
  moveSkierDownAfterCrashing() {
    this.y += Constants.SKIER_MOVING_FORWARD_DISTANCE_AFTER_CRASHING;
  }

  jump() {
    console.log("JUMP JUMP... ");
    if (
      this.jumpCounter == 0 &&
      this.direction != Constants.SKIER_DIRECTIONS.CRASH
    ) {
      this.setJumpDirection(this.direction);
      this.setDirection(Constants.SKIER_DIRECTIONS.JUMP);
    }
  }
  setJumpDirection(direction) {
    this.jumpDirection = direction;
  }

  setSkierToTheRightDirectionOnJump(endjump) {
    if (this.jumpDirection == Constants.SKIER_DIRECTIONS.LEFT_DOWN) {
      this.moveSkierLeftDown();
    } else if (this.jumpDirection == Constants.SKIER_DIRECTIONS.RIGHT_DOWN) {
      this.moveSkierRightDown();
    } else {
      this.moveSkierDown();
    }
    if (endjump) {
      this.setDirection(this.jumpDirection);
    }
  }
  //........................
}
