import React, {useState} from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function ShowPdf({isLogin}) {
    const navigate = useNavigate();
    return (
        <Container component="main" maxWidth="md" 
            sx={{display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }} 
        >{/*minHeight: '80vh'*/}
            <h3 style={{ marginBottom: '20px', marginTop: "20px" }}>競賽章程</h3>
            <iframe src="https://drive.google.com/file/d/1r648YPp1H4Y8TmrE2WcZ7p2ZSEuXxKdf/preview" width="100%" height="720" allow="autoplay"></iframe>
            {isLogin ?
                // <Button 
                //     sx={{mt: '3%'}}
                //     variant="contained"
                //     onClick={() => navigate('/register')}
                // >
                //     前往報名
                // </Button>
                <Button 
                    sx={{mt: '20px'}}
                    variant="outlined"
                    onClick={() => navigate('/')}
                >
                    返回主頁面
                </Button>
                : <></>
            }
        </Container>
    );
}

export default ShowPdf;
