import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { IUser } from '../api/requests';

export const USER_DATA = 'USER_DATA';

export interface ReduxReducer {
  type: 'USER_DATA';
  data: IUser;
}
export interface StateReduxInterface {
  user: IUser;
}

export const stateRedux: StateReduxInterface = {
  user: {
    _id: localStorage.getItem('userId') || '',
    name: '',
    login: '',
    password: '',
  },
};

const reducer = (state: StateReduxInterface = stateRedux, action: ReduxReducer) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, user: action.data };
    default:
      return state;
  }
};

export const storeRedux = createStore(reducer, applyMiddleware(thunk));

export const reduxUser = (user: IUser): ReduxReducer => ({
  type: USER_DATA,
  data: user,
});
