import React, { useEffect, useState } from "react";

import { useSearchParams, useParams } from "react-router-dom";

import {
    List,
    ListItem,
    ListItemText,
    Container,
    TextField,
    FormControl,
    InputLabel,
    IconButton,
    OutlinedInput,
    CssBaseline,
    Button,
    InputAdornment,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import InfoDialog from "./InfoDialog";

import { checkPassword } from "../utilities/checkString";

import { instance, getCommonConfig } from '../apiUtilities/instance';

const Reset = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const recoverytoken = searchParams.get('token');
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

    const handleSubmit = () => {
        const finalForm = {
            token: recoverytoken,
            password: password,
            confirmPassword: confirmPassword,
        };
        // console.log(finalForm);
        submit(finalForm);
        // navigate("/");
    };

    const submit = async (form) => {
        const config = getCommonConfig(false);
        try {
            let res = await instance.post('/auth/password/reset', form, config);
            // console.log(res)
            if (res.status === 200) {
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

    return (
        <Container component="main" maxWidth="sm" sx={{ paddingBottom: '100px', paddingTop: '60px' }}>
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
                <h3 style={{ marginBottom: "20px" }}>重設密碼</h3>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="password-item" primary="新密碼" />
                    <FormControl sx={{ gridColumn: '4/8' }} size="small" variant="outlined">
                        <InputLabel htmlFor="adornment-password">輸入新密碼</InputLabel>
                        <OutlinedInput
                            id="adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={password.length !== 0 ? checkPassword(password) ? false : true : false}
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
                        {/* <FormHelperText error>
                            {password.length !== 0 ? checkPassword(password) ? "" : "密碼需由至少8位英文及數字混和組成" : ""}
                        </FormHelperText> */}
                    </FormControl>
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="confirm-item" primary="再次輸入新密碼" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        size="small"
                        // required
                        id="confirmPassword"
                        type={'password'}
                        label="再次輸入新密碼"
                        name="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={confirmPassword !== "" && confirmPassword !== password ? true : false}
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
    );
}

export default Reset;
