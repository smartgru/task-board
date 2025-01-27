import { Task, TaskPriority, TaskStatus, User } from './models.ts';

export function getMockUserId() {
  return `U-${Math.round(Math.random() * Math.pow(10, 6))}`;
}

export function getMockTaskId() {
  return `T-${Math.round(Math.random() * Math.pow(10, 6))}`;
}

/**
 * DO NOT USE THIS DIRECTLY IN YOUR SOLUTION, use the API methods instead
 * @deprecated
 */
export const MockUsers: User[] = [
  {
    id: getMockUserId(),
    firstName: 'Philip',
    lastName: 'Smith',
    username: 'phil66',
    profileRank: 0,
    profilePictureUrl: 'https://randomuser.me/api/portraits/men/30.jpg',
  },
  {
    id: getMockUserId(),
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'jane_the_beast_1972',
    profileRank: 5,
    profilePictureUrl: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
  {
    id: getMockUserId(),
    firstName: 'John',
    lastName: 'Doe',
    username: 'whyNotJohn6',
    profileRank: 3,
    profilePictureUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
  {
    id: getMockUserId(),
    firstName: 'Henry',
    lastName: 'Mackintyre',
    username: 'HMack_love_puppies',
    profileRank: 8,
  },
];

/**
 * DO NOT USE THIS DIRECTLY IN YOUR SOLUTION, use the API methods instead
 * @deprecated
 */
export const MockTasks: Task[] = [
  {
    id: getMockTaskId(),
    title: 'Finish the take-home',
    description:
      'We will definitely need to finish the take home assignment before going to virtual on-site interviews!',
    status: TaskStatus.ToDo,
    priority: TaskPriority.Critical,
    assignedUsers: [],
  },
];
