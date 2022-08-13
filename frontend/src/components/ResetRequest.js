import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import instance from '../instance';
import { useNavigate } from "react-router-dom";

const Reset = () => {
    const navigate = useNavigate();
    const [showmessage, setShowmessage] = useState(false);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [severity, setSeverity] = useState('error');

    const [values, setValues] = useState({
        name: localStorage.getItem("name"),
        sid: localStorage.getItem("sid"),
    });

    const handleSubmit = (event) => {
        console.log('Received values for reset password: ', event);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let finalForm = {
            name: localStorage.getItem("name"),
            sid: localStorage.getItem("sid"),
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
            let { data } = await instance.post('/users/login', form, config);
            if (data.status === 200) {
                // Already sent reset password email.
                setAlertmessage('重設密碼連結已寄送至電子郵件信箱');
                setSeverity('success')
                setShowmessage(true);

                setTimeout(() => {
                    setShowmessage(false);
                }, 3000)
            }
            else if (data.status === 403) {
                // Wrong name or sid or email.
                setAlertmessage('輸入之電子郵件錯誤');
                setSeverity('error')
                setShowmessage(true);

                setTimeout(() => {
                    setShowmessage(false);
                }, 3000)
                // window.location.reload()
            }
            else if (data.status === 429) {
                // Reset password too frequently.
                setAlertmessage('每日重置申請次數不得超過 2 次, 每次申請間隔不得低於 15 分鐘');
                setSeverity('error')
                setShowmessage(true);

                setTimeout(() => {
                    setShowmessage(false);
                }, 3000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {/* <Navbar /> */}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <p>忘記密碼請聯絡粉專</p>
                    <Button 
                        variant="outlined"
                        onClick={() => navigate('/')}
                        sx={{mt:3}}
                    >
                        返回主頁面
                    </Button>
                    {/* {showmessage && (
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
                            onClick={() => navigate('/login')}
                        >
                            回到登入
                        </Button>
                    </Box> */}
                </Box>
            </Container>
        </>
    );
}

export default Reset;
