import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { DoubleSquare } from "../ScheduleGraph/Square" // {} if no export default
import { EVENTENTRY } from '../utilities/entry';
import { useNavigate, useLocation } from "react-router-dom";

const EditSchedule = () => {
    const navigate = useNavigate();
    const dataId = useLocation();

    return (
        <>
            <Container component="main" maxWidth="md"
                sx={{display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }} >
                <h3 style={{ marginBottom: '2%', marginTop: "5%" }}>分項賽程-{EVENTENTRY[Number(dataId.state.data)-1]}</h3>
                <Grid container columnSpacing={{ xs: 1, md: 2 }}>
                    {Array.from(Array(6)).map((_, index) => (
                        <Grid item xs={6} md={4} key={index}>
                            <item><DoubleSquare /></item>
                        </Grid>
                    ))}
                </Grid>
                {/* <Box
                    sx={{
                        mt: '15%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <DoubleSquare />
                    <DoubleSquare />
                    <DoubleSquare />
                    <DoubleSquare />
                </Box> */}
            </Container>
        </>
    )
}

export default EditSchedule;
