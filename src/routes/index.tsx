import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'


// route lazy loading
const Loading = lazy(() => import('@/components/Loading'))

// comName:路由组件的名字
const renderElement = (comName: string) => {
  const FC = lazy(() => import('@/views/' + comName))
  return (
    <Suspense fallback={<Loading />}>
      <FC/>
    </Suspense>
  )
}

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: renderElement('Home')
    },
    {
      path: '/login',
      element: renderElement('Login')
    },
    {
      path: '*',
      element: renderElement('NotFound')
    }
  ])
  return routes
}

export default Router