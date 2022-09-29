import React, { useState } from 'react';
import '../style/tournament.css';

const Tournament32 = () => {
    const [score, setScore] = useState();

    return (
        <>
            <h1>32強圖表</h1>
            <main id="tournament">
                <ul class="round round-1">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Lousville <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">NC A&T <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Colo St <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Missouri <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Oklahoma St <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom winner">Oregon <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Saint Louis <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">New Mexico St <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Memphis <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">St Mary's <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Mich St <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Valparaiso <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Creighton <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Cincinnati <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Duke <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Albany <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Lousville <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">NC A&T <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Colo St <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Missouri <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Oklahoma St <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom winner">Oregon <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Saint Louis <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">New Mexico St <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Memphis <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">St Mary's <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Mich St <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Valparaiso <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Creighton <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Cincinnati <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Duke <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Albany <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-2">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Lousville <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Colo St <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Oregon <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Saint Louis <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Memphis <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom winner">Mich St <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Creighton <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom winner">Duke <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Lousville <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Colo St <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Oregon <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Saint Louis <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Memphis <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom winner">Mich St <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Creighton <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom winner">Duke <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-3">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Lousville <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Oregon <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Mich St <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom winner">Duke <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>

                    <li class="game game-top winner">Lousville <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Oregon <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top ">Mich St <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom winner">Duke <span>{score}</span></li>

                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-4">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Lousville <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Duke <span>{score}</span></li>
                    
                    <li class="spacer">&nbsp;</li>

                    <li class="game game-top winner">Lousville <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Duke <span>{score}</span></li>
                    
                    <li class="spacer">&nbsp;</li>
                </ul>
                <ul class="round round-5">
                    <li class="spacer">&nbsp;</li>
                    
                    <li class="game game-top winner">Lousville <span>{score}</span></li>
                    <li class="game game-spacer">&nbsp;</li>
                    <li class="game game-bottom ">Duke <span>{score}</span></li>
                    
                    <li class="spacer">&nbsp;</li>
                </ul>
            </main>
        </>
    )
}
           
export default Tournament32;          