import React, { useEffect } from "react";
import Container from '@mui/material/Container';
import General from '../components/homeComponents/GeneralHome';
import Competitor from '../components/homeComponents/CompetitorHome';
import Manager from '../components/homeComponents/ManagerHome'
// import Footer from '../components/Footer';
import checkIdentity from '../utilities/checkIdentity';

const HomePage = ({view, setView, isLogin, setIsLogin, identity, setIdentity}) => {

    const handleLogOut = () => {
        localStorage.clear();
        console.log("local storage has been cleared.")
        // setIsLogin(false);
        setView("guest");
        setIsLogin(false);
    }

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

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{height: "70vh"}}>
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
