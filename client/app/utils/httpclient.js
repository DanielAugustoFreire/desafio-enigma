const baseUrl = "http://localhost:5000";

const httpClient = {


    get: function(endpoint) {
        return fetch(baseUrl + endpoint, {
            method: 'GET',
            credentials: 'include',
        })
    },

    get_headers: function(endpoint, token){
        return fetch(baseUrl + endpoint, {
            credentials: 'include',
            method: 'GET',
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
            }
        })  
    },

    post: function(endpoint, data){
        return fetch(baseUrl + endpoint, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    },

    put: function(endpoint, data){
        return fetch(baseUrl + endpoint, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    },

    delete: function(endpoint){
        return fetch(baseUrl + endpoint, {
            method: 'DELETE',
            credentials: 'include',
        })
    }

}

export default httpClient;