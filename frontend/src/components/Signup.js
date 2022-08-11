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
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Navbar from './Navbar';
import instance from "../instance";
import { useNavigate } from "react-router-dom";

const degreeIdEntries = [
    { label: '大一', id : 1 }, { label: '大二', id : 2 }, { label: '大三', id : 3 },
    { label: '大四', id : 4 }, { label: '大五以上', id : 5 }, { label: '碩一', id : 6 },
    { label: '碩二', id : 7 }, { label: '碩三以上', id : 8 }, { label: '博一', id : 9 },
    { label: '博二', id : 10 }, { label: '博三以上', id : 11 }, { label: '交換生', id : 12 },
]

const nationEntries = [ { label: '台灣', id: 1 }, { label: '非台灣', id: 2 }]

export default function SwitchListSecondary() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        sid: '',
        degreeId: 3,
        departmentId: '7050',
        birthday: '2002/4/16',
        iid: 'H225621925',
        email: 'b09705024@ntu.edu.tw',
        phone: '0968650063',
        address: '中壢區...',
        password: 'asdfg12345',
        showPassword: false,
        confirmPassword: '',
    });
    const [open, setOpen] = useState(false);
    const [college, setCollege] = useState();
    const [department, setDepartment] = useState();
    const [nation, setNation] = useState(1);
    const [status, setStatus] = useState(false);
    // const [showmessage, setShowmessage] = useState(false);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    // const [severity, setSeverity] = useState('error');
    // const [submit, setSubmit] = useState(false);

    // const [file, setFile] = useState(null); in this moment we don't need file
    // useEffect(() => {
	// 	console.log(file);
	// }, [file])

    const getInfo = async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'accept':'application/json'
            },
        };
        try {
            const res = await instance.get("/public/departments", config);
            console.log(res.data);
            if (res.data.success === true) {
                console.log(res.data.data);
                // console.log(res.data.colleges);
                // setCollege(res.data.colleges);
                // setDepartment(res.data.departments);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInfo();
    }, [])

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        delete values.showPassword;
        delete values.confirmPassword;
    
        let finalForm = {...values};
        console.log(finalForm);
        submitForm(finalForm);
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

	const submitForm = async(form) => {
		const config = {
			headers:{
				// 'Content-Type': 'multipart/form-data', not use file in this moment
                'Content-Type': 'application/json',
                'accept':'application/json'
			}
		}
		console.log(form);
		try {
			let res = await instance.post('/auth/signup', form, config);
            if (res.success === 200) {
                setStatus(true);
                // setShowmessage(true);
                setAlertmessage("將為您導回首頁，請至學校信箱驗證帳戶 !")
                // setSeverity("success");
                // handleAlert();
                setOpen(true);
            }
            else if (res.success === 400) {
                // setShowmessage(true);
                setAlertmessage(res.msg);
                // setSeverity("error");
                // handleAlert();
                setOpen(true);
            }
		} catch (error) {
			console.log(error);
            // if(error.response.status === 413) message.warn("圖片檔過大，請重新挑選圖片!", 1.5);
			// setBtnDisable(false);
		}
	}

    const handleClose = () => {
        setOpen(false);
        if (status) navigate('/');
    };

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
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {alertmessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <form
                    style={{
                        marginTop: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    // subheader={<ListSubheader>註冊帳號</ListSubheader>}
                >
                    {/* {showmessage && (
                        <Alert sx={{ position: 'fixed', top: '10%'}}
                                severity={severity}
                                variant="filled">
                            {alertmessage}
                        </Alert>
                    )} */}
                    {/* <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
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
                    </ListItem> */}
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
                        <ListItemText sx={{ gridColumn: '1/3' }} id="dgreeID-item" primary="年級" />
                        <Autocomplete 
                            size="small"
                            sx={{ gridColumn: '4/8' }}
                            // disablePortal
                            id="select-degreeId"
                            options={degreeIdEntries}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="請選擇年級" />}
                            onChange={(event, newValue, reason) => {
                                setValues({...values, degreeId: reason === "clear" || reason === "removeOption" ? null : newValue.id});
                            }}
                            // inputProps={{ ...inputProps, readOnly: typeID1 === null && countGame >= 2? true : false }}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="college-item" primary="學院" />
                        <Autocomplete 
                            size="small"
                            sx={{ gridColumn: '4/8' }}
                            // disablePortal
                            id="select-college"
                            options={college}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="請選擇學院" />}
                            onChange={(event, newValue, reason) => {
                                setValues({...values, degreeId: reason === "clear" || reason === "removeOption" ? null : newValue.id});
                            }}
                            // inputProps={{ ...inputProps, readOnly: typeID1 === null && countGame >= 2? true : false }}
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
                        <ListItemText sx={{ gridColumn: '1/3' }} id="nation-item" primary="國籍" />
                        <Autocomplete 
                            size="small"
                            sx={{ gridColumn: '4/8' }}
                            // disablePortal
                            id="select-nation"
                            options={nationEntries}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="請選擇國籍" />}
                            onChange={(event, newValue, reason) => {
                                setNation(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                            }}
                            // inputProps={{ ...inputProps, readOnly: typeID1 === null && countGame >= 2? true : false }}
                        />
                    </ListItem>
                    { nation === 1 ?
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
                        :
                        <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="alt-iid-item" primary="居留證號" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            required
                            id="altIid"
                            label="居留證號"
                            name="altIid"
                            autoComplete="altIid"
                            onChange={handleChange('iid')}
                        />
                    </ListItem>
                    }
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
                </form>
            </Container>
        </>
    );
}
