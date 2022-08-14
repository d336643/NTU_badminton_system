import React, {useState} from 'react'
import { Container } from '@mui/material';

function ShowPdf() {

  return (
    <Container component="main" maxWidth="md" sx={{display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '80vh'}}>
        <h3 style={{ marginBottom: '4%', marginTop: "7%" }}>競賽章程</h3>
        <iframe src="https://drive.google.com/file/d/1S456OCXR7Uj0vBenoBU_8cGxA4Dh1Uim/preview" width="100%" height="520" allow="autoplay"></iframe>
    </Container>
  );
}

export default ShowPdf;
