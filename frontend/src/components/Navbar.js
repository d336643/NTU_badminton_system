import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Home from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import checkIdentity from '../utilities/checkIdentity';
import { Link, useNavigate } from 'react-router-dom';

const ResponsiveAppBar = ({view, setView, isLogin, setIsLogin, identity, setIdentity}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    useEffect(() => {
        async function identityCheck(isLogin) {
            if (!isLogin) {
                let login = await checkIdentity();
                console.log("login identity:", login);
                setView(login);
                if ( login === "guest") setIsLogin(false);
                else setIsLogin(true);
            }
        }
        identityCheck(isLogin);
    }, [])

    const navbarLogout = () => {
        localStorage.clear();
        console.log("local storage has been cleared.");
        // setBarView("guest");
        setView("guest");
        setIdentity("guest");
        setIsLogin(false);
        handleCloseUserMenu();
        navigate('/');
    }

    const changeView = (changeV) => {
        setView(changeV);
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
                    view === "manager"? 
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
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/applicantsummary">
                                <Typography textAlign="center">報名者表單、繳費</Typography>
                            </MenuItem>
                            
                            {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                                <Typography textAlign="center">排賽程</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                                <Typography textAlign="center">登入場單</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                                <Typography textAlign="center">清空場次</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                                <Typography textAlign="center">裁判</Typography>
                            </MenuItem> 
                            currently not open these functions */}
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
                            {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                                <Typography textAlign="center">賽程專區</Typography>
                            </MenuItem> 
                            currently not open these functions*/}
                            {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                                <Typography textAlign="center">及時比分</Typography>
                            </MenuItem> 
                            currently not open these functions*/}
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/competitionrule">
                                <Typography textAlign="center">競賽章程</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/register">
                                <Typography textAlign="center">報名賽事</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/competitorstatus">
                                <Typography textAlign="center">報名 / 繳費狀態</Typography>
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
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/competitionrule">
                                <Typography textAlign="center">競賽章程</Typography>
                            </MenuItem>
                            {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/register">
                                <Typography textAlign="center">賽程專區</Typography>
                            </MenuItem> 
                            currently not open these functions*/}
                            {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                                <Typography textAlign="center">及時比分</Typography>
                            </MenuItem> 
                            currently not open these functions*/}
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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            // key={page}
                            component={Link}
                            to='/applicantsummary'
                            onClick={handleCloseNavMenu}
                            sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
                        >
                            報名者表單、繳費
                        </Button>
                        {/* <Button
                            // key={page}
                            component={Link}
                            to='/'
                            onClick={handleCloseNavMenu}
                            sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
                        >
                            排賽程
                        </Button>
                        <Button
                            // key={page}
                            component={Link}
                            to='/'
                            onClick={handleCloseNavMenu}
                            sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
                        >
                            登入場單
                        </Button>
                        <Button
                            // key={page}
                            component={Link}
                            to='/'
                            onClick={handleCloseNavMenu}
                            sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
                        >
                            清空場次
                        </Button>
                        <Button
                            // key={page}
                            component={Link}
                            to='/'
                            onClick={handleCloseNavMenu}
                            sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
                        >
                            裁判
                        </Button> 
                        currently not open these functions*/}
                    </Box>
                    :
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* <Button
                            // key={page}
                            component={Link}
                            to='/register'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            賽程專區
                        </Button> 
                        currently not open these functions*/}
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
                            sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
                        >
                            競賽章程
                        </Button> 
                        <Button
                            // key={page}
                            component={Link}
                            to='/register'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            報名賽事
                        </Button> 
                        <Button
                            // key={page}
                            component={Link}
                            to='/competitorstatus'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            報名 / 繳費狀態
                        </Button>
                    </Box>
                    :
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            component={Link}
                            to='/competitionrule'
                            onClick={handleCloseNavMenu}
                            sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
                        >
                            競賽章程
                        </Button> 
                        {/* <Button
                            // key={page}
                            component={Link}
                            to='/register'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            賽程專區
                        </Button> 
                        currently not open these functions*/}
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
                    </Box>
                }
                { isLogin ?
                    view === "competitor" ?
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
                            {/* <MenuItem onClick={handleCloseUserMenu} component={Link} to='/'>
                                <Typography textAlign="center">個人賽事</Typography>
                            </MenuItem> */}
                            <MenuItem onClick={handleCloseUserMenu} component={Link} to={`/editprofile/${token}`}>
                                <Typography textAlign="center">編輯個人資料</Typography>
                            </MenuItem>
                            <MenuItem onClick={navbarLogout}>
                                <Typography textAlign="center">登出</Typography>
                            </MenuItem>
                            {identity === "manager" ? 
                                <MenuItem onClick={() => changeView("manager")}>
                                    <Typography textAlign="center">轉換至管理員</Typography>
                                </MenuItem>
                                : <></>    
                            }
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
                            <MenuItem onClick={() => changeView("competitor")}>
                                <Typography textAlign="center">轉換至參賽者</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    : <></>
                }                
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
