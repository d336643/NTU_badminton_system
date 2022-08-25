import React from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Manager = ({setView, handleLogOut, identity}) => {
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
                {identity === "manager" ?
                    <Grid
                        container
                        justifyContent="center"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Button component={Link} to="/applicantsummary"
                                variant="outlined"
                                size='large'
                                fullWidth>
                                報名者表單、繳費
                            </Button>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Button component={Link} to="/"
                                variant="outlined"
                                size='large'
                                fullWidth>
                                排賽程
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button component={Link} to="/"
                                variant="outlined"
                                size='large'
                                fullWidth>
                                登入場單
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button component={Link} to="/login"
                                variant="outlined"
                                size='large'
                                fullWidth>
                                清空場次
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button component={Link} to="/editprofile"
                                variant="outlined"
                                size='large'
                                fullWidth>
                                裁判
                            </Button>
                        </Grid> 
                        currently not open these functions*/}
                        <Grid item xs={12}>
                            <Button variant="outlined"
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
                            <Button component={Link} to="/competitionrule"
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
                                報名賽事
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button component={Link} to="/competitorstatus"
                                variant="outlined"
                                size='large'
                                fullWidth>
                                報名 / 繳費狀態
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button component={Link} to={`/editprofile/${token}`}
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
