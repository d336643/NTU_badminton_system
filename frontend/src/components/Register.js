import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    Button,
    CssBaseline,
    TextField,
    List,
    ListItem,
    ListItemText,
    Container,
    Grid,
    Autocomplete,
    Divider,
    Chip,
    Alert,
} from '@mui/material';

import InfoDialog from "./InfoDialog";

import baseURL from "../urlUtility";
import { EVENTTYPEENTRY } from "../utilities/entry";

import { instance, getCommonConfig } from '../apiUtilities/instance';

import axios from 'axios';

const LoginForm = () => {
    const navigate = useNavigate();
    const myUid = Number(localStorage.getItem('uid'));
    const token = localStorage.getItem('token');
    const applier = myUid;
    const cursemester = "112-2";
    const [oldtypeID1, setOldtypeID1] = useState(null);
    const [oldtypeID2, setOldtypeID2] = useState(null);
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
    const [editmode1, setEditmode1] = useState(false);
    const [editmode2, setEditmode2] = useState(false);
    const [gotinfo, setGotinfo] = useState(false);
    const eventEntry = ["男單", "女單", "男雙", "女雙", "混雙"];

    const checkSame = (opt) => {
        return Number(opt.uid) !== myUid;
    }

    const getPartners = (tid) => {
        let name = partners.map(p => {
            if (tid === p.typeId) {
                return {uid: p.uid, username: p.partner, sid: p.sid}
            }
        })
        return name[0]
    }

    // useEffect(() => {
    //     async function fetchData() {
    //         const config = {
    //             headers:{
    //                 'Authorization': 'Bearer ' + token,
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //         try {
    //             const res = await instance.get(`/users`, config);
    //             if (res.data.success === true){
    //                 const users = res.data.data;
    //                 setCurrentStudent(users);
    //             }
    //         } catch (error) {
    //             // console.log(error);
    //         }
    //     }
    //     fetchData();
    // }, [])

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
            try {
                const res = await instance.get(`events/status?uid=${myUid}`, config);
                if (res.data.success) {
                    setEvents(events.concat(res.data.events));
                    const newState = res.data.events.map((event, i) => {
                        if (i === 0) {
                            setTypeID1(event.typeId);
                            setOldtypeID1(event.typeId);
                        }
                        else if (i === 1) {
                            setTypeID2(event.typeId);
                            setOldtypeID2(event.typeId);
                        }
                        if (event.typeId > 2) {
                            event.competitors.map((obj) => {
                                if (obj.uid !== Number(myUid)) {
                                    let userid = obj.uid;
                                    let partner = obj.username;
                                    let sid = obj.sid;
                                    setPartners(partners.concat({typeId: event.typeId, uid: userid, partner: partner, sid: sid}));
                                    if (i === 0) setCompetitors1(userid);
                                    else if (i === 1) setCompetitors2(userid);
                                }
                            })
                        }
                    })
                    setGotinfo(true);
                }
            } catch (error) {
                // console.log(error);
            }
        }
        fetchData();
    }, [])

    const handleSubmit = (number) => {
        if (number === 1) {
            let regEvent = [];
            if (typeID2 !== null) {
                if (typeID2 === 1 || typeID2 === 2) 
                    regEvent = regEvent.concat({typeId: typeID2, semester: cursemester, competitors: [myUid]});
                else {
                    if (competitors2 === null) {
                        setAlertmessage("未選擇隊友");
                        setSuccess(false);
                        setOpen(true);
                        return;
                    }
                    else regEvent = regEvent.concat({typeId: typeID2, semester: cursemester, competitors: [myUid, competitors2]});
                }
            }
            submit(regEvent);
        }
        else {
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
                        regEvent = regEvent.concat({typeId: typeID1, semester: cursemester, competitors: [myUid]});
                    else {
                        if (competitors1 === null) {
                            setAlertmessage("未選擇隊友");
                            setSuccess(false);
                            setOpen(true);
                            return;
                        }
                        else regEvent = regEvent.concat({typeId: typeID1, semester: cursemester, competitors: [myUid, competitors1]});
                    }
                }
                if (typeID2 !== null) {
                    if (typeID2 === 1 || typeID2 === 2) 
                        regEvent = regEvent.concat({typeId: typeID2, semester: cursemester, competitors: [myUid]});
                    else {
                        if (competitors2 === null) {
                            setAlertmessage("未選擇隊友");
                            setSuccess(false);
                            setOpen(true);
                            return;
                        }
                        else regEvent = regEvent.concat({typeId: typeID2, semester: cursemester, competitors: [myUid, competitors2]});
                    }
                }
                submit(regEvent);
            }
        }
    }

    const handleDelete = (entry) => {
        if (entry === 1)
            deleteEvent(events[0].eventId);
        else 
            deleteEvent(events[1].eventId);
    }

    const handleEdit = (entry) => {
        if (entry === 1) {
            if (competitors1 === null) {
                setAlertmessage("未選擇隊友");
                setSuccess(false);
                setOpen(true);
                return;
            }
            let curEvent = [];
            curEvent = curEvent.concat({eventId: events[0].eventId, typeId: typeID1, competitors: [myUid, competitors1]});
            editEvent(curEvent);
        }
        if (entry === 2) {
            if (competitors2 === null) {
                setAlertmessage("未選擇隊友");
                setSuccess(false);
                setOpen(true);
                return;
            }
            let curEvent = [];
            curEvent = curEvent.concat({eventId: events[1].eventId, typeId: typeID2, competitors: [myUid, competitors2]});
            editEvent(curEvent);
        }
    }

    const deleteEvent = async(eid) => {
        let form = {
            applier: applier,
            eventId: eid
        }
        await axios({
            url:baseURL+`/events`,
            method:'delete',
            data : form,
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'}
        }).then ((response) => {
            if (response.data.success === true){
                setAlertmessage("刪除項目完成");
                setSuccess(true);
                setOpen(true);
            }
        }).catch((error) => {
            // console.log(error)
            setAlertmessage(String(error.response.data.msg));
            setOpen(true);
        });
    }

    const editEvent = async(events) => {
        let form = {
            applier: applier,
            event: events[0]
        }
        const config = {
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await instance.put('/events', form, config);
            if (res.status === 200){
                setAlertmessage("編輯完成，請至 \"報名及繳費狀態\" 頁確認");
                setSuccess(true);
                setOpen(true);

            }
        } catch (error) {
            // console.log((error));
			setAlertmessage(String(error).replace('Error: ', ''));
            setOpen(true);
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
                setAlertmessage("報名完成，請至 \"報名及繳費狀態\" 頁確認");
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
        <>
            <Container component="main" maxWidth="sm">
                <List
                    sx={{
                        marginTop: '5%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <h3 style={{ marginBottom: '20px' }}>報名賽事</h3>
                    <Alert severity="info" style={{ marginBottom: '20px' }}>
                        <p>已截止報名</p>
                    </Alert>
                    <Button 
                        variant="outlined"
                        onClick={() => navigate('/')}
                    >
                        返回主頁面
                    </Button>
                </List>
            </Container>
        </>
        // <>
        //     <Container component="main" maxWidth="sm"> {/*sx={{height: "75vh"}}*/}
        //         <CssBaseline />
        //         <InfoDialog route={'/'} open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} />
        //         <List
        //             sx={{
        //                 marginTop: '5%',
        //                 display: 'flex',
        //                 flexDirection: 'column',
        //                 alignItems: 'center',
        //             }}
        //         >
        //             <h3 style={{ marginBottom: '2%' }}>報名 / 編輯賽事</h3>
        //             <Alert severity="info" style={{ marginBottom: '3%' }}>
        //                 <p style={{ marginBottom: '1%'}}>報名賽事前，請詳細閱讀<a href="/competitionrule">競賽章程</a></p>
        //                 {/* <p>報名團體賽，請填寫
        //                 <a href="https://docs.google.com/forms/d/e/1FAIpQLSfk5_FqPlhuQSGRQQ6GKAiY3WqYVa_s5LiMRGVbQBR6vDTDIA/viewform?fbclid=IwAR19i5knwaM-TuWtKAnZlkZz6GL9X46a00dTa7L07XGmWQNCDTJZ4Cspljk">
        //                     團賽報名表單
        //                 </a>
        //                 </p> */}
        //                 <p><b>僅能修改未繳費之報名項目</b></p>
        //             </Alert>
        //             {
        //                 gotinfo === true ?
        //                 events.length > 0 ?
        //                     events.length === 1 ?
        //                     <>
        //                         <Divider color='secondary' style={{marginTop: '2%', marginBottom: '2%', width:'100%'}}><Chip color='secondary' variant='outlined' label={'項目一'} /></Divider>
        //                         <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                             <ListItemText sx={{ gridColumn: '1/3' }} id="entry-1" primary={'報名項目'} />
        //                             <Autocomplete 
        //                                 size="small"
        //                                 sx={{ gridColumn: '4/8' }}
        //                                 // disablePortal
        //                                 id="select-entry-1"
        //                                 options={EVENTTYPEENTRY}
        //                                 getOptionLabel={(option) => option.label}
        //                                 isOptionEqualToValue={(option, value) => option.id === value.id}
        //                                 defaultValue={{ label: `${eventEntry[typeID1-1]}`, id: typeID1}}
        //                                 readOnly={true}
        //                                 disabled={true}
        //                                 onChange={(event, newValue, reason) => {
        //                                     setTypeID1(reason === "clear" || reason === "removeOption" ? null : newValue.id)
        //                                 }}
        //                                 renderInput={(params) => 
        //                                     <TextField {...params} 
        //                                         size="small"
        //                                         value={eventEntry[typeID1-1]}
        //                                         error={typeID1 === typeID2 && typeID1 !== null  ? true : false}
        //                                         helperText={typeID1 === typeID2 && typeID1 !== null ? "請勿重複報名" : ""}
        //                                     />}
        //                             />
        //                         </ListItem>
        //                         {
        //                             typeID1 > 2 ? 
        //                             <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                                 <ListItemText sx={{ gridColumn: '1/3' }} id="sid-1" primary="隊友學號及姓名" />
        //                                 <Autocomplete 
        //                                     size="small"
        //                                     sx={{ gridColumn: '4/8' }}
        //                                     id="select-sid-1"
        //                                     options={currentStudent.filter(checkSame)}
        //                                     getOptionLabel={(option) => `${option.sid}`+' '+`${option.username}`}
        //                                     isOptionEqualToValue={(option, value) => option.sid === value.sid}
        //                                     defaultValue={getPartners(typeID1)}
        //                                     readOnly={editmode1 ? false : true}
        //                                     disabled={editmode1 ? false : true}
        //                                     onChange={(event, newValue, reason) => {
        //                                         setCompetitors1(reason === "clear" || reason === "removeOption" ? null : newValue.uid)
        //                                     }}
        //                                     renderInput={(params) => 
        //                                         <TextField {...params} 
        //                                             // error={competitors1 === null ? true : false}
        //                                             helperText={
        //                                                 competitors1 === null ? "請確認隊友已擁有帳號" : ""
        //                                             }
        //                                             // label="隊友學號" 
        //                                         />
        //                                     }
        //                                 />
        //                             </ListItem>
        //                             : <></>
        //                         }
        //                         {
        //                             editmode1 ? <></>
        //                             :
        //                             <>
        //                                 <Divider color='secondary' style={{marginTop: '2%', marginBottom: '2%', width:'100%'}}><Chip color='secondary' variant='outlined' label={'項目二'} /></Divider>
        //                                 <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                                     <ListItemText sx={{ gridColumn: '1/3' }} id="entry-2" primary="報名項目" />
        //                                     <Autocomplete 
        //                                         size="small"
        //                                         sx={{ gridColumn: '4/8' }}
        //                                         // disablePortal
        //                                         id="select-entry-2"
        //                                         options={EVENTTYPEENTRY}
        //                                         getOptionLabel={(option) => option.label}
        //                                         isOptionEqualToValue={(option, value) => option.id === value.id}
        //                                         renderInput={(params) => 
        //                                             <TextField {...params} 
        //                                                 label="請選擇項目" 
        //                                                 error={typeID1 === typeID2 && typeID1 !== null ? true : false}
        //                                                 helperText={typeID1 === typeID2 && typeID1 !== null ? "請勿重複報名" : ""}/>}
        //                                         onChange={(event, newValue, reason) => {
        //                                             setTypeID2(reason === "clear" || reason === "removeOption" ? null : newValue.id);
        //                                         }}
        //                                     />
        //                                 </ListItem>
        //                                 {
        //                                     typeID2 > 2 ?
        //                                     <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                                         <ListItemText sx={{ gridColumn: '1/3' }} id="sid-2" primary="隊友學號及姓名" />
        //                                         <Autocomplete 
        //                                             size="small"
        //                                             sx={{ gridColumn: '4/8' }}
        //                                             // disablePortal
        //                                             id="select-sid-2"
        //                                             options={currentStudent.filter(checkSame)}
        //                                             getOptionLabel={(option) => `${option.sid}`+' '+`${option.username}`}
        //                                             isOptionEqualToValue={(option, value) => option.sid === value.sid}
        //                                             onChange={(event, newValue, reason) => {
        //                                                         setCompetitors2(reason === "clear" || reason === "removeOption" ? null : newValue.uid)
        //                                                     }}
        //                                             renderInput={(params) => 
        //                                                 <TextField {...params} 
        //                                                     // error={competitors1 === null ? true : false}
        //                                                     helperText={
        //                                                         competitors2 === null ? "請確認隊友已擁有帳號" : ""
        //                                                     }
        //                                                     // label="隊友學號" 
        //                                                 />
        //                                             }
        //                                         />
        //                                     </ListItem>
        //                                     : <></>
        //                                 }
        //                             </>
        //                         }
        //                         {
        //                             editmode1 ?
        //                             <Grid
        //                                 container
        //                                 justifyContent="center"
        //                                 spacing={2}
        //                                 sx={{margin: '1%'}}
        //                             >
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="outlined"
        //                                         onClick={() => {handleDelete(1)}}
        //                                     >
        //                                         刪除此項目
        //                                     </Button>
        //                                 </Grid>
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="contained"
        //                                         onClick={() => {handleEdit(1)}}
        //                                     >
        //                                         確認編輯項目
        //                                     </Button>
        //                                 </Grid>
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="outlined"
        //                                         onClick={() => {setEditmode1(false)}}
        //                                     >
        //                                         返回上一頁
        //                                     </Button>
        //                                 </Grid>
        //                             </Grid>
        //                             :
        //                             <Grid
        //                                 container
        //                                 justifyContent="center"
        //                                 spacing={2}
        //                                 sx={{margin: '1%'}}
        //                             >
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="contained"
        //                                         onClick={() => {handleSubmit(1)}}
        //                                     >
        //                                         新增報名項目
        //                                     </Button>
        //                                 </Grid>
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="outlined"
        //                                         onClick={() => {setEditmode1(true)}}
        //                                     >
        //                                         編輯已報名項目
        //                                     </Button>
        //                                 </Grid> 
        //                             </Grid>
        //                         }
        //                     </>
        //                     : // edit options = 2
        //                     <>
        //                         {
        //                             editmode2 ? <></>
        //                             :
        //                             <>
        //                                 <Divider color='secondary' style={{marginTop: '2%', marginBottom: '2%', width:'100%'}}><Chip color='secondary' variant='outlined' label={'項目一'} /></Divider>
        //                                 <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                                     <ListItemText sx={{ gridColumn: '1/3' }} id="entry-1" primary={'報名項目'} />
        //                                     <Autocomplete 
        //                                         size="small"
        //                                         sx={{ gridColumn: '4/8' }}
        //                                         // disablePortal
        //                                         id="select-entry-1"
        //                                         options={EVENTTYPEENTRY}
        //                                         getOptionLabel={(option) => option.label}
        //                                         isOptionEqualToValue={(option, value) => option.id === value.id}
        //                                         defaultValue={{ label: `${eventEntry[typeID1-1]}`, id: typeID1}}
        //                                         readOnly={true}
        //                                         disabled={true}
        //                                         onChange={(event, newValue, reason) => {
        //                                             setTypeID1(reason === "clear" || reason === "removeOption" ? null : newValue.id)
        //                                         }}
        //                                         renderInput={(params) => 
        //                                             <TextField {...params} 
        //                                                 size="small"
        //                                                 value={eventEntry[typeID1-1]}
        //                                                 error={typeID1 === typeID2 && typeID1 !== null  ? true : false}
        //                                                 helperText={typeID1 === typeID2 && typeID1 !== null ? "請勿重複報名" : ""}
        //                                             />}
        //                                     />
        //                                 </ListItem>
        //                                 {
        //                                     typeID1 > 2 ? 
        //                                     <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                                         <ListItemText sx={{ gridColumn: '1/3' }} id="sid-1" primary="隊友學號及姓名" />
        //                                         <Autocomplete 
        //                                             size="small"
        //                                             sx={{ gridColumn: '4/8' }}
        //                                             id="select-sid-1"
        //                                             options={currentStudent.filter(checkSame)}
        //                                             getOptionLabel={(option) => `${option.sid}`+' '+`${option.username}`}
        //                                             isOptionEqualToValue={(option, value) => option.sid === value.sid}
        //                                             defaultValue={getPartners(typeID1)}
        //                                             readOnly={editmode1 ? false : true}
        //                                             disabled={editmode1 ? false : true}
        //                                             onChange={(event, newValue, reason) => {
        //                                                 setCompetitors1(reason === "clear" || reason === "removeOption" ? null : newValue.uid)
        //                                             }}
        //                                             renderInput={(params) => 
        //                                                 <TextField {...params} 
        //                                                     // error={competitors1 === null ? true : false}
        //                                                     helperText={
        //                                                         competitors1 === null ? "請確認隊友已擁有帳號" : ""
        //                                                     }
        //                                                     // label="隊友學號" 
        //                                                 />
        //                                             }
        //                                         />
        //                                     </ListItem>
        //                                     : <></>
        //                                 }
        //                             </>
        //                         }
        //                         {
        //                             editmode1 ? <></>
        //                             :
        //                             <>
        //                                 <Divider color='secondary' style={{marginTop: '2%', marginBottom: '2%', width:'100%'}}><Chip color='secondary' variant='outlined' label={'項目二'} /></Divider>
        //                                 <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                                     <ListItemText sx={{ gridColumn: '1/3' }} id="entry-2" primary="報名項目" />
        //                                     <Autocomplete 
        //                                         size="small"
        //                                         sx={{ gridColumn: '4/8' }}
        //                                         // disablePortal
        //                                         id="select-entry-2"
        //                                         options={EVENTTYPEENTRY}
        //                                         getOptionLabel={(option) => option.label}
        //                                         isOptionEqualToValue={(option, value) => option.id === value.id}
        //                                         defaultValue={{ label: `${eventEntry[typeID2-1]}`, id: typeID2}}
        //                                         readOnly={true}
        //                                         disabled={true}
        //                                         onChange={(event, newValue, reason) => {
        //                                             setTypeID2(reason === "clear" || reason === "removeOption" ? null : newValue.id)
        //                                         }}
        //                                         renderInput={(params) => 
        //                                             <TextField {...params} 
        //                                                 label="請選擇項目" 
        //                                                 error={typeID1 === typeID2 && typeID1 !== null ? true : false}
        //                                                 helperText={typeID1 === typeID2 && typeID1 !== null ? "請勿重複報名" : ""}/>}
        //                                     />
        //                                 </ListItem>
        //                                 {
        //                                     typeID2 > 2 ?
        //                                     <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                                         <ListItemText sx={{ gridColumn: '1/3' }} id="sid-2" primary="隊友學號及姓名" />
        //                                         <Autocomplete 
        //                                             size="small"
        //                                             sx={{ gridColumn: '4/8' }}
        //                                             // disablePortal
        //                                             id="select-sid-2"
        //                                             options={currentStudent.filter(checkSame)}
        //                                             getOptionLabel={(option) => `${option.sid}`+' '+`${option.username}`}
        //                                             isOptionEqualToValue={(option, value) => option.sid === value.sid}
        //                                             defaultValue={getPartners(typeID2)}
        //                                             readOnly={editmode2 ? false : true}
        //                                             disabled={editmode2 ? false : true}
        //                                             onChange={(event, newValue, reason) => {
        //                                                 setCompetitors2(reason === "clear" || reason === "removeOption" ? null : newValue.uid)
        //                                             }}
        //                                             renderInput={(params) => 
        //                                                 <TextField {...params} 
        //                                                     // error={competitors1 === null ? true : false}
        //                                                     helperText={
        //                                                         competitors2 === null ? "請確認隊友已擁有帳號" : ""
        //                                                     }
        //                                                     // label="隊友學號" 
        //                                                 />
        //                                             }
        //                                         />
        //                                     </ListItem>
        //                                     : <></>
        //                                 }
        //                             </>
        //                         }
        //                         {
        //                             editmode1 ?
        //                             <Grid
        //                                 container
        //                                 justifyContent="center"
        //                                 spacing={2}
        //                                 sx={{margin: '1%'}}
        //                             >
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="outlined"
        //                                         onClick={() => {handleDelete(1)}}
        //                                     >
        //                                         刪除此項目
        //                                     </Button>
        //                                 </Grid>
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="contained"
        //                                         onClick={() => {handleEdit(1)}}
        //                                     >
        //                                         確認編輯項目
        //                                     </Button>
        //                                 </Grid>
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="outlined"
        //                                         onClick={() => {setEditmode1(false)}}
        //                                     >
        //                                         返回上一頁
        //                                     </Button>
        //                                 </Grid>
        //                             </Grid>
        //                             :
        //                             editmode2 ?
        //                             <Grid
        //                                 container
        //                                 justifyContent="center"
        //                                 spacing={2}
        //                                 sx={{margin: '1%'}}
        //                             >
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="outlined"
        //                                         onClick={() => {handleDelete(2)}}
        //                                     >
        //                                         刪除此項目
        //                                     </Button>
        //                                 </Grid>
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="contained"
        //                                         onClick={() => {handleEdit(2)}}
        //                                     >
        //                                         確認編輯項目
        //                                     </Button>
        //                                 </Grid>
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="outlined"
        //                                         onClick={() => {setEditmode2(false)}}
        //                                     >
        //                                         返回上一頁
        //                                     </Button>
        //                                 </Grid>
        //                             </Grid>
        //                             :
        //                             <Grid
        //                                 container
        //                                 justifyContent="center"
        //                                 spacing={2}
        //                                 sx={{margin: '1%'}}
        //                             >
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="contained"
        //                                         onClick={() => {setEditmode1(true)}}
        //                                     >
        //                                         編輯報名項目一
        //                                     </Button>
        //                                 </Grid>
        //                                 <Grid item>
        //                                     <Button 
        //                                         variant="contained"
        //                                         onClick={() => {setEditmode2(true)}}
        //                                     >
        //                                         編輯報名項目二
        //                                     </Button>
        //                                 </Grid> 
        //                             </Grid>
        //                         }
        //                     </>
        //                     : // register mode
        //                         <>
        //                             <Divider color='secondary' style={{marginTop: '2%', marginBottom: '2%', width:'100%'}}><Chip color='secondary' variant='outlined' label={'項目一'} /></Divider>
        //                             <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                                 <ListItemText sx={{ gridColumn: '1/3' }} id="entry-1" primary="報名項目" />
        //                                 <Autocomplete 
        //                                     size="small"
        //                                     sx={{ gridColumn: '4/8' }}
        //                                     id="select-entry-1"
        //                                     options={EVENTTYPEENTRY}
        //                                     getOptionLabel={(option) => option.label}
        //                                     isOptionEqualToValue={(option, value) => option.id === value.id}
        //                                     renderInput={(params) => 
        //                                         <TextField {...params} 
        //                                             label="請選擇項目" 
        //                                             error={typeID1 === typeID2 && typeID1 !== null  ? true : false}
        //                                             helperText={typeID1 === typeID2 && typeID1 !== null ? "請勿重複報名" : ""}/>}
        //                                     onChange={(event, newValue, reason) => {
        //                                         setTypeID1(reason === "clear" || reason === "removeOption" ? null : newValue.id);
        //                                     }}
        //                                 />
        //                             </ListItem>
        //                             {
        //                                 typeID1 > 2 ?
        //                                 <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                                     <ListItemText sx={{ gridColumn: '1/3' }} id="sid-1" primary="隊友學號及姓名" />
        //                                     <Autocomplete 
        //                                         size="small"
        //                                         sx={{ gridColumn: '4/8' }}
        //                                         id="select-sid-1"
        //                                         options={currentStudent.filter(checkSame)}
        //                                         getOptionLabel={(option) => `${option.sid}`+' '+`${option.username}`}
        //                                         isOptionEqualToValue={(option, value) => option.sid === value.sid}
        //                                         onChange={(event, newValue, reason) => {
        //                                             setCompetitors1(reason === "clear" || reason === "removeOption" ? null : newValue.uid);
                                                    
        //                                         }}
        //                                         renderInput={(params) => 
        //                                             <TextField {...params} 
        //                                                 // error={competitors1 === null ? true : false}
        //                                                 helperText={competitors1 === null ? "請確認隊友已擁有帳號" : ""}
        //                                                 // label="隊友學號" 
        //                                             />
        //                                         }
        //                                     />
        //                                 </ListItem>
        //                                 : <></>
        //                             }
        //                             <Divider color='secondary' style={{marginTop: '2%', marginBottom: '2%', width:'100%'}}><Chip color='secondary' variant='outlined' label={'項目二'} /></Divider>
        //                             <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                                 <ListItemText sx={{ gridColumn: '1/3' }} id="entry-2" primary="報名項目" />
        //                                 <Autocomplete 
        //                                     size="small"
        //                                     sx={{ gridColumn: '4/8' }}
        //                                     // disablePortal
        //                                     id="select-entry-2"
        //                                     options={EVENTTYPEENTRY}
        //                                     getOptionLabel={(option) => option.label}
        //                                     isOptionEqualToValue={(option, value) => option.id === value.id}
        //                                     renderInput={(params) => 
        //                                         <TextField {...params} 
        //                                             label="請選擇項目" 
        //                                             error={typeID1 === typeID2 && typeID1 !== null ? true : false}
        //                                             helperText={typeID1 === typeID2 && typeID2 !== null ? "請勿重複報名" : ""}/>}
        //                                     onChange={(event, newValue, reason) => {
        //                                         setTypeID2(reason === "clear" || reason === "removeOption" ? null : newValue.id);
        //                                     }}
        //                                 />
        //                             </ListItem>
        //                             {
        //                                 typeID2 > 2 ?
        //                                 <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //                                     <ListItemText sx={{ gridColumn: '1/3' }} id="sid-2" primary="隊友學號及姓名" />
        //                                     <Autocomplete 
        //                                         size="small"
        //                                         sx={{ gridColumn: '4/8' }}
        //                                         // disablePortal
        //                                         id="select-sid-2"
        //                                         options={currentStudent.filter(checkSame)}
        //                                         getOptionLabel={(option) => `${option.sid}`+' '+`${option.username}`}
        //                                         isOptionEqualToValue={(option, value) => option.sid === value.sid}
        //                                         onChange={(event, newValue, reason) => {
        //                                                     setCompetitors2(reason === "clear" || reason === "removeOption" ? null : newValue.uid)
        //                                                 }}
        //                                         renderInput={(params) => 
        //                                             <TextField {...params} 
        //                                                 // error={competitors1 === null ? true : false}
        //                                                 helperText={
        //                                                     competitors2 === null ? "請確認隊友已擁有帳號" : ""
        //                                                 }
        //                                                 // label="隊友學號" 
        //                                             />
        //                                         }
        //                                     />
        //                                 </ListItem>
        //                                 : <></>
        //                             }
        //                             <Grid 
        //                                 justifyContent="center"
        //                                 spacing={2}
        //                                 sx={{mt: '2%'}}
        //                             >
        //                                 <Button 
        //                                     variant="contained"
        //                                     onClick={() => {handleSubmit(2)}}
        //                                 >
        //                                     確認報名
        //                                 </Button>
        //                             </Grid>
        //                         </>
        //                     :<></>
        //             }
        //         </List>
        //     </Container>
        // </>
    );
}

export default LoginForm;
