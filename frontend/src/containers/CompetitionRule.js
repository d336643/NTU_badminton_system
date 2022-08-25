import React, {useState} from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function ShowPdf({isLogin}) {
    const navigate = useNavigate();
    return (
        <Container component="main" maxWidth="md" sx={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }} 
        >{/*minHeight: '80vh'*/}
            <h3 style={{ marginBottom: '5%', marginTop: "5%" }}>競賽章程</h3>
            <iframe src="https://drive.google.com/file/d/10PgZsDn5T3hyAqdabeMvyRLnvDE2APWk/preview" width="100%" height="520" allow="autoplay"></iframe>
            {isLogin ?
                <Button 
                    sx={{mt: '3%'}}
                    variant="contained"
                    onClick={() => navigate('/register')}
                >
                    前往報名
                </Button>
                : <></>
            }
        </Container>
    );
}

export default ShowPdf;
