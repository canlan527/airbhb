import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Home = lazy(() => import('@/views/home'))
const Detail = lazy(() => import('@/views/detail'))
const Entire = lazy(() => import('@/views/entire'))
const Demo = lazy(() => import('@/views/demo'))
const DemoIndicator = lazy(() => import('@/views/demo/demo-indicator'))
const Profile = lazy(() => import('@/views/profile'))
const PublishHouse = lazy(() => import('@/views/publish-house'))
const Admin = lazy(() => import('@/views/admin'))

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/detail/:id',
    element: <Detail />
  },
  {
    path: '/entire',
    element: <Entire />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/publish-house',
    element: <PublishHouse />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/demo',
    element: <Demo />,
    children: [
      {
        path: '/demo/indicator',
        element: <DemoIndicator />
      }
    ]
  }
]

export default routes
