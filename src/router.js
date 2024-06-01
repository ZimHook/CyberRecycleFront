import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "@/views/Layout"
import Home from "@/views/Home"
import Recycle from "@/views/Recycle"

const AllRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'recycle',
        element: <Recycle />,
      },
      {
        path: '*',
        element: <Home />,
      }
    ]
  }
]

const renderRoutes = (routes) => {
  return(
    <>
      {routes.map((item, index) => {
        if(item.children){
          return <Route path={item.path} element={item.element} key={index + item.path}>
            {renderRoutes(item.children)}
          </Route>
        }
        return <Route path={item.path} element={item.element} key={index + item.path}/>
      })}
    </>
  )
}

const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes(AllRoutes)}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
