import React, { useEffect } from "react";
import Container from '@mui/material/Container';
import General from './homePages/GeneralHome';
import Competitor from './homePages/CompetitorHome';
import Manager from './homePages/ManagerHome';
import checkIdentity from '../utilities/checkIdentity';

const HomePage = ({ view, setView, isLogin, setIsLogin }) => {

    const handleLogOut = () => {
        setIsLogin(false);
        localStorage.clear();
        setView("guest");
    };

    useEffect(() => {
        async function identityCheck(isLogin) {
            let login = await checkIdentity();
            if (!isLogin) {
                setView(login);
                setIsLogin(login !== "guest");
            } else if (login !== view) {
                setView(login);
            }
        }
        identityCheck(isLogin);
    }, [isLogin, setView, setIsLogin]);

    return (
        <Container component="main" maxWidth="sm" sx={{ paddingBottom: '100px', paddingTop: '60px' }}>
            {isLogin ? (
                view === "manager" ? (
                    <Manager handleLogOut={handleLogOut} />
                ) : (
                    <Competitor setView={setView} handleLogOut={handleLogOut} />
                )
            ) : (
                <General />
            )}
        </Container>
    );
};

export default HomePage;