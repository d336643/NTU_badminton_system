import React from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const Manager = ({setView, handleLogOut, identity}) => {
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
                {identity === "manager" ?
                    <Grid
                        container
                        justifyContent="center"
                        spacing={2}
                    >
                        {/* <Grid item xs={12}>
                            <Button 
                                onClick={() => navigate("/schedulehome")}
                                variant="outlined"
                                size='large'
                                fullWidth>
                                進入賽程系統
                            </Button>
                        </Grid> */}
                        <Grid item xs={12}>
                            <Button 
                                onClick={() => navigate("/refereesys")}
                                variant="outlined"
                                size='large'
                                fullWidth>
                                進入裁判系統
                            </Button>
                        </Grid>
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
                    :
                    <Grid
                        container
                        justifyContent="center"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Button 
                                onClick={() => navigate('/schedulehome')}
                                variant="outlined"
                                size='large'
                                fullWidth>
                                賽程專區
                            </Button>
                        </Grid>
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
                            <Button component={Link} to="/register"
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
                }  
            </Box>
        </Container>
    )
}

export default Manager;
