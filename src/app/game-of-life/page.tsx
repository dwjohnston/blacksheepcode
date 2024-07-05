"use client"
import React, { useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { RaiseAnIssue } from '@/components/RaiseAnIssue/RaiseAnIssue';
export type GameOfLifeProps = {
};



const SIZE = 20;
const TICK_RATE = 100;


function generateEmptyMap(height: number, width: number) {

    return new Array(height).fill(false).map((v) => {
        return new Array(width).fill(false);
    })
}

function toggleValueAt(map: Array<Array<boolean>>, y: number, x: number,) {


    if (map[y] === undefined) {
        throw new Error(`y: '${y} out of range `);
    }

    if (map[y][x] === undefined) {
        throw new Error(`x: '${x} out of range `);

    }



    const map2 = JSON.parse(JSON.stringify(map));
    map2[y][x] = !map2[y][x];

    return map2;


}

function getLivingNeighboursCount(map: Array<Array<boolean>>, y: number, x: number): number {

    const yMax = map.length - 1;
    const xMax = map[0].length - 1;


    const yIndexsToUse = [y];
    const xIndexesToUse = [x];
    if (y !== 0) {
        yIndexsToUse.push(y - 1);
    }
    if (y !== yMax) {
        yIndexsToUse.push(y + 1);
    }
    if (x !== 0) {
        xIndexesToUse.push(x - 1);
    }
    if (x !== xMax) {
        xIndexesToUse.push(x + 1);
    }


    let count = 0;
    for (let yi of yIndexsToUse) {
        for (let xi of xIndexesToUse) {
            if (map[yi][xi] && !(yi === y && xi === x)) {
                count++
            }
        }
    }

    return count;
}

function processMap(map: Array<Array<boolean>>): Array<Array<boolean>> {
    const yMax = map.length;
    const xMax = map[0].length;

    const map2 = JSON.parse(JSON.stringify(map));

    for (let y = 0; y < yMax; y++) {
        for (let x = 0; x < xMax; x++) {

            const count = getLivingNeighboursCount(map, y, x);
            const selfIsAlive = map[y][x];

            if (selfIsAlive) {
                if (count === 0 || count === 1 || count === 4) {
                    map2[y][x] = false;
                }
            } else {
                if (count === 3) {
                    map2[y][x] = true;
                }
            }



        }
    }

    return map2;
}





export const GameOfLife = (props: GameOfLifeProps) => {

    const [map, setMap] = useState(generateEmptyMap(SIZE, SIZE));

    const [isRunning, setIsRunning] = useState(false);


    useInterval(() => {
        const newMap = processMap(map);
        setMap(newMap);
    }, isRunning ? TICK_RATE : null);

    function handleCellClick(rowNumber: number, cellNumber: number) {

        if(isRunning){
            setIsRunning(false);
        }
        setMap(toggleValueAt(map, rowNumber, cellNumber))
    }

    function handleStart() {
        setIsRunning(!isRunning);
    }

    function handleReset() {
        setIsRunning(false);
        setMap(generateEmptyMap(SIZE, SIZE));
    }



    return (
        <div className="game-of-life">



            <h1>Conway's Game of Life</h1>
            <p>Conway's game of life is a classic zero player game that makes for a fun programming exercise.</p>
            <p>See the <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">wikipedia article here.</a></p>
            <p>Maybe we can play around with alternative rule sets, or investigate performance optimisation.</p>
            <div>
                <button onClick={handleStart}>{isRunning ? 'Stop' : 'Start Game!'}</button>
                <button onClick={handleReset}>Reset</button>

            </div>
            <div>
                {map.map((row, rowIndex) => {
                    return <div key={`row-${rowIndex}`} className="game-of-life-row">
                        {row.map((cell, cellIndex) => {
                            return <div className={`game-of-life-cell ${cell ? 'live' : 'dead'}`} key={`cell-${cellIndex}`} role="button" onClick={() => {
                                handleCellClick(rowIndex, cellIndex)
                            }}>

                            </div>
                        })}
                    </div>
                })}
            </div>

            <RaiseAnIssue/>
        </div>
    );
};

export default GameOfLife;