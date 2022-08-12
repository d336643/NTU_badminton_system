import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from "@mui/material/Typography";
import Footer from '../components/Footer';
import InfoDialog from "./InfoDialog";
import instance from "../instance";
import { verifyTWid, verifyLiveid } from "../utilities/checkString";
import { DEGREEENTRY, NATIONENTRY, STATUS }  from '../utilities/entry'
import { useParams, useNavigate } from "react-router-dom";

const EditForm = () => {
    const token = localStorage.getItem('token');
    const [values, setValues] = useState({
        id: localStorage.getItem('uid'),
        username: localStorage.getItem("name"),
        sid: localStorage.getItem("sid"),
        degreeId: Number(localStorage.getItem("degreeId")),
        departmentId: localStorage.getItem("departmentId"),
        birthday: '2002-04-16',
        iid: localStorage.getItem("iid"),
        email: localStorage.getItem("email"),
        phone: localStorage.getItem("phone"),
        address: localStorage.getItem("address"),
        changed: false,
        status: 1,
    });
    const [open, setOpen] = useState(false);
    const [department, setDepartment] = useState([]);
    const [nation, setNation] = useState(1);
    const [success, setSuccess] = useState(false);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    
    // const [file, setFile] = useState(null); in this moment we don't need file

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
                // getKeysOf(res.data.data.colleges, 1);
                getKeysOf(res.data.data.departments);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getKeysOf = (dict) => {
        const key = Object.keys(dict);
        const value = Object.values(dict);
        const testArr = value.map(function(x, i) {
            return {label: key[i]+value[i], id: key[i]}        
        });
        setDepartment(department.concat(testArr))
    }

    useEffect(() => {
        getInfo();
    }, [])
    
    const onFinish = () => {
        // delete values.collegeId;
        delete values.changed;
        delete values.status;
        console.log(values);
        submitForm(values);
    };

	const submitForm = async(form) => {
		const config = {
			headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'accept': 'application/json'
			}
		}
		try {
			let res = await instance.put(`/users/${values.id}`, form, config)
			console.log(res);
			if(res.status === 200) {
                setAlertmessage("編輯成功，即將為您導回首頁 !");
                setSuccess(true);
				setOpen(true);
			}
            else {
                setAlertmessage(res.data.msg);
                setOpen(true);
            }
		} catch (error) {
			console.log(error);
		}
	}

    const findLastOne = (array) => {
        const reversed = [];
        for (let i = array.length - 1; i >= 0; i--) {
            reversed.push(array[i]);
        };
        console.log(reversed);
        return reversed.find(v => Number(v.id) <= Number(values.departmentId)) || null
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const filterArr = (array, letter) => {
        var filtered = array.filter(function(word) {
         return word.id.charAt(0) === letter;
        });
        return filtered 
    }

    return (
        <>
            {/* <Navbar /> */}
            <Container component="main" maxWidth="sm" alignItems='center' minHeight='100vh'>
                <InfoDialog open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} />
                <List
                    sx={{
                        marginTop: '5%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    // subheader={<ListSubheader>編輯個人資料</ListSubheader>}
                >
                    {/* <AccountBoxIcon fontSize="large" color="secondary"/> */}
                    <h3 style={{ marginBottom: '5%' }}>編輯個人資料</h3>
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
                        <ListItemText sx={{ gridColumn: '1/3' }} id="username-item" primary="姓名" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            autoComplete="username"
                            name="username"
                            id="username"
                            label="姓名"
                            autoFocus
                            value={values.username}
                            onChange={handleChange('username')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="學號 (帳號)" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            autoComplete="sid"
                            name="sid"
                            id="sid"
                            label="學號"
                            autoFocus
                            value={values.sid}
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
                            renderInput={(params) => 
                                <TextField {...params} label="請選擇年級" />}
                            onChange={(event, newValue, reason) => {
                                setValues({...values, degreeId: reason === "clear" || reason === "removeOption" ? null : newValue.id});
                            }}
                            value={DEGREEENTRY.find(v => v.id === Number(values.degreeId)) || null}
                            // inputProps={{ ...inputProps, readOnly: typeID1 === null && countGame >= 2? true : false }}
                        />
                    </ListItem>
                    {/* <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="college-item" primary="學院" />
                        <Autocomplete 
                            size="small"
                            sx={{ gridColumn: '4/8' }}
                            // disablePortal
                            id="select-college"
                            options={college}
                            getOptionLabel={(option) => option.label || ""}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="請選擇學院" />}
                            onChange={(event, newValue, reason) => {
                                setValues({...values, collegeId: reason === "clear" || reason === "removeOption" ? null : newValue.id, changed: !values.changed});
                            }}
                            value={values.changed ? college.find(v => v.id === values.collegeId) : findLastOne(college)}
                        />
                    </ListItem> */}
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="departmentID-item" primary="系所" />
                        <Autocomplete 
                            size="small"
                            sx={{ gridColumn: '4/8' }}
                            // disablePortal
                            id="select-department"
                            options={department}
                            getOptionLabel={(option) => option.label || ""}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="請選擇系所" />}
                            onChange={(event, newValue, reason) => {
                                setValues({...values, departmentId: reason === "clear" || reason === "removeOption" ? null : newValue.id});
                            }}
                            value={department.find(v => v.id === values.departmentId) || null}
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
                            defaultValue={values.birthday}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            // disabled={editable5 ? false : true}
                            // onClick={setEditable5(true)}
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
                            options={NATIONENTRY}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="請選擇國籍" />}
                            onChange={(event, newValue, reason) => {
                                setNation(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                            }}
                            value={NATIONENTRY.find(v => v.id === nation) || null}
                        />
                    </ListItem>
                    { nation === 1 ?
                        <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                            <ListItemText sx={{ gridColumn: '1/3' }} id="iid-item" primary="身分證字號" />
                            <TextField
                                sx={{ gridColumn: '4/8' }}
                                size="small"
                                autoComplete="iid"
                                name="iid"
                                id="iid"
                                label="身分證字號"
                                autoFocus
                                value={values.iid}
                                onChange={handleChange('iid')}
                                helperText={values.iid.length === 10 ? verifyTWid(values.iid) ? "" : "身分證格式錯誤" : ""}
                            />
                        </ListItem>
                        :
                        <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                            <ListItemText sx={{ gridColumn: '1/3' }} id="alt-iid-item" primary="居留證號" />
                            <TextField
                                sx={{ gridColumn: '4/8' }}
                                size="small"
                                autoComplete="altIid"
                                name="altIid"
                                id="altIid"
                                label="居留證號"
                                autoFocus
                                value={values.iid}
                                onChange={handleChange('iid')}
                                helperText={values.iid.length === 10 ? verifyLiveid(values.iid) ? "" : "居留證格式錯誤" : ""}
                            />
                    </ListItem>
                    }
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="email-item" primary="電子郵件" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            id="email"
                            label="電子郵件"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="phone-item" primary="手機號碼" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            id="phone"
                            label="手機號碼"
                            name="phone"
                            autoComplete="phone"
                            value={values.phone}
                            onChange={handleChange('phone')}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="address-item" primary="地址" />
                        <TextField
                                sx={{ gridColumn: '4/8' }}
                                size="small"
                                autoComplete="address"
                                name="address"
                                id="address"
                                label="地址"
                                autoFocus
                                value={values.address}
                                onChange={handleChange('address')}
                            />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="status-item" primary="帳號狀態" />
                        <p style={{ gridColumn: '4/8' }}>
                        {STATUS[values.status-1]}
                        </p>
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
                </List>
            </Container>
        </>
        
    );
}

export default EditForm;
