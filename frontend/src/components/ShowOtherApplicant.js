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
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import instance from '../instance';
import { useNavigate, useLocation } from 'react-router-dom';

let counter = 0;
const createData = (registrationId, eventId, uid, name, sid, account, status) => {
    counter += 1;
    return { id: counter, registrationId: registrationId, eventId: eventId, uid: uid, name: name, 
            sid: sid, account: account === "NULL" ? "" : account, status: status, checked: status === 3 ? true : false };
}

const columns = [
    { id: 'registrationId', label: '序號', minWidth: 70},
    { id: 'name', label: '姓名', minWidth: 110 },
    { id: 'sid', label: '學號', minWidth: 110 },
    // { id: 'account', label: '匯款後五碼', minWidth: 120 },
    { id: 'status', label: '繳費狀態', minWidth: 70 },
];

const FormTable = ({dataId}) => {
    const navigate = useNavigate();
    const uid =  localStorage.getItem("uid");
    const token =  localStorage.getItem("token");
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);
    const [ rows, setRows ] = useState([]);
    const [ showrows, setShowrows ] = useState([]);
    const [ searched, setSearched ] = useState("");

    const handleChange = (e) => {
        setSearched(e.target.value);
        requestSearch(e.target.value);
    }

    const requestSearch = (searchedVal) => {
        setSearched(searchedVal);
        const filteredRows = rows.filter((row) => {
            let competitorName = row.name.toLowerCase();
            let competitorOrder = Number(row.registrationId);
            let search = searchedVal.toLowerCase();
            if (competitorName.includes(search) || competitorOrder === Number(search))
                return row;
        });
        setShowrows(filteredRows);
    };

    const cancelSearch = async() => {
        setSearched("");
        requestSearch("");
    };

    const fetchData = async() => {
        // console.log(dataId.state.data)
        const config = {
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }
        try {
            let res = await instance.get(`admin/users?typeId=${dataId+1}&semester='112-2'`, config); //&semester='112-2'
            if(res.status === 200) {
                const newState = res.data.events.map((obj) => {
                        if (obj.competitors.length === 1) {
                            let comInfo = obj.competitors[0];
                            return createData(obj.registrationId, obj.eventId, comInfo.uid, comInfo.username, comInfo.sid, obj.account, obj.status);
                        }
                        else {
                            let comInfo1 = obj.competitors[0];
                            let comInfo2 = obj.competitors[1];
                            return createData(obj.registrationId, obj.eventId, `${comInfo1.uid},\n${comInfo2.uid}`, `${comInfo1.username},\n${comInfo2.username}`, `${comInfo1.sid},\n${comInfo2.sid}`, obj.account, obj.status);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <>
            <CssBaseline />
            <FormControl fullWidth sx={{mt: '20px'}}>
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
                    placeholder="搜尋參賽者姓名或序號"
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
                                                    disabled={true}
                                                    checked={row.checked}
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
                        variant="outlined"
                        onClick={() => navigate('/')}
                    >
                        返回主頁面
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default FormTable;