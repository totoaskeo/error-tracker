const requestErrorListType = 'REQUEST_ERROR_LIST';
const requestErrorByIdType = 'REQUEST_ERROR_BY_ID';
const requestCreateErrorType = 'REQUEST_CREATE_ERROR';
const requestUpdateErrorType = 'REQUEST_UPDATE_ERROR';
const requestDeleteErrorType = 'REQUEST_DELETE_ERROR';

const successCreateErrorType = 'SUCCESS_CREATE_ERROR';
const successUpdateErrorType = 'SUCCESS_UPDATE_ERROR';
const successDeleteErrorType = 'SUCCESS_DELETE_ERROR';

const failureCreateErrorType = 'FAILURE_CREATE_ERROR';
const failureUpdateErrorType = 'FAILURE_UPDATE_ERROR';
const failureDeleteErrorType = 'FAILURE_DELETE_ERROR';

const receiveErrorListType = 'RECEIVE_ERROR_LIST';
const receiveErrorByIdType = 'RECEIVE_ERROR_BY_ID';

const initialState = { list: [], isLoading: false, params: {}, oneById: { errorHistory: [] } };

export const actionCreators = {
  requestErrorList: (statusId = null, impactId = null, priorityId = null, dateFrom = null, dateTo = null) => async (dispatch, getState) => {
    const params = {
      statusId, impactId, priorityId, dateFrom, dateTo
    }

    if (Object.keys(params).every(key => params[key] === getState().errors.params[key])) {
      return; // duplicate request
    }
    
    dispatch({ type: requestErrorListType });

    const errorList = [
      {
        id: 1,
        dateCreated: '2019-02-04 14:00:23',
        shortDesc: 'lorem ipsum dolor sit a met',
        user: 'vasily@tester.org',
        status: 'Новая',
        priority: 'Срочная',
        impact: 'Критическая'
      },
      {
        id: 2,
        dateCreated: '2019-02-04 14:00:23',
        shortDesc: 'lorem ipsum bla blah',
        user: 'yozef@tester.org',
        status: 'Решённая',
        priority: 'Несрочная',
        impact: 'Авария'
      }
    ]

    // const url = `api/Errors/startDateIndex=${startDateIndex}`;
    // const response = await fetch(url);
    // const forecasts = await response.json();

    dispatch({ type: receiveErrorListType, errorList, params });
  },

  requestErrorById: id => async (dispatch, getState) => {
    dispatch({ type: requestErrorByIdType })
    let oneById = { errorHistory: [] }
    if (id) {
      const url = `api/Errors${id}`;
      const response = await fetch(url);
      oneById = await response.json();
    }
    dispatch({ type: receiveErrorByIdType, oneById })
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestErrorListType) {
    return {
      ...state,
      params: action.params,
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
      params: action.params,
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

  return state;
};
