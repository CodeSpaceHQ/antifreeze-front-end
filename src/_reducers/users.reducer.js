import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state;
  }
}


export function devices(state = [], action) {
  switch (action.type) {
    case userConstants.ADD_DEVICE_REQUEST:
      return [
        ...state,
        {
          device_key: action.device_key,
          name: action.name,
          alarm: action.alarm,
          temp: null
        }
      ];
      break;
    case userConstants.REMOVE_ALL_DEVICE_REQUEST:
      return [];
      break;
    case userConstants.UPDATE_ALARM_REQUEST:
      return state.map(device => {
        if (device.device_key != action.DEVICE) {
          return device;
        }
        return {
          ...device,
          alarm: action.ALARM        };
      });
      break;
    case userConstants.GETEMP_REQUEST:
      return state.map(device => {
        if (device.device_key != action.DEVICE) {
          return device;
        }
        return {
          ...device,
          temp: action.TEMP
        };
      });
      break;
    default:
      return state;
  }

}