import React, { useState } from 'react'
import { Container, Button, CssBaseline} from '@mui/material/';
import { useNavigate } from "react-router-dom";
import { RULE_LINK } from '../utilities/globalVariable';


function ShowPdf() {
    const navigate = useNavigate();
    return (
        <Container component="main" maxWidth="md" 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: '100px', 
                paddingTop: '60px'
            }} 
        >
            <CssBaseline />
            <h3 style={{ marginBottom: '20px', marginTop: "20px" }}>競賽章程</h3>
            
            <iframe src={RULE_LINK} width="100%" height="720" allow="autoplay"></iframe>
            <Button 
                sx={{mt: '20px'}}
                variant="outlined"
                onClick={() => navigate('/')}
            >
                返回主頁面
            </Button>
        </Container>
    );
}

export default ShowPdf;
