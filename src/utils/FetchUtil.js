 const handleGet = (url, userToken) => {
    var result =  fetch( url, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
            "Authorization" : userToken,
            "Connection": "close"
        }
    });
   
    return result;
}

const handleNewGet = async (url, params, userToken) => {
    url = new URL(url);
    if (params) {
        url.search = new URLSearchParams(params).toString();
    }
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
            "Authorization" : userToken
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        let tokenError = response.headers.get('Tokenerror');
        let respError = response.statusText == '' ? 'Request failed.' : response.statusText;
        return { "error": tokenError ? tokenError : respError, "payload": {}}
    }
}


const handlePost = (url, userToken, payload) => {
   var result = fetch( url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "text/html;charset=UTF-8",
            "Authorization" : userToken
        },
        body: JSON.stringify(payload)
    });

    return result;
}

export default {handleGet, handleNewGet, handlePost}