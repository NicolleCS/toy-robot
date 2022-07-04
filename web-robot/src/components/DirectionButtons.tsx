import { MoveRobot } from "./Tabletop";

export function DirectionButtons () {

    const icons: Array<string> = ['up-arrow','left-arrow', 'right-arrow'];

    function onClick (directionType: string) {
        changeButtonAvailability(false);
        MoveRobot(directionType);

        setTimeout(() => {
            changeButtonAvailability(true);
        }, 1000);
    }

    function changeButtonAvailability(isAvailable: boolean) {
        for (let buttons = 0; buttons < icons.length; buttons++) {
            const buttonElement = document.getElementById(icons[buttons]);

            if (buttonElement)  {
                buttonElement.setAttribute('disable', `${isAvailable}`);
            }
        }
    }

    const Buttons = () => {
        const buttonsElements = [];

        for(let icon=0; icon < icons.length; icon++) {
            buttonsElements.push(
                <button type="button" key={icon} className="direction-buttons" id={icons[icon]} onClick={() => onClick(icons[icon])}><img src={`src/assets/icons/${icons[icon]}.svg`} className="w-12 h-8" alt={icons[icon]} /></button>
            );
        }

        return <>
            { 
                buttonsElements.map((buttons) => (
                    <div key={buttons.key}>
                        {buttons}
                    </div>
                ))
            }    
        </>
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-9 w-fit h-fit">
                <Buttons></Buttons>
            </div>
        </>
    );
}