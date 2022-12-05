export const base = 'https://final-task-backend-81de.up.railway.app';

const request = async (
  url: string,
  method: string,
  body: string | null,
  headers: {
    'Content-type'?: string;
    Authorization?: string;
    Accept?: string;
  } = { 'Content-type': 'application/json' }
) => {
  const response = await fetch(url, { method, body, headers });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return await response.json();
};

//Auth
export const userSignIn = async (login: string, password: string) => {
  return request(`${base}/auth/signin`, 'POST', JSON.stringify({ login, password }));
};
export const userSignUp = async (name: string, login: string, password: string) => {
  return request(`${base}/auth/signup`, 'POST', JSON.stringify({ name, login, password }));
};

//Users
export interface IUser {
  _id?: string;
  name: string;
  login: string;
  password?: string;
}

export const getUsers = async (token: string) => {
  return (await request(`${base}/users`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  })) as IUser[];
};

export const getUsersById = async (userId: string, token: string) => {
  return (await request(`${base}/users/${userId}`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  })) as IUser;
};

export const updateUser = async (userId: string, user: IUser, token: string) => {
  return await request(`${base}/users/${userId}`, 'PUT', JSON.stringify(user), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const deleteUser = async (userId: string, token: string) => {
  return await request(`${base}/users/${userId}`, 'DELETE', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

//Boards
export const getBoards = async (token: string) => {
  return await request(`${base}/boards`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const createBoard = async (token: string, title: string, owner: string, users: string[]) => {
  return await request(`${base}/boards`, 'POST', JSON.stringify({ title, owner, users }), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const getBoardById = async (token: string, boardId: string) => {
  return await request(`${base}/boards/${boardId}`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const updateBoard = async (
  token: string,
  boardId: string,
  title: string,
  owner: string,
  users: string[]
) => {
  return await request(
    `${base}/boards/${boardId}`,
    'PUT',
    JSON.stringify({ title, owner, users }),
    {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  );
};

export const deleteBoard = async (token: string, boardId: string) => {
  return await request(`${base}/boards/${boardId}`, 'DELETE', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const getBoardsSet = async (token: string) => {
  return await request(`${base}/boardsSet`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const getUserBoards = async (token: string, userId: string) => {
  return await request(`${base}/boardsSet/${userId}`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

//Columns

export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export const getBoardColumn = async (token: string, boardId: string) => {
  return await request(`${base}/boards/${boardId}/columns`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const createColumn = async (
  token: string,
  boardId: string,
  title: string,
  order: number
) => {
  return await request(
    `${base}/boards/${boardId}/columns`,
    'POST',
    JSON.stringify({ title, order }),
    {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  );
};

export const getColumnById = async (token: string, boardId: string, columnId: string) => {
  return await request(`${base}/boards/${boardId}/columns/${columnId}`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const updateColumn = async (
  token: string,
  boardId: string,
  columnId: string,
  title: string,
  order: number
) => {
  return await request(
    `${base}/boards/${boardId}/columns/${columnId}`,
    'PUT',
    JSON.stringify({ title, order }),
    {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  );
};

//path boards/${boardId}/columns/${columnId}
export const deleteColumnById = async (token: string, path: string) => {
  return await request(`${base}/${path}`, 'DELETE', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const getColumnSet = async (token: string) => {
  return await request(`${base}/columnsSet`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export interface IColumnOrder {
  _id: string;
  order: number;
}
export const updateColumnSet = async (token: string, columnsSet: IColumnOrder[]) => {
  return await request(`${base}/columnsSet`, 'PATCH', JSON.stringify(columnsSet), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const createColumnSet = async (
  token: string,
  title: string,
  order: number,
  boardId: string
) => {
  return await request(`${base}/boards`, 'POST', JSON.stringify({ title, order, boardId }), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

//Tasks
export interface ITask {
  _id?: string;
  title: string;
  order: number;
  description: string;
  boardId?: string;
  columnId?: string;
  userId: string;
  owner?: string;
  users: string[];
  usersName?: string[];
  usersLogin?: string[];
  columnName?: string;
  boardName?: string;
}

//path boards/${boardId}/columns/${columnId}/tasks
export const getColumnTasks = async (token: string, path: string) => {
  return await request(`${base}/${path}`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

//path boards/${boardId}/columns/${columnId}/tasks
export const createTask = async (token: string, path: string, task: ITask) => {
  return await request(`${base}/${path}`, 'POST', JSON.stringify(task), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const getTaskById = async (
  token: string,
  boardId: string,
  columnId: string,
  taskId: string
) => {
  return await request(
    `${base}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    'GET',
    null,
    {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  );
};

//path boards/${boardId}/columns/${columnId}/tasks/${taskId}
export const updateTask = async (token: string, path: string, task: ITask) => {
  return await request(`${base}/${path}`, 'PUT', JSON.stringify(task), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

//path boards/${boardId}/columns/${columnId}/tasks/${taskId}
export const deleteTask = async (token: string, path: string) => {
  return await request(`${base}/${path}`, 'DELETE', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const getTaskSet = async (token: string) => {
  return await request(`${base}/taskSet`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export interface ITaskSet {
  _id: string;
  order: number;
  columnId: string;
}
export const updateTaskSet = async (token: string, taskSet: ITaskSet[]) => {
  return await request(`${base}/tasksSet`, 'PATCH', JSON.stringify(taskSet), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const getBoardTaskSet = async (token: string, boardId: string) => {
  return await request(`${base}/tasksSet/${boardId}`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

//Points
interface IPoint {
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}

export const getPoints = async (token: string) => {
  return await request(`${base}/points`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const createPoints = async (token: string, point: IPoint) => {
  return await request(`${base}/points`, 'POST', JSON.stringify(point), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const getPointsTaskId = async (token: string, taskId: string) => {
  return await request(`${base}/points/${taskId}`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const updatePoint = async (token: string, pointId: string, title: string, done: boolean) => {
  return await request(`${base}/points/${pointId}`, 'PATCH', JSON.stringify({ title, done }), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export const deletePoint = async (token: string, pointId: string) => {
  return await request(`${base}/points/${pointId}`, 'DELETE', null, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};
