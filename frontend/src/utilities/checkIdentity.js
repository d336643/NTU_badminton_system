import checkLogin from "./checkLogin";

const getUserRole = () => localStorage.getItem("role");

const checkIdentity = async () => {
    const isLoggedIn = await checkLogin();
    if (!isLoggedIn) return "guest";
    
    const userRole = getUserRole();
    return userRole === "2" ? "manager" : "competitor";
};

export default checkIdentity;