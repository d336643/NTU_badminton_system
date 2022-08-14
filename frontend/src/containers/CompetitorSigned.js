import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Autocomplete from '@mui/material/Autocomplete';
import InfoIcon from '@mui/icons-material/Info';
import instance from "../instance";
import Navbar from './Navbar'
import { useParams, useNavigate } from "react-router-dom";

const Reset = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        console.log('Received values for reset password: ', event);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
        });
        // navigate("/");
    };

    return (
        <>
            {/* <Navbar /> */}
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
                    {/* <Typography 
                        margin= "5% 0px 5% 0px"
                        component="h3"
                        variant="h4"
                    >
                        忘記密碼
                    </Typography> */}
                    <h3>請輸入電子郵件以重設密碼</h3>
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
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Reset;