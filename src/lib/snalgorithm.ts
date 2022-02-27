import { Console } from 'console';
import { CharStatus, getGuessStatuses } from './statuses'
import { getGuessedWords } from './words'

const getCoordId = (x: number, y: number) => {
    // The 10's digit is column/x; 1's digit is the row/y #
    // Ex: (x=4, y=2) --> coordId=42
    return x*10 + y;
}

const getXFromCoord = (coord: number) => {
    return Math.floor(coord/10);
}
const getYFromCoord = (coord: number) => {
    return coord % 10;
}

const isValidCoord = (coord: number) => {
    let x = getXFromCoord(coord);
    let y = getYFromCoord(coord);
    // TODO-cknipe: Are they indexed from 1 or zero? Does it matter?
    return x > 0 && x < 5 && y > 0 && y < 6;
}


export const runSnalgo = () => {
    // Make the grid
    // CharStatus: 'correct' = head; 'present' = body; 'absent' = no snek
    let snakeGridMap = new Map<number, CharStatus>();
    // Refactor-cknipe: Probs wanna addToSnakeGrid in CompletedRow (or at least pass getGuessedWords in)
    const guessedWords = getGuessedWords();
    for (let y = 0; y < 5; y++) {
        const guess = guessedWords[y];
        const statuses = getGuessStatuses(guess);
        for (let x = 0; y < statuses.length; y++) {
            snakeGridMap.set(getCoordId(x, y), statuses[x]);
        }
    }

    // Collect the heads
    let allHeadCoords: number[] = [];
    snakeGridMap.forEach((value: CharStatus, key: number) => {
        if (value == 'correct') {
            allHeadCoords.push(key);
        }
    });

    // Identify the body-only graph components
    // Optimization-cknipe: You may even be able to do this while you're looking for the longest path
    let componentsToCoords = new Map<number, number[]>();
    let coordsToComponent = new Map<number, number>();
    let componentIdCounter: number = 0;
    for (var headCoord of allHeadCoords) {
        for (let coord of getNeighborCoords(headCoord)) {
            if (isValidCoord(coord) && snakeGridMap.get(coord) == 'present') {
                // If [head - body - head] then do nothing; this coordinate already has a component assignment
                if (!coordsToComponent.has(coord)) {
                    // that's a new snake; add a new thing to componentIds                
                    coordsToComponent.set(coord, componentIdCounter);
                    // TODO-cknipe: Eventually remove this
                    if (componentsToCoords.has(componentIdCounter)) {
                        console.log("Oops! Expected componentId " + componentIdCounter + " of coord " + coord + " not to be there yet");
                    }
                    componentsToCoords.set(componentIdCounter, [coord]);
                    findAllCoordsInComponent(coord, componentIdCounter, componentsToCoords, coordsToComponent, snakeGridMap);
                    componentIdCounter++;
                }
            }
        }
    }

    // Ok now actually look for the longest path
    let longestSnakeYet: number[] = [];
    let thisSnake: number[] = [];
    for (var headCoord of allHeadCoords) {
        for (var neighborCoord of getNeighborCoords(headCoord)) {
            if (isValidCoord(neighborCoord) && snakeGridMap.get(neighborCoord) == 'present') {
                thisSnake.push(headCoord);
                thisSnake.push(neighborCoord); 


            }
        }
    }
}



const getNeighborCoords = (coord: number) => {
    let x = getXFromCoord(coord);
    let y = getYFromCoord(coord);
    return [getCoordId(x-1,y),   // left
            getCoordId(x, y-1),  // up
            getCoordId(x+1, y),  // right
            getCoordId(x, y+1)]; // down
}

const findAllCoordsInComponent = (thisCoord:number, thisCommponentId:number, 
                    componentsToCoords:Map<number, number[]>, coordsToComponent:Map<number, number>,
                    snakeGridMap:Map<number,CharStatus>) => {
    if (isValidCoord(thisCoord) && snakeGridMap.get(thisCoord) == 'present') {
        if (coordsToComponent.has(thisCoord)) {
            let otherComponentId = coordsToComponent.get(thisCoord);
            if (otherComponentId != thisCommponentId) {
                console.log("You were wrong! This componentId = " + thisCommponentId + " & other = " + otherComponentId);
                // I suspect we will never get here if we're doing DFS, but confirm.
                // for (let otherCoord : componentsToCoords[otherComponentId]) {collapse 'em into this one}
            }
            // Who's this snake? Oh it's me, I'm already here
            return;
        }
        else {
            if (componentsToCoords.has(thisCommponentId)) {
                let coordList = componentsToCoords.get(thisCommponentId);
                if (coordList) {
                    coordList.push(thisCoord); 
                }
                coordsToComponent.set(thisCoord, thisCommponentId);
                // Do we need to do this, or does it mutate in place?
                // componentsToCoords.set(thisCommponentId, coordList);
                
                // Depth first search
                for (let neighborCoord of getNeighborCoords(thisCoord)) {
                    findAllCoordsInComponent(neighborCoord, thisCommponentId, componentsToCoords, coordsToComponent, snakeGridMap);
                }
            }
            else { 
                console.log("I am shocked! ComponentId " + thisCommponentId + " doesn't have any coords.");
            }
        }
    }
}



/*
// TODO-cknipe: uncomment this
// interface SnakeGridCell {
//     row: number
//     col: number
// }

let snakeGrid: Record<SnakeGridCell, CharStatus> = {}
// SnakeGrid is basically a map from SnakeGridCell to status
// but can we use an interface we defined as the key? 

var lastCompletedRow: number = 0

export const addToSnakeGrid(statuses: CharStatus[]) =>
{
    // 

}

export const getLongestSnake() => {

}
*/


/*
Input: State of the board
    - Add className to Grid and Cell and stuff, and figure out how to select them
    - Process guessedWordList again
    - Save out results of getGuessStatuses so we can access here
Output: Longest path

Steps:
0. Inputs: guessedWords
1. Outputs: Pretend the algorithm returned something,
   make sure you can refer to cells to be colored correctly
   Can I return Cells from Cell.tsx?
   Or, maybe this could do like CompletedRow.tsx does

   export const CompletedRow = ({ guess }: Props) => {
    const statuses = getGuessStatuses(guess)

    return (
        <div className="flex justify-center mb-1">
        {guess.split('').map((letter, i) => (
            <Cell key={i} value={letter} status={statuses[i]} />
        ))}
        </div>
    )
    }




*/