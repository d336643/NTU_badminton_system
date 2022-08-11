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
import Navbar from './Navbar';
import instance from "../instance";
import { useParams, useNavigate } from "react-router-dom";

export default function SwitchListSecondary() {
    const navigate = useNavigate();
    const param = useParams();
    const uid = localStorage.getItem('uid');
    const [values, setValues] = useState({
        name: localStorage.getItem("name"),
        sid: localStorage.getItem("sid"),
        degreeId: localStorage.getItem("degreeId"),
        departmentId: localStorage.getItem("departmentId"),
        birthday: localStorage.getItem("birthday"),
        iid: localStorage.getItem("iid"),
        email: localStorage.getItem("email"),
        phone: localStorage.getItem("phone"),
        address: localStorage.getItem("address"),
        status: 1,
    });
    // const [editable1, setEditable1] = useState(false)
    // const [editable2, setEditable2] = useState(false)
    // const [editable3, setEditable3] = useState(false)
    // const [editable4, setEditable4] = useState(false)
    // const [editable5, setEditable5] = useState(false)
    // const [editable6, setEditable6] = useState(false)
    // const [editable7, setEditable7] = useState(false)
    // const [editable8, setEditable8] = useState(false)
    // const [editable9, setEditable9] = useState(false)
    // const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    // const [submit, setSubmit] = useState(false);

    useEffect(() => {
        console.log(values);
	}, [])

    const onFinish = (values) => {
        delete values.showPassword;
        delete values.confirmPassword;
    
        let finalForm = {...values};
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
        <>
            <Navbar />
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
                            name="name"
                            id="name"
                            label="姓名"
                            autoFocus
                            value={values.name}
                            // disabled={editable1 ? false : true}
                            // onClick={setEditable1(true)}
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
                            value={values.sid}
                            // disabled={editable2 ? false : true}
                            // onClick={setEditable2(true)}
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
                            value={values.degreeId}
                            // disabled={editable3 ? false : true}
                            // onClick={setEditable3(true)}
                            onChange={handleChange('dgreeId')}
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
                            value={values.departmentId}
                            // disabled={editable4 ? false : true}
                            // onClick={setEditable4(true)}
                            onChange={handleChange('departmentId')}
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
                        <ListItemText sx={{ gridColumn: '1/3' }} id="iid-item" primary="身分證字號" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            id="iid"
                            label="身分證字號"
                            name="iid"
                            autoComplete="iid"
                            value={values.iid}
                            // disabled={editable6 ? false : true}
                            // onClick={setEditable6(true)}
                            onChange={handleChange('iid')}
                        />
                    </ListItem>
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
                            // disabled={editable7 ? false : true}
                            // onClick={setEditable7(true)}
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
                            // disabled={editable8 ? false : true}
                            // onClick={setEditable8(true)}
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
                            value={values.address}
                            // disabled={editable9 ? false : true}
                            // onClick={setEditable9(true)}
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
        </>
        
    );
}
