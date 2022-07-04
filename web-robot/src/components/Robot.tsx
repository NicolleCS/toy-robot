import { ToyRobot, TableTop, RobotController } from '../../../cli-robot/toy-robot.service';

const ROBOT_SIZE = 160;
const SQUARE_SIZE = 50;
const DIFFERENCE_ROBOT_AND_HALF_SQUARE = ROBOT_SIZE - (SQUARE_SIZE/2);


interface RobotProps {
    tabletop: TableTop;
    robot: ToyRobot;
    robotController: RobotController;
}

export function callMovement(directionType: string, props: RobotProps) {
    let movedRobot;

    switch(directionType) {
        case "up-arrow":
            movedRobot = props.robotController.moveRobot();
            break;
        case "left-arrow":
            movedRobot = props.robotController.leftRotate();
            makeRobotRotate(props);
            break;
        case "right-arrow":
            movedRobot = props.robotController.rightRotate();
            makeRobotRotate(props);
            break;
        default:
            return;           
    }

    return movedRobot;
}

export function changePosition(squareOffset: {top:string, left:string}) {
    const robotElement = document.getElementById('robot');

    if (robotElement) {
        const topPosition = `${Number(squareOffset.top) - DIFFERENCE_ROBOT_AND_HALF_SQUARE}px`;
        const leftPosition = `${Number(squareOffset.left) - SQUARE_SIZE}px`;

        robotElement.style.position = 'absolute';
        robotElement.style.top = topPosition;
        robotElement.style.left = leftPosition;
    }
    
}

export function makeRobotRotate(props: RobotProps) {
    const directionName = props.robotController.robot.F.name.toLowerCase();
    const robotImageElement = document.getElementById('robot-image');

    if (robotImageElement) {
        robotImageElement.setAttribute('src', `src/assets/icons/${directionName}.svg`);
    }

}

export function makeRobotWalk(props: RobotProps) {
    const directionName = props.robotController.robot.F.name.toLowerCase();
    const robotImageElement = document.getElementById('robot-image');

    if (robotImageElement) {
        robotImageElement.setAttribute('src', `src/assets/icons/walk-${directionName}.svg`);

        setTimeout(() => {
            robotImageElement.setAttribute('src', `src/assets/icons/${directionName}.svg`);
        }, 500);
    }

}

export function Robot(props: RobotProps) {
    let icon = props.robotController.robot.F.name.toLowerCase();

    return (
        <>
            <div className="mr-14" id='robot'>
                <img src={`src/assets/icons/${icon}.svg`} id='robot-image' className="w-40 h-fit" alt="Robot" />
            </div>
        </>
    )
}