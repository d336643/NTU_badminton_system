import checkLogin from "./checkLogin";

const checkIdentity = async () => {
    let login = await checkLogin();
    if (!login) return "guest";
    else {
        // if (localStorage.getItem("name") === "ntu_badminton") return "manager";
        // else if (localStorage.getItem("sid").indexOf("_admin") !== -1) return "manager";
        if (localStorage.getItem("role") === "2") return "manager";
        else return "competitor";
    }
}

export default checkIdentity;