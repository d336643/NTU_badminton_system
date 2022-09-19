import instance from "../instance";

const checkAvailable = async (uid) => {
    try {
        let res = await instance.get(`events/status?uid=${uid}`);
        let avaiable = 2;
        if (res.status === 200) {
            switch(res.events.length) {
                case 0:
                    avaiable = 2;
                    break;
                case 1:
                    avaiable = 1;
                    break;
                case 2:
                    avaiable = 0;
                    break;
                default:
                    avaiable = 0;
                    break;
            }
        }
        // else if (res.status === 401) console.log("unauthorized");
        return avaiable;
    } catch (error) {
        // console.log(error);
        return 999;
    }
}

export default checkAvailable;