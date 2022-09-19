import React from 'react';

const footerStyle = {
    marginTop: '5vh',
    minHeight: '10vh',
    backgroundColor: 'secondary',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    placeItems: 'center',
    minWidth: '100%'
}
const BottomFooter = () => {
    return (
        <footer style={footerStyle}>
            <div style={{minWidth: '50px'}}></div>
            <p style={{color: '#fff'}}>台大羽球校隊 Copyright © 2022</p>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {/* <a href="https://github.com/Cyalisonliu"><img src={Alison} style={{width:'3em', borderRadius: '50%', margin: '1vh'}} alt="a-button"></img></a>
                <a href="https://github.com/Brian-Konr"><img src={Brain} style={{ width:'3em',borderRadius: '50%', margin: '1vh'}} alt="r-button"></img></a> */}
            </div>
        </footer>
    )
}
export default BottomFooter;