
import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

import { 
    Container,
    Button,
 } from '@mui/material';

// GroupCompeteId: 1. 三取一 2. 三取二 3. 四取一 4. 四取二
// Square: 1(上),2(下),3(左),4(右)
// Triangle: 1(左上),2(右上),3(下)

const ScheduleTime = () => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xl"
            sx={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }} >
            <h3 style={{ marginBottom: '20px' }}>總賽程時間表</h3>
            <iframe src="https://drive.google.com/file/d/1N-zSup-bS1rbT1RVvwojNrT61PoogW7f/preview" width="100%" height="600" allow="autoplay"></iframe>
            {/* <iframe 
                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQmqAR_6d89nqsUCLZwtcIznBbonOcViHDDwfTT8N1qYrGLHTBJJZhl9C8Z6p7idlsWpXCzx0v3zVpZ/pubhtml?gid=0&single=true&fbclid=IwAR2mTwx1jflUdZOogngNoYlOXa81aseYq33FoPXJ2sQ56iBCHHzk0mjCtF4"
                width="100%" height="600" allow="autoplay"></iframe> */}
            {/* <Alert severity="info">
                請點擊連結檢視賽程時間表：
                <a href='https://docs.google.com/spreadsheets/d/16A1yWrpMZHImSMxQFAORB39GKFu4q5pF8tcaUwSag54/edit?fbclid=IwAR0_K_Bb6agwp1w0F3uPiAu4DwwqcsLzdTf7EePzsoFB5k7TM10TPhO8HI0#gid=0'
                    target="_blank">
                    新生盃賽程時間場地表
                </a>
            </Alert> */}
            <Button 
                sx={{mt: '20px'}}
                variant="outlined"
                onClick={() => navigate('/schedulehome')}
            >
                返回賽程專區
            </Button>
        </Container>
    )
}

export default ScheduleTime;
