import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import InfoDialog from "./InfoDialog";
import instance from "../instance";
import { verifyTWid, verifyLiveid, verifyEmail } from "../utilities/checkString";
import { NUMBER }  from '../utilities/entry'
import { useParams, useNavigate } from "react-router-dom";

/*
CategoryId:
1. 冠亞
2. 季殿
3. 四強
4. 八強
5. 十六強
6. 三十二強
7. 預賽
*/

const AssignSchedule = ({ dataId }) => {
    const navigate = useNavigate();
    const tokenId = localStorage.getItem('token');
    const [values, setValues] = useState({
        typeId: dataId,
        // gameDate: '2022-09-25',
        // duration: 10,
        // courtTotalNum: 10,
        // startTime: "18:00",
        // endTime: "22:00",
        cnt1: 0,
        cnt2: 0,
        cnt3: 0,
        cnt4: 0,
    });
    // const [time1, setTime1] = useState('');
    // const [time2, setTime2] = useState('');
    // const [time3, setTime3] = useState('');
    // const [time4, setTime4] = useState('');
    const [success, setSuccess] = useState(true);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [open, setOpen] = useState(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        // setValues({ ...values, startTime: `${time1}:${time2}`, endTime: `${time3}:${time4}`, 
        //     groupCompeteId: {1: values.cnt1, 2: values.cnt2, 3: values.cnt3, 4: values.cnt4} });
        setValues({ ...values, groupCompeteId: {1: values.cnt1, 2: values.cnt2, 3: values.cnt3, 4: values.cnt4} });
        submitForm(values);
    }
    
    const submitForm = async(form) => {
		const config = {
			headers:{
                'Authorization': 'Bearer ' + tokenId,
                'Content-Type': 'application/json',
                'accept': 'application/json'
			}
		}
		try {
			let res = await instance.post('/generateRounds', form, config)
			if(res.status === 200) {
                setAlertmessage("成功排定賽程，產生賽程表 !");
                setSuccess(true);
				setOpen(true);
			}
		} catch (error) {
            setAlertmessage(String(error).replace('Error: ', ''));
            setSuccess(false);
            setOpen(true);
		}
	}

    return (
        <>
            <CssBaseline />
            <InfoDialog route={'./showallschedule'} open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} />
            <List
                sx={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h3 style={{ marginBottom: '20px' }}>排定賽程</h3>
                {/* <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/8' }} primary="賽程日期" />
                    <TextField
                            sx={{ gridColumn: '9/26' }}
                            size="small"
                            name="gameDate"
                            id="gameDate"
                            label="賽程日期"
                            type="date"
                            defaultValue={"2022-09-27"}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange('gameDate')}
                        />
                </ListItem>
                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr', justifyContent:"center" }}>
                    <ListItemText sx={{ gridColumn: '1/8' }} primary="比賽時間" />
                    <TextField 
                        sx={{ gridColumn: '9/12' }}
                        size="small"
                        // InputProps={{ inputProps: { min: 0, max: 23 } }}
                        defaultValue="20"
                        placeholder="20"
                        onChange={(v) => setTime1(v)}
                    />    
                    <Typography style={{gridColumn: '12/13', align: "center"}}>：</Typography>
                    <TextField  
                        sx={{ gridColumn: '13/16' }}
                        size="small" 
                        // InputProps={{ inputProps: { min: 0, max: 23 } }}
                        defaultValue="00" 
                        placeholder="00"
                        onChange={(v) => setTime2(v)}
                    />
                    <Typography style={{gridColumn: '16/19', align: "center"}}>　至</Typography>
                    <TextField 
                        sx={{ gridColumn: '19/22' }}
                        size="small" 
                        // InputProps={{ inputProps: { min: 0, max: 23 } }}
                        defaultValue="22"
                        placeholder="20"
                        onChange={(v) => setTime3(v)}
                    />
                    <Typography style={{gridColumn: '22/23', align: "center"}}>：</Typography>
                    <TextField  
                        sx={{ gridColumn: '23/26' }}
                        size="small"
                        // InputProps={{ inputProps: { min: 0, max: 23 } }}
                        defaultValue="00" 
                        placeholder="00"
                        onChange={(v) => setTime4(v)}
                    />
                </ListItem>
                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/8' }} primary="比賽時長" />
                    <TextField
                            sx={{ gridColumn: '9/26' }}
                            size="small"
                            name="duration"
                            id="duration"
                            label="比賽時長"
                            value={values.duration}
                            onChange={handleChange('duration')}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">分鐘</InputAdornment>
                            }}
                        />
                </ListItem>
                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/8' }} primary="場地數量" />
                    <TextField
                            sx={{ gridColumn: '9/26' }}
                            size="small"
                            name="courtTotalNum"
                            id="courtTotalNum"
                            label="場地數量"
                            value={values.courtTotalNum}
                            onChange={handleChange('courtTotalNum')}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">面</InputAdornment>
                            }}
                        />
                </ListItem> */}
                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/8' }} primary="三取一數量" />
                    <TextField
                            sx={{ gridColumn: '9/26' }}
                            size="small"
                            name="cnt1"
                            id="cnt1"
                            label="三取一數量"
                            value={values.cnt1}
                            onChange={handleChange('cnt1')}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">組</InputAdornment>
                            }}
                        />
                </ListItem>
                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/8' }} primary="三取二數量" />
                    <TextField
                            sx={{ gridColumn: '9/26' }}
                            size="small"
                            name="cnt2"
                            id="cnt2"
                            label="三取二數量"
                            value={values.cnt2}
                            onChange={handleChange('cnt2')}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">組</InputAdornment>
                            }}
                        />
                </ListItem>
                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/8' }} primary="四取一數量" />
                    <TextField
                            sx={{ gridColumn: '9/26' }}
                            size="small"
                            name="cnt3"
                            id="cnt3"
                            label="四取一數量"
                            value={values.cnt3}
                            onChange={handleChange('cnt3')}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">組</InputAdornment>
                            }}
                        />
                </ListItem>
                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/8' }} primary="四取二數量" />
                    <TextField
                            sx={{ gridColumn: '9/26' }}
                            size="small"
                            name="cnt4"
                            id="cnt4"
                            label="四取二數量"
                            value={values.cnt4}
                            onChange={handleChange('cnt4')}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">組</InputAdornment>
                            }}
                        />
                </ListItem>
                <Button
                    // fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 3 }}
                    onClick={handleSubmit}
                >
                    確認
                </Button>
            </List>
        </>
    );
}

export default AssignSchedule;
