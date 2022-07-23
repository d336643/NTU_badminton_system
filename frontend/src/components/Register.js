import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
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

const LoginForm = () => {
    const [values, setValues] = React.useState({
        solo: '',
        double: '',
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };
    

    return (
        <Container component="main" maxWidth="sm" display='flex'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: '20%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    component={Container} 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '3%'
                    }}
                >
                    <Typography component="h2" variant="h5" sx={{ mb: '5%'}}>
                        單打
                    </Typography>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/2' }} id="solo-entry" primary="項目" />
                        <FormControl sx={{ gridColumn: '3/7' }}>
                            <InputLabel id="select-solo">請選擇</InputLabel>
                            <Select
                            labelId="select-solo"
                            id="select-solo"
                            value={values.solo}
                            label="solo"
                            onChange={handleChange}
                            >
                                <MenuItem value={"MS"}>男單</MenuItem>
                                <MenuItem value={"FS"}>女單</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                </Box>
                <Divider style={{width:'90%', bgcolor: 'secondary', margin: '2%'}} />
                <Box
                    component={Container} 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '3%'
                    }}
                >
                    <Typography component="h2" variant="h5" sx={{ mb: '5%'}}>
                        雙打
                    </Typography>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/2' }} id="double-entry-1" primary="項目一" />
                        <FormControl sx={{ gridColumn: '3/7' }}>
                            <InputLabel id="select-double-1">請選擇</InputLabel>
                            <Select
                                labelId="select-double-1"
                                id="select-double-1"
                                value={values.double}
                                label="double-1"
                                onChange={handleChange}
                            >
                                <MenuItem value={"BD"}>男雙</MenuItem>
                                <MenuItem value={"GD"}>女雙</MenuItem>
                                <MenuItem value={"MD"}>女雙</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/2' }} id="student-id-reg1" primary="隊友學號" />
                        <TextField
                            sx={{ gridColumn: '3/7' }}
                            required
                            id="student-id-reg1"
                            label="隊友學號"
                            name="student-id-reg1"
                            autoComplete="student-id-reg1"
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/2' }} id="double-entry-2" primary="項目二" />
                        <FormControl sx={{ gridColumn: '3/7' }}>
                            <InputLabel id="select-double-2">請選擇</InputLabel>
                            <Select
                                labelId="select-double-2"
                                id="select-double-2"
                                value={values.double}
                                label="double-2"
                                onChange={handleChange}
                            >
                                <MenuItem value={"BD"}>男雙</MenuItem>
                                <MenuItem value={"GD"}>女雙</MenuItem>
                                <MenuItem value={"MD"}>女雙</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/2' }} id="student-id-reg2" primary="隊友學號" />
                        <TextField
                            sx={{ gridColumn: '3/7' }}
                            required
                            id="student-id-reg2"
                            label="隊友學號"
                            name="student-id-reg2"
                            autoComplete="student-id-reg2"
                        />
                    </ListItem>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginForm;
