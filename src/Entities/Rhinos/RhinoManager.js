import * as Constants from "../../Constants";
import { randomInt } from "../../Core/Utils";
import { Rhino } from "./Rhino";

const DISTANCE_BETWEEN_RHINOS = 50;
const NEW_OBSTACLE_RHINO_REDUCER = 300;

export class RhinoManager {
  rhinos = [];

  constructor() {}

  getRhinos() {
    return this.rhinos;
  }

  drawRhinos(canvas, assetManager) {
    this.rhinos.forEach((rhino) => {
      rhino.draw(canvas, assetManager);
    });
  }

  //Placing a new Rhino if there are no Rhinos in the Game Window.
  //If there are Rhinos in the Game Window, moving them closer to the skier.
  placeNewRhinoOrMoveExistingRhinos(skier, gameWindow, previousGameWindow) {
    if (
      skier.skierDistanceCounter <
      Constants.SKIER_DISTANCE_SKING_VALUE_FOR_RHINO_TO_APPEAR
    ) {
      return;
    }

    const rhinosInTheGameWindow = this.checkIfThereIsRhinoInTheGameWindow(
      gameWindow
    );
    const shouldPlaceObstacle = randomInt(1, NEW_OBSTACLE_RHINO_REDUCER);
    if (
      rhinosInTheGameWindow.length == 0 &&
      shouldPlaceObstacle == NEW_OBSTACLE_RHINO_REDUCER
    ) {
      if (gameWindow.left < previousGameWindow.left) {
        this.placeRandomRhino(
          gameWindow.left,
          gameWindow.left,
          gameWindow.top,
          gameWindow.bottom
        );
      } else if (gameWindow.left > previousGameWindow.left) {
        this.placeRandomRhino(
          gameWindow.right,
          gameWindow.right,
          gameWindow.top,
          gameWindow.bottom
        );
      }
      if (gameWindow.top < previousGameWindow.top) {
        this.placeRandomRhino(
          gameWindow.left,
          gameWindow.right,
          gameWindow.top,
          gameWindow.top
        );
      } else if (gameWindow.top > previousGameWindow.top) {
        this.placeRandomRhino(
          gameWindow.left,
          gameWindow.right,
          gameWindow.bottom,
          gameWindow.bottom
        );
      }
    } else if (rhinosInTheGameWindow.length > 0) {
      this.moveRhinosCloserToSkier(rhinosInTheGameWindow, skier);
    }
  }

  //Placing a new Rhino in the Game Window and by adding it to the
  //obstacles list
  placeRandomRhino(minX, maxX, minY, maxY) {
    const position = this.calculateOpenPosition(minX, maxX, minY, maxY);
    const newRhino = new Rhino(position.x, position.y);

    this.rhinos.push(newRhino);
  }

  //Check if there is one or more Rhino in the Game Window
  //Return a list of the Rhino that were found in the Game Window
  checkIfThereIsRhinoInTheGameWindow(gameWindow) {
    if (this.rhinos.length == 0) {
      return [];
    }

    let rhinosInTheWindowGame = this.rhinos.filter((rhino) => {
      return (
        rhino.x > gameWindow.left &&
        rhino.x < gameWindow.right &&
        rhino.y > gameWindow.top &&
        rhino.y < gameWindow.bottom
      );
    });

    return rhinosInTheWindowGame;
  }

  //Navigate the Rhinis on the Game Window to run after the skier and catch him
  moveRhinosCloserToSkier(rhinosInTheGameWindow, skier) {
    for (var rhino of rhinosInTheGameWindow) {
      if (rhino.move) {
        if (skier.getPosition().x > rhino.x) {
          rhino.x += 2;
          rhino.changeRhinoRunningAsset();
        } else if (skier.getPosition().x < rhino.x) {
          rhino.x -= 2;
          rhino.changeRhinoRunningAsset();
        }

        if (skier.getPosition().y > rhino.y) {
          rhino.y += 2;
          rhino.changeRhinoRunningAsset();
        } else if (skier.getPosition().y < rhino.y) {
          rhino.y -= 2;
          rhino.changeRhinoRunningAsset();
        }

        if (
          skier.getPosition().x - rhino.x <= 2 &&
          skier.getPosition().x - rhino.x >= -2
        ) {
          rhino.x = skier.getPosition().x;
        }

        if (
          skier.getPosition().y - rhino.y <= 2 &&
          skier.getPosition().y - rhino.y >= -2
        ) {
          rhino.y = skier.getPosition().y;
        }
      }
    }
  }

  calculateOpenPosition(minX, maxX, minY, maxY) {
    const x = randomInt(minX, maxX);
    const y = randomInt(minY, maxY);

    const foundCollision = this.rhinos.find((rhino) => {
      return (
        x > rhino.x - DISTANCE_BETWEEN_RHINOS &&
        x < rhino.x + DISTANCE_BETWEEN_RHINOS &&
        y > rhino.y - DISTANCE_BETWEEN_RHINOS &&
        y < rhino.y + DISTANCE_BETWEEN_RHINOS
      );
    });

    if (foundCollision) {
      return this.calculateOpenPosition(minX, maxX, minY, maxY);
    } else {
      return {
        x: x,
        y: y,
      };
    }
  }

  stopRhinosRunning(rhinoThatCaughtTheSkier) {
    this.rhinos.map((rhino) => {
      if (rhino !== rhinoThatCaughtTheSkier) {
        rhino.changeRhinoToDefaultAsset();
        rhino.move = false;
      }
    });
  }
}
