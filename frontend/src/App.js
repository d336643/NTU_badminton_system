import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EditProfile from "./components/EditProfile";
import ErrorPage from "./components/ErrorPage";
import Register from "./components/Register";

import { ThemeProvider } from '@mui/material/styles';
import theme from './style/theme';

const App = () => {
  return (
    <Router>
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register" element={<Register />} />
                <Route path="/editprofile" element={<EditProfile />} />
                {/* <Route path="/profile/:username" element={<Profile />} /> */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <div> Foooter </div>
        </ThemeProvider>
    </Router>
  );
}

export default App;
