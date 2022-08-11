import instance from "../instance";

const checkLogin = async () => {
    let uid = localStorage.getItem("uid");
    if(uid) {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'accept': 'application/json'
            },
        };
        try {
            const res = await instance.get(`/users/${uid}`, config)
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