import React from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { REGISTRATION_OPEN } from '../../utilities/globalVariable';

const Manager = ({ handleLogOut }) => {
    const token = localStorage.getItem('token');
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
                    {!REGISTRATION_OPEN && (
                        <>
                            <Grid item xs={12}>
                                <Button 
                                    onClick={() => navigate("/schedulehome")}
                                    variant="outlined"
                                    size='large'
                                    fullWidth>
                                    進入賽程系統
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                    onClick={() => navigate("/refereesys")}
                                    variant="outlined"
                                    size='large'
                                    fullWidth>
                                    進入裁判系統
                                </Button>
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate("/showallapplicant")}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            報名者表單、繳費
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant="outlined"
                            size='large'
                            fullWidth
                            onClick={handleLogOut}>
                            登出
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Manager;