import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./components/Login";
import ResetRequest from "./components/ResetRequest";
import Updatepass from "./components/ResetPass";
import Signup from "./components/Signup";
import EditProfile from "./components/EditProfile";
import ErrorPage from "./components/ErrorPage";
import CompetitionRule from './containers/CompetitionRule';
import Register from "./components/Register";
import ShowAllSchedule from "./containers/ShowAllSchedule";
import CompetitorStatus from "./containers/CompetitorStatus";
import ShowAllApplicant from "./containers/ShowAllApplicant";
import ShowAllOtherApplicant from "./containers/ShowAllOtherApplicant";
import ScheduleHome from "./containers/homePages/ScheduleHome";
import AssignAllSchedule from "./containers/AssignAllSchedule";
import RefereeSys from "./components/RefereeSys";
import ScheduleTime from "./containers/ScheduleTime";
import OutputAllGame from "./containers/OutputAllGame";
import OutputHome from "./containers/homePages/OutputHome";
import { ThemeProvider } from '@mui/material/styles';
import theme from './style/theme';
import ResponsiveAppBar from "./containers/ResponsiceAppBar";
import AboutPage from "./components/AboutPage";
import Footer from "./components/Footer";

// import ShowAllTournament from "./containers/ShowAllTournament";
// import EditAllSchedule from "./containers/EditAllSchedule";

import { SEMESTER, REGISTRATION_OPEN } from "./utilities/globalVariable";

const App = () => {
    const [view, setView] = useState("guest"); // 3 views. guest, competitor, and manager
    const [isLogin, setIsLogin] = useState(false);
    //browser bar title
    useEffect(() => {
        document.title = SEMESTER + " 新生盃羽球賽"
    }, [])
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar view={view} setView={setView} isLogin={isLogin} setIsLogin={setIsLogin} />
                {/* <Routes style={{height: "100vh"}}> */}
                <Routes>
                    <Route path="/" element={<Home view={view} setView={setView} isLogin={isLogin} setIsLogin={setIsLogin}/>} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<Login setView={setView} setIsLogin={setIsLogin}/>} />
                    <Route path="/resetpass" element={<ResetRequest />} />
                    <Route path="/updatepass" element={<Updatepass />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/competitionrule" element={<CompetitionRule isLogin={isLogin}/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/editprofile/:id" element={<EditProfile/>} />
                    {/* <Route path="/editregister/:id" element={<EditRegister/>} /> */}
                    <Route path="/competitorstatus" element={<CompetitorStatus />} />
                    <Route path="/allapplicant" element={<ShowAllOtherApplicant />} />
                    <Route path="/showallapplicant" element={<ShowAllApplicant />} />
                    <Route path="/assignallschedule" element={<AssignAllSchedule />} />
                    {/* <Route path="/editallschedule" element={<EditAllSchedule />} /> */}
                    {REGISTRATION_OPEN? <></>:
                        <>
                            <Route path="/schedulehome" element={<ScheduleHome view={view}/>} />
                            <Route path="/showallschedule" element={<ShowAllSchedule view={view}/>} />
                            <Route path="/scheduletime" element={<ScheduleTime />} />
                            <Route path="/outputgametable" element={<OutputAllGame />} />
                            <Route path="/outputhome" element={<OutputHome/>} />
                            <Route path="/refereesys" element={<RefereeSys />} />
                        </>
                    }
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
            </ThemeProvider>
        </Router>
    );
}

export default App;
