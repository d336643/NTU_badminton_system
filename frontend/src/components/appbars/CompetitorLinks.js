import React from 'react';
import { Link } from 'react-router-dom';
import { Button, MenuItem, Typography } from '@mui/material';

export function CompetitorMenu({ registrationOpen, handleCloseNavMenu }) {
    return (
        <>
            {
                registrationOpen?
                <></>
                :
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/schedulehome">
                    <Typography textAlign="center">賽程專區</Typography>
                </MenuItem>
            }
            {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                <Typography textAlign="center">及時比分</Typography>
            </MenuItem> */}
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/competitionrule">
                <Typography textAlign="center">競賽章程</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/register">
                <Typography textAlign="center">報名 / 編輯賽事</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/competitorstatus">
                <Typography textAlign="center">報名及繳費狀態</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/allapplicant">
                <Typography textAlign="center">查看各項目報名選手</Typography>
            </MenuItem>
        </>
    );
};

export function CompetitorButton({registrationOpen, handleCloseNavMenu}) {
    return (
        <>
            {registrationOpen ? 
                <></>
                :<Button
                    component={Link}
                    to='/schedulehome'
                    onClick={handleCloseNavMenu}
                    sx={{ mr: 1, color: 'white', display: 'block' }}
                >
                    賽程專區
                </Button> 
            }
            {/* <Button
                component={Link}
                to='/'
                onClick={handleCloseNavMenu}
                sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
            >
                及時比分
            </Button> 
            currently not open these functions*/}
            <Button
                component={Link}
                to='/competitionrule'
                onClick={handleCloseNavMenu}
                sx={{ mr: 1, color: 'white', display: 'block' }}
            >
                競賽章程
            </Button> 
            <Button
                component={Link}
                to='/register'
                onClick={handleCloseNavMenu}
                sx={{ mr: 1, color: 'white', display: 'block' }}
            >
                報名 / 編輯賽事
            </Button> 
            <Button
                component={Link}
                to='/competitorstatus'
                onClick={handleCloseNavMenu}
                sx={{ mr: 1, color: 'white', display: 'block' }}
            >
                報名及繳費狀態
            </Button>
            <Button
                component={Link}
                to='/allapplicant'
                onClick={handleCloseNavMenu}
                sx={{ mr: 1, color: 'white', display: 'block' }}
            >
                查看各項目報名選手
            </Button>
        </>
    )
}

export function CompetitorPersonalMenu({ handleCloseUserMenu, token, navbarLogout }) {
    return (
        <>
            <MenuItem onClick={handleCloseUserMenu} component={Link} to={`/editprofile/${token}`}>
                <Typography textAlign="center">編輯個人資料</Typography>
            </MenuItem>
            <MenuItem onClick={navbarLogout}>
                <Typography textAlign="center">登出</Typography>
            </MenuItem>
        </>
    );
};
