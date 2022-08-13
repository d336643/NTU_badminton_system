export default function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}