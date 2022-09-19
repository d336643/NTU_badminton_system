import React, { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import delay from '../utilities/delay';
import { useNavigate } from "react-router-dom";

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
                    severity={severity}>
                    {message}
                </Alert>
            )}
        </>
    )
}

export default AlertMessage;