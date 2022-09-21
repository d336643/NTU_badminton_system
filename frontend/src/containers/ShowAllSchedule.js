import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import EntryTab from '../components/EntryTab';
import instance from '../instance';

const ShowAllApplicant = ({identity}) => {
    return (
        // <>暫不開放</>
        <Container component="main" minWidth="xs" maxWidth="xl" sx={{ alignItems: 'center' }}>
            <EntryTab manageType={3} identity={identity}/>
        </Container>
        
    );
}

export default ShowAllApplicant;