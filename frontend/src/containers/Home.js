import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import General from '../components/homeComponents/GeneralHome';
import Competitor from '../components/homeComponents/CompetitorHome';
import Manager from '../components/homeComponents/ManagerHome'
import Navbar from '../components/Navbar'
import checkLogin from '../utilities/checkLogin';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const HomePage = () => {
    const [view, setView] = useState("guest"); // 3 views. guest, competitor, and manager

    const handleLogOut = () => {
        localStorage.clear();
        console.log("local storage has been cleared.")
        setView("guest");
        window.location.reload();
    }

    useEffect(() => {
        async function loginCheck() {
            let login = await checkLogin();
            if (!login) setView("guest");
            else setView("competitor");
        }
        loginCheck();
    }, [])

    return (
        <>
            <Navbar handleLogOut={handleLogOut} />
            <Container component="main" maxWidth="sm">
                {view === "guest" ? <General /> :
                    view === "competitor" ? <Competitor setView={setView} handleLogOut={handleLogOut} /> : <Manager setView={setView} handleLogOut={handleLogOut}/>}
            </Container>
        </>
    )
}

export default HomePage;
