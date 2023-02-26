import { DEPARTMENT } from "./entry";

export const getDepartmentLabel = (departmentId) => {
    const key = Object.keys(DEPARTMENT);
    const value = Object.values(DEPARTMENT);
    const target = value.map(function(x, i) {
        if (String(key[i]) === String(departmentId)) {
            // console.log(value[i])
            return String(value[i])
        } 
    });
    return target;
}