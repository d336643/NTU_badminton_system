import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {alertmessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    知道了
                </Button>
            </DialogActions>
        </Dialog>
    );
}
