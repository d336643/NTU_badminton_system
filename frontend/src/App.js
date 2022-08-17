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
import ApplicantSummary from "./containers/ApplicantSummary";
import CompetitorStatus from "./containers/CompetitorStatus";
import ShowApplicant from "./components/ShowApplicant";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from '@mui/material/styles';
import theme from './style/theme';

const App = () => {
    const [view, setView] = useState("guest"); // 3 views. guest, competitor, and manager
    const [isLogin, setIsLogin] = useState(false);
    const [identity, setIdentity] = useState("competitor");
    //browser bar title
    useEffect(() => {
    document.title = "2022台大羽球新生盃"
    }, [])
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Navbar view={view} setView={setView} isLogin={isLogin} setIsLogin={setIsLogin} identity={identity} setIdentity={setIdentity}/>
                <Routes style={{height: "100vh"}}>
                    <Route path="/" element={<Home view={view} setView={setView} isLogin={isLogin} setIsLogin={setIsLogin} setIdentity={setIdentity}/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/resetpass" element={<ResetRequest />} />
                    <Route path="/updatepass" element={<Updatepass />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/competitionrule" element={<CompetitionRule isLogin={isLogin}/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/editprofile/:id" element={<EditProfile/>} />
                    <Route path="/competitorstatus" element={<CompetitorStatus />} />
                    <Route path="/applicantsummary" element={<ApplicantSummary />} />
                    <Route path="/showapplicant" element={<ShowApplicant />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
            </ThemeProvider>
        </Router>
    );
}

export default App;
