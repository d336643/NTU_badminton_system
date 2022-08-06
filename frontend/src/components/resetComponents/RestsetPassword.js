import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Navbar from '../navbarComponents/Navbar';
import { useNavigate, useParams } from "react-router-dom";

const Reset = () => {
    const navigate = useNavigate();
    const {token} = useParams();
    const [showmessage, setShowmessage] = useState(false);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [severity, setSeverity] = useState('error');
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        let finalForm = {
            token: token,
            password: password,
            confirmPassword: confirmPassword,
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
            let { data } = await instance.post('/users/password/reset', form, config);
            if (data.status === 200) {
                // Already sent reset password email.
                setAlertmessage('重設密碼成功 !');
                setSeverity('success')
                setShowmessage(true);

                setTimeout(() => {
                    setShowmessage(false);
                }, 3000)
            }
            else if (data.status === 400) {
                // Wrong name or sid or email.
                setAlertmessage('輸入之密碼與確認密碼不同');
                setSeverity('error')
                setShowmessage(true);

                setTimeout(() => {
                    setShowmessage(false);
                }, 3000)
                // window.location.reload()
            }
            else if (data.status === 409) {
                // Reset password too frequently.
                setAlertmessage('失效');
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
            <Navbar />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {showmessage && (
                    <Alert sx={{ position: 'fixed', top: '10%' }}
                            severity={severity}>
                        {alertmessage}
                    </Alert>
                )}
                <List
                    sx={{
                        marginTop: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    subheader={<ListSubheader>重設密碼</ListSubheader>}
                >   
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="password-item" primary="新密碼" />
                        <FormControl sx={{ gridColumn: '4/8' }} size="small" variant="outlined">
                            <InputLabel htmlFor="adornment-password">輸入新密碼</InputLabel>
                            <OutlinedInput
                                id="adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={password.length < 8}
                                helperText="密碼須為8位英文及數字混和組成"
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="confirm-item" primary="再次輸入新密碼" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            required
                            id="confirmPassword"
                            type={'password'}
                            label="再次輸入新密碼"
                            name="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            // error={values.password === ""}
                            helperText={confirmPassword !== "" && confirmPassword !== password ? '輸入與密碼不一致' : ''}
                        />
                    </ListItem>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 4, mb: 3 }}
                        onClick={handleSubmit}
                    >
                        確認重設密碼
                    </Button>
                </List>
            </Container>
        </>
    );
}

export default Reset;
