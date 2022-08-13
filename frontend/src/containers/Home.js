import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import General from '../components/homeComponents/GeneralHome';
import Competitor from '../components/homeComponents/CompetitorHome';
import Manager from '../components/homeComponents/ManagerHome'
import Navbar from '../components/Navbar'
// import Footer from '../components/Footer';
import checkLogin from '../utilities/checkLogin';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const HomePage = ({view, setView, isLogin, setIsLogin}) => {

    const handleLogOut = () => {
        localStorage.clear();
        console.log("local storage has been cleared.")
        // setIsLogin(false);
        setView("guest");
        setIsLogin(false);
    }

    useEffect(() => {
        async function loginCheck() {
            let login = await checkLogin();
            setIsLogin(login);

            if (!login) setView("guest");
            else setView("competitor");
        }
        loginCheck();
    }, [])

    return (
        <>
            {/* <Navbar view={view} setView={setView} isLogin={isLogin} setIsLogin={setIsLogin}/> */}
            <Container component="main" maxWidth="sm">
                { isLogin ?
                    view === "manager" ?
                        <Manager setView={setView} handleLogOut={handleLogOut}/> 
                        : <Competitor setView={setView} handleLogOut={handleLogOut} />
                    : <General />
                }
            </Container>
            {/* <Footer /> */}
        </>
    )
}

export default HomePage;
