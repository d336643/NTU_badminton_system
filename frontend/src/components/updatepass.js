import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InfoDialog from "./InfoDialog";
import instance from '../instance';
import { useNavigate, useParams } from "react-router-dom";

const Reset = () => {
    // this.props.match.match.params.studyNo // STY20171011124209535

    // // 获取 success
    // const query = this.props.match.location.search // '?s=1&f=7'
    // const arr = query.split('&') // ['?s=', 'f=7']
    // const successCount = arr[0].substr(3) // '1'
    // const failedCount = arr[1].substr(2) // '7'

    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        const finalForm = {
            token: this.props.match.params.id,
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
            let { data } = await instance.post('/auth/password/reset', form, config);
            if (data.status === 200) {
                // Already sent reset password email.
                setSuccess(true);
                setAlertmessage('重設密碼成功 !');
                setOpen(true);

                // setTimeout(() => {
                //     setShowmessage(false);
                // }, 3000)
            }
        } catch (error) {
			setAlertmessage(String(error).replace('Error: ', ''));
            setOpen(true);
        }
    }

    // useEffect(() => {
    //     console.log(token);
    // })

    return (
        <>
            {/* <Navbar /> */}
            <Container component="main" maxWidth="sm">
                <InfoDialog open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} />
                <CssBaseline />
                {/* {showmessage && (
                    <Alert sx={{ position: 'fixed', top: '10%' }}
                            severity={severity}>
                        {alertmessage}
                    </Alert>
                )} */}
                <List
                    sx={{
                        marginTop: '5%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >   
                    <h3 style={{ marginTop: "5%" }}>重設密碼</h3>
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