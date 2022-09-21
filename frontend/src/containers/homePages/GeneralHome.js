import React from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const General = () => {
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
                            onClick={() => navigate('/schedulehome')}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            賽程專區
                        </Button>
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate('/competitionrule')}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            競賽章程
                        </Button>
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <Button component={Link} to="/"
                            variant="outlined"
                            size='large'
                            fullWidth>
                            及時比分
                        </Button>
                    </Grid> 
                    currently not open these functions*/}
                    <Grid item xs={12}>
                        <Button onClick={() => navigate('/login')}
                            variant="contained"
                            size='large'
                            fullWidth>
                            登入
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => navigate('/signup')}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            註冊
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default General;
