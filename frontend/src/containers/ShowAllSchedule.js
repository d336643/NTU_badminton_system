import React, { useEffect, useState } from 'react';

import { 
    Container,
} from '@mui/material';

import EntryTab from '../components/EntryTab';

import { instance, getCommonConfig } from '../apiUtilities/instance';

const ShowAllSchedule = ({identity}) => {
    return (
        // <>暫不開放</>
        <Container component="main" minWidth="xs" maxWidth="xl" sx={{ alignItems: 'center', paddingBottom: '100px', paddingTop: '60px' }}>
            <EntryTab manageType={3} identity={identity}/>
        </Container>
        
    );
}

export default ShowAllSchedule;