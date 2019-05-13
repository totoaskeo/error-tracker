const requestClassifiersType = 'REQUEST_CLASSIFIERS';
const receiveClassifiersType = 'RECEIVE_CLASSIFIERS';
const initialState = { statuses: [], priorities: [], impacts: [], actions: [] };

export const actionCreators = {
  requestClassifiers: () => async (dispatch, getState) => {
    dispatch({ type: requestClassifiersType });

    let url = `api/Statuses`;
    let response = await fetch(url);
    const statuses = await response.json();

    url = `api/Priorities`;
    response = await fetch(url);
    const priorities = await response.json();
    
    url = `api/Impacts`;
    response = await fetch(url);
    const impacts = await response.json();

    url = `api/Actions`;
    response = await fetch(url);
    const actions = await response.json();

    dispatch({ type: receiveClassifiersType, payload: { statuses, priorities, impacts, actions } });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestClassifiersType) {
    return {
      ...state,
    };
  }

  if (action.type === receiveClassifiersType) {
    return {
      ...state,
      statuses: action.payload.statuses,
      priorities: action.payload.priorities,
      impacts: action.payload.impacts,
      actions: action.payload.actions
    };
  }

  return state;
};
