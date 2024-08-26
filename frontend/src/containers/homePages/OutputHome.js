import React, { useState } from 'react';
import { Container, Grid, Box, Button, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import OutputAllGame from '../OutputAllGame';
import OutputGameTable from '../../components/OutputGameTable';

const OutputHome = ({}) => {
    const navigate = useNavigate();
    const [ showed, setShowed ] = useState(false);
    const [ showType, setShowType ] = useState(0);

    const showTable = (type) => {
        setShowType(type);
        setShowed(true);
    }

    return (
        <Container component="main" maxWidth="xs" 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: '100px', 
                paddingTop: '60px'
            }}>
            <CssBaseline />
            {showed ?
                showType === 0 ? <OutputAllGame /> : <OutputGameTable dataId={5} />
                :
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
                                    onClick={() => showTable(0)}
                                    variant="outlined"
                                    size='large'
                                    fullWidth>
                                    初賽出賽單
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                    onClick={() => showTable(1)}
                                    variant="outlined"
                                    size='large'
                                    fullWidth>
                                    複賽出賽單
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                    onClick={() => navigate('/')}
                                    variant="outlined"
                                    size='large'
                                    fullWidth>
                                    返回首頁
                                </Button>
                            </Grid>
                        </Grid>
                </Box>
            }
        </Container>
    )
}

export default OutputHome;
