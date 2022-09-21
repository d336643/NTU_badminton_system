import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InfoDialog from "./InfoDialog";
import instance from "../instance";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { EVENTTYPEENTRY, EVENTENTRY } from '../utilities/entry';
const boxStyled = {
    borderRadius: '25px',
    border: '2px solid #b39ddb',
    padding: '20px',
    // width: '200px',
    // height: '150px',
}

const Competitor = ({setView, handleLogOut}) => {
    const navigate = useNavigate();
    const [typeIndex, setTypeIndex] = useState(null);
    const [typeID, setTypeID] = useState(null);
    const [success, setSuccess] = useState(true);
    const [alertmessage, setAlertmessage] = useState('Alert message');
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        console.log(`typeID: ${typeID}, typeIndex: ${typeIndex}`)
    }

    const handleChange = (e) => {
        setTypeIndex(e.target.value);
    }

    return (
        <>暫不開放</>
        // <Container component="main" maxWidth="sm">
        //     <CssBaseline />
        //     <InfoDialog route={'/'} open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} />
        //     <List
        //         sx={{
        //             marginTop: '20px',
        //             display: 'flex',
        //             flexDirection: 'column',
        //             alignItems: 'center',
        //         }}
        //     >
        //         <h3 style={{ marginBottom: '2-px' }}>裁判登分系統</h3>
        //         <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
        //             <ListItemText sx={{ gridColumn: '1/2' }} id="gameType" primary="項目及場次" />
        //             <Autocomplete 
        //                 size="small"
        //                 sx={{ gridColumn: '2/4', margin: '8px' }}
        //                 // disablePortal
        //                 id="gameType"
        //                 options={EVENTTYPEENTRY}
        //                 getOptionLabel={(option) => option.label}
        //                 isOptionEqualToValue={(option, value) => option.id === value.id}
        //                 renderInput={(params) => 
        //                     <TextField {...params} 
        //                         label="請選擇項目" />}
        //                 onChange={(event, newValue, reason) => {
        //                     setTypeID(reason === "clear" || reason === "removeOption" ? null : newValue.id);
        //                 }}
        //             />
        //             <TextField
        //                 sx={{ gridColumn: '4/6', margin: '8px' }}
        //                 size="small"
        //                 name="typeIndex"
        //                 id="typeIndex"
        //                 label="請輸入場次編號"
        //                 onChange={(v) => handleChange(v)}
        //             />
        //         </ListItem>
        //         {
        //             typeIndex === null ? <></>
        //             :
        //             <Box 
        //                 minWidth='xs'
        //                 maxWidth='sm'
        //                 sx={{
        //                     borderRadius: '25px',
        //                     border: '2px solid #b39ddb',
        //                     padding: '10px',
        //                 }}
        //             >
        //                 <p>{EVENTENTRY[Number(typeID)-1]} {typeIndex}</p>
        //             </Box>
        //         }
        //         <Button
        //             // fullWidth
        //             variant="contained"
        //             sx={{ mt: 3, mb: 3 }}
        //             onClick={handleSubmit}
        //         >
        //             確認登錄分數
        //         </Button>
        //     </List>
        // </Container>
    )
}

export default Competitor;
