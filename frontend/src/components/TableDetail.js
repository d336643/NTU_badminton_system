import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

import { EVENTENTRY, DEGREECODE, DEPARTMENT, GAME } from '../utilities/entry';

const tablestyle = {
    border: '1px solid black',
    align: "center",
    justfyContent: 'center',
    height: '55px'
}

const wordstyle = {
    marginLeft: '50px'
}

const namestyle = {
    border: '1px solid black',
    align: "center",
    justfyContent: 'center',
    height: '55px',
    width: '200px'
}

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

export const AdvTableDetial = () => {
    return (
        <>
            {Array.from(Array(GAME.length)).map((_, i) => (
                    <table style={
                        // (i+1) % 3 === 0 ? {border: '1px solid black', width: '680px', marginBottom: '80px', marginTop: '50px', pageBreakAfter: 'always' }
                        // : 
                        {border: '1px solid black', width: '680px', marginBottom: '80px', marginTop: '50px'}
                    }>
                        <tr style={tablestyle}>
                            <th style={tablestyle}>
                                {GAME[i].type} &nbsp; 第 {GAME[i].typeIndex} 場次
                                <br/>
                                第 ＿ 場地 &nbsp; 時間 
                                {GAME[i].startTime.slice(5,16)}
                            </th>
                            <th style={namestyle}></th>
                            <th style={namestyle}></th>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}><p style={wordstyle}>得分</p></td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}><p style={wordstyle}>勝方簽名</p></td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}><p style={wordstyle}>裁判簽名</p></td>
                            <td style={tablestyle} colspan="2"></td>
                        </tr>
                    </table>
                ))
            }
        </>
    )
}

export const SingleTableDetial = ({dataId, detail}) => {
    const navigate = useNavigate();
    const [getLen, setGetLen] = useState(false);
    const [len, setLen] = useState(3);

    useEffect(() => {
        detail[0].groupCompeteId <= 2 ? setLen(3) : setLen(6);
        setGetLen(true);
    })

    return (
        <>
            {getLen ?
                Array.from(Array(len)).map((_, i) => (
                    <table style={
                        i === 2 || i === 5 ? {border: '1px solid black', width: '680px', pageBreakAfter: 'always' }
                        // : {border: '1px solid black', width: '680px', marginBottom: '80px', marginTop: '50px'}
                        :{border: '1px solid black', width: '680px', marginBottom: '100px', marginTop: '50px'}
                    }>
                        <tr style={tablestyle}>
                            <th style={tablestyle}>
                                {EVENTENTRY[dataId]} &nbsp; 第 {detail[i].typeIndex} 場次
                                <br/>
                                第 ＿ 場地 &nbsp; 時間 
                                {detail[i].startTime.slice(5,16)}
                            </th>
                            <th style={tablestyle}>
                                {getDepartmentLabel(detail[i].player1[0].departmentId)}
                                {DEGREECODE[Number(detail[i].player1[0].degreeId)-1]}
                                &nbsp; {detail[i].player1[0].username}</th>
                            <th style={tablestyle}>
                                {getDepartmentLabel(detail[i].player2[0].departmentId)}
                                {DEGREECODE[Number(detail[i].player2[0].degreeId)-1]} 
                                &nbsp; {detail[i].player2[0].username}</th>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}><p style={wordstyle}>得分</p></td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}><p style={wordstyle}>勝方簽名</p></td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}><p style={wordstyle}>裁判簽名</p></td>
                            <td style={tablestyle} colspan="2"></td>
                        </tr>
                    </table>
                ))
                : <></>
            }
        </>
    )
}

export const DoubleTableDetial = ({dataId, detail}) => {
    const navigate = useNavigate();
    const [getLen, setGetLen] = useState(false);
    const [len, setLen] = useState(3);

    useEffect(() => {
        detail[0].groupCompeteId <= 2 ? setLen(3) : setLen(6);
        setGetLen(true);
    })

    return (
        <>
            {getLen ?
                Array.from(Array(len)).map((_, i) => (
                    <table style={
                        i === 2 || i === 5 ? {border: '1px solid black', width: '680px', pageBreakAfter: 'always' }
                        // : {border: '1px solid black', width: '680px', marginBottom: '80px', marginTop: '50px'}
                        :{border: '1px solid black', width: '680px', marginBottom: '100px', marginTop: '50px'}
                    }>
                        <tr style={tablestyle}>
                            <th style={tablestyle}>
                                {EVENTENTRY[dataId]} &nbsp; 第 {detail[i].typeIndex} 場次
                                <br/>
                                第 ＿ 場地 &nbsp; 時間 
                                {detail[i].startTime.slice(5,16)}
                            </th>
                            <th style={tablestyle}>
                                {getDepartmentLabel(detail[i].player1[0].departmentId)}
                                {DEGREECODE[Number(detail[i].player1[0].degreeId)-1]} 
                                &nbsp;{detail[i].player1[0].username}
                                <br/>
                                {getDepartmentLabel(detail[i].player1[1].departmentId)}
                                {DEGREECODE[Number(detail[i].player1[1].degreeId)-1]} 
                                &nbsp;{detail[i].player1[1].username}
                            </th>
                            <th style={tablestyle}>
                                {getDepartmentLabel(detail[i].player2[0].departmentId)}
                                {DEGREECODE[Number(detail[i].player2[0].degreeId)-1]} 
                                &nbsp;{detail[i].player2[0].username}
                                <br/>
                                {getDepartmentLabel(detail[i].player2[1].departmentId)}
                                {DEGREECODE[Number(detail[i].player2[1].degreeId)-1]} 
                                &nbsp;{detail[i].player2[1].username}
                                <br/>
                            </th>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}><p style={wordstyle}>得分</p></td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}><p style={wordstyle}>勝方簽名</p></td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}><p style={wordstyle}>裁判簽名</p></td>
                            <td style={tablestyle} colspan="2"></td>
                        </tr>
                    </table>
                ))
                : <></>
            }
        </>
    )
}