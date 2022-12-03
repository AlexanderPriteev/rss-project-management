import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { IColumn, ITask, IUser } from '../api/requests';
import { IBoard } from '../pages/main/boards/board';

export const USER_DATA = 'USER_DATA';
export const BOARDS_DATA = 'BOARDS_DATA';
export const CURRENT_BOARD = 'CURRENT_BOARD';

export interface ReduxReducer {
  type: 'USER_DATA' | 'BOARDS_DATA' | 'CURRENT_BOARD';
  data: IUser | IBoard[] | ICurrentBoard;
}

export interface ICurrentBoard {
  board: IBoard | null;
  columns: IColumn[];
  tasks: ITask[];
}

export interface StateReduxInterface {
  user: IUser;
  boards: IBoard[];
  project: ICurrentBoard;
}

export const stateRedux: StateReduxInterface = {
  user: {
    _id: localStorage.getItem('userId') || '',
    name: '',
    login: '',
    password: '',
  },
  boards: [],
  project: {
    board: null,
    columns: [],
    tasks: [],
  },
};

const reducer = (state: StateReduxInterface = stateRedux, action: ReduxReducer) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, user: action.data as IUser };
    case CURRENT_BOARD:
      return { ...state, project: action.data as ICurrentBoard };
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

export const reduxProject = (project: ICurrentBoard): ReduxReducer => ({
  type: CURRENT_BOARD,
  data: project,
});

export const reduxBoards = (boards: IBoard[]): ReduxReducer => ({
  type: BOARDS_DATA,
  data: boards,
});
