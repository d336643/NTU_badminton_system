import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Alert } from '@mui/material';

import delay from '../utilities/delay';


const AlertMessage = ( {setShowmessage, message, route, closeType} ) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('warning');

    async function closeAlert(){
        await delay(2);
        setOpen(false);
        setShowmessage(false);
    }

    async function handleAlert(){
        await delay(2);
        setOpen(false);
        setShowmessage(false);
        navigate(`${route}`);
    }

    useEffect(() => {
        if (closeType === 'close') {
            setSeverity('warning');
            setOpen(true);
            closeAlert();
        }
        else if (closeType === 'direct') {
            setSeverity('success');
            setOpen(true);
            handleAlert();
        }
    }, [])

    return (
        <>
            {open && (
                <Alert 
                    sx={{ 
                        position: "fixed", 
                        top: 0, 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        zIndex: 1500,  // Increased zIndex value
                        width: 'auto',
                        maxWidth: '90%' // Ensure it fits within the viewport
                    }} 
                    severity={alert.severity}
                >
                    {message}
                </Alert>
            )}
        </>
    )
}

export default AlertMessage;