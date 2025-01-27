import './App.css';
import './support/assets/fa.all.min.css';
import { Sidebar } from './support/sidebar/Sidebar.tsx';
import { TasksView } from './components/TasksView/TasksView.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UsersView } from './components/UsersView/UsersView.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TasksView />,
  },
  {
    path: '/users',
    element: <UsersView />,
  },
]);

function App() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        gap: '.5em',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,.1)',
      }}
    >
      <Sidebar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
