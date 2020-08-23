# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here:
http://ceros-ski.herokuapp.com/

Or deploy it locally by running:

```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please
look through the requirements below and let us know when you will have something for us to look at. If anything is
unclear, don't hesitate to reach out.

**Requirements**

Throughout your completion of these requirements, be mindful of the design/architecture of your solutions and the
quality of your code. We've provided the base code as a sample of what we expect. That being said, there are ways the
design and architecture could be better. If you find a better way to do something, by all means, make it better! Your
solution can only gain from having a better foundation.

- **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix the root of the problem.

  - Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  - Expected Result: The skier gets up and is facing to the left
  - Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)

- **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.

- **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump
  trick assets if you wanted to get really fancy!

  - Have the skier jump by pressing a key AND use the ramp asset to have the skier jump whenever he hits a ramp.
  - The skier should be able to jump over some obstacles while in the air.
    - Rocks can be jumped over
    - Trees can NOT be jumped over
  - Anything else you'd like to add to the skier's jumping ability, go for it!

- **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long,
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier,
  catch him and eat him.

  - The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  - If the rhino catches the skier, it's game over and the rhino should eat the skier.

- **Documentation:**

  - Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  - Provide a way for us to view the completed code and run it, either locally or through a cloud provider

- **Be original:**
  - This should go without saying but don’t copy someone else’s game implementation!

**Grading**

Your challenge will be graded based upon the following criteria. **Before spending time on any bonus items, make sure
you have fulfilled this criteria to the best of your ability, especially the quality of your code and the
design/architecture of your solutions. We cannot stress this enough!**

- How well you've followed the instructions. Did you do everything we said you should do?
- The quality of your code. We have a high standard for code quality and we expect all code to be up to production
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
- The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
- The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
- How well you document your solution. We want to know what you did and why you did it.

**Bonus**

_Note: You won’t be marked down for excluding any of this, it’s purely bonus. If you’re really up against the clock,
make sure you complete all of the listed requirements and to focus on writing clean, well organized, well documented
code before taking on any of the bonus._

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing
how creative candidates get with this.

- Provide a way to reset the game once it's over
- Provide a way to pause and resume the game
- Add a score that increments as the skier skis further
- Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
- Deploy the game to a server so that we can play it without having to install it locally
- Write more unit tests for your code

We are looking forward to see what you come up with!

………………………………………………………………………………………………………………………………………………………………………………………

**Solution Comments – Written by Tomer Doar – 8/22/2020**

This part of the document is to explain the solution for all the requirements above.

I deploy a version of the game on server after doing all the requirements.
You can play with it at:
http://symptomatic-fall.surge.sh/

Or deploy it locally by running:

npm install
npm run dev

**Fix a bug:**

The bug happens after the skier get crashed and the player click the left arrow button.
The reason why the bug occur is because after clicking the left arrow button, the function skierTurnLeft() is being called, and since the current skier direction is 0 (crashed), the direction become -1. In the SKIER_DIRECTION (on the constants file) there is no element that has the value -1. Therefore, on the run() function the updateGameWindow() is being called and after that also the function checkIfSkierHitObstacle().Since the there is no asset name (because there is no asset for direction -1) the function fail and that is the bug.
The fix is on the turnLeft() function, to check if the direction is 0, and if it is to set the direction to one (instead of adding -1).

_Write unit tests:_

On the Game.test.js I wrote a unite test for checking the bug above.
First I set the skier direction to be Crash. Then, I did some functionality to simulate the left key click that will raise the handleKeyDown() and call the function turnLeft().
The check is the expect part, to see if the direction changed to be left.

**Extend existing functionality:**

To jump the player needs to click the space key, or get in to a ramp while skiing.

On this part I was doing all of this (and more):

- Adding on the Constants.js file all the assets for the jump and the ramp, direction for jump and the key for the jump – space key.
- Adding on the Game.js at the handleKeyDown(event) a new event for the JUMP.
- Adding on the Skier.js the jump() function to set the direction to be jump, and setJumpPosition() to set the animation of the jump.
- On the move() function, adding a case for the jump direction to create the jump.
- On the checkIfSkierHitObstacle(), I check if the skier hit a ramp, and if yes, starting the jump.

**Build something new:**

On this part I was adding the functionality to appear some Rhinos on the game screen (after set amount of time that the skier is being skiing), and to make the Rhinos run after the skier and try to catch him. If the skier is getting caught, the game is over.

On this part I was doing all of this (and more):

- Adding on the Constants.js file all the assets for the Rhino.
- Adding Rhino.js Class.
- Adding RhinoManager.js for managing the rhinos on the screen.
- Adding the call for the function checkIfSkierGetCaughtByRhino in the Game/updateGameWindow to check if the skier is being catch, and add rhinos.

**Bonus**

- I Provide a way to reset the game once it's over:
  By clicking Ok in the pop up window when the game is over, or by clicking escape button while playing the game.
- I Added a score that increment as the skier skis further:
  I add functionality that count the distance that the skier sking. At the end of the game, the distance is being displayed on the pop up window.

- I add functinalty to increase the speed the longer the skier skis.

- I deployed the game on a server. This is the URL:
  http://symptomatic-fall.surge.sh/

- I wrote one more unit tests to test the jump functinalty:
  checking if the skier can change direction while he is on the air (when jumping)
