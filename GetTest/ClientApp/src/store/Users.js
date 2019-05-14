const requestUserRegistrationType = 'REQUEST_USER_REGISTRATION';
const requestUserLoginType = 'REQUEST_USER_LOGIN';
const requestUserByIdType = 'REQUEST_USER_BY_ID';
const requestUpdateUserType = 'REQUEST_UPDATE_USER';
const requestUsersType = 'REQUEST_USERS';

const successUserRegistrationType = 'SUCCESS_USER_REGISTRATION';
const successUserLoginType = 'SUCCESS_USER_LOGIN';
const successUpdateUserType = 'SUCCESS_UPDATE_USER';

const failureUserRegistrationType = 'FAILURE_USER_REGISTRATION';
const failureUserLoginType = 'FAILURE_USER_LOGIN';
const failureUpdateUserType = 'FAILURE_UPDATE_USER';

const receiveUserByIdType = 'RECEIVE_USER_BY_ID';
const receiveUsersType = 'RECEIVE_USERS';

const initialState = { user: {}, errorMsg: null, isLoading: false, list: [] };

export const actionCreators = {
  requestUserById: id => async (dispatch, getState) => {
    dispatch({ type: requestUserByIdType });
    const url = `api/Users/${id}`;
    const response = await fetch(url);
    const user = await response.json();
    dispatch({ type: receiveUserByIdType, user });
  },
  requestUsers: () => async (dispatch, getState) => {
    dispatch({ type: requestUsersType });
    const url = `api/Users`;
    const response = await fetch(url);
    const userList = await response.json();
    dispatch({ type: receiveUsersType, userList});
  },
  registerUser: user => async (dispatch, getState) => {
    dispatch({ type: requestUserRegistrationType });
    const url = `api/Users`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }
    const response = await fetch(url, options);
    console.log(response)
    const result = await response.json();
    if (response.ok) {
      dispatch({ type: successUserRegistrationType, result });
    } else {
      const errMsg = await response.text()
      dispatch({ type: failureUserRegistrationType, errMsg });
    }
  },
  loginUser: (login, password) => async (dispatch, getState) => {
    dispatch({ type: requestUserLoginType });
    const url = `api/Users/authenticate`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password })
    }
    const response = await fetch(url, options);
    const user = await response.json();
    console.log(user);
    if (response.ok) {
      dispatch({ type: successUserLoginType, user });
    } else {
      const errMsg = await response.text()
      dispatch({ type: failureUserLoginType, errMsg })
    }
  },
  updateUser: (id, user) => async (dispatch, getState) => {
    dispatch({ type: requestUpdateUserType });
    const url = `api/Users/${id}`
    const options = {
      method: 'PUT',
      body: JSON.stringify(user)
    }
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      dispatch({ type: successUpdateUserType, result });
    } else {
      const errMsg = await response.text()
      dispatch({ type: failureUpdateUserType, errMsg })
    }
  }
};

export const reducer = (state, action) => {
  state = state || initialState;
  const requestTypes = [
    requestUpdateUserType,
    requestUserByIdType,
    requestUserLoginType,
    requestUserRegistrationType,
    requestUsersType
  ];

  if (requestTypes.includes(action.type)) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveUsersType) {
    return {
      ...state,
      isLoading: false,
      list: action.userList
    }
  }

  if (action.type === receiveUserByIdType) {
    return {
      ...state,
      isLoading: false,
      user: action.user
    }
  }

  if (action.type === successUpdateUserType) {
    return {
      ...state,
      isLoading: false
    }
  }

  if (action.type === successUserLoginType) {
    return {
      ...state,
      isLoading: false,
      user: action.user
    }
  }

  if (action.type === successUserRegistrationType) {
    return {
      ...state,
      isLoading: false
    }
  }

  return state;
};
