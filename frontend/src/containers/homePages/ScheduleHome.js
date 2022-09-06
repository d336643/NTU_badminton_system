import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const Competitor = () => {
    const navigate = useNavigate();
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        mt: '20%',
                        mb: '20%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Grid
                        container
                        justifyContent="center"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Button 
                                onClick={() => navigate('/schedulesummary')}
                                variant="outlined"
                                size='large'
                                fullWidth>
                                分項賽程
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                // onClick={() => navigate('/showapplicant',{state:{data: 2}})}
                                variant="outlined"
                                size='large'
                                fullWidth>
                                總賽程時間表
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Competitor;
