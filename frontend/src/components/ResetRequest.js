import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InfoDialog from "../components/InfoDialog";
import instance from '../instance';
import { useNavigate, useParams } from "react-router-dom";

const Reset = () => {
    const { recoveryToken } = useParams();
    const navigate = useNavigate();
    const [showmessage, setShowmessage] = useState(false);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [severity, setSeverity] = useState('error');
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    // const [values, setValues] = useState({
    //     name: localStorage.getItem("name"),
    //     sid: localStorage.getItem("sid"),
    // });

    const handleSubmit = (event) => {
        console.log('Received values for reset password: ', event);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let finalForm = {
            email: data.get('email')
        };
        console.log(finalForm);
        submit(finalForm);
        // navigate("/");
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
            console.log(res);
            if (res.status === 200) {
                // Already sent reset password email.
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
            console.log((error));
			setAlertmessage(String(error).replace('Error: ', ''));
            setOpen(true);
        }
    }

    useEffect(() => {
        console.log(recoveryToken);
    })

    return (
        <>
            {/* <Navbar /> */}
            <Container component="main" maxWidth="xs">
                <InfoDialog open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} />
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
                        <Alert sx={{ position: 'fixed', top: '10%' }}
                                severity={severity}>
                            {alertmessage}
                        </Alert>
                    )}
                    <h3 style={{ marginBottom: '3%' }}>請輸入電子郵件以重設密碼</h3>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            size="small"
                            required
                            fullWidth
                            id="email"
                            label="電子郵件(請輸入學校信箱)"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 4, mb: 3 }}
                        >
                            重設密碼
                        </Button>
                        <Button 
                            fullWidth
                            variant="outlined"
                            onClick={handleSubmit}
                        >
                            回到登入
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Reset;
