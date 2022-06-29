const direction = [
    { name: "NORTH", values: [90], movementType: "decrease", axle: "Y" },
    { name: "SOUTH", values: [-90, 270], movementType: "increase", axle: "Y" },
    { name: "EAST", values: [0, 360], movementType: "increase", axle: "X" },
    { name: "WEST", values: [180, -180], movementType: "decrease", axle: "X" },
];

const commands = [
    "PLACE",
    "MOVE",
    "LEFT",
    "RIGHT",
    "REPORT",
    "FINISH"
];

let position: { X: number, Y: number, F: {name:string, values:any, movementType: string, axle: string } };
let isFirstCommand: boolean;

const readline = require('readline');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const readlineQuestion = (questionText:string) => new Promise(resolve => readlineInterface.question(questionText, resolve));

const SQUARE_LIMIT_SIZE = 5;
const COMMAND_TO_POSITIONING: string = commands[0];


function validateCommand(inputArray: Array<string>) {
    const inputCommand = inputArray[0].toUpperCase();

    return commands.includes(inputCommand);
}

async function receivingCommand() {
    let command = '';
    isFirstCommand = true;

    while(command !== "FINISH") {
        const positionateQuestion: string = "Position the robot to initiate: \n";
        const sequenceQuestion: string =  "Write a valid command to move the robot: \n";

        const currentlyQuestion: string = isFirstCommand? positionateQuestion : sequenceQuestion;

        const response = await readlineQuestion(currentlyQuestion);
        const arrayResponse = String(response).split(' ');

        const isAValidCommand = validateCommand(arrayResponse);

        if (isAValidCommand) {
            try {
                command = arrayResponse[0].toUpperCase();
                processCommand(arrayResponse);
            } catch (error) {
                console.warn(error);
            }
        } else {
            console.warn(`The entry ${response} is wrong! \n Please, fix it and try again.`);
        }
    }
}

function processCommand(commandArray: Array<string>) {
    const inputCommand = commandArray[0].toUpperCase();

    if (isFirstCommand && inputCommand !== "PLACE") {
        throw new Error("To give position commands to robot, you may have place him on the table. \n Knowing that, insert a valid place command.");
    }

    switch (inputCommand) {
        case "PLACE":
            return place(commandArray);
        case "MOVE":
            return moveRobot();
        case "LEFT":
            return leftRotate();
        case "RIGHT":
            return rigthRotate();
        case "REPORT":
            return console.log(`${position.X},${position.Y},${position.F.name}`);
        default:
            break;    
    }
}

function validatePosition(inputPosition: number) {
    return inputPosition >= 0 && inputPosition < 5;
}

function place(commandArray: Array<string>) {
    const inputPositions = commandArray[1].split(',');
    const positionX = Number(inputPositions[0]);
    const positionY = Number(inputPositions[1]);

    const inputDirection = inputPositions[2];
    const findDirection = direction.find(directionObject => directionObject.name === inputDirection.toUpperCase());

    const positionF = findDirection? findDirection : null;

    if (positionF) {

        const isPositionXValid = validatePosition(positionX);
        const isPositionYvalid = validatePosition(positionX);

        if (isPositionXValid && isPositionYvalid) {
            position = {
                X: positionX,
                Y: positionY,
                F: positionF
            }
            isFirstCommand = false;
        } else {
            throw new Error("Insert a valid value to place robot on table!");
        }
    } else {
        throw new Error("Insert a valid value to facing!")
    }
}

function moveRobot() {
    if (!isFirstCommand) {

        const validMovement = (positionToMove: typeof position) => {
            let axleMovePosition = positionToMove.F.axle === "X"? positionToMove.X : positionToMove.Y;
            const movement = positionToMove.F.movementType === 'increase'? (axleMovePosition) +1 : (axleMovePosition) -1;
            const isPossibleToMove = validatePosition(movement);
                
            return isPossibleToMove? movement : axleMovePosition;
        };

        if (position.F.axle === "X") { 
            position.X = validMovement(position);
        } else if (position.F.axle === "Y") {
            position.Y = validMovement(position);
        }
    }
}

function leftRotate() {
    if (!isFirstCommand) {
        const changeDirection = position.F.values[0] + 90;

        const findDirection = direction.find((direction) => direction.values.includes(changeDirection));

        if (findDirection) {
            position.F = findDirection;
        }
    }
}

function rigthRotate() {
    if (!isFirstCommand) {
        const changeDirection = position.F.values[0] - 90;

        const findDirection = direction.find((direction) => direction.values.includes(changeDirection));

        if (findDirection) {
            position.F = findDirection;
        }
    }
}

receivingCommand();