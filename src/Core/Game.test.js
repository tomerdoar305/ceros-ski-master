import "babel-polyfill";
import { Game } from "./Game.js";
import * as Constants from "../Constants";
import { Rhino } from "../Entities/Rhinos/Rhino";

const skiGame = new Game();
skiGame.load().then(() => {
  skiGame.init();
  skiGame.run();
});

test("Should get up to the left side after getting crashed when pressing left", () => {
  //Crashing the Skier
  skiGame.skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

  //Clicking the left key
  const event = new KeyboardEvent("keyup", {
    which: Constants.KEYS.LEFT,
  });
  skiGame.handleKeyDown(event);

  expect(skiGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
});

test("Should skier change direction while he is on the air (when jumping)", () => {
  //Clicking the down key
  const event1 = new KeyboardEvent("keyup", {
    which: Constants.KEYS.DOWN,
  });
  skiGame.handleKeyDown(event1);

  //Clicking the left key
  const event2 = new KeyboardEvent("keyup", {
    which: Constants.KEYS.LEFT,
  });
  skiGame.handleKeyDown(event2);

  expect(skiGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

  //Clicking the jump key
  const event3 = new KeyboardEvent("keyup", {
    which: Constants.KEYS.JUMP,
  });
  skiGame.handleKeyDown(event3);

  expect(skiGame.skier.direction).toBe(Constants.SKIER_DIRECTIONS.JUMP);

  //Clicking the down key
  const event4 = new KeyboardEvent("keyup", {
    which: Constants.KEYS.DOWN,
  });
  skiGame.handleKeyDown(event4);

  expect(skiGame.skier.jumpDirection).not.toBe(Constants.SKIER_DIRECTIONS.DOWN);
  expect(skiGame.skier.jumpDirection).toBe(
    Constants.SKIER_DIRECTIONS.LEFT_DOWN
  );
});
