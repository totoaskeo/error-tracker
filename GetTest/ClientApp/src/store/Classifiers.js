const requestClassifiersType = 'REQUEST_CLASSIFIERS';
const receiveClassifiersType = 'RECEIVE_CLASSIFIERS';
const initialState = { statuses: [], priorities: [], impacts: [], actions: [] };

export const actionCreators = {
  requestClassifiers: () => async (dispatch, getState) => {
    dispatch({ type: requestClassifiersType });

    // const url = `api/Statuses`;
    // const response = await fetch(url);
    // const statuses = await response.json();

    const statuses = [
      { id: 1, name: 'Новая' },
      { id: 2, name: 'Открытая' },
      { id: 3, name: 'Решённая' },
      { id: 4, name: 'Закрытая' }
    ]
    const priorities = statuses
    const impacts = statuses
    const actions = statuses

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
