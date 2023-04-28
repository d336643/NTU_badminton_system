import React, { useState } from 'react'
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { red, green, blue } from '@mui/material/colors';
import '../style/tournament.css';
import Tournament8 from './Tournament8';
import Tournament16 from './Tournament16';
import Tournament32 from './Tournament32';
import Tournament64 from './Tournament64';

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
const Tourn = ["https://docs.google.com/spreadsheets/d/e/2PACX-1vR4NjmP1pW-qMNjDdXgFRc5CWE-9WRnigM_Fmlgw0jK9_QZmOMah2JsCdhc9xzSnA/pubhtml?gid=12185339&amp;single=true&amp;widget=true&amp;headers=false",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4NjmP1pW-qMNjDdXgFRc5CWE-9WRnigM_Fmlgw0jK9_QZmOMah2JsCdhc9xzSnA/pubhtml?gid=98088029&amp;single=true&amp;widget=true&amp;headers=false",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4NjmP1pW-qMNjDdXgFRc5CWE-9WRnigM_Fmlgw0jK9_QZmOMah2JsCdhc9xzSnA/pubhtml?gid=140111521&amp;single=true&amp;widget=true&amp;headers=false",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4NjmP1pW-qMNjDdXgFRc5CWE-9WRnigM_Fmlgw0jK9_QZmOMah2JsCdhc9xzSnA/pubhtml?gid=1502673274&amp;single=true&amp;widget=true&amp;headers=false",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4NjmP1pW-qMNjDdXgFRc5CWE-9WRnigM_Fmlgw0jK9_QZmOMah2JsCdhc9xzSnA/pubhtml?gid=1044339873&amp;single=true&amp;widget=true&amp;headers=false"]
    
function Tournament({dataId}) {
    const score = useState();
    return (
        <iframe src={Tourn[(dataId)]} width="100%" height="800" allow="autoplay" />
        // <>
        //   { eliRoundArr.length === 8 ?
        //     <Tournament8 eliRoundArr={eliRoundArr}/>
        //     : eliRoundArr.length === 16 ?
        //       <Tournament16 eliRoundArr={eliRoundArr}/>
        //       : eliRoundArr.length === 32 ?
        //         <Tournament32 eliRoundArr={eliRoundArr}/>
        //         : eliRoundArr.length === 64 ?
        //           <Tournament64 eliRoundArr={eliRoundArr}/>
        //           : <></>
        //   }
        //    <Tournament16 eliRoundArr={eliRoundArr} winnerInfo={winnerInfo}/>
        // </>
    );
}

export default Tournament;
