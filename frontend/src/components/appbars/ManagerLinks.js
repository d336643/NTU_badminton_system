import React from 'react';
import { Link } from 'react-router-dom';
import { Button, MenuItem, Typography } from '@mui/material';

import { REGISTRATION_OPEN } from '../../utilities/globalVariable';

export function ManagerMenu({ handleCloseNavMenu }) {
    return (
        <>
            {REGISTRATION_OPEN? 
                <></>:
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/schedulehome">
                    <Typography textAlign="center">賽程系統</Typography>
                </MenuItem>
            }
            {REGISTRATION_OPEN? 
                <></>:
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/refereesys">
                    <Typography textAlign="center">裁判系統</Typography>
                </MenuItem> 
            }
            <MenuItem onClick={handleCloseNavMenu} compsonent={Link} to="/showallapplicant">
                <Typography textAlign="center">報名者表單、繳費</Typography>
            </MenuItem>
            {/* 
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                <Typography textAlign="center">登入場單</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                <Typography textAlign="center">清空場次</Typography>
            </MenuItem> */}
        </>
    );
};

export function ManagerButton({handleCloseNavMenu}) {
    return (
        <>
            {REGISTRATION_OPEN?
                <></>
                :
                <Button
                    component={Link}
                    to='/schedulehome'
                    onClick={handleCloseNavMenu}
                    sx={{ mr: 1, color: 'white', display: 'block' }}
                >
                    賽程系統
                </Button>
            }
            {REGISTRATION_OPEN ? 
                            <></>
                            :
                <Button
                    component={Link}
                    to='/refereesys'
                    onClick={handleCloseNavMenu}
                    sx={{ mr: 1, color: 'white', display: 'block' }}
                >
                    裁判系統
                </Button> 
            }
            <Button
                component={Link}
                to='/showallapplicant'
                onClick={handleCloseNavMenu}
                sx={{ mr: 1, color: 'white', display: 'block' }}
            >
                報名者表單、繳費
            </Button>
        </>
    )
}

export function ManagerPersonalMenu({ handleCloseUserMenu, identity, token, navbarLogout, changeIdentity }) {
    return (
        <>
        {identity === "manager" ?
            <>
            <MenuItem onClick={handleCloseUserMenu} component={Link} to={`/editprofile/${token}`}>
                <Typography textAlign="center">編輯個人資料</Typography>
            </MenuItem>
            <MenuItem onClick={navbarLogout}>
                <Typography textAlign="center">登出</Typography>
            </MenuItem>
            <MenuItem onClick={() => changeIdentity("manager-c")}>
                <Typography textAlign="center">轉換至參賽者</Typography>
            </MenuItem>
            </>
            :
            <>
                <MenuItem onClick={handleCloseUserMenu} component={Link} to={`/editprofile/${token}`}>
                    <Typography textAlign="center">編輯個人資料</Typography>
                </MenuItem>
                <MenuItem onClick={navbarLogout}>
                    <Typography textAlign="center">登出</Typography>
                </MenuItem>
                <MenuItem onClick={() => changeIdentity("manager")}>
                    <Typography textAlign="center">轉換至管理員</Typography>
                </MenuItem>
            </>
        }
            
        </>
    );
};