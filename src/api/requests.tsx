const base = 'https://rss-react-7a6b.up.railway.app/';

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
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }

  return await response.json();
};

//Auth
export const userSignIn = async (login: string, password: string) => {
  return request(`${base}auth/signin`, 'POST', JSON.stringify({ login, password }));
};
export const userSignUp = async (name: string, login: string, password: string) => {
  return request(`${base}auth/signup`, 'POST', JSON.stringify({ name, login, password }));
};

//Users
export const getUsers = async (token: string) => {
  await request(`${base}users`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Berear ${token}`,
  });
};

export const getUsersById = async (userId: string, token: string) => {
  await request(`${base}users/${userId}`, 'GET', null, {
    'Content-type': 'application/json',
    Authorization: `Berear ${token}`,
  });
};

export const updateUser = async (
  userId: string,
  name: string,
  login: string,
  password: string,
  token: string
) => {
  await request(`${base}users/${userId}`, 'PUT', JSON.stringify({ name, login, password }), {
    'Content-type': 'application/json',
    Authorization: `Berear ${token}`,
  });
};

export const deleteUser = async (userId: string, token: string) => {
  await request(`${base}users/${userId}`, 'DELETE', null, {
    'Content-type': 'application/json',
    Authorization: `Berear ${token}`,
  });
};

//Boards
export const getBoards = async (token: string) => {
    await request(`${base}boards`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const createBoard = async (token: string, title: string, owner: string, users: string[]) => {
    return request(`${base}boards`, 'POST', JSON.stringify({ title, owner, users }), {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const getBoardById = async (token: string, boardId: string ) => {
    await request(`${base}boards/${boardId}`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const updateBoard = async (token: string, boardId: string, title: string, owner: string, users: string[]) => {
    return request(`${base}boards/${boardId}`, 'PUT', JSON.stringify({ title, owner, users }), {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const deleteBoard = async (token: string, boardId: string ) => {
    await request(`${base}boardsSet`, 'DELETE', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const getBoardsSet = async (token: string ) => {
    await request(`${base}boardsSet`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const getUserBoards = async (token: string, userId: string ) => {
    await request(`${base}boardsSet/${userId}`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};


//Columns
export const getBoardColumn = async (token: string, boardId: string ) => {
    await request(`${base}boards/${boardId}/columns`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const createColumn = async (token: string, boardId: string, title: string, order: number) => {
    return request(`${base}boards/${boardId}/columns`, 'POST', JSON.stringify({ title, order}), {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const getColumnById = async (token: string, boardId: string, columnId: string ) => {
    await request(`${base}boards/${boardId}/columns/${columnId}`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const updateColumn = async (token: string, boardId: string, columnId: string, title: string, order: number) => {
    return request(`${base}boards/${boardId}/columns/${columnId}`, 'PUT', JSON.stringify({ title, order}), {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const deleteColumnById = async (token: string, boardId: string, columnId: string ) => {
    await request(`${base}boards/${boardId}/columns/${columnId}`, 'DELETE', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const getColumnSet = async (token: string ) => {
    await request(`${base}columnsSet`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const updateColumnSet = async (token: string, columnId: string,  order: number) => {
    await request(`${base}columnsSet`, 'PATCH', JSON.stringify({ columnId, order}), {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const createColumnSet = async (token: string,  title: string, order: number, boardId: string) => {
    return request(`${base}boards`, 'POST', JSON.stringify({ title, order, boardId}), {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

//Tasks
export interface ITask {
    title: string; order: number; description: string; usageId: string; users: string[]
}

export const getColumnTasks = async (token: string, boardId: string, columnId: string ) => {
    await request(`${base}boards/${boardId}/columns/${columnId}/tasks`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const createTask = async (token: string, boardId: string, columnId: string,  task: ITask) => {
    await request(`${base}boards/${boardId}/columns/${columnId}/tasks`, 'POST', JSON.stringify(task), {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const getTaskById = async (token: string, boardId: string, columnId: string, taskId: string ) => {
    await request(`${base}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const updateTask = async (token: string, boardId: string, columnId: string,  taskId: string,  task: ITask) => {
    await request(`${base}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, 'PUT', JSON.stringify(task), {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const deleteTask = async (token: string, boardId: string, columnId: string, taskId: string ) => {
    await request(`${base}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, 'DELETE', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const getTaskSet = async (token: string ) => {
    await request(`${base}taskSet`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

interface ITaskSet {
    id: string;
    order:number;
    columnId: string;
}
export const updateTaskSet = async (token: string, taskSet: ITaskSet ) => {
    await request(`${base}taskSet`, 'PATCH', JSON.stringify(taskSet), {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const getBoardTaskSet = async (token: string, boardId: string ) => {
    await request(`${base}taskSet/${boardId}`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
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
    await request(`${base}points`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const createPoints = async (token: string, point: IPoint) => {
    await request(`${base}points`, 'POST', JSON.stringify(point), {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const getPointsTaskId = async (token: string, taskId: string) => {
    await request(`${base}points/${taskId}`, 'GET', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const updatePoint = async (token: string, pointId: string, title: string, done: boolean) => {
    await request(`${base}points/${pointId}`, 'PATCH',  JSON.stringify({title, done}), {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};

export const deletePoint = async (token: string, pointId: string) => {
    await request(`${base}points/${pointId}`, 'DELETE', null, {
        'Content-type': 'application/json',
        Authorization: `Berear ${token}`,
    });
};