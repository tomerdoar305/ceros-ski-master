import * as Constants from "../../Constants";
import { Entity } from "../Entity";

const assetTypes = [
    Constants.RHINO_DEFAULT,
    Constants.RHINO_RUN_LEFT,
    Constants.RHINO_RUN_LEFT_2
];

export class Rhino extends Entity {
    constructor(x, y) {
        super(x, y);

        this.assetName = assetTypes[1];        
    }   
}