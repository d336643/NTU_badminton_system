import React, { useState } from 'react';
import { hasResult, getWinnerInfo, letterToIndex, getTitle } from '../utilities/tournamentUtilities';
import '../style/tournament.css';

const eliRoundArr = [
    {
        "typeId": 1,
        "typeIndex": 148,
        "player1": {
            "group": "U",
            "result": "silver"
        },
        "player2": {
            "group": "A",
            "result": "golden"
        }
    },
    {
        "typeId": 1,
        "typeIndex": 149,
        "player1": {
            "group": "V",
            "result": "silver"
        },
        "player2": {
            "group": "B",
            "result": "golden"
        }
    },
    {
        "typeId": 1,
        "typeIndex": 150,
        "player1": {
            "group": "W",
            "result": "silver"
        },
        "player2": {
            "group": "C",
            "result": "golden"
        }
    },
    {
        "typeId": 1,
        "typeIndex": 151,
        "player1": {
            "group": "F",
            "result": "silver"
        },
        "player2": {
            "group": "O",
            "result": "golden"
        }
    },
]
const winnerInfo = [
    {
        "group": "A",
        "golden": {
            "hasResult": true,
            "data": [
                { "uid": 7, "username": "euni", "sid": "R00000000", "departmentId":"5050","degreeId":2},
            ]
        },
        "silver": {
            "hasResult": true,
            "data": [
                { "uid": 7, "username": "euni", "sid": "R00000000", "departmentId":"5050","degreeId":2},
            ]
        }
    },
]

const Tournament16 = () => {
    const [score, setScore] = useState();
    const [gameIndex, setGameIndex] = useState(148);

    return (
        <>
            <p>16強圖表</p>
            <main class="tournament">
                <ul class="round round-1">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top" > {/*style={{fontWeight: 'bold'}}*/}
                        {eliRoundArr[0].player1.group}
                        {getTitle(eliRoundArr[0].player1.result)}
                        <span>score</span></li>
                    <li class="game game-spacer"><span>{eliRoundArr[0].typeIndex}&nbsp;</span></li>
                    <li class="game game-bottom ">
                        {
                            hasResult(winnerInfo[letterToIndex(eliRoundArr[0].player2.group)], eliRoundArr[0].player2.result) ?
                            <>
                                {getWinnerInfo(winnerInfo[letterToIndex(eliRoundArr[0].player2.group)], eliRoundArr[0].player2.result, 'depart')}
                                {getWinnerInfo(winnerInfo[letterToIndex(eliRoundArr[0].player2.group)], eliRoundArr[0].player2.result, 'degree')}
                                {getWinnerInfo(winnerInfo[letterToIndex(eliRoundArr[0].player2.group)], eliRoundArr[0].player2.result, 'name')}
                            </>
                            : 
                            <>
                                {eliRoundArr[0].player2.group}
                                {getTitle(eliRoundArr[0].player2.result)}
                            </>
                        }
                        <span>15</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">
                        {eliRoundArr[1].player1.group}
                        {getTitle(eliRoundArr[1].player1.result)}
                        <span>{score}</span></li>
                    <li class="game game-spacer"><span>{gameIndex+1}&nbsp;</span></li>
                    <li class="game game-bottom ">
                        {eliRoundArr[1].player2.group}
                        {getTitle(eliRoundArr[1].player2.result)}
                        <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">{
                        eliRoundArr[2].player1.group}
                        {getTitle(eliRoundArr[2].player1.result)}
                        <span>{score}</span></li>
                    <li class="game game-spacer"><span>{gameIndex+2}&nbsp;</span></li>
                    <li class="game game-bottom ">
                        {eliRoundArr[2].player2.group}
                        {getTitle(eliRoundArr[2].player2.result)}
                        <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">
                        {eliRoundArr[3].player1.group}
                        {getTitle(eliRoundArr[3].player1.result)}
                        <span>{score}</span></li>
                    <li class="game game-spacer"><span>{gameIndex+3}&nbsp;</span></li>
                    <li class="game game-bottom ">
                        {eliRoundArr[3].player2.group}
                        {getTitle(eliRoundArr[3].player2.result)}
                        <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">
                        {eliRoundArr[0].player1.group}
                        {getTitle(eliRoundArr[0].player1.result)}
                        <span>score</span></li>
                    <li class="game game-spacer"><span>{gameIndex+4}&nbsp;</span></li>
                    <li class="game game-bottom ">
                        {
                            hasResult(winnerInfo[letterToIndex(eliRoundArr[0].player2.group)], eliRoundArr[0].player2.result) ?
                            <>
                                {getWinnerInfo(winnerInfo[letterToIndex(eliRoundArr[0].player2.group)], eliRoundArr[0].player2.result, 'depart')}
                                {getWinnerInfo(winnerInfo[letterToIndex(eliRoundArr[0].player2.group)], eliRoundArr[0].player2.result, 'degree')}
                                {getWinnerInfo(winnerInfo[letterToIndex(eliRoundArr[0].player2.group)], eliRoundArr[0].player2.result, 'name')}
                            </>
                            : 
                            <>
                                {eliRoundArr[0].player2.group}
                                {getTitle(eliRoundArr[0].player2.result)}
                            </>
                        }
                        <span>15</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">
                        {eliRoundArr[1].player1.group}
                        {getTitle(eliRoundArr[1].player1.result)}
                        <span>{score}</span></li>
                    <li class="game game-spacer"><span>{gameIndex+5}&nbsp;</span></li>
                    <li class="game game-bottom ">
                        {eliRoundArr[1].player2.group}
                        {getTitle(eliRoundArr[1].player2.result)}
                        <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">{
                        eliRoundArr[2].player1.group}
                        {getTitle(eliRoundArr[2].player1.result)}
                        <span>{score}</span></li>
                    <li class="game game-spacer"><span>{gameIndex+6}&nbsp;</span></li>
                    <li class="game game-bottom ">
                        {eliRoundArr[2].player2.group}
                        {getTitle(eliRoundArr[2].player2.result)}
                        <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">
                        {eliRoundArr[3].player1.group}
                        {getTitle(eliRoundArr[3].player1.result)}
                        <span>{score}</span></li>
                    <li class="game game-spacer"><span>{gameIndex+7}&nbsp;</span></li>
                    <li class="game game-bottom ">
                        {eliRoundArr[3].player2.group}
                        {getTitle(eliRoundArr[3].player2.result)}
                        <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-2">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner"> <span>82</span></li>
                    <li class="game game-spacer">{gameIndex+8}</li>
                    <li class="game game-bottom "> <span>56</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner"> <span>74</span></li>
                    <li class="game game-spacer">{gameIndex+9}</li>
                    <li class="game game-bottom "> <span>57</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top "> <span>48</span></li>
                    <li class="game game-spacer">{gameIndex+10}</li>
                    <li class="game game-bottom winner"> <span>70</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top "> <span>50</span></li>
                    <li class="game game-spacer">{gameIndex+11}</li>
                    <li class="game game-bottom winner"> <span>66</span></li>

                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-3">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top "> <span>{score}</span></li>
                    <li class="game game-spacer"><span>{gameIndex+12}&nbsp;</span></li>
                    <li class="game game-bottom "> <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top "> <span>{score}</span></li>
                    <li class="game game-spacer"><span>{gameIndex+13}&nbsp;</span></li>
                    <li class="game game-bottom "> <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-4">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner"> <span>85</span></li>
                    <li class="game game-spacer">{gameIndex+14}</li>
                    <li class="game game-bottom "> <span>63</span></li>
                    
                    <li class="spacer">&nbsp;</li>
                </ul>		
            </main>
        </>
    )
}
           
export default Tournament16;         