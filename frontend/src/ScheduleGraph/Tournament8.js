import React, { useState } from 'react';
import '../style/tournament.css';

const Tournament8 = () => {
    const [score, setScore] = useState();

    return (
        <>
            <h1>8強圖表</h1>
            <main id="tournament">
                <ul class="round round-1">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Lousville <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Colo St <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Oregon <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Saint Louis <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Memphis <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Mich St <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Creighton <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Duke <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-2">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top "> <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom "> <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top "> <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom "> <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-3">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top "> <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom "> <span>{score}</span></li>
                    
                    <li class="spacer">&nbsp;</li>
                </ul>
            </main>
        </>
    )
}
           
export default Tournament8;               