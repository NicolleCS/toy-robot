const TABLETOP_SIZE = 5;

export function getSquarePosition(position: string) {
   const squarePositionTop = document.getElementById(position)?.offsetTop;
   const squarePositionLeft = document.getElementById(position)?.offsetLeft;

   return { left: squarePositionLeft, top: squarePositionTop };
}

export function TabletopRank () {
   let actualColor = 0;

   const Columns = () => {
      const squareColors: Array<string> = ['bg-black','bg-white'];
      const totalRanks = [];
      
      for (let columns = 0; columns < TABLETOP_SIZE; columns++) {
         const squareItems: JSX.Element[] = [];
         
         for (let square = 0; square < TABLETOP_SIZE; square++) {
            squareItems.push(
               <div className={`w-14 h-14 flex ${squareColors[actualColor]} square`} id={`${square},${columns}`}></div>
            );
            actualColor = actualColor == 0? 1 : 0;
         }

         const Column = () => {
            return <>
               {
                  squareItems.map((squareItem) => {
                     return (
                        <>
                           {squareItem}
                        </>
                     )
                  })
               }
            </>
         };
         
         totalRanks.push(
            <div className="grid grid-cols-5 gap-0 w-fit h-full">
               <Column></Column>
            </div>
         );
      }

      return <>
         {
            totalRanks.map((rank) => {
               return (
                  <>
                     {rank}
                  </>
               )
            })
         }
      </>

   }
   
 return (
   <>
      <div className="border-brown-500 border-9 w-fit h-fit">
         <Columns></Columns>
      </div>
   </>
 );
}