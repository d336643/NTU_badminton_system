import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Autocomplete from '@mui/material/Autocomplete';

import InfoDialog from "./InfoDialog";
import instance from "../instance";

const LoginForm = () => {
    const myUid = Number(localStorage.getItem('uid'));
    const token = localStorage.getItem('token');
    const applier = myUid;
    const [typeID1, setTypeID1] = useState(null);
    const [typeID2, setTypeID2] = useState(null);
    // 1: Man Single, 2: Woman Single, 3: Men Double, 4: Women Double, 5: Mixed Double
    const [competitors1, setCompetitors1] = useState(null);
    const [competitors2, setCompetitors2] = useState(null);
    // const [events, setEvents] = useState([]);
    const [currentStudent, setCurrentStudent] = useState();
    const [success, setSuccess] = useState(true);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [open, setOpen] = useState(false);

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
                console.log(res);
                if (res.data.success === true){
                    console.log(res.data.data);
                    const users = res.data.data;
                    setCurrentStudent(users);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    // useEffect(() => {
    //     console.log(currentStudent);
    // }, [currentStudent])

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
            console.log(typeID1);
            console.log(typeID2);
            console.log(competitors1);
            console.log(competitors2);
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
                    else regEvent = regEvent.concat({typeId: typeID1, competitors: [myUid, competitors2]});
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
            console.log(res);
            if (res.status === 200){
                setAlertmessage("報名成功，即將為您導回首頁 !");
                setSuccess(true);
				setOpen(true);

            }
        } catch (error) {
            setAlertmessage("一人最多只能報名兩項比賽 !");
            setSuccess(true);
            setOpen(true);
        }
    }
    
    const entries = [
        { label: '男單', id: 1 }, { label: '女單', id: 2 },
        { label: '男雙', id: 3 }, { label: '女雙', id: 4 }, { label: '混雙', id: 5 },
    ]

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{height: "75vh"}}>
                <CssBaseline />
                <InfoDialog open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} />
                <List
                    sx={{
                        marginTop: '5%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <h3 style={{ marginBottom: '2%' }}>報名賽事</h3>
                    <p style={{ marginBottom: '5%' }}>報名賽事前，請確認已詳細閱讀<b>競賽章程</b></p>
                    <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/2' }} id="entry-1" primary="項目一" />
                        <Autocomplete 
                            size="small"
                            sx={{ gridColumn: '2/4' }}
                            // disablePortal
                            id="select-entry-1"
                            options={entries}
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
                                options={currentStudent}
                                getOptionLabel={(option) => option.sid}
                                isOptionEqualToValue={(option, value) => option.sid === value.sid}
                                onChange={(event, newValue, reason) => {
                                    setCompetitors1(reason === "clear" || reason === "removeOption" ? null : newValue.uid);
                                    
                                }}
                                renderInput={(params) => 
                                    <TextField {...params} 
                                        error={competitors1 === null ? true : false}
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
                            options={entries}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => 
                                <TextField {...params} 
                                    label="請選擇項目" 
                                    error={typeID1 === typeID2 && typeID1 !== null  ? true : false}
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
                                options={currentStudent}
                                getOptionLabel={(option) => option.sid}
                                isOptionEqualToValue={(option, value) => option.sid === value.sid}
                                onChange={(event, newValue, reason) => {
                                    setCompetitors2(reason === "clear" || reason === "removeOption" ? null : newValue.uid);
                                }}
                                renderInput={(params) => 
                                    <TextField {...params} 
                                        error={competitors2 === null ? true : false}
                                        helperText={competitors2 === null ? "請確認隊友已擁有帳號" : ""}
                                        label="隊友學號" 
                                    />
                                }
                            />
                        </ListItem>
                    }
                    <Button
                        // fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 3 }}
                        onClick={handleSubmit}
                    >
                        確認報名
                    </Button>
                </List>
            </Container>
        </>
    );
}

export default LoginForm;
