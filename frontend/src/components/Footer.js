import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    const [showFooter, setShowFooter] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const isAboutPage = location.pathname === '/about' || location.pathname === '/outputhome';
        
        setShowFooter(!isAboutPage);
    }, [location]);

    return (
        <Box sx={{
            backgroundColor: 'background.paper',
            color: 'text.secondary',
            py: 2,
            textAlign: 'center',
            width: '100%',
            position: 'fixed',
            bottom: 0,
            zIndex: 999,
            marginTop: 'auto',
            display: showFooter ? 'block' : 'none' // 根據 showFooter 狀態來顯示或隱藏 Footer
        }}>
            <Typography variant="body2">
                我們誠邀各位參賽者和觀眾到訪我們的 <a href="https://github.com/d336643/NTU_badminton_system" target="_blank" rel="noopener noreferrer">Github專案頁面</a>，給我們點星鼓勵<br/>
                {/* Wrap the text with Link component */}
                網站緣起請前往 <Link to="/about">網站緣起頁面</Link>
            </Typography>
        </Box>
    )
}

export default Footer;