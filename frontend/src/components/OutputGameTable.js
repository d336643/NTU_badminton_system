import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { height } from '@mui/system';

const tablestyle = {
    border: '1px solid black',
    align: "center",
    justfyContent: 'center',
    height: '55px'
}

const Competitor = () => {
    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: "4%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <h3 style={{ marginBottom: '3%' }}>輸出出賽單</h3>
                <table style={{border: '1px solid black', width: '100%'}}>
                    <tr style={tablestyle}>
                        <th style={tablestyle}>女單 第 1 場次</th>
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
            </Box>
        </Container>
        
    )
}

export default Competitor;