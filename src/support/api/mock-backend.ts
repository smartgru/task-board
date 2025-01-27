import { getMockUserId, MockTasks, MockUsers } from './mock-data.ts';
import { BackendApiSchema, BackendEndpoint } from './api-schema.ts';

function tryParseLocalStorage<T>(key: string, defaultValue: T) {
  const storedItems = localStorage.getItem(key);
  let parsedItems = defaultValue;
  if (!storedItems) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  } else {
    try {
      parsedItems = JSON.parse(storedItems);
    } catch (err) {
      parsedItems = defaultValue;
    }
  }

  return parsedItems;
}

const USERS_KEY = 'users';
const TASKS_KEY = 'tasks';

export const MockBackend: {
  [K in BackendEndpoint]: (
    props: BackendApiSchema[K]['props'],
  ) => Promise<BackendApiSchema[K]['result']> | BackendApiSchema[K]['result'];
} = {
  [BackendEndpoint.GetUsers]: ({ searchText } = {}) =>
    tryParseLocalStorage(USERS_KEY, MockUsers).filter((user) => {
      const search = searchText?.trim();
      return (
        !search ||
        [user.firstName, user.lastName].some((val) =>
          val.toLowerCase().includes(search.toLowerCase()),
        )
      );
    }),
  [BackendEndpoint.GetTasks]: ({ searchText } = {}) =>
    tryParseLocalStorage(TASKS_KEY, MockTasks).filter((task) => {
      const search = searchText?.trim();
      return (
        !search ||
        [task.title, task.description].some((val) =>
          val.toLowerCase().includes(search.toLowerCase()),
        )
      );
    }),
  [BackendEndpoint.CreateTask]: (task) => {
    const currentTasks = tryParseLocalStorage(TASKS_KEY, MockTasks);

    const newTask = {
      ...task,
      id: `T-${Math.round(Math.random() * Math.pow(10, 6))}`,
    };
    currentTasks.push(newTask);
    localStorage.setItem(TASKS_KEY, JSON.stringify(currentTasks));

    return newTask;
  },
  [BackendEndpoint.UpdateTask]: (task) => {
    const currentTasks = tryParseLocalStorage(TASKS_KEY, MockTasks);

    const index = currentTasks.findIndex((t) => t.id === task.id);
    if (index < 0) {
      throw new Error(`task with id ${task.id} not found`);
    }
    const newTask = { ...currentTasks[index], ...task };
    currentTasks[index] = newTask;
    localStorage.setItem(TASKS_KEY, JSON.stringify(currentTasks));

    return newTask;
  },
  [BackendEndpoint.DeleteTask]: (task) => {
    const currentTasks = tryParseLocalStorage(TASKS_KEY, MockTasks);

    const index = currentTasks.findIndex((t) => t.id === task.id);
    if (index < 0) {
      throw new Error(`task with id ${task.id} not found`);
    }
    currentTasks.splice(index, 1);
    localStorage.setItem(TASKS_KEY, JSON.stringify(currentTasks));

    return true;
  },
  [BackendEndpoint.CreateUser]: (user) => {
    const currentUsers = tryParseLocalStorage(USERS_KEY, MockUsers);

    const newUser = {
      ...user,
      id: getMockUserId(),
    };
    currentUsers.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(currentUsers));

    return newUser;
  },
  [BackendEndpoint.UpdateUser]: (user) => {
    const currentUsers = tryParseLocalStorage(USERS_KEY, MockUsers);

    const index = currentUsers.findIndex((u) => u.id === user.id);
    if (index < 0) {
      throw new Error(`user with id ${user.id} not found`);
    }
    const newTask = { ...currentUsers[index], ...user };
    currentUsers[index] = newTask;
    localStorage.setItem(USERS_KEY, JSON.stringify(currentUsers));

    return newTask;
  },
  [BackendEndpoint.DeleteUser]: (user) => {
    const currentUsers = tryParseLocalStorage(USERS_KEY, MockUsers);

    const index = currentUsers.findIndex((u) => u.id === user.id);
    if (index < 0) {
      throw new Error(`user with id ${user.id} not found`);
    }
    currentUsers.splice(index, 1);
    localStorage.setItem(USERS_KEY, JSON.stringify(currentUsers));

    return true;
  },
};
