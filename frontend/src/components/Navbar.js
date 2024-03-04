import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {
    AppBar,
    Box,
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
    Button,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';

import checkIdentity from '../utilities/checkIdentity';

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
        // setBarView("guest");
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
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                {/* <Home sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
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
                    <Home sx={{mr: 2, mt: 0.3, cursor: 'pointer'}}/>台大羽球比賽
                </Typography>
                { isLogin ?
                    view === "manager" ? 
                        identity === "manager" ?// manager - manager page
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
                                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/schedulehome">
                                    <Typography textAlign="center">賽程系統</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/refereesys">
                                    <Typography textAlign="center">裁判系統</Typography>
                                </MenuItem> 
                                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/showallapplicant">
                                    <Typography textAlign="center">報名者表單、繳費</Typography>
                                </MenuItem>
                                
                                {/* 
                                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                                    <Typography textAlign="center">登入場單</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                                    <Typography textAlign="center">清空場次</Typography>
                                </MenuItem> */}
                            </Menu>
                        </Box>
                        : // manager - competitor page
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
                                {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/schedulehome">
                                    <Typography textAlign="center">賽程專區</Typography>
                                </MenuItem> */}
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
                            </Menu>
                        </Box>
                    :
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
                            {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/schedulehome">
                                <Typography textAlign="center">賽程專區</Typography>
                            </MenuItem> */}
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
                        </Menu>
                    </Box>
                    : // guest
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
                            {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/schedulehome">
                                <Typography textAlign="center">賽程專區</Typography>
                            </MenuItem> */}
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/competitionrule">
                                <Typography textAlign="center">競賽章程</Typography>
                            </MenuItem>
                            {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                                <Typography textAlign="center">及時比分</Typography>
                            </MenuItem> */}
                        </Menu>
                    </Box>
                }
                {/* <Home sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                <Typography
                    variant="h5"
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
                    <Home sx={{mr: 2, mt: 0.5, cursor: 'pointer'}}/>台大羽球比賽
                </Typography>
                { isLogin ?
                    view === "manager" ?
                        identity == "manager" ?
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                component={Link}
                                to='/schedulehome'
                                onClick={handleCloseNavMenu}
                                sx={{ ml: 2, mr: 1, color: 'white', display: 'block' }}
                            >
                                賽程系統
                            </Button>
                            <Button
                                component={Link}
                                to='/refereesys'
                                onClick={handleCloseNavMenu}
                                sx={{ mr: 1, color: 'white', display: 'block' }}
                            >
                                裁判系統
                            </Button> 
                            <Button
                                // key={page}
                                component={Link}
                                to='/showallapplicant'
                                onClick={handleCloseNavMenu}
                                sx={{ mr: 1, color: 'white', display: 'block' }}
                            >
                                報名者表單、繳費
                            </Button>
                        </Box>
                        :
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {/* <Button
                                // key={page}
                                component={Link}
                                to='/schedulehome'
                                onClick={handleCloseNavMenu}
                                sx={{ ml: 2, mr: 1, color: 'white', display: 'block' }}
                            >
                                賽程專區
                            </Button> */}
                            {/* <Button
                                // key={page}
                                component={Link}
                                to='/'
                                onClick={handleCloseNavMenu}
                                sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
                            >
                                及時比分
                            </Button> 
                            currently not open these functions*/}
                            <Button
                                // key={page}
                                component={Link}
                                to='/competitionrule'
                                onClick={handleCloseNavMenu}
                                sx={{ mr: 1, color: 'white', display: 'block' }}
                            >
                                競賽章程
                            </Button> 
                            <Button
                                // key={page}
                                component={Link}
                                to='/register'
                                onClick={handleCloseNavMenu}
                                sx={{ mr: 1, color: 'white', display: 'block' }}
                            >
                                報名 / 編輯賽事
                            </Button> 
                            <Button
                                // key={page}
                                component={Link}
                                to='/competitorstatus'
                                onClick={handleCloseNavMenu}
                                sx={{ mr: 1, color: 'white', display: 'block' }}
                            >
                                報名及繳費狀態
                            </Button>
                        </Box>
                    :
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* <Button
                            // key={page}
                            component={Link}
                            to='/schedulehome'
                            onClick={handleCloseNavMenu}
                            sx={{ ml: 2, mr: 1, color: 'white', display: 'block' }}
                        >
                            賽程專區
                        </Button>  */}
                        {/* <Button
                            // key={page}
                            component={Link}
                            to='/'
                            onClick={handleCloseNavMenu}
                            sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
                        >
                            及時比分
                        </Button> 
                        currently not open these functions*/}
                        <Button
                            // key={page}
                            component={Link}
                            to='/competitionrule'
                            onClick={handleCloseNavMenu}
                            sx={{ mr: 1, color: 'white', display: 'block' }}
                        >
                            競賽章程
                        </Button> 
                        <Button
                            // key={page}
                            component={Link}
                            to='/register'
                            onClick={handleCloseNavMenu}
                            sx={{ mr: 1, color: 'white', display: 'block' }}
                        >
                            報名 / 編輯賽事
                        </Button> 
                        <Button
                            // key={page}
                            component={Link}
                            to='/competitorstatus'
                            onClick={handleCloseNavMenu}
                            sx={{ mr: 1, color: 'white', display: 'block' }}
                        >
                            報名及繳費狀態
                        </Button>
                        <Button
                            // key={page}
                            component={Link}
                            to='/allapplicant'
                            onClick={handleCloseNavMenu}
                            sx={{ mr: 1, color: 'white', display: 'block' }}
                        >
                            查看各項目報名選手
                        </Button>
                    </Box>
                    :
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* <Button
                            component={Link}
                            to='/schedulehome'
                            onClick={handleCloseNavMenu}
                            sx={{ mr: 1, color: 'white', display: 'block' }}
                        >
                            賽程專區
                        </Button> */}
                        <Button
                            component={Link}
                            to='/competitionrule'
                            onClick={handleCloseNavMenu}
                            sx={{ ml: 2, mr: 1, color: 'white', display: 'block' }}
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
                    </Box>
                }
                { isLogin ?
                    view === "manager" ?
                        identity === "manager" ?
                        <Box sx={{ flexGrow: 0 }}>
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
                                <MenuItem onClick={handleCloseUserMenu} component={Link} to={`/editprofile/${token}`}>
                                    <Typography textAlign="center">編輯個人資料</Typography>
                                </MenuItem>
                                <MenuItem onClick={navbarLogout}>
                                    <Typography textAlign="center">登出</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => changeIdentity("manager-c")}>
                                    <Typography textAlign="center">轉換至參賽者</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        :
                        <Box sx={{ flexGrow: 0 }}>
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
                            <MenuItem onClick={handleCloseUserMenu} component={Link} to={`/editprofile/${token}`}>
                                <Typography textAlign="center">編輯個人資料</Typography>
                            </MenuItem>
                            <MenuItem onClick={navbarLogout}>
                                <Typography textAlign="center">登出</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => changeIdentity("manager")}>
                                <Typography textAlign="center">轉換至管理員</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    :
                    <Box sx={{ flexGrow: 0 }}>
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
                            <MenuItem onClick={handleCloseUserMenu} component={Link} to={`/editprofile/${token}`}>
                                <Typography textAlign="center">編輯個人資料</Typography>
                            </MenuItem>
                            <MenuItem onClick={navbarLogout}>
                                <Typography textAlign="center">登出</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    : <></>
                }                
                </Toolbar>
            </Container>
        </AppBar>
        </div>
    );
};
export default ResponsiveAppBar;
