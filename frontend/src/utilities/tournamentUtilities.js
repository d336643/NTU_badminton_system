import {TITLE, LETTERS, DEGREECODE} from './entry';
import { getDepartmentLabel } from './getDepartment';

export const hasResult = (detail, title) => {
    const key = Object.keys(detail);
    const value = Object.values(detail);
    const target = value.map(function(x, i) {
        if (String(key[i]) === String(title)) {
            //console.log(value[i])
            if (value[i].hasResult === true) {
                return true
            }
            else
                return false
        } 
    });
    return target;
}

export const getWinnerInfo = (detail, title, type) => {
    const key = Object.keys(detail);
    const value = Object.values(detail);
    const target = value.map(function(x, i) {
        if (String(key[i]) === String(title)) {
            //console.log(value[i].data[0])
            if (type === 'degree')
                return DEGREECODE[Number(value[i].data[0].degreeId)-1]
            else if (type === 'depart')
                return getDepartmentLabel(value[i].data[0].departmentId)
            else if (type === 'name')
                return value[i].data[0].username
        }
    });
    return target;
}

export const getTitle = (titlecode) => {
    const key = Object.keys(TITLE);
    const value = Object.values(TITLE);
    const target = value.map(function(x, i) {
        if (String(key[i]) === String(titlecode)) {
            // console.log(value[i])
            return String(value[i])
        } 
    });
    return target;
}

export const letterToIndex = (letter) => {
    const index = LETTERS.indexOf(letter);
    console.log(index);
    return index;
}