import { direction, RobotController, TableTop, ToyRobot } from "../../../main/toy-robot.service";
import { callMovement, changePosition, makeRobotWalk, Robot } from "./Robot";
import { getSquarePosition, TabletopRank } from "./TabletopRank";

const tabletop = new TableTop();
const robot = new ToyRobot(0, 0, direction[0]);
const robotController = new RobotController(robot, tabletop);
const robotProps = { tabletop:tabletop, robot:robot, robotController:robotController };

export function MoveRobot(directionType?: string) {

    if (robotController.isFirstCommand) {
        return alert('To give position commands to robot, you may have place him on the table.');
    } else {

        if (directionType) {
            callMovement(directionType, robotProps);
        }
    
        makeRobotWalk(robotProps);
        const squarePosition = getSquarePosition(`${robotController.robot.X},${robotController.robot.Y}`);
    
        if (squarePosition) {
            const positions = { top: `${(squarePosition.top)}`, left: `${squarePosition.left}` };
            changePosition(positions);
        }
    }
}

export function Place(position: string) {
    const callPlaceCommand = robotController.placeRobot(position);

    if (callPlaceCommand) {
        MoveRobot();
    } else {
        alert("To place the robot, you may give a valid position to facing.");
    }
}

export function Tabletop () {

    return (
        <div className="w-fit h-fit flex">
            <Robot tabletop={tabletop} robot={robot} robotController={robotController} />
            <TabletopRank/>
        </div>
    )
}