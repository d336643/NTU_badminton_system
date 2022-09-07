import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import instance from '../instance';
import delay from '../utilities/delay';
import { EVENTENTRY } from '../utilities/entry'
import { useNavigate, useLocation } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';
import { set } from 'date-fns';

let counter = 0;
const createData = (eventId, uid, name, sid, account, status) => {
    counter += 1;
    return { id: counter, eventId: eventId, uid: uid, name: name, 
            sid: sid, account: account, status: status, checked: status === 3 ? true : false };
}

const columns = [
    { id: 'name', label: '姓名', minWidth: 140 },
    { id: 'sid', label: '學號', minWidth: 120 },
    { id: 'account', label: '匯款後五碼', minWidth: 150 },
    { id: 'status', label: '繳費狀態', minWidth: 60 },
];

const FormTable = () => {
    const navigate = useNavigate();
    const uid =  localStorage.getItem("uid");
    const token =  localStorage.getItem("token");
    const dataId = useLocation();
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [ rows, setRows ] = useState([]);
    const [ showrows, setShowrows ] = useState([]);
    const [ eventsToPay, setEventsToPay ] = useState([]);
    const [ eventsToUnpay, setEventsToUnpay ] = useState([]);
    const [ showmessage, setShowmessage ] = useState(false);
    const [ alertmessage, setAlertmessage ] = useState('Alert message');
    const [ severity, setSeverity ] = useState('error');
    const [ searched, setSearched ] = useState("");

    function handleChange(e) {
        setSearched(e.target.value);
        requestSearch(e.target.value);
    }

    const requestSearch = (searchedVal) => {
        setSearched(searchedVal);
        const filteredRows = rows.filter((row) => {
            // let competitorSid = row.sid;
            let competitorName = row.name;
            let search = searchedVal.toLowerCase();
            if (competitorName.includes(search))
                return row;
        });
        setShowrows(filteredRows);
    };

    const cancelSearch = async() => {
        setSearched("");
        requestSearch("");
    };

    async function closeAlert(){
        await delay(3);
        setShowmessage(false);
    }

    async function handleAlert(){
        await delay(1);
        setShowmessage(false);
        navigate('/');
    }

    const fetchData = async() => {
        console.log(dataId.state.data)
        const config = {
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }
        try {
            let res = await instance.get(`admin/users?typeId=${dataId.state.data}`, config);
            if(res.status === 200) {
                const newState = res.data.events.map((obj) => {
                        if (obj.competitors.length === 1) {
                            let comInfo = obj.competitors[0];
                            return createData(obj.eventId, comInfo.uid, comInfo.username, comInfo.sid, obj.account, obj.status);
                        }
                        else {
                            let comInfo1 = obj.competitors[0];
                            let comInfo2 = obj.competitors[1];
                            return createData(obj.eventId, `${comInfo1.uid},\n`+comInfo2.uid, `${comInfo1.username},\n`+comInfo2.username, `${comInfo1.sid},\n`+comInfo2.sid, obj.account, obj.status);
                        }
                });
                setRows(rows.concat(newState));
                setShowrows(showrows.concat(newState));
            }
        } catch (error) {
            console.log(error);
            // setBtnDisable(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    const handleCheckboxClick = (event, id, eventId , status) => {
        event.stopPropagation();
        // console.log(`event id: ${eventId}, checkbox select, status: ${status}`);
        const newState = rows.map(obj => {
            if (obj.id === id) {
                return { ...obj, checked: event.target.checked };
            }
            return obj;
        });
        setRows(newState);
        setShowrows(newState);
        // else console.log('Cannot change status.');
        if (event.target.checked === true) {
            const duplicat = eventsToUnpay.findIndex((element) => element === eventId);
            if (duplicat !== -1) setEventsToUnpay(eventsToUnpay.filter((_, i) => i !== duplicat))

            const result = eventsToPay.findIndex((element) => element === eventId);
            if (result === -1) setEventsToPay(eventsToPay.concat(eventId));
        }
        else {
            const duplicat = eventsToPay.findIndex((element) => element === eventId);
            if (duplicat !== -1) setEventsToPay(eventsToPay.filter((_, i) => i !== duplicat))

            const result = eventsToUnpay.findIndex((element) => element === eventId);
            if (result === -1) setEventsToUnpay(eventsToUnpay.concat(eventId));
        }
    };

    const handleStore = async() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'accept':'application/json'
            },
        };
        try {
            const res = await instance.post('/admin/pay', 
                {
                    verifier: uid,
                    eventsToPay: eventsToPay,
                    eventsToUnpay: eventsToUnpay
                }, config);
            console.log(res)
            if (res.status === 200) {
                setEventsToPay(eventsToPay.slice(0,0));
                setEventsToUnpay(eventsToUnpay.slice(0,0));
                setAlertmessage('儲存成功');
                setSeverity('success');
                setShowmessage(true);
                closeAlert();
            }
        } catch (error) {
            setAlertmessage(String(error).replace('Error: ', ''));
            setSeverity('error');
            setShowmessage(true);
            closeAlert();
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ alignItems: 'center' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: '5%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {showmessage && (
                        <Alert sx={{ position: 'fixed', top: '10%' }}
                                severity={severity}>
                            {alertmessage}
                        </Alert>
                    )}
                    <h3><b>{EVENTENTRY[Number(dataId.state.data)-1]}</b>{"報名、繳費狀態"}</h3>
                    <FormControl fullWidth sx={{ mt: '5%' }}>
                            {/* <InputLabel>搜尋參賽者姓名</InputLabel> */}
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={searched}
                                onChange={(v) => handleChange(v)}
                                startAdornment={
                                    <InputAdornment position="start"><SearchIcon /></InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <ClearIcon onClick={cancelSearch}/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="搜尋參賽者姓名"
                            />
                        </FormControl>
                    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
                        <TableContainer sx={{ maxHeight: 550 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {showrows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        column.id !== "status" ?
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value) : value}
                                                        </TableCell>
                                                        :
                                                        <Checkbox
                                                            // disable={value === 1 ? true : false}
                                                            checked={row.checked}
                                                            onChange={event => handleCheckboxClick(event, row.id, row.eventId, row.status)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                            color="success"
                                                        /> 
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                    <Grid
                        container
                        justifyContent="center"
                        spacing={2}
                        sx={{mt: '2%'}}
                    >
                        <Grid item>
                            <Button 
                                variant="contained"
                                onClick={handleStore}
                            >
                                儲存
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/applicantsummary')}
                            >
                                回到項目總覽
                            </Button>
                        </Grid> 
                    </Grid>
                    
                </Box>
            </Container>
        </>
    );
}

export default FormTable;