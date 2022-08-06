import instance from "../instance";

const checkLogin = async () => {
    let uid = localStorage.getItem("uid");
    if(uid) {
        try {
            let res = await instance.get(`/users/${uid}`);
            console.log(res.status);
            if (res.status === 200) return true;

        } catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            return false;
        }
    }
    else return false;
}

export default checkLogin;