import { lazy, Suspense, useMemo } from 'react'
import { Outlet, useRoutes,Navigate, useLocation } from 'react-router-dom'
import Loading from '@/components/Loading'
import { PieChartOutlined, ProductOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'

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

export const useMenuRoutes = () => {
  // 侧边栏菜单用到的数组
  const menuRoutes = [
    {
      // 首页
      path: '/',
      title: 'Home',
      icon: <PieChartOutlined />,
      element: useRenderElement('Home')
    },
    {
      // 用户管理
      path: '/user',
      title: 'Users',
      icon: <UserOutlined />,
      element: <Outlet />,
      children: [
        {
          path: '/user',
          isHide: true,
          element: <Navigate to='/user/list' />
        },
        {
          // 用户列表
          path: '/user/list',
          title: 'User-list',
          element: useRenderElement('User/List')
        }
      ]
    },
    {
      // 订单管理
      path: '/order',
      title: 'Orders',
      icon: <UnorderedListOutlined />,
      element: <Outlet />,
      children: [
        {
          path: '/order',
          isHide: true,
          element: <Navigate to='/order/list' />
        },
        {
          // 订单列表
          path: '/order/list',
          title: 'Order-list',
          element: useRenderElement('Order/List')
        }
      ]
    },
    {
      // 产品管理
      path: '/product',
      title: 'Products',
      icon: <ProductOutlined />,
      element: <Outlet />,
      children: [
        {
          path: '/product',
          isHide: true,
          element: <Navigate to='/product/category' />
        },
        {
          path: '/product/category',
          title: 'Product Category',
          element: useRenderElement('Product/Category')
        }
      ]
    }
  ]
  return menuRoutes
}

export const useRouteTitle = () => {
  const { pathname } = useLocation()
  const menuRoutes = useMenuRoutes()
  return useMemo(() => {
    const titleArr = []
    // 一级路由
    const [, whereOne] = pathname.split('/')
    const firstlevelRoute = menuRoutes.find(
      (value) => value.path === '/' + whereOne
    ) as any
    titleArr.push({ title: firstlevelRoute.title })
    // 二级路由
    if (firstlevelRoute.children) {
      const seclevelRoute = firstlevelRoute.children.find(
        (value: any) => value.path === pathname && !value.isHide
      )
      // 判断二级路由是否存在,如果存在则添加其title
      if (seclevelRoute) {
        titleArr.push({ title: seclevelRoute.title })
      } 
    }
    return titleArr
  }, [pathname])
}


const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: useRenderElement('Index'),
      children: useMenuRoutes()
    },
    {
      path: '/login',
      element: useRenderElement('Login')
    },
    {
      // 404 页面
      path: '*',
      element: useRenderElement('NotFound')
    }
  ])
  return routes
}

export default Router