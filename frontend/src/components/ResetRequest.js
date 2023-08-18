import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InfoDialog from "../components/InfoDialog";
import { useNavigate, useParams } from "react-router-dom";
import List from "@mui/material/List";

import { instance, getCommonConfig } from '../apiUtilities/instance';

const Reset = () => {
    const navigate = useNavigate();
    // const [showmessage, setShowmessage] = useState(false);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    // const [severity, setSeverity] = useState('error');
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    const [values, setValues] = useState({
        email: '',
        backEmail: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        // console.log(values);
        submit(values);
    };

    const submit = async (form) => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'accept':'application/json'
            },
        };
        try {
            let res = await instance.post('/auth/password/reset/validate', form, config);
            if (res.status === 200) {
                // Already sent reset password email.
                // getRecoveryToken();
                setSuccess(true);
                setAlertmessage('重設密碼連結已寄送至電子郵件信箱');
                setOpen(true);
                // setSeverity('success')
                // setShowmessage(true);
                // setTimeout(() => {
                //     setShowmessage(false);
                // }, 3000)
            }
        } catch (error) {
			setAlertmessage(String(error).replace('Error: ', ''));
            setOpen(true);
        }
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <InfoDialog route={'/'} open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} />
                <CssBaseline />
                <List
                    sx={{
                        marginTop: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* {showmessage && (
                        <Alert sx={{ position: 'fixed', top: '10%' }}
                                severity={severity}>
                            {alertmessage}
                        </Alert>
                    )} */}
                    <h3 style={{ marginBottom: '20px' }}>請輸入電子郵件以重設密碼</h3>
                    <Box noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            size="small"
                            required
                            fullWidth
                            id="email"
                            label="請輸入台大信箱以驗證身分"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                        <TextField
                            margin="normal"
                            size="small"
                            fullWidth
                            id="backEmail"
                            label="請輸入非台大信箱之電子郵件收取重設密碼連結"
                            name="backEmail"
                            autoComplete="backEmail"
                            autoFocus
                            value={values.backEmail}
                            onChange={handleChange('backEmail')}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 4, mb: 3 }}
                            onClick={handleSubmit}
                        >
                            重設密碼
                        </Button>
                        <Button 
                            fullWidth
                            variant="outlined"
                            onClick={() => navigate('/login')}
                        >
                            回到登入
                        </Button>
                    </Box>
                </List>
            </Container>
        </>
    );
}

export default Reset;
