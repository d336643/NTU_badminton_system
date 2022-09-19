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
                    {/* <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate('/assignallschedule')}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            排定賽程
                        </Button>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate('/showallschedule')}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            檢視賽程
                        </Button>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate('/editallschedule')}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            修改賽程
                        </Button>
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <Button 
                            // onClick={() => navigate('/showapplicant',{state:{data: 2}})}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            總賽程時間表
                        </Button>
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate('/outputgametable')}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            輸出出賽單
                        </Button>
                    </Grid> */}
                </Grid>
            </Box>
        </Container>
    )
}

export default Competitor;
