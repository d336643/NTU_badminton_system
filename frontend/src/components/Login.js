import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Login, Streetview } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import Navbar from './navbarComponents/Navbar'

import instance from "../instance";

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
    const [values, setValues] = useState({
        sid: '',
        password: '',
    });
    const [showmessage, setShowmessage] = useState(false);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [severity, setSeverity] = useState('error');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        console.log('Received values for log in: ', event);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let form = {
            sid: data.get('sid'),
            password: data.get('password'),
        }
        console.log(form);
        // submit(form);
        
        setAlertmessage('帳號或密碼錯誤，請重新嘗試');
        setSeverity('warning')
        setShowmessage(true);

        setTimeout(() => {
            setShowmessage(false);
        }, 3000)
        // wait(3000);
        // navigate("/");
    };

    const submit = async (form) => {
        // const config = {
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'accept':'application/json'
        //     },
        // };
        try {
            let { data } = await instance.post('/users/login', form);
            if (data.status === 200) {
                // setView("competitor")
                localStorage.setItem("token", data.token);
                console.log("userId", data.uid);
                localStorage.setItem("uid", data.uid);
                await getInfo(data.uid);
            }
            else if (data.status === 403) {
                setAlertmessage('帳號或密碼錯誤，請重新嘗試');
                setSeverity('warning')
                setShowmessage(true);

                setTimeout(() => {
                    setShowmessage(false);
                }, 3000)
                // window.location.reload()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getInfo = async (uid) => {
        try {
            let {data} = await instance.get(`/users/${uid}`)
            localStorage.setItem("name", data.name);
            localStorage.setItem("sid", data.sid);
            localStorage.setItem("degreeID", data.degreeID);
            localStorage.setItem("departmentID", data.departmentID);
            localStorage.setItem("birthday", data.birthday);
            localStorage.setItem("iid", data.iid);
            localStorage.setItem("email", data.email);
            localStorage.setItem("phone", data.phone);
            localStorage.setItem("accountStatus", data.accountStatus);
            localStorage.setItem("file", data.file);
            
            setAlertmessage('登入成功');
            setSeverity('success')
            setShowmessage(true);

            setTimeout(() => {
                setShowmessage(false);
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar />
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
                    {showmessage && (
                        <Alert sx={{ position: 'fixed', top: '10%' }}
                                severity={severity}>
                            {alertmessage}
                        </Alert>
                    )}
                    <Avatar sx={{ mb: 2, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            size="small"
                            // required
                            fullWidth
                            id="sid"
                            label="學號"
                            name="sid"
                            autoComplete="sid"
                            autoFocus
                            value={values.sid}
                            onChange={handleChange('sid')}
                        />
                        <TextField
                            margin="normal"
                            size="small"
                            // required
                            fullWidth
                            name="password"
                            label="密碼"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            // error={values.password === ""}
                            // helperText={values.password === "" ? 'Empty field!' : ' '}
                            onChange={handleChange('password')}
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
                                <Button 
                                    variant="outlined"
                                    onClick={() => navigate('/resetpass')}
                                >
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
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </>
    );
}

export default LoginForm;
