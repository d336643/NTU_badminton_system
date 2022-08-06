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

import instance from "../instance";
import { useParams, useNavigate } from "react-router-dom";

export default function SwitchListSecondary() {
    const navigate = useNavigate();
    const { uid } = useParams();
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
        status: 1,
    });
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    // const [submit, setSubmit] = useState(false);

    useEffect(async () => {
        try {
            let res = await instance.get(`/users/${uid}/`);
            // const loginCheck = await checkLogin();
            // if(loginCheck) {
            //     console.log(res.data);
            //     if(res.data.host === parseInt(localStorage.getItem("userId"))) {
            //         // host is entering this page, so he / she is not going to see the signup button. In contrast, they need to view current signup form
            //         setView("host");
            //         console.log("host");
            //     }
            //     else {
            //         // need to check if the user has joined or not
            //         try {
            //             let joinRes = await instance.get(`/camp/${campId}/registration/me/`);
            //             if(joinRes.status === 200) setView("joined");
            //             else setView("guest");
            //         } catch (error) {
            //             setView("guest");
            //         }
                    
            //     }
            // }
            // else setView("guest");
            console.log("status", res.status);

            setValues({
                name: res.data.name,
                sid: res.data.sid,
                degreeID: res.data.degreeID,
                departmentID: res.data.departmentID,
                birthday: res.data.birthday,
                iid: res.data.iid,
                email: res.data.email,
                phone: res.data.phone,
                address: res.data.address,
                status: res.data.status,
            });
            setFile(res.data.file);
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
		console.log(file);
	}, [file])

    const onFinish = (values) => {
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

    return (
        <Container component="main" maxWidth="sm">
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>編輯成功</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        即將為您導回首頁 !
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
                subheader={<ListSubheader>編輯個人資料</ListSubheader>}
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
                    <ListItemText sx={{ gridColumn: '1/3' }} id="status-item" primary="帳號狀態" />
                    <p style={{ gridColumn: '4/8' }}>
                    {values.status}
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
    );
}
