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
import Navbar from './Navbar'
import delay from '../utilities/delay';
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

    async function closeAlert(){
        await delay(3);
        setShowmessage(false);
    }

    async function handleAlert(){
        await delay(1);
        setShowmessage(false);
        navigate('/');
    }

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
        submit(form);
        console.log(form);
    };

    // const form = {
    //     sid: "B09705024",
    //     password: "asdfg12345",
    // }

    const submit = async (form) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'accept':'application/json'
            },
        };
        try {
            const res = await instance.post('/auth/signin', form, config);
            console.log(res.data);
            if (res.data.success === true) {
                // setView("competitor")
                console.log(res);
                localStorage.setItem("token", res.data.token);
                console.log("userId", res.data.uid);
                localStorage.setItem("uid", res.data.uid);
                
                await getInfo(res.data.uid, res.data.token);

                setAlertmessage('登入成功');
                setSeverity('success');
                setShowmessage(true);
                handleAlert();
            }
            // else {
            //     setAlertmessage('帳號或密碼錯誤，請重新嘗試');
            //     setSeverity('warning');
            //     setShowmessage(true);
            //     closeAlert();
            // }
        } catch (error) {
            setAlertmessage('帳號或密碼錯誤，請重新嘗試');
            setSeverity('warning');
            setShowmessage(true);
            closeAlert();
        }
    }

    const getInfo = async (uid, token) => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'accept': 'application/json'
            },
        };
        try {
            const res = await instance.get(`/users/${uid}`, config)
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.data.username);
                localStorage.setItem("name", res.data.data.username);
                localStorage.setItem("sid", res.data.data.sid);
                localStorage.setItem("degreeID", res.data.data.degreeID);
                localStorage.setItem("departmentID", res.data.data.departmentID);
                localStorage.setItem("birthday", res.data.data.birthday);
                localStorage.setItem("iid", res.data.data.iid);
                localStorage.setItem("email", res.data.data.email);
                localStorage.setItem("phone", res.data.data.phone);
                localStorage.setItem("accountStatus", res.data.data.accountStatus);
                localStorage.setItem("file", res.data.data.file);
            }
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
