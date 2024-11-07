import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import Loading from '@/components/Loading'

// comName:路由组件的名字
const renderElement = (comName: string) => {
  // 懒加载
  const FComp = lazy(() => import('@/views/' + comName))
  return (
    <Suspense fallback={<Loading />}>
      <FComp/>
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