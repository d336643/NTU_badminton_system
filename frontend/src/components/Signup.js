import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Navbar from './navbarComponents/Navbar'
import { useNavigate } from "react-router-dom";

export default function SwitchListSecondary() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        sid: '',
        degreeID: 0,
        departmentID: '',
        birthday: '',
        iid: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        showPassword: false,
        confirmPassword: '',
        
    });
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    // const [submit, setSubmit] = useState(false);

    useEffect(() => {
		console.log(file);
	}, [file])

    const onFinish = (values) => {
        // console.log('Received values of form: ', values);
        // let year = values.year;
        // let {checkedMonth, checkedDay} = monthDayCheck(values.month, values.day);
        // let date = `${year}-${checkedMonth}-${checkedDay}`;
        // delete values.year;
        delete values.showPassword;
        delete values.confirmPassword;
    
        let finalForm = {...values, ...{file: file}};
        console.log(finalForm);
        // submitForm(finalForm);
        
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        navigate('/');
    };
    //   const submit = async (request) => {
    //     try {
    //       let res = await instance.post('/auth/users/', request);
    //       console.log(res.data);
    //       setIsModalVisible(true);
    //     } catch (error) {
    //       console.log(error.response.data);
    //     }
    //   }

	// const submitForm = async(form) => {
	// 	const config = {
	// 		headers:{
	// 			'Content-Type': 'multipart/form-data'
	// 		}
	// 	}
	// 	console.log(form);
	// 	try {
	// 		let res = await instance.post('/users/register', form, config);
	// 		console.log(res.data);
	// 		if(res.status === 200) {
	// 			// setBtnDisable(true);
	// 			// setSuccess(true);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
    //         if(error.response.status === 413) message.warn("圖片檔過大，請重新挑選圖片!", 1.5);
	// 		// setBtnDisable(false);
	// 	}
	// }

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

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="sm">
                <Dialog
                    open={open}
                    onClose={handleClose}
                    // aria-labelledby="alert-dialog-title"
                    // aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>成功送出</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            將為您導回首頁，請至學校信箱驗證帳戶 !
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            知道了
                        </Button>
                    </DialogActions>
                </Dialog>
                <List
                    sx={{
                        marginTop: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    subheader={<ListSubheader>註冊帳號</ListSubheader>}
                >
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="info-shoot" primary="epo 基本資料頁面截圖" />
                        <Button 
                            sx={{ gridColumn: '4/8' }}
                            variant="contained"
                            component="label"
                        >
                            檔案上傳
                            <input
                                hidden
                                type="file"
                                value={file}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </Button>
                        <div style={{ display: 'flex', flexDirection: 'column'}}>
                            <p>範例</p>
                            <img
                                maxwidth="300" height="200"
                                src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
                                alt='epo範例'
                                loading="lazy"
                            />
                        </div>
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="name-item" primary="姓名" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            autoComplete="name"
                            name="fullName"
                            required
                            id="fullName"
                            label="姓名"
                            autoFocus
                            onChange={handleChange('name')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="學號 (帳號)" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            required
                            id="sid"
                            label="學號"
                            name="sid"
                            autoComplete="sid"
                            onChange={handleChange('sid')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="dgreeID-item" primary="學院" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            required
                            id="dgreeID"
                            label="學院"
                            name="dgreeID"
                            autoComplete="dgreeID"
                            onChange={handleChange('dgreeID')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="departmentID-item" primary="系所" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            required
                            id="departmentID"
                            label="系所"
                            name="departmentID"
                            autoComplete="departmentID"
                            onChange={handleChange('departmentID')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="birthday-item" primary="生日" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            id="date"
                            label="出生年/月/日"
                            type="date"
                            defaultValue="2017-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange('birthday')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="iid-item" primary="身分證字號" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            required
                            id="iid"
                            label="身分證字號"
                            name="iid"
                            autoComplete="iid"
                            onChange={handleChange('iid')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="email-item" primary="電子郵件" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            required
                            id="email"
                            label="電子郵件"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange('email')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="phone-item" primary="手機號碼" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            required
                            id="phone"
                            label="手機號碼"
                            name="phone"
                            autoComplete="phone"
                            onChange={handleChange('phone')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="address-item" primary="地址" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            required
                            id="address"
                            label="地址"
                            name="address"
                            autoComplete="address"
                            onChange={handleChange('address')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="password-item" primary="密碼" />
                        <FormControl sx={{ gridColumn: '4/8' }} size="small" variant="outlined">
                            <InputLabel htmlFor="adornment-password">密碼</InputLabel>
                            <OutlinedInput
                                required
                                id="adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                error={values.password.length < 8}
                                helperText="密碼須為8位英文及數字混和組成"
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
                        <ListItemText sx={{ gridColumn: '1/3' }} id="confirm-item" primary="再次輸入密碼" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            required
                            id="confirmPassword"
                            type={'password'}
                            label="再次輸入密碼"
                            name="confirmPassword"
                            autoComplete="confirmPassword"
                            onChange={handleChange('confirmPassword')}
                            // error={values.password === ""}
                            helperText={values.confirmPassword !== "" && values.confirmPassword !== values.password ? '輸入與密碼不一致' : ''}
                        />
                    </ListItem>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 3 }}
                        onClick={onFinish}
                    >
                        確認送出
                    </Button>
                    <Button 
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate('/login')}
                    >
                        登入
                    </Button>
                </List>
            </Container>
        </>
    );
}
