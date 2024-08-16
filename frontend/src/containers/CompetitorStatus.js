import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    Container,
    Button,
    CssBaseline,
    Divider,
    TextField,
    Grid,
    Chip,
    List,
    ListItem,
    ListItemText,
    Alert,
    Autocomplete,
} from '@mui/material';

import InfoDialog from "../components/InfoDialog";

import { DEGREEE } from '../utilities/entry';
import { SEMESTER } from "../utilities/globalVariable";

import { instance, getCommonConfig } from '../apiUtilities/instance';


const createData = (eventId, account) => {
    return { eventId: eventId, account: account };
}
const text = ['一', '二']

const CompetitorStatus = () => {
    const navigate = useNavigate();
    const uid = localStorage.getItem('uid');
    const token = localStorage.getItem('token');
    const name = localStorage.getItem("name");
    const sid = localStorage.getItem("sid");
    const degreeId = localStorage.getItem("degreeId");
    const departmentId = localStorage.getItem("departmentId");
    const [eventsToPay, setEventsToPay] = useState([])
    const [toPayInfo, setToPayInfo] = useState([])
    const [events, setEvents] = useState([]);
    const [partners, setPartners] = useState([]);
    const [status, setStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [stored, setStored] = useState(false);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [department, setDepartment] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [semesters, setSemesters] = useState([]);

    const eventStatus = ["未繳費(已報名)", "審核中", "審核通過，已繳費"]
    const eventEntry = ["男單", "女單", "男雙", "女雙", "混雙"]

    const findDepart = (departmentId) => {
        let target = '';
        department.map((d) => {
            if (d.indexOf(departmentId) === 0) {
                let newd = d.replace(departmentId, '')
                target =  newd;
            }
        })
        return target;
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
            if (res.data.success === true) {
                getKeysOf(res.data.data.departments);
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const getKeysOf = (dict) => {
        const key = Object.keys(dict);
        const value = Object.values(dict);
        const testArr = value.map(function(x, i) {
            return key[i]+value[i]
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
                if (res.data.success) {
                    const fetchedSemesters = res.data.events.map(event => event.semester);
                    const uniqueSemesters = [...new Set(fetchedSemesters)]; // To ensure unique semesters
                    setSemesters(uniqueSemesters);

                    const latestSemester = uniqueSemesters.sort().reverse()[0]; // Get the latest semester
                    setSelectedSemester(latestSemester);
    
                    setEvents(events.concat(res.data.events));
                    const newState = res.data.events.map((event) => {
                        if (event.typeId > 2) {
                            event.competitors.map(obj => {
                                if (obj.uid !== Number(uid)) {
                                    let partner = obj.username;
                                    let sid = obj.sid;
                                    setPartners(partners.concat({typeId: event.typeId, partner: partner, sid: sid}));
                                }
                            })
                        }
                        return createData(event.eventId, event.account);
                    });
                    setEventsToPay(eventsToPay.concat(newState));
                }
            } catch (error) {
                // console.log(error);
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
        const newState = eventsToPay.map(obj => {
            if (obj.eventId === eventId) {
                return { ...obj, account: evalue };
            }
            return obj;
        });
        setToPayInfo(toPayInfo.concat(newState));
    };

    const handleStore = (event) => {
        event.preventDefault();
        if (toPayInfo.length === 0) {
            setAlertmessage("請先更新匯款資料再儲存")
            setOpen(true);
        }
        else {
            toPayInfo.map(((info) => {
                if (info.account !== null) {
                    setSubmit(true);
                    let finalForm = {
                        "payer":uid,
                        "eventsToPay": [info.eventId],
                        "account": info.account,
                    }
                    submitForm(finalForm);
                }
            }))
        }

        if (!submit) {
            setAlertmessage("請先更新匯款資料再儲存")
            setOpen(true);
        }
        navigate("/");
    };

    const submitForm = async(form) => {
		const config = {
			headers:{
				'Authorization': 'Bearer ' + token,
                'accept': 'application/json'
			}
		}
		// console.log(form);
		try {
			let res = await instance.post('/users/bankAccount', form, config);
			if(res.status === 200) {
                setStatus(true);
                setAlertmessage("資料更新成功，將為您導回首頁 !")
                setOpen(true);
			}
		} catch (error) {
			// console.log(error);
            setAlertmessage("資料更新失敗")
            setOpen(true);
		}
	}

    const getPartners = (tid) => {
        let name = partners.map(p => {
            if (tid == p.typeId) {
                return `${p.sid} ${p.partner}`
            }
        })
        return name[0]
    }

    const filteredEvents = selectedSemester
        ? events.filter(event => event.semester === selectedSemester)
        : events;

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ paddingBottom: '60px', paddingTop: '60px' }}>
                <InfoDialog open={open} setOpen={setOpen} turnBack={stored} alertmessage={alertmessage} />
                <CssBaseline />
                <List
                    sx={{
                        mt: '20px',
                        mb: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <h3 style={{ marginBottom: '20px' }}>報名及繳費狀態</h3>
                    <Grid container alignItems="center" sx={{ marginBottom: '20px' }}>
                        <Grid item xs={4} />
                        <Grid item xs={4} style={{ textAlign: 'right'}}>
                            <Autocomplete
                                size="small"
                                id="select-semester"
                                options={semesters.map(semester => ({ label: semester, id: semester }))}
                                getOptionLabel={(option) => option.label || ""}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField {...params} label="學期" />}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setSelectedSemester(newValue.id);
                                    }
                                }}
                                value={semesters.find(semester => semester === selectedSemester) ? { label: selectedSemester, id: selectedSemester } : null}
                                disableClearable
                                sx={{padding: '5px', paddingLeft: '15px', paddingRight: '15px' }}
                            />
                        </Grid>
                        <Grid item xs={4} />
                    </Grid>
                    <Alert severity="info" style={{ marginBottom: '20px' }}>
                        銀行代碼：700 &nbsp; 匯款帳戶：00213950391560 &nbsp; 戶名：王品淳
                    </Alert>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="name-item" primary="姓名" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            value={name}
                            readOnly={true}
                            disabled={true}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="學號" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            value={sid}
                            readOnly={true}
                            disabled={true}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="dgreeID-item" primary="系級" />
                        <TextField
                            sx={{ gridColumn: '4/8' }}
                            size="small"
                            value={findDepart(departmentId)+DEGREEE[degreeId-1]}
                            readOnly={true}
                            disabled={true}
                        />
                    </ListItem>
                    { filteredEvents.length > 0 ?
                        filteredEvents.map((event, i) => {
                            return (
                                <>
                                    <Divider color='secondary' style={{marginTop: '2%', marginBottom: '2%', width:'100%'}}><Chip color='secondary' variant='outlined' label={`項目${text[i]}`} /></Divider>
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="報名項目及序號" />
                                        <TextField
                                            sx={{ gridColumn: '4/8' }}
                                            size="small"
                                            value={eventEntry[event.typeId-1] + event.registrationId}
                                            readOnly={true}
                                            disabled={true}
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
                                                disabled={true}
                                            />
                                        </ListItem>
                                        : <></>
                                    }
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="報名及繳費狀態" />
                                        <TextField
                                            sx={{ gridColumn: '4/8' }}
                                            size="small"
                                            value={eventStatus[event.status-1]}
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </ListItem>
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="匯款後五碼" />
                                        {selectedSemester == SEMESTER? 
                                            event.account === null ?   
                                                <TextField
                                                    sx={{ gridColumn: '4/8' }}
                                                    size="small"
                                                    id="account"
                                                    label="輸入匯款後五碼"
                                                    name="account"
                                                    onChange={e => handleAccountSet(e.target.value, event.eventId)}
                                                />
                                                // <TextField
                                                //     sx={{ gridColumn: '4/8' }}
                                                //     size="small"
                                                //     id="account"
                                                //     label="匯款時間已截止"
                                                //     name="account"
                                                //     disabled
                                                //     // onChange={e => handleAccountSet(e.target.value, event.eventId)}
                                                // />
                                                :
                                                <TextField
                                                    sx={{ gridColumn: '4/8' }}
                                                    size="small"
                                                    value={event.account}
                                                    readOnly={true}
                                                    disabled={true}
                                                />
                                            :
                                            <TextField
                                                sx={{ gridColumn: '4/8' }}
                                                size="small"
                                                id="account"
                                                value={event.account ? event.account : ''}
                                                readOnly={true}
                                                disabled={true}
                                            />
                                        }
                                    </ListItem>
                                </>
                            )
                        })
                        :
                        <p style={{ marginTop: '3%' }}>目前無報名任何賽事，請至報名賽事頁面報名</p>
                    }
                    <Grid
                        container
                        justifyContent="center"
                        spacing={2}
                        sx={{mt: '2%'}}
                    >
                        { status && selectedSemester == SEMESTER ?
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

export default CompetitorStatus;
