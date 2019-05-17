import { authHeader } from '../helpers/authHeader';

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
const logoutUserType = 'LOGOUT_USER';

const initialState = { user: JSON.parse(localStorage.getItem('user')) || {}, msg: '', isLoading: false, list: [] };

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
    const options = { headers: { ...authHeader() } };
    console.log(options)
    const response = await fetch(url, options);
    console.log(response);
    if (response.ok) {
      const userList = await response.json();
      console.log(userList);
      dispatch({ type: receiveUsersType, userList});
    }
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
    let msg = '';
    if (response.ok) {
      msg = 'Пользователь зарегистрирован';
      dispatch({ type: successUserRegistrationType, msg });
    } else {
      msg = await response.text()
      dispatch({ type: failureUserRegistrationType, msg });
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
    let msg = '';
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: successUserLoginType, user, msg });
    } else {
      msg = await response.text()
      dispatch({ type: failureUserLoginType, msg })
    }
  },
  logoutUser: () => async dispatch => {
    dispatch({ type: logoutUserType });
  },
  updateUser: user => async (dispatch, getState) => {
    dispatch({ type: requestUpdateUserType });
    const url = `api/Users/${user.id}`;
    const options = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }
    const response = await fetch(url, options);
    console.log(response);
    let msg = '';
    if (response.ok) {
      msg = 'Данные пользователя обновлены';
      dispatch({ type: successUpdateUserType, msg });
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      msg = await response.text()
      dispatch({ type: failureUpdateUserType, msg })
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
      isLoading: false,
      msg: action.msg
    }
  }

  if (action.type === successUserLoginType) {
    return {
      ...state,
      isLoading: false,
      user: action.user,
      msg: action.msg
    }
  }

  if (action.type === successUserRegistrationType) {
    return {
      ...state,
      isLoading: false,
      msg: action.msg
    }
  }

  if (action.type === logoutUserType) {
    return {
      ...state,
      user: {}
    }
  }

  return state;
};
