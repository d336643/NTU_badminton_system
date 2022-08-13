import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from "react-router-dom";

export default function InfoDialog({open, setOpen, turnBack, alertmessage}) {
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
        if (turnBack) navigate('/');
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle style={{placeItems: 'center'}}>{<InfoIcon />}</DialogTitle>
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
