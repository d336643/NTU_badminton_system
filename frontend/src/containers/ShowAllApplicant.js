import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import {
    Container,
} from '@mui/material';

import EntryTab from '../components/EntryTab';

const ShowAllApplicant = () => {
    return (
        <Container component="main" minWidth="xs" maxWidth="md" sx={{ alignItems: 'center', paddingBottom: '100px', paddingTop: '60px' }}>
            <EntryTab manageType={0}/>
        </Container>
    );
}

export default ShowAllApplicant;