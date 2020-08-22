import * as Constants from "../../Constants";
import { Entity } from "../Entity";

const assetRunningTypes = [
  Constants.RHINO_RUN_LEFT,
  Constants.RHINO_RUN_LEFT_2,
];

const assetCatchSkierTypes = [
  Constants.RHINO_LIFT,
  Constants.RHINO_LIFT_MOUTH_OPEN,
  Constants.RHINO_LIFT_EAT_1,
  Constants.RHINO_LIFT_EAT_2,
  Constants.RHINO_LIFT_EAT_3,
  Constants.RHINO_LIFT_EAT_4,
];

export class Rhino extends Entity {
  constructor(x, y) {
    super(x, y);

    this.move = true;
    this.assetName = Constants.RHINO_DEFAULT;
    this.changeRhinoAssetCounter = 0;
  }

  /*
    Setting the image of the rhino to be the default.
  */
  changeRhinoToDefaultAsset() {
    this.assetName = Constants.RHINO_DEFAULT;
  }

  /*
    Function to change the rhino running image (thats what make the running animation)
  */
  changeRhinoRunningAsset() {
    if (this.changeRhinoAssetCounter === 10) {
      this.assetName === assetRunningTypes[0]
        ? (this.assetName = assetRunningTypes[1])
        : (this.assetName = assetRunningTypes[0]);
      this.changeRhinoAssetCounter = 0;
    } else {
      this.changeRhinoAssetCounter++;
    }
  }

  /*
    Function to change the rhino catching the skier images (thats what make the animation)
  */
  changeRhinoCatchesSkierAsset() {
    if (this.changeRhinoAssetCounter < 50) {
      this.assetName = assetCatchSkierTypes[0];
      this.changeRhinoAssetCounter++;
    } else if (
      this.changeRhinoAssetCounter >= 50 &&
      this.changeRhinoAssetCounter < 100
    ) {
      this.assetName = assetCatchSkierTypes[1];
      this.changeRhinoAssetCounter++;
    } else if (
      this.changeRhinoAssetCounter >= 100 &&
      this.changeRhinoAssetCounter < 150
    ) {
      this.assetName = assetCatchSkierTypes[2];
      this.changeRhinoAssetCounter++;
    } else if (
      this.changeRhinoAssetCounter >= 150 &&
      this.changeRhinoAssetCounter < 200
    ) {
      this.assetName = assetCatchSkierTypes[3];
      this.changeRhinoAssetCounter++;
    } else if (
      this.changeRhinoAssetCounter >= 200 &&
      this.changeRhinoAssetCounter < 250
    ) {
      this.assetName = assetCatchSkierTypes[4];
      this.changeRhinoAssetCounter++;
    } else {
      this.assetName = assetCatchSkierTypes[5];
      this.move = false;
    }
  }
}
