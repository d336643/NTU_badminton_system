import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import EntryTab from '../components/EntryTab';

const OutputAllGame = () => {
    return (
        // <>暫不開放</>
        <Container component="main" minWidth="xs" maxWidth="xl" sx={{ alignItems: 'center' }}>
            <EntryTab manageType={4}/>
        </Container>
        
    );
}

export default OutputAllGame;