import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    updateTemp,
    delete: _delete,
    reconnectSocket,
    initalizeDevices,
    addDevice,
    updateAlarm
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    //dispatch(connectSocket());
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
    function connectSocket() { return { type: userConstants.CONNECT_SOCKET } }

}

function logout() {

    userService.logout();
    return dispatch => {
        dispatch(_logout());
        dispatch(removeDevices());
    };
    function _logout() { return { type: userConstants.LOGOUT } };
    function removeDevices() { return { type: userConstants.REMOVE_ALL_DEVICE_REQUEST } }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function updateTemp(temp, device) {

    return dispatch => {
        dispatch(update());

    };
    function update() { return { type: userConstants.GETEMP_REQUEST, TEMP: temp, DEVICE: device } }

}

function updateAlarm(alarm, device) {

    return dispatch => {
        dispatch(update());

    };
    function update() { return { type: userConstants.UPDATE_ALARM_REQUEST, ALARM: alarm, DEVICE: device } }

}

function reconnectSocket() {

    return dispatch => {
        dispatch(connectSocket());
    };
    function connectSocket() { return { type: userConstants.CONNECT_SOCKET } }

}

function initalizeDevices(deviceArray) {

    return dispatch => {
        deviceArray.devices.map(device => {
            dispatch(addDevice(device.device_key, device.name, device.alarm));
        });
    };

}

function addDevice(this_device_key, this_name, this_alarm) {
    return { type: userConstants.ADD_DEVICE_REQUEST, device_key: this_device_key, name: this_name, alarm: this_alarm }
}


