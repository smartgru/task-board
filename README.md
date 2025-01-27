# task-app

> bootstrapped with Vite + React + Typescript

## Setup

- Extract challenge ZIP file to a new directory and open the directory in Visual Studio Code (or the editor of your
  choice)
- Open a terminal
- Enter `yarn && yarn start`. If you run into issues with yarn, you could try removing `yarn.lock` first and then
  run `yarn`.

> Note: please do not include `node_modules` when submitting your final zip file

## Problem Statement

Let's build a Task Management app! We will be mimicking the swimlane view of popular generally available task management
apps like Jira, Trello, Height, and others.

Important notes:

- We have mocked out an API and basic app structure already for you to use that should contain everything you need to
  complete this challenge.
- Using basic UI libraries like React-Bootstrap (already included) or Material UI is allowed
- You're allowed to use other libraries while completing this problem

> We expect the challenge to take around 2-5 hours to complete, depending on your familiarity with Typescript/Javascript
> and how quickly you digest new API documentation.

### File Structure

- New components and React code should be added to new or existing files in `src/components`
    - `TasksView.tsx` and `UsersView.tsx` are already defined, but feel free to define more components and files here as
      part of your changes
    - `useApiQuery` and `useApiMutation` are helper hooks you can use to access the mocked API. Types are preserved here
      automatically when you specify the endpoint, so you should not need to specify types manually
- All supporting files are located in the `src/support` folder. These should not be edited.
    - `src/support/api/api-schema.ts` defines the list of mocked `BackendEndpoint` that you can call along with the
      props and return values `BackendApiSchema`
    - `src/support/api/hooks.ts` defines the hooks for the mocked API
    - `src/support/api/models.ts` defines the model interfaces, and which fields are present on each model

### Requirements

There are a few things that the app is required to do before you submit your solution:

- The app must display the tasks saved in the system. At a minimum, the task display must show each task's:
    - ID
    - title
    - assignees
    - priority
    - status
- The app must allow the user to change the following task properties via the API and update the UI accordingly:
    - title
    - status
    - priority
- The app must display each status as a separate column, with matching tasks in each column. For example, all
  tasks marked with the `To Do` status should be in the `To Do` column

### Bonus Points

Here are some ideas to score some extra credit on the challenge, and demonstrate your knowledge. Doing more than one
bonus challenge will have no additional effect on your score, aside from giving us more examples of your code to look
at.

- The task display allows you to click on each task and open a detailed view of that task, which allows you to see and
  change all properties of the task, including assignees
- The app allows the user to view create, update and delete users on the Users page
    - firstName
    - lastName
    - username
- The task display supports drag-and-drop between status columns to update the status
- The task display supports filtering the task view by assignee(s)

## Grading Criteria

| Criteria                      | Below Expectations                                                                                                    | Meets Expectation                                          | Exceeds Expectations                                                                                                                         |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Completeness                  | Basic functionality does not work, and/or has many bugs (e.g. new DOM is created on every invocation).                | Implements the basic functionality without bugs.           | Implements the basic functionality and at least one of the bonus challenges.                                                                 |
| UX                            | The app is difficult to understand and use. Glaring UI problems with uneven spacing, typos, low contrast colors, etc. | UI is familiar to users of other software and easy to use. | Implements an intuitive UI that's even better than the examples, or completes at least one of the bonus UI challenges, or is WCAG accessible |
| Readability & Maintainability | Inconsistent syntax (i.e. did not use a linter). Poor function/variable names.                                        | Used a linter. Easy to understand function/variable names. | Follows best practices for writing React components. Modularized code.                                                                       |

## Example Screenshots

Here are some examples of the kind of UI we are trying to replicate:

Trello:
![trello](https://t-planning-poker.lizzybrain.com/img/marketing/1.png)

Jira:
![jira](https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/9731918f-6b32-4130-889d-eb33f1bcd273.png?ixlib=react-9.0.3&ch=Width%2CDPR&auto=format&w=3524)
