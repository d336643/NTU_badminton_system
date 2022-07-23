import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate} from "react-router-dom";

export default function SwitchListSecondary() {
    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        name: '',
        studentid: '',
        email: '',
        password: '',
        showPassword: false,
        checkpassword: '',
        showCheckpassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowCheckpassword = () => {
        setValues({
            ...values,
            showCheckpassword: !values.showCheckpassword,
        });
    }

    const handleMouseDownCheckpassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="sm">
            <List
                sx={{
                    marginTop: '20%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                subheader={<ListSubheader>修改個人資料</ListSubheader>}
            >
                <ListItem style={{ display: 'flex', flexDirection: 'row'}}>
                    {/* <ListItemIcon>
                        <WifiIcon />
                    </ListItemIcon> */}
                    <ListItemText id="info-shoot" primary="epo 基本資料頁面截圖" />
                    <Button
                        variant="contained"
                        component="label"
                    >
                        檔案上傳
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="name-item" primary="姓名" />
                    <TextField
                            sx={{ gridColumn: '4/8' }}
                            autoComplete="name"
                            name="fullName"
                            required
                            id="fullName"
                            label="姓名"
                            autoFocus
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="student-id-item" primary="學號 (帳號)" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        required
                        id="student-id"
                        label="學號"
                        name="student-id"
                        autoComplete="student-id"
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="major-item" primary="系級 (簡稱 3~4 字)" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        required
                        id="major"
                        label="系級"
                        name="major"
                        autoComplete="major"
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="birthday-item" primary="生日" />
                    <div style={{ gridColumn: '4/8', display: 'flex', justifyContent: 'space-between' }}>
                        <TextField
                            required
                            id="year"
                            label="民國"
                            name="year"
                            autoComplete="year"
                        />
                        <TextField
                            required
                            id="month"
                            label="月"
                            name="month"
                            autoComplete="month"
                        />
                        <TextField
                            required
                            id="day"
                            label="日"
                            name="day"
                            autoComplete="day"
                        />
                    </div>
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                        disableFuture
                        // label="Responsive"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider> */}
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="identify-item" primary="身分證字號" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        required
                        id="identify"
                        label="身分證字號"
                        name="identify"
                        autoComplete="identify"
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="email-item" primary="電子郵件" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        required
                        id="email"
                        label="電子郵件"
                        name="email"
                        autoComplete="email"
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="phone-item" primary="手機號碼" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        required
                        id="phone"
                        label="手機號碼"
                        name="phone"
                        autoComplete="phone"
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="address-item" primary="地址" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        required
                        id="address"
                        label="地址"
                        name="address"
                        autoComplete="address"
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="password-item" primary="密碼" />
                    <FormControl sx={{ gridColumn: '4/8' }} variant="outlined">
                        <InputLabel htmlFor="adornment-password">更改密碼</InputLabel>
                        <OutlinedInput
                            required
                            id="adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </ListItem>    
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="check-password-item" primary="再次輸入密碼" />
                    <FormControl sx={{ gridColumn: '4/8' }} variant="outlined">
                        <InputLabel htmlFor="adornment-checkpassword">再次輸入密碼</InputLabel>
                        <OutlinedInput
                            required
                            id="adornment-checkpassword"
                            type={values.showCheckpassword ? 'text' : 'checkpassword'}
                            value={values.checkpassword}
                            onChange={handleChange('checkpassword')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowCheckpassword}
                                onMouseDown={handleMouseDownCheckpassword}
                                edge="end"
                                >
                                {values.showCheckpassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Checkpassword"
                        />
                    </FormControl>
                </ListItem>
                <Grid
                    container
                    justifyContent="center"
                    spacing={2}
                    sx={{ mt: 3, mb: 3 }}
                >
                    <Grid item>
                        <Button type="submit" variant="contained">
                            儲存
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="outlined" 
                            onClick={() => navigate('/')}
                        >
                            回主頁面
                        </Button>
                    </Grid>
                </Grid>
            </List>
        </Container>
    );
}
