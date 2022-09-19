import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import EntryTab from '../components/EntryTab';
import instance from '../instance';

const ShowAllApplicant = () => {
    return (
        // <>暫不開放</>
        <Container component="main" minWidth="xs" maxWidth="lg" sx={{ alignItems: 'center' }}>
            <EntryTab manageType={3}/>
        </Container>
        
    );
}

export default ShowAllApplicant;