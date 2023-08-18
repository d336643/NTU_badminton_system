import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import EntryTab from '../components/EntryTab';

import { instance, getCommonConfig } from '../apiUtilities/instance';

const EditAllSchedule = () => {
    return (
        // <>暫不開放</>
        <Container component="main" minWidth="xs" maxWidth="lg" sx={{ alignItems: 'center' }}>
            <EntryTab manageType={2}/>
        </Container>
    )
}

export default EditAllSchedule;