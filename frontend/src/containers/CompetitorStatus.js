import React, { useEffect, useState } from "react";
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
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import InfoDialog from "../components/InfoDialog";
import instance from "../instance";
import { DEGREEE } from '../utilities/entry';
import { useParams, useNavigate } from "react-router-dom";
import { bgcolor } from "@mui/system";

const createData = (eventId, account) => {
    return { eventId: eventId, account: account };
}
const text = ['一', '二']

const Reset = () => {
    const navigate = useNavigate();
    const uid = localStorage.getItem('uid');
    const token = localStorage.getItem('token');
    const name = localStorage.getItem("name");
    const sid = localStorage.getItem("sid");
    const degreeId = localStorage.getItem("degreeId");
    const departmentId = Number(localStorage.getItem("departmentId"));
    const [eventsToPay, setEventsToPay] = useState([])
    const [toPayInfo, setToPayInfo] = useState([])
    const [events, setEvents] = useState([]);
    const [status, setStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [stored, setStored] = useState(false);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [department, setDepartment] = useState([]);

    const eventStatus = ["未繳費(已報名)", "審核中", "審核通過，已繳費"]
    const eventEntry = ["男單", "女單", "男雙", "女雙", "混雙"]

    const findDepart = (dict, key) => {
        return dict.key;
    }
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

    useEffect(() => {
        async function fetchData() {
            const config = {
                headers:{
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }
            try {
                const res = await instance.get(`events/status?uid=${uid}`, config);
                console.log(res);
                if (res.data.success) {
                    setEvents(events.concat(res.data.events));
                    const newState = res.data.events.map((event) => {
                        return createData(event.eventId, event.account);
                    })
                    setEventsToPay(eventsToPay.concat(newState));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        events.map((event) => {
            if (event.account === null) setStatus(true);
        })
    }, [events])

    const handleAccountSet = (evalue, eventId) => {
        console.log(`event id: ${eventId}, update`);
        const newState = eventsToPay.map(obj => {
            if (obj.eventId === eventId) {
                return { ...obj, account: evalue };
            }
            return obj;
        });
        setToPayInfo(newState);
        console.log(`Changed account: ${evalue}`);
    };

    const handleStore = (event) => {
        console.log('Received values for update account.');
        event.preventDefault();
        if (toPayInfo.length === 0) {
            setAlertmessage("請先更新匯款資料再儲存")
            setOpen(true);
        }
        else {
            toPayInfo.map(((info) => {
                let finalForm = {
                    "payer":uid,
                    "eventsToPay": [info.eventId],
                    "account": info.account,
                }
                submitForm(finalForm);
            }))
        }
        // navigate("/");
    };

    const submitForm = async(form) => {
		const config = {
			headers:{
				'Authorization': 'Bearer ' + token,
                'accept': 'application/json'
			}
		}
		console.log(form);
		try {
			let res = await instance.post('/users/bankAccount', form, config);
			console.log(res);
			if(res.status === 200) {
                console.log("Success");
                setStatus(true);
                setAlertmessage("資料更新成功，將為您導回首頁 !")
                setOpen(true);
			}
		} catch (error) {
			console.log(error);
            setAlertmessage("資料更新失敗")
            setOpen(true);
		}
	}

    return (
        <>
            <Container component="main" maxWidth="sm">
                <InfoDialog open={open} setOpen={setOpen} turnBack={stored} alertmessage={alertmessage} />
                <CssBaseline />
                <List
                    sx={{
                        marginTop: '5%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    // subheader={<ListSubheader>編輯個人資料</ListSubheader>}
                >
                    <h3 style={{ marginBottom: '5%' }}>報名 / 繳費狀態</h3>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="name-item" primary="姓名" />
                        <TextField
                            sx={{ gridColumn: '3/5' }}
                            size="small"
                            value={name}
                            readOnly={true}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="學號" />
                        <TextField
                            sx={{ gridColumn: '3/5' }}
                            size="small"
                            value={sid}
                            readOnly={true}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="dgreeID-item" primary="系級" />
                        <TextField
                            sx={{ gridColumn: '3/5' }}
                            size="small"
                            value={departmentId+DEGREEE[degreeId-1]}
                            readOnly={true}
                        />
                    </ListItem>
                    { events.length > 0 ?
                        events.map((event, i) => {
                            return (
                                <>
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="報名及繳費狀態" />
                                        <TextField
                                            sx={{ gridColumn: '3/5' }}
                                            size="small"
                                            value={eventStatus[event.status-1]}
                                            readOnly={true}
                                        />
                                    </ListItem>
                                    <Divider color='secondary' style={{marginTop: '2%', marginBottom: '2%', width:'100%'}}><Chip color='secondary' variant='outlined' label={`項目${text[i]}`} /></Divider>
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="報名項目" />
                                        <TextField
                                            sx={{ gridColumn: '3/5' }}
                                            size="small"
                                            value={eventEntry[event.typeId-1]}
                                            readOnly={true}
                                        />
                                    </ListItem>
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="匯款後五碼" />
                                        {event.account === null ? 
                                            <TextField
                                                sx={{ gridColumn: '3/5' }}
                                                size="small"
                                                id="account"
                                                label="輸入匯款後五碼"
                                                name="account"
                                                onChange={e => handleAccountSet(e.target.value, event.eventId)}
                                            />
                                            :
                                            <TextField
                                                sx={{ gridColumn: '3/5' }}
                                                size="small"
                                                value={event.account}
                                                readOnly={true}
                                            />
                                        }
                                    </ListItem>
                                </>
                            )
                        })
                        :
                        <p style={{ marginTop: '3%' }}>目前尚無報名項目</p>
                    }
                    <Grid
                        container
                        justifyContent="center"
                        spacing={2}
                        sx={{mt: '2%'}}
                    >
                        { status ?
                            <Grid item>
                                <Button 
                                    variant="contained"
                                    onClick={handleStore}
                                >
                                    儲存
                                </Button>
                            </Grid>
                            : <></>
                        }
                        <Grid item>
                            <Button 
                                variant="outlined"
                                onClick={() => navigate('/')}
                            >
                                返回主頁面
                            </Button>
                        </Grid> 
                    </Grid>
                </List>
            </Container>
        </>
    );
}

export default Reset;