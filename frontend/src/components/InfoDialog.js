import React from 'react';

import { useNavigate } from "react-router-dom";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent
} from '@mui/material';

export default function InfoDialog({route, open, setOpen, turnBack, alertmessage}) {
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
        if (turnBack) navigate(`${route}`);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            minWidth="xs"
            sx={{zIndex: 1500}}
        >
            <DialogContent>
                {alertmessage}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    確定
                </Button>
            </DialogActions>
        </Dialog>
    );
}
