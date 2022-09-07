import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const Competitor = ({setView, handleLogOut}) => {
    const navigate = useNavigate();
    return (
        <>暫不開放</>
        // <Container component="main" maxWidth="xs">
        //     <Box
        //         sx={{
        //             mt: '20%',
        //             mb: '20%',
        //             display: 'flex',
        //             flexDirection: 'column',
        //             alignItems: 'center',
        //         }}
        //     >
        //         裁判系統
        //     </Box>
        // </Container>
    )
}

export default Competitor;
