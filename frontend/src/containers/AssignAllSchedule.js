import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import EntryTab from '../components/EntryTab';

const AssignAllApplicant = () => {
    return (
        <Container component="main" minWidth="xs" maxWidth="sm" sx={{ justifyContent: 'center' }}>
            <EntryTab manageType={1}/>
        </Container>
    );
}

export default AssignAllApplicant;