import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import checkIdentity from '../utilities/checkIdentity';

import { ManagerMenu, ManagerButton, ManagerPersonalMenu } from '../components/appbars/ManagerLinks';
import { CompetitorMenu, CompetitorButton, CompetitorPersonalMenu } from '../components/appbars/CompetitorLinks';
import { GeneralUserMenu, GeneralUserButton } from '../components/appbars/GeneralUserLinks';

const ResponsiveAppBar = ({view, setView, isLogin, setIsLogin, identity, setIdentity}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    useEffect(() => {
        async function identityCheck(isLogin) {
            if (!isLogin) {
                let login = await checkIdentity();
                setView(login);
                setIdentity(login);
                if ( login === "guest") setIsLogin(false);
                else setIsLogin(true);
            }
        }
        identityCheck(isLogin);
    }, [])

    const navbarLogout = () => {
        localStorage.clear();
        setView("guest");
        setIdentity("guest");
        setIsLogin(false);
        handleCloseUserMenu();
        navigate('/');
    }

    const changeIdentity = (changeV) => {
        setIdentity(changeV);
        navigate('/');
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div class="no-printme">
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            onClick={() => navigate('/')}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 600,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            {/* <Home sx={{mr: 2, mt: 0.3, cursor: 'pointer'}}/> */}
                            台大羽球比賽
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {   
                                    isLogin?
                                        view === "manager" ? 
                                            identity === "manager" ? <ManagerMenu handleCloseNavMenu={handleCloseNavMenu}/>
                                            : <CompetitorMenu handleCloseNavMenu={handleCloseNavMenu}/>
                                        : <CompetitorMenu handleCloseNavMenu={handleCloseNavMenu}/>
                                    : <GeneralUserMenu handleCloseNavMenu={handleCloseNavMenu}/>
                                }
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            onClick={() => navigate('/')}
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 600,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            {/* <Home sx={{mr: 2, mt: 0.5, cursor: 'pointer'}}/> */}
                            台大羽球比賽
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {
                                isLogin ?
                                    view === "manager" ? 
                                        identity == "manager" ?
                                            <ManagerButton handleCloseNavMenu={handleCloseNavMenu}/>
                                        : <CompetitorButton handleCloseNavMenu={handleCloseNavMenu}/>
                                    : <CompetitorButton handleCloseNavMenu={handleCloseNavMenu}/>
                                : <GeneralUserButton handleCloseNavMenu={handleCloseNavMenu}/>
                            }
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            {
                                isLogin ?
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton 
                                            size="large"
                                            color='inherit'
                                            onClick={handleOpenUserMenu} 
                                            sx={{ p: 0 }}
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {view === "manager" ? 
                                            <ManagerPersonalMenu 
                                                handleCloseUserMenu={handleCloseUserMenu} 
                                                identity={identity}
                                                token={token}
                                                navbarLogout={navbarLogout}
                                                changeIdentity={changeIdentity}
                                            />
                                        : 
                                        <CompetitorPersonalMenu 
                                            handleCloseUserMenu={handleCloseUserMenu} 
                                            token={token}
                                            navbarLogout={navbarLogout}
                                        />}
                                    </Menu>
                                </> : <></>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};
export default ResponsiveAppBar;
