import React, { useState } from 'react'
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { red, green, blue } from '@mui/material/colors';

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '600px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '900px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '1200px',
  },
}));

const srcHTTP = ["https://drive.google.com/file/d/1MRSo66xyZNkKCxyizIsEcXcP0oAPs-TZ/preview", "https://drive.google.com/file/d/1_gzjUnC2uTlUQW20W4d3aOf134QYyE5n/preview",
  "https://drive.google.com/file/d/16pQ_P2tN_29yJ1fwsMs8YrIy3WO6bhld/preview", "https://drive.google.com/file/d/1JSmhcOGKoKM6Md7PTe2GtvHIe_8NbDai/preview",
  "https://drive.google.com/file/d/1DHdT1-MNKLbA-vAM6idXLmbjd8Lo1uGL/preview"]

function Tournament({ dataId }) {
  // const navigate = useNavigate();
  return (
    // <Root>
    <iframe src={srcHTTP[(dataId)]} width="100%" height="800" allow="autoplay" />
    // </Root>
  );
}

export default Tournament;
