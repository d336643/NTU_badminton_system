import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, 
        FormControlLabel, Checkbox, Link, Grid, 
        Box, Typography, Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Login } from '@mui/icons-material';
import { useNavigate} from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LoginForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        console.log('Received values for log in: ', event);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        navigate("/");
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: '20%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ mb: 2, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography 
                    // sx={{
                    //     fontSize: '1.5rem',
                    //     '@media (min-width:600px)': {
                    //         fontSize: '1.8rem',
                    //     },
                    //     '@media (min-width:900px)': {
                    //         fontSize: '2.2rem',
                    //     },
                    // }}
                    margin= "5% 0px 5% 0px"
                    component="h3"
                    variant="h4"
                >
                    臺大羽球比賽
                </Typography>
                {/* <Typography component="h2" variant="h5">
                    Sign in
                </Typography> */}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="學號"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="密碼"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 3 }}
                    >
                        登入
                    </Button>
                    <Grid
                        container
                        justifyContent="center"
                        spacing={2}
                    >
                        <Grid item>
                            <Button href="#" variant="outlined">
                                忘記密碼
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="outlined"
                                onClick={() => navigate('/signup')}
                            >
                                註冊
                            </Button>
                        </Grid>
                    </Grid>
                    {/* <Grid container>
                        <Grid item xs>
                            <Button href="#" variant="outlined">
                                忘記密碼
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button href="#" variant="outlined">
                                {"註冊"}
                            </Button>
                        </Grid>
                    </Grid> */}
                </Box>
            </Box>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
    );
}

export default LoginForm;
