import "babel-polyfill";
import { Game } from './Game.js';
import * as Constants from "../Constants";

const skiGame = new Game();

test('true equals true', () => {
    expect(true).toBe(true);
});

test('Should get up to the left side after getting crashed when pressing left', () => {
    
    //Crashing the Skier
    skiGame.skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
    
    //Clicking the left key
    const event = new KeyboardEvent('keyup', {
        which: Constants.KEYS.LEFT
      });
    skiGame.handleKeyDown(event);
       
    expect(skiGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
});