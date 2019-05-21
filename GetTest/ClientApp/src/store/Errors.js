import { authHeader } from '../helpers/authHeader';

const requestErrorListType = 'REQUEST_ERROR_LIST';
const requestErrorByIdType = 'REQUEST_ERROR_BY_ID';
const requestCreateErrorType = 'REQUEST_CREATE_ERROR';
const requestUpdateErrorType = 'REQUEST_UPDATE_ERROR';

const successCreateErrorType = 'SUCCESS_CREATE_ERROR';
const successUpdateErrorType = 'SUCCESS_UPDATE_ERROR';

const failureCreateErrorType = 'FAILURE_CREATE_ERROR';
const failureUpdateErrorType = 'FAILURE_UPDATE_ERROR';

const receiveErrorListType = 'RECEIVE_ERROR_LIST';
const receiveErrorByIdType = 'RECEIVE_ERROR_BY_ID';

const initialState = { list: [], isLoading: false, params: {}, oneById: { errorHistory: [] }, msg: '' };

export const actionCreators = {
  requestErrorList: () => async (dispatch, getState) => {
    dispatch({ type: requestErrorListType });
    const url = `api/Errors`;
    const options = {
      headers: { ...authHeader() }
    }
    const response = await fetch(url, options);
    if (response.ok) {
      const errorList = await response.json();
      dispatch({ type: receiveErrorListType, errorList });
    }
  },
  requestErrorById: id => async (dispatch, getState) => {
    dispatch({ type: requestErrorByIdType })
    let oneById;
    if (id) {
      const url = `api/Errors/${id}`;
      const options = {
        headers: { ...authHeader() }
      }
      const response = await fetch(url, options);
      if (response.ok) {
        oneById = await response.json();
      }
    }
    dispatch({ type: receiveErrorByIdType, oneById })
  },
  createError: error => async (dispatch, getState) => {
    dispatch({ type: requestCreateErrorType });
    const url = `api/Errors`;
    const options = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(error)
    }
    const response = await fetch(url, options);
    const createdError = await response.json();
    let msg = '';
    if (response.ok) {
      msg = 'Ошибка создана';
      dispatch({ type: successCreateErrorType, oneById: createdError, msg });
    } else {
      msg = await response.text();
      dispatch({ type: failureCreateErrorType, msg });
    }
  },
  updateError: error => async dispatch => {
    dispatch({ type: requestUpdateErrorType });
    const url = `api/Errors/${error.id}`;
    const options = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(error)
    }
    const response = await fetch(url, options);
    let msg = '';
    if (response.ok) {
      msg = 'Данные об ошибке обновлены';
      dispatch({ type: successUpdateErrorType, msg });
    } else {
      msg = await response.text();
      dispatch({ type: failureUpdateErrorType, msg });
    }
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestErrorListType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === requestErrorByIdType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveErrorListType) {
    return {
      ...state,
      list: action.errorList,
      isLoading: false
    };
  }

  if (action.type === receiveErrorByIdType) {
    return {
      ...state,
      oneById: action.oneById,
      isLoading: false
    }
  }

  if (action.type === successCreateErrorType) {
    return {
      ...state,
      oneById: action.oneById,
      isLoading: false,
      msg: action.msg
    }
  }

  if (action.type === successUpdateErrorType) {
    return {
      ...state,
      msg: action.msg
    }
  }

  return state;
};
