import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const Competitor = ({setView, handleLogOut}) => {
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
                                onClick={() => navigate('/showapplicant',{state:{data: 1}})}
                                variant="outlined"
                                size='large'
                                fullWidth>
                                男單
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                onClick={() => navigate('/showapplicant',{state:{data: 2}})}
                                variant="outlined"
                                size='large'
                                fullWidth>
                                女單
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                onClick={() => navigate('/showapplicant',{state:{data: 3}})}
                                variant="outlined"
                                size='large'
                                fullWidth>
                                男雙
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                onClick={() => navigate('/showapplicant',{state:{data: 4}})}
                                variant="outlined"
                                size='large'
                                fullWidth>
                                女雙
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                onClick={() => navigate('/showapplicant',{state:{data: 5}})}
                                variant="outlined"
                                size='large'
                                fullWidth>
                                混雙
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Competitor;