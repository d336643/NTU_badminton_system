import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import EntryTab from '../components/EntryTab';
import Tournament8 from '../ScheduleGraph/Tournament8';
import Tournament16 from '../ScheduleGraph/Tournament16';
import Tournament32 from '../ScheduleGraph/Tournament32';
import Tournament64 from '../ScheduleGraph/Tournament64';
import instance from '../instance';

const ShowAllTournament = ({identity}) => {
    return (
        <Container component="main" minWidth="xs" maxWidth="xl" sx={{ alignItems: 'center' }}>
            {/* <Tournament64 /> */}
            <Tournament16 />
        </Container>
        
    );
}

export default ShowAllTournament;