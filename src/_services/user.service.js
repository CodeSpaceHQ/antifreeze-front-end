import { authHeader, config, store } from '../_helpers';
import { userConstants } from '../_constants';
import { userActions } from '../_actions';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete.
    getTempHistory, 
    set_alarm
};

 
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ email: username, password: password })
    };

    return fetch('http://35.226.42.111:8081/rest/auth/login', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                console.log("Token: " + user.token)
                // wsHandler(user.token)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                getDevices();
            }
            return user;
        });
}


function getDevices() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    fetch(config.apiUrl + '/rest/user/devices', requestOptions)
        .then(response => response.json())
        .then(data => {

            store.dispatch(userActions.initalizeDevices(data));

        });

}

function getTempHistory(device_key) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    fetch(config.apiUrl + '/rest/device/temp/' + device_key, requestOptions)
        .then(response => response.json())
        .then(data => {
            return data;
        });

}

function logout() {
    // remove user and state data from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('Freeze-B-Gone:state');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users/' + _id, requestOptions).then(handleResponse);
}

function register(user) {
    console.log(user)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.username, password: user.password })
    };

    return fetch('http://35.226.42.111:8081/rest/user/create', requestOptions).then(handleResponse);
}

function set_alarm(this_device_key, this_alarm) {

    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({
            "device_key": this_device_key,
            "alarm": this_alarm
        }),
    };

    return fetch(config.apiUrl+'/rest/device/alarm', requestOptions).then(handleResponse);;
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/' + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    console.log(response);
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}