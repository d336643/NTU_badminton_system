import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { EVENTENTRY, LETTERS, DEGREECODE, DEPARTMENT } from '../utilities/entry';
import '../style/schedule.css';

const getDepartmentLabel = (departmentId) => {
    const key = Object.keys(DEPARTMENT);
    const value = Object.values(DEPARTMENT);
    const target = value.map(function(x, i) {
        if (String(key[i]) === String(departmentId)) {
            // console.log(value[i])
            return String(value[i])
        } 
    });
    return target;
}

export const DoubleSquare = ({groupLabel, detail, viewType}) => {
    // viewType: edit, show
    const game1 = detail[0].typeIndex, game2 = detail[1].typeIndex, game3 = detail[2].typeIndex, game4 = detail[3].typeIndex, game5 = detail[4].typeIndex, game6 = detail[5].typeIndex;
    
    return (
        <>
            <div class="content">
                <div class="above-player">
                    {viewType === "edit" ? 
                        <></>
                        : 
                        <div class="group">
                            <div class="name" id="unit[pos1]u">{getDepartmentLabel(detail[0].player1[0].departmentId)}{DEGREECODE[Number(detail[0].player1[0].degreeId)-1]}</div>
                            <div class="name" id="name[pos1]u">{detail[0].player1[0].username}</div><br></br>
                            <div class="name" id="unit[pos1]d">{getDepartmentLabel(detail[0].player1[1].departmentId)}{DEGREECODE[Number(detail[0].player1[1].degreeId)-1]}</div>
                            <div class="name" id="name[pos1]d">{detail[0].player1[1].username}</div>
                        </div>
                    }
                    <div class="separater"></div>
                        {viewType === "edit" ? 
                            <></>
                            : 
                            <div class="group">
                                <div class="name" id="unit[pos2]u">{getDepartmentLabel(detail[0].player2[0].departmentId)}{DEGREECODE[Number(detail[0].player2[0].degreeId)-1]}</div>
                                <div class="name" id="name[pos2]u">{detail[0].player2[0].username}</div><br></br>
                                <div class="name" id="unit[pos2]d">{getDepartmentLabel(detail[0].player2[1].departmentId)}{DEGREECODE[Number(detail[0].player2[1].degreeId)-1]}</div>
                                <div class="name" id="name[pos2]d">{detail[0].player2[1].username}</div>
                            </div>
                        }
                    </div>
                <div class="square-block">
                    <div class="label">{groupLabel}</div>
                    <div class="_121">{detail[0].score1 === null ? '' : detail[0].score1}<div class="score" id="[game1]_above" /></div>
                    <div class="_122">{detail[0].score2 === null ? '' : detail[0].score2}<div class="score" id="[game1]_below" /></div>
                    <div class="_131">{detail[2].score1 === null ? '' : detail[2].score1}<div class="score" id="[game3]_above" /></div>
                    <div class="_141">{detail[4].score1 === null ? '' : detail[4].score1}<div class="score" id="[game5]_above" /></div>
                    <div class="_232">{detail[5].score1 === null ? '' : detail[5].score1}<div class="score" id="[game6]_above" /></div>
                    <div class="_242">{detail[3].score1 === null ? '' : detail[3].score1}<div class="score" id="[game4]_above" /></div>
                    <div class="_133">{detail[2].score2 === null ? '' : detail[2].score2}<div class="score" id="[game3]_below" /></div>
                    <div class="_233">{detail[5].score2 === null ? '' : detail[5].score2}<div class="score" id="[game6]_below" /></div>
                    <div class="_144">{detail[4].score2 === null ? '' : detail[4].score2}<div class="score" id="[game5]_below" /></div>
                    <div class="_244">{detail[3].score2 === null ? '' : detail[3].score2}<div class="score" id="[game4]_below" /></div>
                    <div class="_343">{detail[1].score1 === null ? '' : detail[1].score1}<div class="score" id="[game2]_above" /></div>
                    <div class="_344">{detail[1].score2 === null ? '' : detail[1].score2}<div class="score" id="[game2]_below" /></div>
                    <div class="square-game1">{game1}</div><div class="square-game2">{game2}</div><div class="square-game3">{game3}</div>
                    <div class="square-game4">{game4}</div><div class="square-game5">{game5}</div><div class="square-game6">{game6}</div>
                    <div class="square"></div>
                </div>
                <div class="below-player">
                    {viewType === "edit" ? 
                        <></>
                        :
                        <div class="group">
                            <div class="name" id="unit[pos3]u">{getDepartmentLabel(detail[1].player1[0].departmentId)}{DEGREECODE[Number(detail[1].player1[0].degreeId)-1]}</div>
                            <div class="name" id="name[pos3]u">{detail[1].player1[0].username}</div><br></br>
                            <div class="name" id="unit[pos3]d">{getDepartmentLabel(detail[1].player1[1].departmentId)}{DEGREECODE[Number(detail[1].player1[1].degreeId)-1]}</div>
                            <div class="name" id="name[pos3]d">{detail[1].player1[1].username}</div>
                        </div>
                    }
                    <div class="separater"></div>
                    {viewType === "edit" ? 
                        <></>
                        :
                        <div class="group">
                            <div class="name" id="unit[pos4]u">{getDepartmentLabel(detail[1].player2[0].departmentId)}{DEGREECODE[Number(detail[1].player2[0].degreeId)-1]}</div>
                            <div class="name" id="name[pos4]u">{detail[1].player2[0].username}</div><br></br>
                            <div class="name" id="unit[pos4]d">{getDepartmentLabel(detail[1].player2[1].departmentId)}{DEGREECODE[Number(detail[1].player2[1].degreeId)-1]}</div>
                            <div class="name" id="name[pos4]d">{detail[1].player2[1].username}</div>
                        </div>
                    }
                </div>
            </div>
        </>
        
    )
}

export const SingleSquare = ({groupLabel, detail, viewType}) => {
    // viewType: edit, show
    const game1 = detail[0].typeIndex, game2 = detail[1].typeIndex, game3 = detail[2].typeIndex
    , game4 = detail[3].typeIndex, game5 = detail[4].typeIndex, game6 = detail[5].typeIndex;

    return (
        <div class="content">
            {viewType === "edit" ? 
                <></>
                :
                <div class="above-player">
                    <div class="name" id="unit[pos1]">{getDepartmentLabel(detail[0].player1[0].departmentId)}{DEGREECODE[Number(detail[0].player1[0].degreeId)-1]}</div>
                    <div class="name" id="name[pos1]">{detail[0].player1[0].username}</div>
                    <div class="separater"></div>
                    <div class="name" id="unit[pos2]">{getDepartmentLabel(detail[0].player2[0].departmentId)}{DEGREECODE[Number(detail[0].player2[0].degreeId)-1]}</div>
                    <div class="name" id="name[pos2]">{detail[0].player2[0].username}</div>
                </div>
            }
            <div class="square-block">
                <div class="label">{groupLabel}</div>
                <div class="_121">{detail[0].score1 === null ? '' : detail[0].score1}<div class="score" id="[game1]_above" /></div>
                <div class="_122">{detail[0].score2 === null ? '' : detail[0].score2}<div class="score" id="[game1]_below" /></div>
                <div class="_131">{detail[2].score1 === null ? '' : detail[2].score1}<div class="score" id="[game3]_above" /></div>
                <div class="_141">{detail[4].score1 === null ? '' : detail[4].score1}<div class="score" id="[game5]_above" /></div>
                <div class="_232">{detail[5].score1 === null ? '' : detail[5].score1}<div class="score" id="[game6]_above" /></div>
                <div class="_242">{detail[3].score1 === null ? '' : detail[3].score1}<div class="score" id="[game4]_above" /></div>
                <div class="_133">{detail[2].score2 === null ? '' : detail[2].score2}<div class="score" id="[game3]_below" /></div>
                <div class="_233">{detail[5].score2 === null ? '' : detail[5].score2}<div class="score" id="[game6]_below" /></div>
                <div class="_144">{detail[4].score2 === null ? '' : detail[4].score2}<div class="score" id="[game5]_below" /></div>
                <div class="_244">{detail[3].score2 === null ? '' : detail[3].score2}<div class="score" id="[game4]_below" /></div>
                <div class="_343">{detail[1].score1 === null ? '' : detail[1].score1}<div class="score" id="[game2]_above" /></div>
                <div class="_344">{detail[1].score2 === null ? '' : detail[1].score2}<div class="score" id="[game2]_below" /></div>
                <div class="square-game1">{game1}</div><div class="square-game2">{game2}</div><div class="square-game3">{game3}</div>
                <div class="square-game4">{game4}</div><div class="square-game5">{game5}</div><div class="square-game6">{game6}</div>
                <div class="square"></div>
            </div>
            {viewType === "edit" ? 
                <></>
                :
                <div class="below-player">
                    <div class="name" id="unit[pos3]">{getDepartmentLabel(detail[1].player1[0].departmentId)}{DEGREECODE[Number(detail[1].player1[0].degreeId)-1]}</div>
                    <div class="name" id="name[pos3]">{detail[1].player1[0].username}</div>
                    <div class="separater"></div>
                    <div class="name" id="unit[pos4]">{getDepartmentLabel(detail[1].player2[0].departmentId)}{DEGREECODE[Number(detail[1].player2[0].degreeId)-1]}</div>
                    <div class="name" id="name[pos4]">{detail[1].player2[0].username}</div>
                </div>
            }
        </div>
    )
}

