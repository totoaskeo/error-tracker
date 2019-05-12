const requestUserRegistrationType = 'REQUEST_USER_REGISTRATION';
const requestUserLoginType = 'REQUEST_USER_LOGIN';
const requestUserByIdType = 'REQUEST_USER_BY_ID';
const requestUsersType = 'REQUEST_USERS';
const receiveUserRegistrationType = 'RECEIVE_USER_REGISTRATION';
const receiveUserLoginType = 'RECEIVE_USER_LOGIN';
const receiveUserByIdType = 'RECEIVE_USER_BY_ID';
const receiveUsersType = 'RECEIVE_USERS';
const initialState = { user: {}, errorMsg: null, isLoading: false, list: [] };

export const actionCreators = {
  requestUserById: id => async (dispatch, getState) => {
    dispatch({ type: requestUserByIdType });

    // const url = `api/Errors/startDateIndex=${startDateIndex}`;
    // const response = await fetch(url);
    // const forecasts = await response.json();

    dispatch({ type: requestUserByIdType });
  },
  requestUsers: () => async (dispatch, getState) => {
    dispatch({ type: requestUsersType });
    
    const userList = [
      {
        id: 1,
        name: 'vasily',
        surname: 'petrovich',
        login: 'vasily@tester.org'
      },
      {
        id: 2,
        name: 'nikola',
        surname: 'tyvala',
        login: 'tyvala@zzz.zzz'
      }
    ]
    dispatch({ type: receiveUsersType, userList});
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestUserByIdType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === requestUsersType) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === receiveUsersType) {
    return {
      ...state,
      isLoading: false,
      list: action.userList
    }
  }

  return state;
};
