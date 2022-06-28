const direction = {
    NORTH: [90],
    SOUTH: [-90, 270],
    EAST: [0, 360],
    WEST: [180, -180]
};

const commands = [
    "PLACE",
    "MOVE",
    "LEFT",
    "RIGHT",
    "REPORT"
];

let position: { X: number, Y: number, F: typeof direction };

const readline = require('readline');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const readlineQuestion = (questionText:string) => new Promise(resolve => readlineInterface.question(questionText, resolve));

const SQUARE_LIMIT_SIZE = 5;
const COMMAND_TO_POSITIONING: string = commands[0];


function validateResponse(response:any, isFirstCommand:boolean = false) {
    const arrayResponse = String(response).split(' ');
    const inputCommand = arrayResponse[0];
    const isCommand:boolean = commands.includes(inputCommand);
    let isValid:boolean = false;

    if (isFirstCommand) {
        const isPlaceCommand = inputCommand === COMMAND_TO_POSITIONING;
        const inputPositions = arrayResponse[1].split(',');
        
        isValid = validatePositions(inputPositions) && isPlaceCommand;
    } else {
        // TODO
    }

    return isCommand;
}

function validatePositions(inputPosition: Array<string>) {
    const positionX = inputPosition[0];
    const positionY = inputPosition[1];

    const inputDirection = inputPosition[2];
    let positionF;

    const validateFacing = () => {
        const findDirection = (direction as any)[inputDirection];
        positionF = findDirection? findDirection : null;   
    }

    if (positionF) {
        
        position = {
            X: Number(positionX),
            Y: Number(positionY),
            F: positionF
        }

        return true;
    }
    
    return false;
}

async function dealingCommands() {
    let command = false;

    while(!command) {
        const response = await readlineQuestion("Position the robot to initiate: ");

        
        console.log("Type response ", typeof response);
        command = validateResponse(response, true);
    }
}


dealingCommands();


function place(position_input:any) {
    // TODO
}




// const question1 = () => {
    //   return new Promise<void>((resolve, reject) => {
    //     rl.question('q1 What do you think of Node.js? ', (answer) => {
    //       console.log(`Thank you for your valuable feedback: ${answer}`)
    //       resolve()
    //     })
    //   })
    // }
    
    // const question2 = () => {
    //   return new Promise((resolve, reject) => {
    //     rl.question('q2 What do you think of Node.js? ', (answer) => {
    //       console.log(`Thank you for your valuable feedback: ${answer}`)
    //       resolve()
    //     })
    //   })
    // }
    
    // const main = async () => {
    //   await question1()
    //   await question2()
    //   rl.close()
    // }
    
    // main()
    // https://stackoverflow.com/questions/36540996/how-to-take-two-consecutive-input-with-the-readline-module-of-node-js/48790818#48790818