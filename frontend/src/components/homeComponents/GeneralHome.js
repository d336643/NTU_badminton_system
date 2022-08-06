import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const General = () => {
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
                    {/* <Typography 
                        margin= "5% 0px 5% 0px"
                        component="h3"
                        variant="h4"
                    >
                        臺大羽球比賽
                    </Typography> */}
                    <Grid item xs={12}>
                        <Button component={Link} to="/register"
                            variant="outlined"
                            size='large'
                            fullWidth>
                            賽程專區
                        </Button>
                    </Grid>
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
                        <Button component={Link} to="/login"
                            variant="outlined"
                            size='large'
                            fullWidth>
                            登入
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default General;
