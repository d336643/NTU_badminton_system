import React from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const Competitor = ({setView, handleLogOut}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
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
                        <Button component={Link} to="/"
                            variant="outlined"
                            size='large'
                            fullWidth>
                            及時比分
                        </Button>
                    </Grid> 
                    currently not open these functions*/}
                    <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate('/competitionrule')}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            競賽章程
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate('/register')}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            報名 / 編輯賽事
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate('/competitorstatus')}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            報名及繳費狀態
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate('/allapplicant')}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            查看各項目報名選手
                        </Button>
                    </Grid> 
                    {/* <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate(`/editregister/${token}`)}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            編輯 / 查看個人賽事
                        </Button>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Button 
                            onClick={() => navigate(`/editprofile/${token}`)}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            編輯個人資料
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
    )
}

export default Competitor;
