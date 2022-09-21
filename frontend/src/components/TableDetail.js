import React, { useState } from 'react';
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
    height: '50px'
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
    const token = localStorage.getItem("token")

    return (
        <>
            {detail[0].groupCompeteId === 1 || detail[0].groupCompeteId === 2 ? 
                Array.from(Array(3)).map((_, index) => (
                    <table style={{border: '1px solid black', width: '640px'}}>
                        <tr style={tablestyle}>
                            <th style={tablestyle}>{EVENTENTRY[dataId]} 第 1 場次</th>
                            <th style={tablestyle}>職治一 楊子萱</th>
                            <th style={tablestyle}>醫工一 陳湘</th>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>得分</td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>勝方簽名</td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>裁判簽名</td>
                            <td style={tablestyle} colspan="2"></td>
                        </tr>
                    </table>
                ))
                : 
                Array.from(Array(6)).map((_, index) => (
                    <table style={{border: '1px solid black', width: '640px'}}>
                        <tr style={tablestyle}>
                            <th style={tablestyle}>{EVENTENTRY[dataId]} 第 1 場次</th>
                            <th style={tablestyle}>職治一 楊子萱</th>
                            <th style={tablestyle}>醫工一 陳湘</th>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>得分</td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>勝方簽名</td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>裁判簽名</td>
                            <td style={tablestyle} colspan="2"></td>
                        </tr>
                    </table>
                ))
            }
        </>
    )
}

export const DoubleTableDetial = ({dataId, detail}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    return (
        <>
            {detail[0].groupCompeteId === 1 || detail[0].groupCompeteId === 2 ? 
                Array.from(Array(3)).map((_, index) => (
                    <table style={{border: '1px solid black', width: '640px'}}>
                        <tr style={tablestyle}>
                            <th style={tablestyle}>{EVENTENTRY[dataId]} 第 1 場次</th>
                            <th style={tablestyle}>職治一 楊子萱</th>
                            <th style={tablestyle}>醫工一 陳湘</th>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>得分</td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>勝方簽名</td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>裁判簽名</td>
                            <td style={tablestyle} colspan="2"></td>
                        </tr>
                    </table>
                ))
                : 
                Array.from(Array(6)).map((_, index) => (
                    <table style={{border: '1px solid black', width: '640px'}}>
                        <tr style={tablestyle}>
                            <th style={tablestyle}>{EVENTENTRY[dataId]} 第 1 場次</th>
                            <th style={tablestyle}>職治一 楊子萱</th>
                            <th style={tablestyle}>醫工一 陳湘</th>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>得分</td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>勝方簽名</td>
                            <td style={tablestyle}></td>
                            <td style={tablestyle}></td>
                        </tr>
                        <tr style={tablestyle}>
                            <td style={tablestyle}>裁判簽名</td>
                            <td style={tablestyle} colspan="2"></td>
                        </tr>
                    </table>
                ))
            }
        </>
    )
}