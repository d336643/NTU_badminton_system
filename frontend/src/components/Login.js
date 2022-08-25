import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import delay from '../utilities/delay';
import instance from "../instance";

const LoginForm = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        sid: '',
        password: '',
    });
    const [showmessage, setShowmessage] = useState(false);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [severity, setSeverity] = useState('error');
    // const [open, setOpen] = useState(false);
    // const [success, setSuccess] = useState(false);

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
        event.preventDefault();
        submit(values);
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
            if (res.data.success === true) {
                // setView("competitor")
                localStorage.setItem("token", res.data.token);
                // console.log("userId", res.data.uid);
                localStorage.setItem("uid", res.data.uid);
                
                await getInfo(res.data.uid, res.data.token);

                navigate('/');
            }
            else {
                setAlertmessage('帳號或密碼錯誤');
                setSeverity('warning');
                setShowmessage(true);
                closeAlert();
            }
        } catch (error) {
            setAlertmessage('帳號或密碼錯誤');
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
            if (res.status === 200) {
                localStorage.setItem("name", res.data.data.username);
                localStorage.setItem("sid", res.data.data.sid);
                localStorage.setItem("degreeId", res.data.data.degreeId);
                localStorage.setItem("departmentId", res.data.data.departmentId);
                localStorage.setItem("birthday", res.data.data.birthday);
                localStorage.setItem("iid", res.data.data.iid);
                localStorage.setItem("email", res.data.data.email);
                localStorage.setItem("phone", res.data.data.phone);
                localStorage.setItem("accountStatus", res.data.data.accountStatus);
                localStorage.setItem("address", res.data.data.address);
            }
        } catch (error) {
            // console.log((error));
        }
    }

    return (
        <>
            <Container component="main" maxWidth="xs" sx={{height: "75vh"}}>
            {/* <InfoDialog open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} /> */}
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {showmessage && (
                        <Alert sx={{ position: 'fixed', top: '8%' }}
                                severity={severity}>
                            {alertmessage}
                        </Alert>
                    )}
                    <Avatar sx={{ mb: 2, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Box noValidate sx={{ mt: 1 }}>
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
                            onClick={handleSubmit}
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
