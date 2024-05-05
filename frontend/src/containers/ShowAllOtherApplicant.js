import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import EntryTab from '../components/EntryTab';
import { EVENTENTRY } from '../utilities/entry'
import { useNavigate, useLocation } from 'react-router-dom';

const ShowAllApplicant = () => {
    return (
        <Container component="main" minWidth="xs" maxWidth="md" sx={{ alignItems: 'center', paddingBottom: '100px', paddingTop: '60px' }}>
            <EntryTab manageType={-1}/>
        </Container>
    );
}

export default ShowAllApplicant;