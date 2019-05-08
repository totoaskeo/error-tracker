const requestErrorListType = 'REQUEST_ERROR_LIST';
const receiveErrorListType = 'RECEIVE_ERROR_LIST';
const initialState = { forecasts: [], isLoading: false };

export const actionCreators = {
  requestErrorList: (statusId = null, impactId = null, priorityId = null, dateFrom = null, dateTo = null,) => async (dispatch, getState) => {
    const params = {
      statusId, impactId, priorityId, dateFrom, dateTo
    }

    if (Object.keys(params).every(key => params[key] === getState().ErrorList.params[key])) {
      return; // duplicate request
    }
    
    dispatch({ type: requestErrorListType, startDateIndex });

    const url = `api/Errors/startDateIndex=${startDateIndex}`;
    const response = await fetch(url);
    const forecasts = await response.json();

    dispatch({ type: receiveErrorListType, startDateIndex, forecasts });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestErrorListType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      isLoading: true
    };
  }

  if (action.type === receiveErrorListType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      forecasts: action.forecasts,
      isLoading: false
    };
  }

  return state;
};
