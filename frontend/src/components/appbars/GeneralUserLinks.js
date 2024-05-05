import React from 'react';
import { Link } from 'react-router-dom';
import { Button, MenuItem, Typography } from '@mui/material';

export function GeneralUserMenu({ handleCloseNavMenu }) {
    return (
        <>
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/schedulehome">
                <Typography textAlign="center">賽程專區</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/competitionrule">
                <Typography textAlign="center">競賽章程</Typography>
            </MenuItem>
            {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                <Typography textAlign="center">及時比分</Typography>
            </MenuItem> */}
        </>
    );
};

export function GeneralUserButton({handleCloseNavMenu}) {
    return (
        <>
            <Button
                component={Link}
                to='/schedulehome'
                onClick={handleCloseNavMenu}
                sx={{ mr: 1, color: 'white', display: 'block' }}
            >
                賽程專區
            </Button>
            <Button
                component={Link}
                to='/competitionrule'
                onClick={handleCloseNavMenu}
                sx={{ mr: 1, color: 'white', display: 'block' }}
            >
                競賽章程
            </Button> 
            {/* <Button
                // key={page}
                component={Link}
                to='/'
                onClick={handleCloseNavMenu}
                sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
            >
                及時比分
            </Button> */}
        </>
    )
}