import React, { useState } from "react";
import { place } from "./Tabletop";

export function PlaceButton () {
    const [state, setState] = useState({
        value:'',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({value: event.target.value})
    }

    function onClick() {
        place(state.value);
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-5 w-80 place-items-center" id="place-button">
                <input type="text" placeholder="Ex: 0,0,NORTH" value={state.value} onChange={handleChange}/>
                <button type="button" onClick={() => onClick()}>PLACE ROBOT</button>
            </div>
        </>
    )
}