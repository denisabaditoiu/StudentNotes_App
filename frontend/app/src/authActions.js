export function login(data) {

    if(data.username === 'admin' && data.password === 'admin'){
        return true;
    }
    return false;
    // return fetch('/login', {
    //     method: 'POST',
    //     mode: 'CORS',
    //     body: JSON.stringify(data),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => {
    //     return res;
    // }).catch(err => err);
}
