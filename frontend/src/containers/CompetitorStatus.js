import { useEffect, useState } from "react";
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import instance from "../instance";
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from "react-router-dom";

const createData = (eventId, account) => {
    return { eventId: eventId, account: account };
}

const Reset = () => {
    const navigate = useNavigate();
    const uid = localStorage.getItem('uid');
    const token = localStorage.getItem('token');
    const [values, setValues] = useState({
        name: localStorage.getItem("name"),
        sid: localStorage.getItem("sid"),
        degreeId: localStorage.getItem("degreeId"),
        departmentId: localStorage.getItem("departmentId"),
    });
    // const [values, setValues] = useState({
    //     name: "rename",
    //     sid: "R00000000",
    //     degreeID: "大三",
    //     departmentID: "醫學系",
    // });
    const [eventsToPay, setEventsToPay] = useState([10, 11])
    const [toPayInfo, setToPayInfo] = useState([
        createData(10, null),
        createData(11, null),
    ])
    const [events, setEvents] = useState([
        {
            "eventId": 10,
            "typeId": 1,
            "competitors": [
                {"uid": 7, "username": "rename", "sid": "R00000000"}
            ],
            "status": 1,
            "payer": null, //未付款
            "account": null //未付款
        },
        {
            "eventId": 11,
            "typeId": 5,
            "competitors": [
                {"uid": 7, "username": "rename", "sid": "R00000000"},
                {"uid": 2, "username": "Euni", "sid": "R11111111"}
            ],
            "status": 1,
            "payer": null,
            "account": null
        }
    ]);

    const eventStatus = ["未繳費(已報名)", "審核中", "審核通過，已繳費"]
    const eventEntry = ["男單", "女單", "男雙", "女雙", "混雙"]

    useEffect(() => {
        async function fetchData() {
            const config = {
                headers:{
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }
            try {
                const res = await instance.get(`events/status?uid=${uid}`, {uid: uid}, config);
                console.log("status", res.data.success);
                setEvents([...events, res.data.events]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [events, uid])

    const handleAccountSet = (evalue, eventId) => {
        console.log(`event id: ${eventId}, update`);
        const newState = toPayInfo.map(obj => {
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
        toPayInfo.map((info => {
            let finalForm = {
                "payer":uid,
                "eventsToPay": [info.eventId],
                "account": info.account,
            }
            console.log(finalForm);
        }))
        // submitForm(finalForm)
        // navigate("/");
    };

    // const submitForm = async(form) => {
	// 	const config = {
	// 		headers:{
	// 			Authorization: 'Bearer ' + token
	// 		}
	// 	}
	// 	console.log(form);
	// 	try {
	// 		let res = await instance.post('/users/bankAccount', form, config);
	// 		console.log(res.data);
	// 		if(res.status === 200) {
	// 			// setBtnDisable(true);
	// 			// setSuccess(true);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <List
                    sx={{
                        marginTop: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    // subheader={<ListSubheader>編輯個人資料</ListSubheader>}
                >
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="name-item" primary="姓名" />
                        <p style={{ gridColumn: '4/6' }}>
                            {values.name}
                        </p>
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="學號" />
                        <p style={{ gridColumn: '4/6' }}>
                            {values.sid}
                        </p>
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="dgreeID-item" primary="系級" />
                        <p style={{ gridColumn: '4/6' }}>
                            {values.departmentId}{values.degreeId}
                        </p>
                    </ListItem>
                    { events.length > 0 ?
                        events.map((event) => {
                            return (
                                <>
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="報名及繳費狀態" />
                                        <p style={{ gridColumn: '4/6' }}>
                                            {eventStatus[event.status-1]}
                                        </p>
                                    </ListItem>
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="報名項目" />
                                        <p style={{ gridColumn: '4/6' }}>
                                            {eventEntry[event.typeId-1]}
                                        </p>
                                    </ListItem>
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="匯款後五碼" />
                                        {event.account === null ? 
                                            <TextField
                                                sx={{ gridColumn: '4/6' }}
                                                size="small"
                                                id="account"
                                                label="輸入匯款後五碼"
                                                name="account"
                                                onChange={e => handleAccountSet(e.target.value, event.eventId)}
                                            />
                                            :
                                            <p style={{ gridColumn: '4/6' }}>
                                                {event.account}
                                            </p>
                                        }
                                    </ListItem>
                                </>
                            )
                        })
                        :
                        <></>
                    }
                    <Grid
                        container
                        justifyContent="center"
                        spacing={2}
                        sx={{mt: '2%'}}
                    >
                        { events.length > 0 ?
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