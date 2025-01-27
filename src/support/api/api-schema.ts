import { Task, User } from './models.ts';

export type Optionalize<SOURCE, KEYS extends keyof SOURCE> = Omit<
  SOURCE,
  KEYS
> &
  Partial<Pick<SOURCE, KEYS>>;

export type PartialExcept<SOURCE, KEYS extends keyof SOURCE> = Pick<
  SOURCE,
  KEYS
> &
  Partial<SOURCE>;

/** the list of backend endpoints we can call */
export enum BackendEndpoint {
  /** gets the list of users present in the system */
  GetUsers = 'GET_USERS',
  /** creates a user */
  CreateUser = 'CREATE_USER',
  /** updates a user */
  UpdateUser = 'UPDATE_USER',
  /** deletes a user */
  DeleteUser = 'DELETE_USER',
  /** Creates a task */
  CreateTask = 'CREATE_TASK',
  /** updates a task */
  UpdateTask = 'UPDATE_TASK',
  /** deletes a task */
  DeleteTask = 'DELETE_TASK',
  /** gets the list of tasks present in the system */
  GetTasks = 'GET_TASKS',
}

/**
 * The Backend schema definition. This defines the props and result types for each API endpoint
 */
export interface BackendApiSchema
  extends Record<BackendEndpoint, { props: unknown; result: unknown }> {
  [BackendEndpoint.CreateTask]: {
    /** all props needed to create a task, id is generated if not specified */
    props: Optionalize<Task, 'id'>;
    /** the created task */
    result: Task;
  };
  [BackendEndpoint.DeleteTask]: {
    /** the id of the task to delete */
    props: Pick<Task, 'id'>;
    /** if the task was deleted successfully */
    result: boolean;
  };
  [BackendEndpoint.UpdateTask]: {
    /** updates the specified fields on a task, id is required */
    props: PartialExcept<Task, 'id'>;
    /** the updated task */
    result: Task;
  };
  [BackendEndpoint.GetTasks]: {
    props: {
      /** the text to search for */
      searchText?: string;
    };
    /** the list of tasks matching the filters (or all if no filters) */
    result: Task[];
  };
  [BackendEndpoint.GetUsers]: {
    props: {
      /** the text to search for */
      searchText?: string;
    };
    /** the list of users matching the filters (or all if no filters) */
    result: User[];
  };
  [BackendEndpoint.CreateUser]: {
    /** all props needed to create a user, id is generated if not specified */
    props: Optionalize<User, 'id'>;
    /** the created user */
    result: User;
  };
  [BackendEndpoint.UpdateUser]: {
    /** updates the specified fields on a user, id is required */
    props: PartialExcept<User, 'id'>;
    /** the updated user */
    result: User;
  };
  [BackendEndpoint.DeleteUser]: {
    /** the id of the user to delete */
    props: Pick<User, 'id'>;
    /** if the user was deleted successfully */
    result: boolean;
  };
}
