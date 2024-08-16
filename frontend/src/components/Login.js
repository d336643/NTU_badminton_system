import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Alert,
    Grid,
    Box,
    Container,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import delay from '../utilities/delay';

import { instance, getCommonConfig } from '../apiUtilities/instance';

const LoginForm = ({setView, setIsLogin, setIdentity}) => {
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
        await delay(2);
        setShowmessage(false);
    }

    async function handleAlert(){
        await delay(2);
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

    const submit = async (form) => {
        const config = getCommonConfig(false);
        try {
            const res = await instance.post('/auth/signin', form, config);
            if (res.data.success === true) {
                setAlertmessage('登入成功');
                setSeverity('success');
                setShowmessage(true);
                closeAlert();
                
                // setView("competitor")
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("uid", res.data.uid);
                
                await getInfo(res.data.uid, res.data.token);
                
                setIsLogin(true)
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
                localStorage.setItem("role", res.data.data.role);
                if (res.data.data.role === "2") {
                    setView("manager");
                    setIdentity("manager");
                } else {
                    setView("competitor");
                    setIdentity("competitor");
                }
            }
        } catch (error) {
            // console.log((error));
        }
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ height: "75vh", paddingBottom: '100px', paddingTop: '60px' }}>
            {/* <InfoDialog open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} /> */}
            <CssBaseline />
            <Box
                sx={{
                    marginTop: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {showmessage && (
                    <Alert 
                        sx={{ position: 'fixed', 
                            top: 0, 
                            left: '50%', 
                            transform: 'translateX(-50%)', 
                            zIndex: 1500,  // Increased zIndex value
                            width: 'auto',
                            maxWidth: '90%'}}
                        severity={severity}
                    >
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
        </Container>
    );
}

export default LoginForm;
