import React, { useState } from "react";
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

const LoginForm = ({ setView, setIsLogin }) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        sid: '',
        password: '',
    });
    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState('Alert message');
    const [severity, setSeverity] = useState('error');

    const closeAlert = async () => {
        await delay(2);
        setShowMessage(false);
    };

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
                setAlertMessage('登入成功');
                setSeverity('success');
                setShowMessage(true);
                closeAlert();
                
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("uid", res.data.uid);
                
                await getInfo(res.data.uid, res.data.token);
                
                setIsLogin(true);
                navigate('/');
            } else {
                setAlertMessage('帳號或密碼錯誤');
                setSeverity('warning');
                setShowMessage(true);
                closeAlert();
            }
        } catch (error) {
            setAlertMessage('帳號或密碼錯誤');
            setSeverity('warning');
            setShowMessage(true);
            closeAlert();
        }
    };

    const getInfo = async (uid, token) => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'accept': 'application/json',
            },
        };
        try {
            const res = await instance.get(`/users/${uid}`, config);
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
                
                // Set the view based on the role
                if (res.data.data.role === "2") {
                    setView("manager");
                } else {
                    setView("competitor");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ height: "75vh", paddingBottom: '100px', paddingTop: '60px' }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {showMessage && (
                    <Alert 
                        sx={{ 
                            position: 'fixed', 
                            top: 0, 
                            left: '50%', 
                            transform: 'translateX(-50%)', 
                            zIndex: 1500,  
                            width: 'auto',
                            maxWidth: '90%',
                        }}
                        severity={severity}
                    >
                        {alertMessage}
                    </Alert>
                )}
                <Avatar sx={{ mb: 2, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Box noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        size="small"
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
                        fullWidth
                        name="password"
                        label="密碼"
                        type="password"
                        id="password"
                        autoComplete="current-password"
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