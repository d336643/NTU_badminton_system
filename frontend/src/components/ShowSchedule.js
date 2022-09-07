import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { DoubleSquare } from "../ScheduleGraph/Square" // {} if no export default
import { EVENTENTRY } from '../utilities/entry';
import { useNavigate } from "react-router-dom";

const ShowSchedule = ({dataId}) => {
    const navigate = useNavigate();

    return (
        <>
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
        </>
    )
}

export default ShowSchedule;
