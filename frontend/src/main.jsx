import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Root from './root.jsx';
import './css/index.css';
import PersonalFormRoom from "./Form/PersonalFormRoom.jsx";
import RoomParent from "./Room/RoomParent.jsx";

const router = createHashRouter([
  {
    path: "/*",
    element: <Root/>,
  },
  {
    path: "room/:roomCode",
    element: <RoomParent/>
  },
  {
    path: "/form",
    element: <PersonalFormRoom/>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)