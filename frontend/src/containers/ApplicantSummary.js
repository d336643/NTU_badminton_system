import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Competitor = ({setView, handleLogOut}) => {

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
                    <Grid item xs={12}>
                        <Button component={Link} to={{
                            pathname: "/showapplicant",
                            data: 1 // your data array of objects
                        }}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            男單
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link} to={{
                                pathname: "/showapplicant",
                                data: 2 // your data array of objects
                            }}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            女單
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link} to={{
                                pathname: "/showapplicant",
                                data: 3 // your data array of objects
                            }}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            男雙
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link} to={{
                                pathname: "/showapplicant",
                                data: 4 // your data array of objects
                            }}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            女雙
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button component={Link} to={{
                                pathname: "/showapplicant",
                                data: 5 // your data array of objects
                            }}
                            variant="outlined"
                            size='large'
                            fullWidth>
                            混雙
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Competitor;
