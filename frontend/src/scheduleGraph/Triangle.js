import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { EVENTENTRY, LETTERS, DEGREECODE } from '../utilities/entry';
import { getDepartmentLabel } from '../utilities/getDepartment';
import '../style/schedule.css';

export const SingleTriangle = ({groupLabel, detail, viewType}) => {
    const game1 = detail[0].typeIndex, game2 = detail[1].typeIndex, game3 = detail[2].typeIndex;

    return (
        <>
            <div class="content">
                <div class="above-player">
                    <div class="name" id="unit[pos1]">{getDepartmentLabel(detail[0].player1[0].departmentId)}{DEGREECODE[Number(detail[0].player1[0].degreeId)-1]}</div>
                    <div class="name" id="unit[pos1]">{detail[0].player1[0].username}</div>
                </div>
                <div class="triangle-block">
                    <div class="label">{groupLabel}</div>
                    <div class="tlt">{detail[0].score1 === null ? '' : detail[0].score1}<div class="score" id="[game1]_above"/></div>
                    <div class="trt">{detail[1].score1 === null ? '' : detail[1].score1}<div class="score" id="[game2]_above"/></div>
                    <div class="tll">{detail[0].score2 === null ? '' : detail[0].score2}<div class="score" id="[game1]_below"/></div>
                    <div class="trr">{detail[1].score2 === null ? '' : detail[1].score2}<div class="score" id="[game2]_below"/></div>
                    <div class="lrl">{detail[2].score1 === null ? '' : detail[2].score1}<div class="score" id="[game3]_above"/></div>
                    <div class="lrr">{detail[2].score2 === null ? '' : detail[2].score2}<div class="score" id="[game3]_below"/></div>
                    <div class="triangle-game1">{game1}</div><div class="triangle-game2">{game2}</div><div class="triangle-game3">{game3}</div>
                    <div class="triangle"></div>
                </div>
                { viewType === "edit" ? 
                    <div class="below-player">
                        <div class="name" id="unit[pos2]">{getDepartmentLabel(detail[0].player2[0].departmentId)}{DEGREECODE[Number(detail[0].player2[0].degreeId)-1]}</div>
                        <div class="name" id="unit[pos2]">{detail[0].player2[0].username}</div>
                        <div class="separater"></div>
                        <div class="name" id="unit[pos1]">{getDepartmentLabel(detail[1].player2[0].departmentId)}{DEGREECODE[Number(detail[1].player2[0].degreeId)-1]}</div>
                        <div class="name" id="unit[pos3]">{detail[1].player2[0].username}</div>
                    </div>
                    :
                    <div class="below-player">
                        <div class="name" id="unit[pos2]">{getDepartmentLabel(detail[0].player2[0].departmentId)}{DEGREECODE[Number(detail[0].player2[0].degreeId)-1]}</div>
                        <div class="name" id="unit[pos2]">{detail[0].player2[0].username}</div>
                        <div class="separater"></div>
                        <div class="name" id="unit[pos1]">{getDepartmentLabel(detail[1].player2[0].departmentId)}{DEGREECODE[Number(detail[1].player2[0].degreeId)-1]}</div>
                        <div class="name" id="unit[pos3]">{detail[1].player2[0].username}</div>
                    </div>
                }
            </div>
        </>
    )
}

export const DoubleTriangle = ({groupLabel, detail, viewType}) => {
    const game1 = detail[0].typeIndex, game2 = detail[1].typeIndex, game3 = detail[2].typeIndex

    return (
        <>
            <div class="content">
                <div class="above-player">
                    <div class="name" id="unit[pos1]u">{getDepartmentLabel(detail[0].player1[0].departmentId)}{DEGREECODE[Number(detail[0].player1[0].degreeId)-1]}</div>
                    <div class="name" id="name[pos1]u">{detail[0].player1[0].username}</div><br/>
                    <div class="name" id="unit[pos1]d">{getDepartmentLabel(detail[0].player1[1].departmentId)}{DEGREECODE[Number(detail[0].player1[1].degreeId)-1]}</div>
                    <div class="name" id="name[pos1]d">{detail[0].player1[1].username}</div>
                </div>
                <div class="triangle-block">
                    <div class="label">{groupLabel}</div>
                    <div class="tlt">{detail[0].score1 === null ? '' : detail[0].score1}<div class="score" id="[game1]_above"/></div>
                    <div class="trt">{detail[1].score1 === null ? '' : detail[1].score1}<div class="score" id="[game2]_above"/></div>
                    <div class="tll">{detail[0].score2 === null ? '' : detail[0].score2}<div class="score" id="[game1]_below"/></div>
                    <div class="trr">{detail[1].score2 === null ? '' : detail[1].score2}<div class="score" id="[game2]_below"/></div>
                    <div class="lrl">{detail[2].score1 === null ? '' : detail[2].score1}<div class="score" id="[game3]_above"/></div>
                    <div class="lrr">{detail[2].score2 === null ? '' : detail[2].score2}<div class="score" id="[game3]_below"/></div>
                    <div class="triangle-game1">{game1}</div><div class="triangle-game2">{game2}</div><div class="triangle-game3">{game3}</div>
                    <div class="triangle"></div>
                </div>
                <div class="below-player">
                    { viewType === "edit" ? 
                        <div class="group">
                            <div class="name" id="unit[pos2]u">{getDepartmentLabel(detail[0].player2[0].departmentId)}{DEGREECODE[Number(detail[0].player2[0].degreeId)-1]}</div>
                            <div class="name" id="name[pos2]u">{detail[0].player2[0].username}</div><br></br>
                            <div class="name" id="unit[pos2]d">{getDepartmentLabel(detail[0].player2[1].departmentId)}{DEGREECODE[Number(detail[0].player2[1].degreeId)-1]}</div>
                            <div class="name" id="name[pos2]d">{detail[0].player2[1].username}</div>
                        </div>
                        :
                        <div class="group">
                            <div class="name" id="unit[pos2]u">{getDepartmentLabel(detail[0].player2[0].departmentId)}{DEGREECODE[Number(detail[0].player2[0].degreeId)-1]}</div>
                            <div class="name" id="name[pos2]u">{detail[0].player2[0].username}</div><br></br>
                            <div class="name" id="unit[pos2]d">{getDepartmentLabel(detail[0].player2[1].departmentId)}{DEGREECODE[Number(detail[0].player2[1].degreeId)-1]}</div>
                            <div class="name" id="name[pos2]d">{detail[0].player2[1].username}</div>
                        </div>
                    }
                    <div class="separater"></div>
                    { viewType === "edit" ? 
                        <div class="group">
                            <div class="name" id="unit[pos3]u">{getDepartmentLabel(detail[1].player2[0].departmentId)}{DEGREECODE[Number(detail[1].player2[0].degreeId)-1]}</div>
                            <div class="name" id="name[pos3]u">{detail[1].player2[0].username}</div><br></br>
                            <div class="name" id="unit[pos3]d">{getDepartmentLabel(detail[1].player2[1].departmentId)}{DEGREECODE[Number(detail[1].player2[1].degreeId)-1]}</div>
                            <div class="name" id="name[pos3]d">{detail[1].player2[1].username}</div>
                        </div>
                        :
                        <div class="group">
                            <div class="name" id="unit[pos3]u">{getDepartmentLabel(detail[1].player2[0].departmentId)}{DEGREECODE[Number(detail[1].player2[0].degreeId)-1]}</div>
                            <div class="name" id="name[pos3]u">{detail[1].player2[0].username}</div><br></br>
                            <div class="name" id="unit[pos3]d">{getDepartmentLabel(detail[1].player2[1].departmentId)}{DEGREECODE[Number(detail[1].player2[1].degreeId)-1]}</div>
                            <div class="name" id="name[pos3]d">{detail[1].player2[1].username}</div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}