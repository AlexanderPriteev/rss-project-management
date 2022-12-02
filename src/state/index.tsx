import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { IUser } from '../api/requests';
import { IBoard } from '../pages/main/boards/board';

export const USER_DATA = 'USER_DATA';
export const BOARDS_DATA = 'BOARDS_DATA';

export interface ReduxReducer {
  type: 'USER_DATA' | 'BOARDS_DATA';
  data: IUser | IBoard[];
}
export interface StateReduxInterface {
  user: IUser;
  boards: IBoard[];
}

export const stateRedux: StateReduxInterface = {
  user: {
    _id: localStorage.getItem('userId') || '',
    name: '',
    login: '',
    password: '',
  },
  boards: [],
};

const reducer = (state: StateReduxInterface = stateRedux, action: ReduxReducer) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, user: action.data as IUser };
    case BOARDS_DATA:
      return { ...state, boards: action.data as IBoard[] };
    default:
      return state;
  }
};

export const storeRedux = createStore(reducer, applyMiddleware(thunk));

export const reduxUser = (user: IUser): ReduxReducer => ({
  type: USER_DATA,
  data: user,
});

export const reduxBoards = (boards: IBoard[]): ReduxReducer => ({
  type: BOARDS_DATA,
  data: boards,
});
