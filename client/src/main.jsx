import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './Nav.jsx'
import './styles/index.css'
import {createHashRouter, RouterProvider} from "react-router-dom";
import {Provider, useSelector} from 'react-redux';
import store from './store/store';
import { Home } from './Home.jsx';
import { Login } from './Login.jsx';
import { SignUp } from './SignUp.jsx';
import { Api, ApiContext } from './utils/api.js';
import { Reptile } from './Reptile.jsx';
import { NewReptile } from './NewReptile.jsx';
import { NewFeeding } from './NewFeeding.jsx';
import { NewHusbandry } from './NewHusbandry.jsx';
import { NewSchedule } from './NewSchedule.jsx';

const router = createHashRouter([
  {
    path: "",
    element:  <Nav />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/sign_up",
        element: <SignUp />
      },
      {
        path: "/reptile/:id",
        element: <Reptile />
      },
      {
        path: "/reptile",
        element: <NewReptile />
      },
      {
        path: "/schedule/:id",
        element: <NewSchedule />
      },
      {
        path: "/husbandry/:id",
        element: <NewHusbandry />
      },
      {
        path: "/feeding/:id",
        element: <NewFeeding />
      },

    ]
  }
])


const Main = () => {
  const authToken = useSelector(state => state.application.authToken)
  const apiRef = useRef(new Api(authToken));

  useEffect(() => {
    if(apiRef.current) {
      apiRef.current.authToken = authToken;
    }
  }, [authToken])

  return (
    <ApiContext.Provider value={apiRef.current}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Main />
  </Provider>
)
