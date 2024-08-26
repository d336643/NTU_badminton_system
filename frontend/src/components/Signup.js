import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    Autocomplete,
    CssBaseline,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Alert,
    Button,
    Container,
    FormControl,
    FormHelperText,
    ListItem,
    ListItemText
} from '@mui/material';
  
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
 
import InfoDialog from './InfoDialog';

import { checkPassword, verifyTWid, verifyLiveid, verifyEmail } from "../utilities/checkString";
import { DEGREEENTRY, NATIONENTRY }  from '../utilities/entry'
import { instance, getCommonConfig } from "../apiUtilities/instance";

export default function SwitchListSecondary() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        sid: '',
        degreeId: 0,
        departmentId: null,
        birthday: '2022-05-24',
        iid: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        showPassword: false,
        confirmPassword: '',
    });
    const [collegeId, setCollegeId] = useState(null);
    const [open, setOpen] = useState(false);
    const [college, setCollege] = useState([]);
    const [department, setDepartment] = useState([]);
    const [nation, setNation] = useState(1);
    const [status, setStatus] = useState(false);
    const [alertmessage, setAlertmessage] = useState('Alert message');

    // const [file, setFile] = useState(null); in this moment we don't need file

    const getInfo = async () => {
        const config = getCommonConfig(false);
        try {
            const res = await instance.get("/public/departments", config);
            if (res.data.success === true) {
                // console.log(res.data.colleges);
                getKeysOf(res.data.data.colleges, 1);
                getKeysOf(res.data.data.departments, 2);
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const getKeysOf = (dict, cnt) => {
        const key = Object.keys(dict);
        const value = Object.values(dict);
        const testArr = value.map(function(x, i) {
            return {label: key[i]+value[i], id: key[i]}        
        });
        if (cnt === 1) setCollege(college.concat(testArr))
        if (cnt === 2) setDepartment(department.concat(testArr))
    }

    useEffect(() => {
        getInfo();
    }, [])

    const onFinish = () => {
        // console.log('Received values of form: ', values);
        let blank = '';
        const key = Object.keys(values);
        const value = Object.values(values);
        value.map(function(x, i) {
            if (value[i] === null || value[i] === '') {
                if (key[i] !== 'iid' && key[i] !== 'address') {
                    blank = blank+key[i]+', ';
                }
            }
        });
        if (blank !== '') {
            setAlertmessage(blank+' 不得為空白');
            setOpen(true);
        }
        else if (values.iid.length !== 0 && values.iid.length !== 10) {
            setAlertmessage(nation === 1 ? "身分證須為十碼" : "居留證須為十碼");
            setOpen(true);
        }
        else if (values.iid.length !== 0 && nation === 1 && !verifyTWid(values.iid)) {
            setAlertmessage("身分證格式錯誤");
            setOpen(true);
        }
        else if (values.iid.length !== 0 && nation !== 1 && !verifyLiveid(values.iid)) {
            setAlertmessage("居留證格式錯誤");
            setOpen(true);
        }
        else {
            if (!verifyEmail(values.email)) {
                setAlertmessage("請輸入台大信箱");
                setOpen(true);
            }
            else {
                if (!checkPassword(values.password)) {
                    setAlertmessage("密碼需由至少8位英文及數字混和組成");
                    setOpen(true);
                }
                else {
                    delete values.showPassword;
                    delete values.confirmPassword;
                    // console.log(values);
                    submitForm(values);
                }
            }
        }
    };

	const submitForm = async(form) => {
		const config = {
			headers:{
				// 'Content-Type': 'multipart/form-data', not use file in this moment
                'Content-Type': 'application/json',
                'accept':'application/json'
			}
		}
		// console.log(form);
		try {
			let res = await instance.post('/auth/signup', form, config);
            if (res.status === 200) {
                setStatus(true);
                setAlertmessage("註冊成功，將為您導回首頁 !")
                setOpen(true);
            }
            else {
                setAlertmessage(res.data.msg);
                setOpen(true);
            }
		} catch (error) {
            // console.log((error));
			setAlertmessage(String(error).replace('Error: ', ''));
            setOpen(true);
		}
	}

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

    const filterArr = (array, letter) => {
        var filtered = array.filter(function(word) {
         return word.id[0] === letter;
        });
        return filtered 
    }

    return (
        <Container component="main" maxWidth="sm" 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: '100px', 
                paddingTop: '60px'
            }}
        >
            <CssBaseline />
            <h3 style={{ marginTop: '20px', marginBottom: '20px' }}>註冊新帳號</h3>
                <Alert severity="info" style={{ marginBottom: '15px' }}>
                    資料僅供參賽資格認證及保險用途
                </Alert>
            <InfoDialog route={'/'} open={open} setOpen={setOpen} turnBack={status} alertmessage={alertmessage} />
            <form>
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
                        id="fullName"
                        label="姓名 (必填)"
                        autoFocus
                        onChange={handleChange('username')}
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="學號 (帳號)" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        size="small"
                        id="sid"
                        label="學號 (必填)"
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
                        id="select-degreeId"
                        options={DEGREEENTRY}
                        getOptionLabel={(option) => option.label || ""}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField {...params} label="請選擇年級 (必填)" />}
                        onChange={(event, newValue, reason) => {
                            setValues({...values, degreeId: reason === "clear" || reason === "removeOption" ? null : newValue.id});
                        }}
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="college-item" primary="學院" />
                    <Autocomplete 
                        size="small"
                        sx={{ gridColumn: '4/8' }}
                        id="select-college"
                        options={college}
                        getOptionLabel={(option) => option.label || ""}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField {...params} label="請選擇學院 (必填)" />}
                        onChange={(event, newValue, reason) => {
                            setCollegeId(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                        }}
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="departmentID-item" primary="系所" />
                    <Autocomplete 
                        size="small"
                        sx={{ gridColumn: '4/8' }}
                        id="select-department"
                        options={collegeId === null ? department : filterArr(department, collegeId[0])}
                        getOptionLabel={(option) => option.label || ""}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField {...params} label="請選擇系所 (必填)" />}
                        onChange={(event, newValue, reason) => {
                            setValues({...values, departmentId: reason === "clear" || reason === "removeOption" ? null : newValue.id});
                        }}
                        // inputProps={{ ...inputProps, readOnly: typeID1 === null && countGame >= 2? true : false }}
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="birthday-item" primary="生日" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        size="small"
                        id="date"
                        label="出生年/月/日 (必填)"
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
                        id="select-nation"
                        options={NATIONENTRY}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField {...params} label="請選擇國籍" />}
                        onChange={(event, newValue, reason) => {
                            setNation(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                        }}
                    />
                </ListItem>
                { nation === 1 ?
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="iid-item" primary="身分證字號" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            id="iid"
                            label="身分證字號 (必填)"
                            name="iid"
                            autoComplete="iid"
                            onChange={handleChange('iid')}
                            error={values.iid.length > 0 ? verifyTWid(values.iid) ? false : true : false}
                            errorText={values.iid.length  > 0 ? verifyTWid(values.iid) ? false : true : false}
                            helperText={values.iid.length > 0 ? verifyTWid(values.iid) ? "" : "身分證格式錯誤" : ""}
                        />
                    </ListItem>
                    :
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="alt-iid-item" primary="居留證號" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        size="small"
                        id="altIid"
                        label="居留證號"
                        name="altIid"
                        autoComplete="altIid"
                        onChange={handleChange('iid')}
                        error={values.iid.length > 0 ? verifyLiveid(values.iid) ? false : true : false}
                        errorText={values.iid.length > 0 ? verifyLiveid(values.iid) ? false : true : false}
                        helperText={values.iid.length > 0 ? verifyLiveid(values.iid) ? "" : "居留證格式錯誤" : ""}
                    />
                </ListItem>
                }
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="email-item" primary="電子郵件" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        size="small"
                        id="email"
                        label="電子郵件 (請輸入台大信箱) (必填)"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange('email')}
                        error={verifyEmail(values.email) ? false : values.email.length > 0 ? true : false}
                        errorText={verifyEmail(values.email) ? false : values.email.length > 0 ? true : false}
                        helperText={verifyEmail(values.email) ? "" : "請輸入台大信箱"}
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="phone-item" primary="手機號碼" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        size="small"
                        id="phone"
                        label="手機號碼 (必填)"
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
                        id="address"
                        label="地址"
                        name="address"
                        autoComplete="address"
                        onChange={handleChange('address')}
                    />
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="password-item" primary="密碼" />
                    <FormControl sx={{ gridColumn: '4/8' }} size="small" variant="outlined" helperText={checkPassword(values.password) ? "" : "密碼需由至少8位英文及數字混和組成"}>
                        <InputLabel htmlFor="adornment-password">密碼 (必填)</InputLabel>
                        <OutlinedInput
                            id="adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            error={values.password.length !== 0 ? checkPassword(values.password) ? false : true : false}
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
                        <FormHelperText error>
                            {values.password.length !== 0 ? checkPassword(values.password) ? "" : "密碼需由至少8位英文及數字混和組成" : ""}
                        </FormHelperText>
                    </FormControl>
                </ListItem>
                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/3' }} id="confirm-item" primary="再次輸入密碼" />
                    <TextField
                        sx={{ gridColumn: '4/8' }}
                        size="small"
                        id="confirmPassword"
                        type={'password'}
                        label="再次輸入密碼 (必填)"
                        name="confirmPassword"
                        autoComplete="confirmPassword"
                        onChange={handleChange('confirmPassword')}
                        error={values.confirmPassword !== "" && values.confirmPassword !== values.password}
                        errorText={values.confirmPassword !== "" && values.confirmPassword !== values.password}
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
    );
}
