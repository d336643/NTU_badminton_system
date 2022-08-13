import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./components/Login";
import ResetRequest from "./components/ResetRequest";
import RestsetPassword from "./components/RestsetPassword";
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
    const [view, setView] = useState(""); // 3 views. guest, competitor, and manager
    const [isLogin, setIsLogin] = useState(true);
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Navbar view={view} setView={setView} isLogin={isLogin} setIsLogin={setIsLogin}/>
                <Routes>
                    <Route path="/" element={<Home view={view} setView={setView} isLogin={isLogin} setIsLogin={setIsLogin}/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/resetpass" element={<ResetRequest />} />
                    <Route path="/recover/:token" element={<RestsetPassword />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/competitionrule" element={<CompetitionRule />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/editprofile/:token" element={<EditProfile />} />
                    <Route path="/competitorstatus" element={<CompetitorStatus />} />
                    <Route path="/applicantsummary" element={<ApplicantSummary />} />
                    <Route path="/showapplicant" element={<ShowApplicant />} />
                    {/* <Route path="/profile/:username" element={<Profile />} /> */}
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                {/* <Footer /> */}
            </ThemeProvider>
        </Router>
    );
}

export default App;
