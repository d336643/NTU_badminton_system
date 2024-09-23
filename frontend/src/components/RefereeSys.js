import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

import {
    Button,
    CssBaseline,
    TextField,
    Container,
    List,
    ListItem,
    ListItemText,
    Autocomplete,
    Alert,
    Box,
    Checkbox,
    FormControlLabel
} from '@mui/material';

import delay from '../utilities/delay';
import { EVENTTYPEENTRY, EVENTENTRY, DEGREECODE } from '../utilities/entry';
import { getDepartmentLabel } from '../utilities/getDepartment';

import { instance, getCommonConfig } from '../apiUtilities/instance';
import { SEMESTER } from "../utilities/globalVariable";

const Competitor = ({setView, handleLogOut}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [ typeIndex, setTypeIndex ] = useState(null);
    const [ typeId, setTypeId ] = useState(null);
    const [ roundDetail, setRoundDetail ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const [ showmessage, setShowmessage ] = useState(false);
    const [ alertmessage, setAlertmessage ] = useState('Alert message');
    const [ severity, setSeverity ] = useState('error');
    const [ checked1, setChecked1 ] = useState(false);
    const [ checked2, setChecked2 ] = useState(false);
    const [ values, setValues ] = useState({
        score1: '',
        score2: '',
    });

    async function closeAlert(){
        await delay(3);
        setShowmessage(false);
    }

    const handleChecked = (event, order) => {
        if (order === 1)
            setChecked1(event.target.checked);
        else
            setChecked2(event.target.checked)
    };

    const retrieveEvent = async() => {
        const config = {
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }
        try {
            const res = await instance.get(`/rounds/detail?typeId=${typeId}&typeIndex=${typeIndex}&semester=${SEMESTER}`, config);
            if (res.status === 200) {
                console.log(res.data.data);
                setRoundDetail(res.data.data);
                setValues({...values, score1: res.data.data.score1 === null ? '' : res.data.data.score1,
                    score2: res.data.data.score2 === null ? '' : res.data.data.score2,})
                setReady(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeId = (event, newValue, reason) => {
        setReady(false);
        setTypeId(reason === "clear" || reason === "removeOption" ? null : newValue.id);
    }

    const handleChangeScore = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // const handleClearClick = (order) => {
    //     if (order === 1) 
    //         setValues({ ...values, score1: "" });
    //     else
    //         setValues({ ...values, score2: "" });
    // }

    const handleChangeIndex = (e) => {
        setReady(false);
        setTypeIndex(e.target.value);
    }

    const handleSubmit = () => {
        const form = {
            typeId: typeId,
            typeIndex: typeIndex, 
            player1Score: values.score1 === "" ? checked1 ? -1 : null : values.score1,
            player2Score: values.score2 === "" ? checked2 ? -1 : null : values.score2,
        }
        submitForm(form);
    }
    const submitForm = async(form) => {
		const config = {
			headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'accept': 'application/json'
			}
		}
		try {
			let res = await instance.post('rounds/score', form, config)
			if(res.status === 200) {
                setAlertmessage('登錄成功，請至賽程圖查看分數');
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


    return (
        <Container component="main" maxWidth="sm" 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: '100px', 
                paddingTop: '60px'
            }}>
            <CssBaseline />
            {showmessage && (
                <Alert sx={{position: "absolute", top: 0, left: { xs: '22%', md: '40%' }, right: { xs: '22%', md: '40%' }, zIndex: 999 }}
                    severity={severity}>
                {alertmessage}
                </Alert>
            )}
            <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>裁判登分系統</h3>
            {/* <InfoDialog route={'/'} open={open} setOpen={setOpen} turnBack={success} alertmessage={alertmessage} /> */}
            <List
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                    <ListItemText sx={{ gridColumn: '1/2' }} id="gameType" primary="項目及場次" />
                    <Autocomplete 
                        size="small"
                        sx={{ gridColumn: '2/4', margin: '8px' }}
                        // disablePortal
                        id="gameType"
                        options={EVENTTYPEENTRY}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => 
                            <TextField {...params} 
                                label="請選擇項目" />}
                        onChange={(event, newValue, reason) => handleChangeId(event, newValue, reason)}
                    />
                    <TextField
                        sx={{ gridColumn: '4/6', margin: '8px' }}
                        size="small"
                        name="typeIndex"
                        id="typeIndex"
                        label="請輸入場次編號"
                        onChange={(v) => handleChangeIndex(v)}
                    />
                </ListItem>
                {
                    ready ?
                    typeId <= 2 ?
                        <Box 
                            minWidth='xs'
                            maxWidth='lg'
                            sx={{
                                borderRadius: '3px',
                                // border: '2px solid #00838f',
                                // padding: '20px',
                                marginTop: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <ListItem 
                                sx={{ display: 'grid', 
                                    gridAutoColumns: '1fr',
                                    justifyItems: 'center',
                                    alignItems: 'center'}}
                            >
                                <Box sx={{ gridColumn: '1/8' }}>
                                    {getDepartmentLabel(roundDetail.player1[0].departmentId)}{DEGREECODE[Number(roundDetail.player1[0].degreeId)-1]} 
                                    &nbsp;{roundDetail.player1[0].username}
                                </Box>
                                <TextField
                                    sx={{ gridColumn: '9/13'}}
                                    size="small"
                                    placeholder="0"
                                    disabled={checked1 ? true : false}
                                    value={values.score1}
                                    onChange={handleChangeScore('score1')}
                                />
                                <Box sx={{ gridColumn: '13/14'}}>：</Box>
                                <TextField
                                    sx={{ gridColumn: '14/18'}}
                                    size="small"
                                    placeholder="0"
                                    disabled={checked2 ? true : false}
                                    value={values.score2}
                                    onChange={handleChangeScore('score2')}
                                />
                                <Box sx={{ gridColumn: '19/26' }}>
                                    {getDepartmentLabel(roundDetail.player2[0].departmentId)}{DEGREECODE[Number(roundDetail.player2[0].degreeId)-1]} 
                                    &nbsp;{roundDetail.player2[0].username}
                                </Box>
                            </ListItem>
                            <ListItem 
                                sx={{ display: 'grid', 
                                    gridAutoColumns: '1fr',
                                    justifyItems: 'center',
                                    alignItems: 'center',
                                    marginTop: '-10px',}}
                            >
                                <FormControlLabel 
                                    sx={{gridColumn: '1/8' }} 
                                    disabled={values.score1 === "" ? false : true} 
                                    control={
                                        <Checkbox 
                                            checked={checked1}
                                            onChange={(event) => handleChecked(event, 1)}/>
                                    } 
                                    label="棄賽" 
                                />
                                <FormControlLabel 
                                    sx={{gridColumn: '19/26' }} 
                                    disabled={values.score2 === "" ? false : true} 
                                    control={
                                        <Checkbox 
                                            checked={checked2}
                                            onChange={(event) => handleChecked(event, 2)}/>
                                    } 
                                    label="棄賽" 
                                />
                            </ListItem>
                            <Button
                                // fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                                onClick={() => handleSubmit()}
                            >
                                確認登錄分數
                            </Button>
                        </Box>
                        :
                        <Box 
                            minWidth='xs'
                            maxWidth='lg'
                            sx={{
                                borderRadius: '3px',
                                // border: '2px solid #00838f',
                                // padding: '20px',
                                marginTop: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <ListItem 
                                sx={{ display: 'grid', 
                                    gridAutoColumns: '1fr',
                                    justifyItems: 'center',
                                    alignItems: 'center'}}
                            >
                                <Box sx={{ gridColumn: '1/8' }}>
                                    {getDepartmentLabel(roundDetail.player1[0].departmentId)}{DEGREECODE[Number(roundDetail.player1[0].degreeId)-1]} 
                                    &nbsp;{roundDetail.player1[0].username}
                                    <br/>
                                    {getDepartmentLabel(roundDetail.player1[1].departmentId)}{DEGREECODE[Number(roundDetail.player1[1].degreeId)-1]} 
                                    &nbsp;{roundDetail.player1[1].username}
                                </Box>
                                <TextField
                                    sx={{ gridColumn: '9/13'}}
                                    size="small"
                                    placeholder="0"
                                    disabled={checked1 ? true : false}
                                    value={values.score1}
                                    onChange={handleChangeScore('score1')}
                                />
                                <Box sx={{ gridColumn: '13/14'}}>：</Box>
                                <TextField
                                    sx={{ gridColumn: '14/18'}}
                                    size="small"
                                    placeholder="0"
                                    disabled={checked2 ? true : false}
                                    value={values.score2}
                                    onChange={handleChangeScore('score2')}
                                    // InputProps={{
                                    //     endAdornment: (
                                    //     <IconButton
                                    //         size="small"
                                    //         sx={{ visibility: values.score2 ? "visible" : "hidden" }}
                                    //         onClick={() => handleClearClick(2)}
                                    //     >
                                    //         <ClearIcon />
                                    //         </IconButton>
                                    //     ),
                                    // }}
                                />
                                <Box sx={{ gridColumn: '19/26' }}>
                                    {getDepartmentLabel(roundDetail.player2[0].departmentId)}{DEGREECODE[Number(roundDetail.player2[0].degreeId)-1]} 
                                    &nbsp;{roundDetail.player2[0].username}
                                    <br />
                                    {getDepartmentLabel(roundDetail.player2[1].departmentId)}{DEGREECODE[Number(roundDetail.player2[1].degreeId)-1]} 
                                    &nbsp;{roundDetail.player2[1].username}
                                </Box>
                            </ListItem>
                            <ListItem 
                                sx={{ display: 'grid', 
                                    gridAutoColumns: '1fr',
                                    justifyItems: 'center',
                                    alignItems: 'center',
                                    marginTop: '-10px',}}
                            >
                                <FormControlLabel 
                                    sx={{gridColumn: '1/8' }} 
                                    disabled={values.score1 === "" ? false : true} 
                                    control={
                                        <Checkbox 
                                            checked={checked1}
                                            onChange={(event) => handleChecked(event, 1)}/>
                                    } 
                                    label="棄賽" 
                                />
                                <FormControlLabel 
                                    sx={{gridColumn: '19/26' }} 
                                    disabled={values.score2 === "" ? false : true} 
                                    control={
                                        <Checkbox 
                                            checked={checked2}
                                            onChange={(event) => handleChecked(event, 2)}/>
                                    } 
                                    label="棄賽" 
                                />
                            </ListItem>
                            <Button
                                // fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                                onClick={() => handleSubmit()}
                            >
                                確認登錄分數
                            </Button>
                        </Box>
                    : 
                    <Button 
                        sx={{ mt: 2, mb: 2 }}
                        variant="contained"
                        onClick={() => retrieveEvent()}
                    >
                        確認項目及場次
                    </Button>
                }
            </List>
        </Container>
    )
}

export default Competitor;
