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
import Navbar from './Navbar'
import { useParams, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const { myUid } = useParams();
    const [typeID1, setTypeID1] = useState(null);
    const [typeID2, setTypeID2] = useState(null);
    const [typeID3, setTypeID3] = useState(null);
    // 1: Man Single, 2: Woman Single, 3: Men Double, 4: Women Double, 5: Mixed Double
    const [competitors1, setCompetitors1] = useState(null);
    const [competitors2, setCompetitors2] = useState(null);
    // const [form, setForm] = useState({
    //     applier: myUid,
    //     event: [],
    // })
    const [event, setEvent] = useState([]);

    const countGame = () => {
        let cnt = 0;
        if (typeID1 !== null) cnt += 1;
        if (typeID2 !== null) cnt += 1;
        if (typeID3 !== null) cnt += 1;
        console.log(cnt)
        return cnt;
    };

    const handleSubmit = () => {
        if (typeID1 !== null && typeID2 !== null && typeID3 !== null) {
            console.log("Invalid")
        }
        else {
            console.log(typeID1);
            console.log(typeID2);
            console.log(competitors1);
            if (typeID1 != null) {
                setEvent([...event, {typeID: typeID1, competitors: [myUid]}])
            }
            console.log(event)
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

    const soloEntry = [{ label: '男單', id: 1 }, { label: '女單', id: 2 }]
    const doubleEntry = [{ label: '男雙', id: 3 }, { label: '女雙', id: 4 }, { label: '混雙', id: 5 }]
    const currentStudent = [{label: 'R10725032', uid: 1}, { label: 'B09705024', uid: 2 },]

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Alert severity='warning' >每人至多可報名兩項</Alert>
                    <Box
                        component={Container} 
                        sx={{
                            mt: '3%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            // margin: '3%'
                        }}
                    >
                        <h2 style={{marginBottom: '5%'}}>
                            單打
                        </h2>
                        <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                            <ListItemText sx={{ gridColumn: '1/2' }} id="solo-entry" primary="項目" />
                            <Autocomplete 
                                size="small"
                                sx={{ gridColumn: '3/6' }}
                                // disablePortal
                                id="select-solo"
                                options={soloEntry}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField {...params} label="請選擇項目" />}
                                onChange={(event, newValue, reason) => {
                                    setTypeID1(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                                }}
                                // inputProps={{ ...inputProps, readOnly: typeID1 === null && countGame >= 2? true : false }}
                            />
                        </ListItem>
                    </Box>
                    <Divider sx={{width:'90%', bgcolor: 'secondary', mt: '3%'}} />
                    <Box
                        component={Container} 
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '3%'
                        }}
                    >
                        <h2 style={{marginBottom: '5%'}}>
                            雙打
                        </h2>
                        <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                            <ListItemText sx={{ gridColumn: '1/2' }} id="double-entry-1" primary="項目一" />
                            <Autocomplete 
                                size="small"
                                sx={{ gridColumn: '3/6' }}
                                // disablePortal
                                id="select-double-1"
                                options={doubleEntry}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                                renderInput={(params) => <TextField {...params} label="請選擇項目" />}
                                onChange={(event, newValue, reason) => {
                                    setTypeID2(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                                }}
                                // inputProps={{ ...inputProps, readOnly: typeID2 === null && countGame >= 2? true : false }}
                            />
                        </ListItem>
                        <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                            <ListItemText sx={{ gridColumn: '1/2' }} id="sid-reg1" primary="" />
                            <Autocomplete 
                                size="small"
                                sx={{ gridColumn: '3/6' }}
                                // disablePortal
                                id="select-sid-reg1"
                                options={currentStudent}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                                renderInput={(params) => <TextField {...params} label="項目一隊友學號" />}
                                onChange={(event, newValue, reason) => {
                                    setCompetitors1(reason === "clear" || reason === "removeOption" ? null : newValue.uid);
                                }}
                            />
                        </ListItem>
                        <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr', mt: '2%'}}>
                            <ListItemText sx={{ gridColumn: '1/2' }} id="double-entry-2" primary="項目二" />
                            <Autocomplete 
                                size="small"
                                sx={{ gridColumn: '3/6' }}
                                // disablePortal
                                id="select-double-2"
                                options={doubleEntry}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                                renderInput={(params) => <TextField {...params} label="請選擇項目" />}
                                onChange={(event, newValue, reason) => {
                                    setTypeID3(reason === "clear" || reason === "removeOption" ? null : newValue.id);
                                }}
                                // inputProps={{ ...inputProps, readOnly: typeID3 === null && countGame >= 2? true : false }}
                            />
                        </ListItem>
                        <ListItem style={{ display: 'grid', gridAutoColumns: '1fr'}}>
                        <ListItemText sx={{ gridColumn: '1/2' }} id="sid-reg2" primary="" />
                            <Autocomplete 
                                size="small"
                                sx={{ gridColumn: '3/6' }}
                                // disablePortal
                                id="select-sid-reg2"
                                options={currentStudent}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                                renderInput={(params) => <TextField {...params} label="項目二隊友學號" />}
                                onChange={(event, newValue, reason) => {
                                    setCompetitors2(reason === "clear" || reason === "removeOption" ? null : newValue.uid);
                                }}
                            />
                        </ListItem>
                    </Box>
                    <Box
                        component={Container} 
                        sx={{
                            alignItems: 'center',
                            margin: '3%'
                        }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            確認報名
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default LoginForm;
