import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/navbarComponents/Navbar'

const columns = [
    { id: 'name', label: '姓名', minWidth: 100 },
    { id: 'depart', label: '系級', minWidth: 100 },
    { id: 'code', label: '匯款後五碼', minWidth: 150 },
];

function createData(name, depart, code) {
    return { name, depart, code };
}

const rows = [
    {uid: 1, sid:"R10725032", name: "鄭亦辰"},
    {uid: 2, sid:"B11111111", name: "王大明"},
];

const FormTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            {/* <Navbar /> */}
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            // : typeof value === 'boolean'
                                                            //     ?   <Checkbox
                                                            //             checked={value}
                                                            //             onChange={handleChange}
                                                            //             inputProps={{ 'aria-label': 'controlled' }}
                                                            //         /> 
                                                                : value}
                                                    </TableCell>
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