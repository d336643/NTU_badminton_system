import React from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const HomePage = () => {
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
                    <Typography 
                        margin= "5% 0px 5% 0px"
                        component="h3"
                        variant="h4"
                    >
                        臺大羽球比賽
                    </Typography>
                    <Grid item xs={12}>
                        <Button component={Link} to="/register"
                            variant="outlined"
                            fullWidth>
                            賽程專區
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link} to="/"
                            variant="outlined"
                            fullWidth>
                            個人賽事
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link} to="/"
                            variant="outlined"
                            fullWidth>
                            及時比分
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link} to="/login"
                            variant="outlined"
                            fullWidth>
                            報名賽事
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link} to="/editprofile"
                            variant="outlined"
                            fullWidth>
                            編輯個人資料
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link} to="/login"
                            variant="outlined"
                            fullWidth>
                            報名 / 繳費狀態
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link} to="/login"
                            variant="outlined"
                            fullWidth>
                            登出
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default HomePage;
