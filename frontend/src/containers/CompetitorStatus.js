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
import Navbar from '../components/navbarComponents/Navbar';
import { useParams, useNavigate } from "react-router-dom";

const Reset = () => {
    const navigate = useNavigate();
    const { uid } = useParams();
    const [values, setValues] = useState({
        name: localStorage.getItem("name"),
        sid: localStorage.getItem("sid"),
        degreeID: localStorage.getItem("degreeID"),
        departmentID: localStorage.getItem("departmentID"),
    });
    const [events, setEvents] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const eventStatus = ["未繳費(已報名)", "審核中", "審核通過，已繳費"]
    const eventEntry = ["男單", "女單", "男雙", "女雙", "混雙"]

    // useEffect(async () => {
    //     try {
    //         let res = await instance.get(`events/status?${uid}`, {
    //             uid: uid
    //         });
    //         console.log("status", res.status);
    //         setEvents([...events, res.events]);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [])

    const handleStore = (event) => {
        console.log('Received values for reset password: ', event);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
        });
        // navigate("/");
    };

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="xs">
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
                        <p style={{ gridColumn: '4/8' }}>
                            {values.name}
                        </p>
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="學號" />
                        <p style={{ gridColumn: '4/8' }}>
                            {values.sid}
                        </p>
                    </ListItem>
                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/3' }} id="dgreeID-item" primary="系級" />
                        <p style={{ gridColumn: '4/8' }}>
                            {values.departmentID}{values.degreeID}
                        </p>
                    </ListItem>
                    { events.length > 0 ?
                        events.map((event) => {
                            return (
                                <>
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="報名及繳費狀態" />
                                        <p style={{ gridColumn: '4/8' }}>
                                            {eventStatus[event.status-1]}
                                        </p>
                                    </ListItem>
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="報名項目" />
                                        <p style={{ gridColumn: '4/8' }}>
                                            {eventEntry[event.typeID-1]}
                                        </p>
                                    </ListItem>
                                    <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                        <ListItemText sx={{ gridColumn: '1/3' }} id="sid-item" primary="匯款後五碼" />
                                        {event.account === "" ? 
                                            <TextField
                                                sx={{ gridColumn: '4/8' }}
                                                size="small"
                                                id="account"
                                                label="輸入匯款後五碼"
                                                name="account"
                                                onChange={(e) => setAccounts([...accounts, e.target.value])}
                                            />
                                            :
                                            <p style={{ gridColumn: '4/8' }}>
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
                    >
                        { events.length > 0 ?
                            <Grid item>
                                <Button 
                                    variant="outlined"
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