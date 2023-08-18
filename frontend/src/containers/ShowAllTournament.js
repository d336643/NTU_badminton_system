import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import EntryTab from '../components/EntryTab';
import Tournament16 from '../scheduleGraph/Tournament16';
import Tournament64 from '../scheduleGraph/Tournament64';

import { instance, getCommonConfig } from '../apiUtilities/instance';

const ShowAllTournament = ({identity}) => {
    return (
        <Container component="main" minWidth="xs" maxWidth="xl" sx={{ alignItems: 'center' }}>
            <Tournament64 />
            <Tournament16 />
        </Container>
        
    );
}

export default ShowAllTournament;