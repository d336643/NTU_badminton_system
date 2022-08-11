import { useEffect, useState } from 'react';
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
import Navbar from './Navbar'

import instance from '../instance';
import { useLocation } from 'react-router-dom';

let counter = 0;
const createData = (eventId, uid, name, sid, account, status) => {
    counter += 1;
    return { id: counter, eventId: eventId, uid: uid, name: name, 
            sid: sid, account: account, status: status, checked: status === 3 ? true : false };
}

const columns = [
    { id: 'name', label: '姓名', minWidth: 100 },
    { id: 'sid', label: '學號', minWidth: 120 },
    { id: 'account', label: '匯款後五碼', minWidth: 150 },
    { id: 'status', label: '繳費狀態', minWidth: 60 },
];

const FormTable = () => {
    const token =  localStorage.getItem("token");
    const dataId = useLocation();
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [ rows, setRows ] = useState([
        createData(13, 1, "鄭亦辰", "R10725032", "12345", 3),
        createData(21, 2, "劉智心", "B09705024", "52496", 2),
        createData(10, 3, "王大明", "B09705003", "78415", 2),
        createData(1, 4, "王帥哥", "B10456333", "85668", 2),
        createData(2, 5, "王美女", "R10725001", "", 1),
        createData(3, 6, "GG", "R10725002", "", 1),
    ]);
    
    const [ dataSource, setDataSource ] = useState([]);
    // const [ rows, setRows ] = useState([]);

    const fetchData = async() => {
        const config = {
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }
        try {
            let res = await instance.get(`admin/users?typeId=${dataId.state.data}`, {typeId: [dataId.state.data]}, config);
            console.log(res.data);
            if(res.status === 202) {
                console.log("Success");
                setDataSource(dataSource.concat(res.events));
            }
        } catch (error) {
            console.log(error);
            // setBtnDisable(false);
        }
    }

    useEffect(() => {
        console.log(dataId);
        fetchData();
    }, [])

    // useEffect(() => {
    //     if(dataSource.length > 0) {
    //         let filterData = dataSource.map((event) =>{
    //             return {
    //                 competitors: event.competitors,
    //                 status: event.status,
    //                 account: event.account,
    //             }
    //         });
    //         setRows(filterData);
    //     }
        
    // }, [dataSource])
    const handleCheckboxClick = (event, id, eventId , status) => {
        event.stopPropagation();
        console.log(`event id: ${eventId}, checkbox select, status: ${status}`);
        if (status === 2 || status === 3) {
            const newState = rows.map(obj => {
                if (obj.id === id) {
                    return { ...obj, checked: event.target.checked };
                }
                return obj;
            });
            setRows(newState);
            console.log(`Changed status: ${event.target.checked}`);
        }
        else console.log('Cannot change status.');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Paper sx={{ width: '100%', overflow: 'hidden', mt: '5%' }}>
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
                                {rows
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
                                                        disable={value === 1 ? true : false}
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
            </Container>
        </>
    );
}

export default FormTable;