# HiQ Skåne Backend Test #

## Instructions ##
Thank you for taking the time to do HiQ's recruitment test. It consists of two parts:
- [Coding test]
- [A few technical questions]

## Coding test
We want you to provide a simulator for radio controlled cars!

This is what the simulator should do:
* Handle various commands to make the cars move.
* Handle various types of radio cars.
* Provide a room for the cars to move in.

Action commands and how they should work:
* A car can move and turn as follows; move forward, move back, turn left and turn right. These commands shall be represented by input commands F, B, L, and R respectively.
* A car can have a direction; North, west, south or east. These commands shall be represented by input commands N, W, S, and E respectively.
* A turn to either the left or the right shall be considered as a 90 degree turn.

Rooms and how it should work:
* The rooms will need two input parameters to provide a scope for a rectangular shaped room.
* Scope input shall represent whole meters and have no decimals.
* The rooms shall be considered to be surrounded by walls.

Cars and how they should work:
* A car should move and turn according to command input.
* A car cannot move through a wall.
* A car can be considered to have a size scope of a 1x1 meter object.

The simulator should work as a console application. It shall run with inputted commands for room, cars and starting position in the room. The sequence for these commands should have the following order:
* Room input.
* Starting position and direction of a car.
* A sequence of action commands.

After a simulation has run, the simulator shall output the result. A result of the simulation can be either successful or unsuccessfull. 
* Criteria for a successfull simulation is that the car moves through the room according to given commands, while not crashing into any wall during the route. 
* The output from a successful simulation should consist of the end position of the car as well as the heading of the car.
* Criteria for an unsuccessful simulation is that the car crashes into a wall.
* The output from an unsuccessful simulation should describe an error of what went wrong.

### What we review
We ask you to do this test to show your skills as a developer. Our reviewers will focus on your overall design of the solution, error handling, maintainability of your code, and object orientated principles if applicable for the selected language.

### Coding task requirements
We think that this test will take you between 6-8 hours, however this is not a time limit so feel free to spend as much time as you see necessary.


### User Story
As a **user running the simulation**
I want to **provide the simulator with command input**
And get **simulation results based on said command input**
So that **I know if a route is successful or not**.

## Questions
Please answer these questions in a markdown file called `Answers.md`.

1. How long time did you end up spending on this coding test?
2. Explain why you chose the code structure(s) you used in your solution.
3. What would you add to your solution if you had more time? This question is especially important if you did not spend much time on the coding test - use this as an opportunity to explain what your solution is missing.
4. What did you think of this recruitment test?

## How do I hand in my solution? ##
* Please send your solution to us as a zip-file 
    * All typically ignored files and folders should be removed (node_modules, bin etc).
    * The zip-file should contain a clone of this git repo, with your work added in commit(s).
* The answers to the technical questions should be included as a single markdown file named `Answers.md`.

Before submitting it to us, please make sure that the following requirements have been met:
* Complete the user story described above.
* In a README file, describe your solution and make sure you provide a guide on how to use you simulator. If your solution needs specific instructions on how to run and compile your code you must add them to the README as well.
* Write your solution in one of the following languages; Java, C++, C#, JavaScript. If you wish to use another language, please check beforehand with Anna Eggert.
* Your code must compile and run.
* Feel free to use whatever frameworks/libraries/packages you like.
* You must include tests.

#### Thank you for doing this test, we look forward to reviewing your solution!
