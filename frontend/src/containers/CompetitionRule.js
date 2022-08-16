import React, {useState} from 'react'
import { Container } from '@mui/material';

function ShowPdf() {

  return (
    <Container component="main" maxWidth="md" sx={{display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '80vh'}}>
        <h3 style={{ marginBottom: '5%', marginTop: "5%" }}>競賽章程</h3>
        <iframe src="https://drive.google.com/file/d/10PgZsDn5T3hyAqdabeMvyRLnvDE2APWk/preview" width="100%" height="520" allow="autoplay"></iframe>
    </Container>
  );
}

export default ShowPdf;
