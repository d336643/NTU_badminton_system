// unfinish
export function checkPassword(inputtxt) { 
    if (inputtxt.length < 8) return false
    else {
        var hasNumber = /\d/;   
        var hasLetter = /[A-Za-z]/;   
        // if ( !hasNumber.test(inputtxt))  console.log("X 0")
        // if ( !hasLetter.test(inputtxt))  console.log("X A")
        const result = hasNumber.test(inputtxt) && hasLetter.test(inputtxt)
        return result
    }
}

export function verifyTWid(idstr) {
    idstr = idstr.trim();
    
    var verification = idstr.match("^[A-Z][12]\\d{8}$")
	if(!verification){
		return false
	}

    let conver = "ABCDEFGHJKLMNPQRSTUVXYWZIO"
    let weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]

    idstr = String(conver.indexOf(idstr[0]) + 10) + idstr.slice(1);

    var checkSum = 0
    for (let i = 0; i < idstr.length; i++) {
        let c = parseInt(idstr[i])
        let w = weights[i]
        checkSum += c * w
    }
	
    return checkSum % 10 === 0
}

export function verifyLiveid(idstr) {  
    const result = /^[a-zA-Z]{1}[a-dA-D8-9]{1}[0-9]{8}$/.test(idstr);
    if (!result) {
        return verifyTWid(idstr);
    }
    else return true;
}

export function verifyEmail(email){
    if (email === null) return false;
    const pos = email.indexOf("@ntu.edu.tw")
    if (pos !== -1) return true;
    return false
}