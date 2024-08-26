import React, { useEffect, useState } from 'react';

import { 
    Container,
    CssBaseline,
} from '@mui/material';

import EntryTab from '../components/EntryTab';

const ShowAllSchedule = ({view}) => {
    return (
        // <>暫不開放</>
        <Container component="main" minWidth="xs" maxWidth="xl" sx={{ alignItems: 'center', paddingBottom: '100px', paddingTop: '60px' }}>
            <CssBaseline />
            <EntryTab manageType={3} view={view}/>
        </Container>
        
    );
}

export default ShowAllSchedule;