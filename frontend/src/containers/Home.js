import React, { useEffect } from "react";
import Container from '@mui/material/Container';
import General from './homePages/GeneralHome';
import Competitor from './homePages/CompetitorHome';
import Manager from './homePages/ManagerHome'
import checkIdentity from '../utilities/checkIdentity';

const HomePage = ({view, setView, isLogin, setIsLogin, identity, setIdentity}) => {

    const handleLogOut = () => {
        setIsLogin(false);
        localStorage.clear();
        // console.log("local storage has been cleared.")
        // setIsLogin(false);
        setView("guest");
    }

    useEffect(() => {
        async function identityCheck(isLogin) {
            let login = await checkIdentity();
            if (!isLogin) {
                setView(login);
                setIdentity(login);
                if ( login === "guest") setIsLogin(false);
                else setIsLogin(true);
            }
            else {
                if (login != view)
                    setView(login);
                if (login != identity)
                    setIdentity(login);
            }
        }
        identityCheck(isLogin);
    }, [])

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ paddingBottom: '100px', paddingTop: '60px' }}>
                {/*sx={{height: "70vh"}}*/}
                { isLogin ?
                    view === "manager" ?
                        <Manager setView={setView} handleLogOut={handleLogOut} identity={identity} /> 
                        : <Competitor setView={setView} handleLogOut={handleLogOut} />
                    : <General />
                }
            </Container>
            {/* <Footer /> */}
        </>
    )
}

export default HomePage;
