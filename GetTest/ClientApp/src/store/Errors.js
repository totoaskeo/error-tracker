const requestErrorListType = 'REQUEST_ERROR_LIST';
const receiveErrorListType = 'RECEIVE_ERROR_LIST';
const initialState = { list: [], isLoading: false, params: {} };

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

  if (action.type === receiveErrorListType) {
    return {
      ...state,
      list: action.errorList,
      params: action.params,
      isLoading: false
    };
  }

  return state;
};
