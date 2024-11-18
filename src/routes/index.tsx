import { lazy, Suspense, useMemo } from 'react'
import { Outlet, useRoutes,Navigate } from 'react-router-dom'
import Loading from '@/components/Loading'

// comName:路由组件的名字
const useRenderElement = (comName: string) => {
  const FComp = useMemo(() => {
    // 懒加载
    return lazy(() => import('@/views/' + comName))
  }, [comName])
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
      element: useRenderElement('Index'),
      children: [
        {
          // 首页
          index: true, // 指页面Home的路由和其父级路由的path是一样的
          element: useRenderElement('Home')
        },
        {
          // 用户管理
          path: '/user',
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <Navigate to='/user/list' />
            },
            {
              // 用户列表
              path: '/user/list',
              element: useRenderElement('User/List')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      element: useRenderElement('Login')
    },
    {
      path: '*',
      element: useRenderElement('NotFound')
    }
  ])
  return routes
}

export default Router