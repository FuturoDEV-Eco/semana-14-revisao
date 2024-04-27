import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UsuariosContextProvider } from './context/UsuariosContext.jsx'

import CadastroUsuarios from "./pages/CadastroUsuarios.jsx"
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Lista from './pages/Lista.jsx'
import BuscarCep from "./pages/BuscarCep.jsx"

let isAutenticado = JSON.parse(localStorage.getItem("isAutenticado")) || false

const PrivateRoute = ({children}) => {
  return isAutenticado ? children : <Navigate to="/login" />
}

const rotas = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/usuario/cadastro",
    element: <CadastroUsuarios />
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/lista/:id",
        element: <Lista />
      },
      {
        path: "/cep",
        element: <BuscarCep />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <UsuariosContextProvider>
    <RouterProvider router={rotas}>
    </RouterProvider>
  </UsuariosContextProvider>
)
