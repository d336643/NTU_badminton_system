import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./containers/Home";
import Navbar from "./components/navbarComponents/Navbar";
import Login from "./components/Login";
import ResetRequest from "./components/resetComponents/ResetRequest";
import RestsetPassword from "./components/resetComponents/RestsetPassword";
import Signup from "./components/Signup";
import EditProfile from "./components/EditProfile";
import ErrorPage from "./components/ErrorPage";
import Register from "./components/Register";
import ApplicantForm from "./containers/ApplicantForm";
import CompetitorStatus from "./containers/CompetitorStatus";

import { ThemeProvider } from '@mui/material/styles';
import theme from './style/theme';

const App = () => {
  return (
    <Router>
        <ThemeProvider theme={theme}>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/resetpass" element={<ResetRequest />} />
                <Route path="/recover/:token" element={<RestsetPassword />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register" element={<Register />} />
                <Route path="/editprofile/:uid" element={<EditProfile />} />
                <Route path="/competitorstatus" element={<CompetitorStatus />} />
                <Route path="/applicantform" element={<ApplicantForm />} />
                {/* <Route path="/profile/:username" element={<Profile />} /> */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <div> Foooter </div>
        </ThemeProvider>
    </Router>
  );
}

export default App;
