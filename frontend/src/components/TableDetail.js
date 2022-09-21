import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { EVENTENTRY, DEGREECODE, DEPARTMENT } from '../utilities/entry';

const tablestyle = {
    border: '1px solid black',
    align: "center",
    justfyContent: 'center',
    height: '52px'
}

const wordstyle = {
    marginLeft: '50px'
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
                    <table style={{border: '1px solid black', width: '680px', marginBottom: '30px'}}>
                        <tr style={tablestyle}>
                            <th style={tablestyle}>
                                {EVENTENTRY[dataId]} &nbsp; 第 {detail[i].typeIndex} 場次
                                <br/>
                                第 ＿ 場地 &nbsp; 時間 {detail[i].startTime.slice(5,16)}
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
                    <table style={{border: '1px solid black', width: '680px', marginBottom: '30px'}}>
                        <tr style={tablestyle}>
                            <th style={tablestyle}>
                                {EVENTENTRY[dataId]} &nbsp; 第 {detail[i].typeIndex} 場次
                                <br/>
                                第 ＿ 場地 &nbsp; 時間 {detail[i].startTime.slice(5,16)}
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