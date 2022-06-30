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

let actualPosition: { X: number, Y: number, F: {name:string, values:any, movementType: string, axle: string } };
let isFirstCommand: boolean;

const readline = require('readline');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const readlineQuestion = (questionText:string) => new Promise(resolve => readlineInterface.question(questionText, resolve));

const SQUARE_LIMIT_SIZE = 5;

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
            return console.log(`${actualPosition.X},${actualPosition.Y},${actualPosition.F.name}`);
        default:
            break;    
    }
}

function validatePosition(inputPosition: number) {
    return inputPosition >= 0 && inputPosition < SQUARE_LIMIT_SIZE;
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
        const isPositionYValid = validatePosition(positionY);

        if (isPositionXValid && isPositionYValid) {
            actualPosition = {
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

        const returnNextPosition = () => {
            let actualAxlesPosition = actualPosition.F.axle === "X"? actualPosition.X : actualPosition.Y;
            const nextPosition = actualPosition.F.movementType === 'increase'? (actualAxlesPosition) + 1 : (actualAxlesPosition) - 1;
            const isAValidPosition = validatePosition(nextPosition);
                
            return isAValidPosition? nextPosition : actualAxlesPosition;
        };

        if (actualPosition.F.axle === "X") { 
            actualPosition.X = returnNextPosition();
        } else if (actualPosition.F.axle === "Y") {
            actualPosition.Y = returnNextPosition();
        }
    }
}

function leftRotate() {
    rotate(90);
}

function rigthRotate() {
    rotate(-90);
}

function rotate(rotationDirection: number) {
    if (!isFirstCommand) {
        const directionToRotate = actualPosition.F.values[0] + rotationDirection;
        const findDirectionObject = direction.find((direction) => direction.values.includes(directionToRotate));

        if (findDirectionObject) {
            actualPosition.F = findDirectionObject;
        }
    }
}

receivingCommand();