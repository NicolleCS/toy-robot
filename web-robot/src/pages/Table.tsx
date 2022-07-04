import { DirectionButtons } from "../components/DirectionButtons";
import { PlaceButton } from "../components/PlaceButton";
import { Tabletop } from "../components/Tabletop";

export function Table() {
    return (
    <div className="relative h-full w-full">
        <div className="left-0 w-64 h-fit top-0 mb-5">
            <p className="font-bold text-left text-4xl mb-2">Toy Robot</p>
            <p className="font-medium text-left h-fit break-words text-xl">Make the robot walk on the table giving instructions.</p>
        </div>
        <div className="grid grid-cols-5 gap-10">
            <div className="col-span-3 justify-self-end">
                <Tabletop/>
            </div>
            <div className="self-center">
                <DirectionButtons/>
            </div>
        </div>
        <div className="grid grid-cols-5 gap-10 mt-5">
            <div className="col-span-3 justify-self-end">
                <PlaceButton/>                
            </div>
        </div>
    </div>   
    );
}