class FacingDirection {
    name: string;
    values: Array<number>;
    movementType: string;
    axle: string;

    constructor(name: string, values: Array<number>, movementType: string, axle: string) {
        this.name = name;
        this.values = values;
        this.movementType = movementType;
        this.axle = axle;
    }
}

const direction: Array<FacingDirection> = [
    new FacingDirection("SOUTH", [-90, 270], "increase", "Y"),
    new FacingDirection("NORTH", [90], "decrease", "Y"),
    new FacingDirection("EAST", [0, 360], "increase", "X"),
    new FacingDirection("WEST", [180, -180], "decrease", "X"),
];

const SQUARE_LIMIT_SIZE = 5;


class ToyRobot {
    X: number;
    Y: number;
    F: FacingDirection;

    constructor(X: number, Y: number, F: FacingDirection) {
        this.X = X;
        this.Y = Y;
        this.F = F;
    }
}

class TableTop {
    size: number;

    constructor(size?: number) {
        this.size = size? size : SQUARE_LIMIT_SIZE;
    }

    public validatePosition(inputPosition: number) {
        return inputPosition >= 0 && inputPosition < this.size;
    }

    public placeRobot(positions: {X: number, Y: number}) {
    
        const isPositionXValid = this.validatePosition(positions.X);
        const isPositionYValid = this.validatePosition(positions.Y);
    
        if (isPositionXValid && isPositionYValid) {
            return positions;
        } else {
            throw new Error("Insert a valid value to place robot on table!");
        }
    }
}

class RobotController {
    robot: ToyRobot;
    tabletop: TableTop;
    isFirstCommand: boolean;

    constructor(robot: ToyRobot, tabletop: TableTop) {
        this.robot = robot;
        this.tabletop = tabletop;
        this.isFirstCommand = true;
    }

    public findDirection(directionName: string) { 
        return direction.find(directionObject => directionObject.name === directionName.toUpperCase());
    }    

    public placeRobot(positions: string) {
        const inputPositions = positions.split(',');
        
        const positionX = Number(inputPositions[0]);
        const positionY = Number(inputPositions[1]);
        const inputDirection = inputPositions[2];

        const validateNextPosition = this.tabletop.placeRobot({ X: positionX, Y: positionY });
        const directionObject = this.findDirection(inputDirection);

        if (validateNextPosition && directionObject) {
            this.robot.X = positionX;
            this.robot.Y = positionY;
            this.robot.F = directionObject;
            this.isFirstCommand = false;
        } else {
            throw new Error("Insert a valid value to place robot on table!");
        }

        return this.robot;
    }

    public moveRobot() {
        if (!this.isFirstCommand) {
    
            const returnNextPosition = () => {
                let actualAxlesPosition = this.robot.F.axle === "X"? this.robot.X : this.robot.Y;
                const nextPosition = this.robot.F.movementType === 'increase'? (actualAxlesPosition) + 1 : (actualAxlesPosition) - 1;
                const isAValidPosition = this.tabletop.validatePosition(nextPosition);
                    
                return isAValidPosition? nextPosition : actualAxlesPosition;
            };
    
            if (this.robot.F.axle === "X") { 
                this.robot.X = returnNextPosition();
            } else if (this.robot.F.axle === "Y") {
                this.robot.Y = returnNextPosition();
            }

            this.tabletop.placeRobot(this.robot);
        }
    }

    public leftRotate() {
        this.rotate(90);
    }


    public rightRotate() {
        this.rotate(-90);
    }

    public rotate(rotationDirection: number) {
        if (!this.isFirstCommand) {
            const directionToRotate = this.robot.F.values[0] + rotationDirection;
            const findDirectionObject = direction.find((direction) => direction.values.includes(directionToRotate));
    
            if (findDirectionObject) {
                this.robot.F = findDirectionObject;
            }
        }
    }
}

export { FacingDirection, direction, ToyRobot, TableTop, RobotController }




