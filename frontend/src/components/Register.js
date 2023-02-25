import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import InfoDialog from "./InfoDialog";
import instance from "../instance";
import { EVENTTYPEENTRY } from "../utilities/entry";
import { useNavigate } from "react-router-dom";

const text = ['一', '二']

const LoginForm = ({editmode}) => {
    const navigate = useNavigate();
    const myUid = Number(localStorage.getItem('uid'));
    const token = localStorage.getItem('token');
    const applier = myUid;
    const [typeID1, setTypeID1] = useState(null);
    const [typeID2, setTypeID2] = useState(null);
    // 1: Man Single, 2: Woman Single, 3: Men Double, 4: Women Double, 5: Mixed Double
    const [competitors1, setCompetitors1] = useState(null);
    const [competitors2, setCompetitors2] = useState(null);
    const [currentStudent, setCurrentStudent] = useState();
    const [success, setSuccess] = useState(true);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [partners, setPartners] = useState([]);
    const eventEntry = ["男單", "女單", "男雙", "女雙", "混雙"]

    const checkSame = (opt) => {
        return Number(opt.uid) !== myUid;
    }

    const getPartners = (tid) => {
        let name = partners.map(p => {
            if (tid == p.typeId) {
                return `${p.sid} ${p.partner}`
            }
        })
        return name[0]
    }

    useEffect(() => {
        async function fetchData() {
            const config = {
                headers:{
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }
            try {
                const res = await instance.get(`/users`, config);
                if (res.data.success === true){
                    const users = res.data.data;
                    setCurrentStudent(users);
                }
            } catch (error) {
                // console.log(error);
            }
        }
        fetchData();
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
                const res = await instance.get(`events/status?uid=${myUid}`, config);
                if (res.data.success) {
                    setEvents(events.concat(res.data.events));
                    const newState = res.data.events.map((event, i) => {
                        if (i === 0) setTypeID1(event.typeId);
                        else if (i == 1) setTypeID2(event.typeId);
                        if (event.typeId > 2) {
                            event.competitors.map(obj => {
                                if (obj.uid !== Number(myUid)) {
                                    let partner = obj.username
                                    let sid = obj.sid
                                    setPartners(partners.concat({typeId: event.typeId, partner: partner, sid: sid}))
                                }
                            })
                        }
                    })
                }
            } catch (error) {
                // console.log(error);
            }
        }
        fetchData();
    }, [])

    // useEffect(() => {
    //     events.map((event) => {
    //         if (event.account === null) setStatus(true);
    //     })
    // }, [events])

    // useEffect(() => {
    //     console.log(currentStudent);
    // }, [currentStudent])

    useEffect(() => {
        console.log(editmode);
    }, [])

    const handleSubmit = () => {
        if (typeID1 === null && typeID2 === null) {
            setAlertmessage("請至少選擇一場比賽");
            setSuccess(false);
            setOpen(true);
            return;
        }
        else if (typeID1 ===  typeID2) {
            setAlertmessage("請勿重複報名");
            setSuccess(false);
            setOpen(true);
            return;
        }
        else {
            let regEvent = [];
            if (typeID1 !== null) {
                if (typeID1 === 1 || typeID1 === 2)
                    regEvent = regEvent.concat({typeId: typeID1, competitors: [myUid]});
                else {
                    if (competitors1 === null) {
                        setAlertmessage("未選擇隊友");
                        setSuccess(false);
                        setOpen(true);
                        return;
                    }
                    else regEvent = regEvent.concat({typeId: typeID1, competitors: [myUid, competitors1]});
                }
            }
            if (typeID2 !== null) {
                if (typeID2 === 1 || typeID2 === 2) 
                    regEvent = regEvent.concat({typeId: typeID2, competitors: [myUid]});
                else {
                    if (competitors2 === null) {
                        setAlertmessage("未選擇隊友");
                        setSuccess(false);
                        setOpen(true);
                        return;
                    }
                    else regEvent = regEvent.concat({typeId: typeID2, competitors: [myUid, competitors2]});
                }
            }
            submit(regEvent);
        }
    }

    const submit = async(events) => {
        let form = {
            applier: applier,
            events: events,
        }
        const config = {
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await instance.post(`/events`, form, config);
            if (res.status === 200){
                setAlertmessage("報名完成，請至 \"報名 / 繳費狀態\" 頁確認是否報名成功");
                setSuccess(true);
				setOpen(true);

            }
        } catch (error) {
            // console.log((error));
			setAlertmessage(String(error).replace('Error: ', ''));
            setOpen(true);
        }
    }

    return (
        // <>
        //     <Container component="main" maxWidth="sm">
        //         <List
        //             sx={{
        //                 marginTop: '20px',
        //                 display: 'flex',
        //                 flexDirection: 'column',
        //                 alignItems: 'center',
        //             }}
        //         >
        //             <h3 style={{ marginBottom: '20px' }}>報名賽事</h3>
        //             <Alert severity="info" style={{ marginBottom: '20px' }}>
        //                 <p>已截止報名</p>
        //             </Alert>
        //             <Button 
        //                 variant="outlined"
        //                 onClick={() => navigate('/')}
        //             >
        //                 返回主頁面
        //             </Button>
        //         </List>
        //     </Container>
        // </>
        <>
            <Container component="main" maxWidth="sm"> {/*sx={{height: "75vh"}}*/}
                <CssBaseline />
                <InfoDialog route={'/'} open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} />
                <List
                    sx={{
                        marginTop: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {
                        editmode === true ? 
                            events.length > 0 ?
                                events.map((event, i) => {
                                    return (
                                        <>
                                            <Divider color='secondary' style={{marginTop: '2%', marginBottom: '2%', width:'100%'}}><Chip color='secondary' variant='outlined' label={`項目${text[i]}`} /></Divider>
                                            <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                                <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="報名項目" />
                                                <TextField
                                                    sx={{ gridColumn: '4/8' }}
                                                    size="small"
                                                    value={eventEntry[event.typeId-1]}
                                                    readOnly={true}
                                                />
                                            </ListItem>
                                            <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                                <ListItemText sx={{ gridColumn: '1/2' }} id="entry-1" primary="項目一" />
                                                <Autocomplete 
                                                    size="small"
                                                    sx={{ gridColumn: '2/4' }}
                                                    // disablePortal
                                                    id="select-entry-1"
                                                    options={EVENTTYPEENTRY}
                                                    getOptionLabel={(option) => option.label}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    renderInput={(params) => 
                                                        <TextField {...params} 
                                                            size="small"
                                                            value={eventEntry[event.typeId-1]}
                                                            error={typeID1 === typeID2 && typeID1 !== null  ? true : false}
                                                            helperText={typeID1 === typeID2 && typeID1 !== null ? "請勿重複報名" : ""}/>}
                                                            onChange={(event, newValue, reason) => {
                                                            setTypeID1(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                                                    }}
                                                />
                                            </ListItem>
                                            {
                                                event.typeId > 2 ? 
                                                <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                                    <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="隊友" />
                                                    <TextField
                                                        sx={{ gridColumn: '4/8' }}
                                                        size="small"
                                                        value={getPartners(event.typeId)}
                                                        readOnly={true}
                                                    />
                                                </ListItem>
                                                : <></>
                                            }
                                        </>
                                    )
                                })
                                :
                                <Alert severity="warning" style={{ marginBottom: '20px' }}>
                                    目前無報名任何賽事！
                                </Alert>
                            :
                            <>
                                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                    <ListItemText sx={{ gridColumn: '1/2' }} id="entry-1" primary="項目一" />
                                    <Autocomplete 
                                        size="small"
                                        sx={{ gridColumn: '2/4' }}
                                        // disablePortal
                                        id="select-entry-1"
                                        options={EVENTTYPEENTRY}
                                        getOptionLabel={(option) => option.label}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => 
                                            <TextField {...params} 
                                                label="請選擇項目" 
                                                error={typeID1 === typeID2 && typeID1 !== null  ? true : false}
                                                helperText={typeID1 === typeID2 && typeID1 !== null ? "請勿重複報名" : ""}/>}
                                        onChange={(event, newValue, reason) => {
                                            setTypeID1(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                                        }}
                                    />
                                </ListItem>
                                {
                                    typeID1 === null || typeID1 === 1 || typeID1 === 2
                                    ? <></>
                                    :
                                    <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/2' }} id="sid-1" primary="" />
                                        <Autocomplete 
                                            size="small"
                                            sx={{ gridColumn: '2/4' }}
                                            id="select-sid-1"
                                            options={currentStudent.filter(checkSame)}
                                            getOptionLabel={(option) => `${option.sid}`+' '+`${option.username}`}
                                            isOptionEqualToValue={(option, value) => option.sid === value.sid}
                                            onChange={(event, newValue, reason) => {
                                                setCompetitors1(reason === "clear" || reason === "removeOption" ? null : newValue.uid);
                                                
                                            }}
                                            renderInput={(params) => 
                                                <TextField {...params} 
                                                    // error={competitors1 === null ? true : false}
                                                    helperText={competitors1 === null ? "請確認隊友已擁有帳號" : ""}
                                                    label="隊友學號" 
                                                />
                                            }
                                        />
                                    </ListItem>
                                }
                                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                    <ListItemText sx={{ gridColumn: '1/2' }} id="entry-2" primary="項目二" />
                                    <Autocomplete 
                                        size="small"
                                        sx={{ gridColumn: '2/4' }}
                                        // disablePortal
                                        id="select-entry-2"
                                        options={EVENTTYPEENTRY}
                                        getOptionLabel={(option) => option.label}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => 
                                            <TextField {...params} 
                                                label="請選擇項目" 
                                                error={typeID1 === typeID2 && typeID1 !== null ? true : false}
                                                helperText={typeID1 === typeID2 && typeID2 !== null ? "請勿重複報名" : ""}/>}
                                        onChange={(event, newValue, reason) => {
                                            setTypeID2(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                                        }}
                                    />
                                </ListItem>
                                {
                                    typeID2 === null || typeID2 === 1 || typeID2 === 2
                                    ? <></>
                                    :
                                    <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/2' }} id="sid-2" primary="" />
                                        <Autocomplete 
                                            size="small"
                                            sx={{ gridColumn: '2/4' }}
                                            // disablePortal
                                            id="select-sid-2"
                                            options={currentStudent.filter(checkSame)}
                                            getOptionLabel={(option) => `${option.sid}`+' '+`${option.username}`}
                                            isOptionEqualToValue={(option, value) => option.sid === value.sid}
                                            onChange={(event, newValue, reason) => {
                                                setCompetitors2(reason === "clear" || reason === "removeOption" ? null : newValue.uid);
                                            }}
                                            renderInput={(params) => 
                                                <TextField {...params} 
                                                    // error={competitors2 === null ? true : false}
                                                    helperText={competitors2 === null ? "請確認隊友已擁有帳號" : ""}
                                                    label="隊友學號" 
                                                />
                                            }
                                        />
                                    </ListItem>
                                }
                            </>
                    }
                    <Grid
                        container
                        justifyContent="center"
                        spacing={2}
                        sx={{mt: '2%'}}
                    >
                        { editmode == true ?
                            events.length > 0 ?
                                <Grid item>
                                    <Button 
                                        variant="contained"
                                        onClick={handleSubmit}
                                    >
                                        確認編輯賽事
                                    </Button>
                                </Grid>
                                : 
                                <></>
                            : 
                            <Grid item>
                                <Button 
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    確認報名
                                </Button>
                            </Grid> 
                        }
                    </Grid>
                </List>
            </Container>
        </>
    );
}

export default LoginForm;
