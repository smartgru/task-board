export enum TaskPriority {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Medium = 'MEDIUM',
  Low = 'LOW',
  None = 'NONE',
}

export enum TaskStatus {
  ToDo = 'TO_DO',
  Queued = 'QUEUED',
  InProgress = 'IN_PROGRESS',
  InReview = 'IN_REVIEW',
  Done = 'DONE',
  WontDo = 'WONT_DO',
  Duplicate = 'DUPLICATE',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePictureUrl?: string;
  /** the public level of the user (like stack overflow points/levels) */
  profileRank: number;
}

export interface Task {
  title: string;
  id: string;
  description: string;

  priority: TaskPriority;
  assignedUsers?: User[];
  status: TaskStatus;
}
