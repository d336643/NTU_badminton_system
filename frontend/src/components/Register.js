import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Autocomplete from '@mui/material/Autocomplete';
import instance from "../instance";
import Navbar from './navbarComponents/Navbar'
import { useParams, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const { myUid } = useParams();
    const [typeID1, setTypeID1] = useState(null);
    const [typeID2, setTypeID2] = useState(null);
    // 1: Man Single, 2: Woman Single, 3: Men Double, 4: Women Double, 5: Mixed Double
    const [competitors1, setCompetitors1] = useState(null);
    const [competitors2, setCompetitors2] = useState(null);
    const [applier, setApplier] = useState(myUid);
    const [events, setEvents] = useState([]);

    const handleSubmit = () => {
        if (typeID1 === null && typeID2 === null) {
            console.log("Please select at least one game.")
        }
        else {
            console.log(typeID1);
            console.log(typeID2);
            console.log(competitors1);
            console.log(competitors2);
            if (typeID1 !== null) {
                if (typeID1 === 1 || typeID1 === 2) {
                    setEvents([...events, {typeID: typeID1, competitors: [myUid]}]);
                }
                else {
                    setEvents([...events, {typeID: typeID1, competitors: [myUid, competitors1]}]);
                } 
            }
            if (typeID2 !== null) {
                if (typeID2 === 1 || typeID2 === 2) {
                    setEvents([...events, {typeID: typeID2, competitors: [myUid]}]);
                }
                else {
                    setEvents([...events, {typeID: typeID2, competitors: [myUid, competitors2]}]);
                } 
            }
            let form = {
                applier: applier,
                events: events,
            }
            console.log(form);
        }
            
            // if (typeID2 != null) {
            //     formData.append("event", {typeID: typeID2, competitors: [myUid, competitors1]});
            // }
            // if (typeID3 != null) {
            //     formData.append("event", {typeID: typeID3, competitors: [myUid, competitors2]});
            // }
            // formData.append("event", register);
            // console.log(form);
    };

    const entries = [
        { label: '男單', id: 1 }, { label: '女單', id: 2 },
        { label: '男雙', id: 3 }, { label: '女雙', id: 4 }, { label: '混雙', id: 5 },
    ]
    const currentStudent = [{label: 'R10725032', uid: 1}, { label: 'B09705024', uid: 2 },]

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
                >
                    <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/2' }} id="entry-1" primary="項目一" />
                        <Autocomplete 
                            size="small"
                            sx={{ gridColumn: '3/6' }}
                            // disablePortal
                            id="select-entry-1"
                            options={entries}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="請選擇項目" />}
                            onChange={(event, newValue, reason) => {
                                setTypeID1(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                            }}
                            // inputProps={{ ...inputProps, readOnly: typeID1 === null && countGame >= 2? true : false }}
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
                                sx={{ gridColumn: '3/6' }}
                                // disablePortal
                                id="select-sid-1"
                                options={currentStudent}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
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
                            sx={{ gridColumn: '3/6' }}
                            // disablePortal
                            id="select-entry-2"
                            options={entries}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="請選擇項目" />}
                            onChange={(event, newValue, reason) => {
                                setTypeID2(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                            }}
                            // inputProps={{ ...inputProps, readOnly: typeID1 === null && countGame >= 2? true : false }}
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
                                sx={{ gridColumn: '3/6' }}
                                // disablePortal
                                id="select-sid-2"
                                options={currentStudent}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
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
                        fullWidth
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
