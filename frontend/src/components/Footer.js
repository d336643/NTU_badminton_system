import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material//Typography';
import Alison from '../icons/Alison.JPG';
import Brain from '../icons/Brain.jpg';

const footerStyle = {
    minHeight: '10vh',
    marginTop: '5vh',
    backgroundColor: '#433a7a',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    placeItems: 'center',
    position:'fixed',
    left:0,
    bottom:0,
    right:0,
    zIndex: 0,
}
const BottomFooter = () => {
    return (
        <footer style={footerStyle}>
            <div style={{minWidth: '50px'}}></div>
            <p style={{color: '#fff'}}>台大羽球校隊 Copyright © 2022</p>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <a href="https://github.com/Cyalisonliu"><img src={Alison} style={{width:'3em', borderRadius: '50%', margin: '1vh'}} alt="a-button"></img></a>
                <a href="https://github.com/Brian-Konr"><img src={Brain} style={{ width:'3em',borderRadius: '50%', margin: '1vh'}} alt="r-button"></img></a>
            </div>
        </footer>
    )
}
export default BottomFooter;