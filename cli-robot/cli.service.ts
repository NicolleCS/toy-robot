import { FacingDirection, direction, ToyRobot, TableTop, RobotController } from "./toy-robot.service";

const readline = require('readline');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const readlineQuestion = (questionText:string) => new Promise(resolve => readlineInterface.question(questionText, resolve));

const commands = [
    "PLACE",
    "MOVE",
    "LEFT",
    "RIGHT",
    "REPORT",
    "FINISH"
];

async function receivingCommand() {
    let command = '';

    const tabletop = new TableTop();
    const robot = new ToyRobot(0, 0, direction[0]);
    const robotController = new RobotController(robot, tabletop);

    while(command !== "FINISH") {
        const currentlyQuestion: string =  "Write a valid command to move the robot: \n";
        const response = await readlineQuestion(currentlyQuestion);

        const arrayResponse = String(response).split(' ');
        const isAValidCommand = validateCommand(arrayResponse);

        if (isAValidCommand) {
            try {
                command = arrayResponse[0].toUpperCase();
                processCommand(arrayResponse, robotController);
            } catch (error) {
                console.warn(error);
            }
        } else {
            console.warn(`The entry ${response} is wrong! \n Please, fix it and try again.`);
        }
    }
}

function processCommand(commandArray: Array<string>, robotController: RobotController) {
    const inputCommand = commandArray[0].toUpperCase();
    const isPlaceCommand = inputCommand === "PLACE";

    const inputPositions = commandArray[1];

    if (robotController.isFirstCommand && !isPlaceCommand) {
        throw new Error("To give position commands to robot, you may have place him on the table. \n Knowing that, insert a valid place command.");
    }

    switch (inputCommand) {
        case "PLACE":
            return robotController.placeRobot(inputPositions);
        case "MOVE":
            return robotController.moveRobot();
        case "LEFT":
            return robotController.leftRotate();
        case "RIGHT":
            return robotController.rightRotate();
        case "REPORT":
            return console.log(`${robotController.robot.X},${robotController.robot.Y},${robotController.robot.F.name}`);
        default:
            break;    
    }
}

function validateCommand(inputArray: Array<string>) {
    const inputCommand = inputArray[0].toUpperCase();
    return commands.includes(inputCommand);
}

receivingCommand();



        