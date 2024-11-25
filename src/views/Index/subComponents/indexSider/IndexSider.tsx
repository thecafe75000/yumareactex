import React,{useEffect, useMemo, useState} from 'react'
import { Layout, Flex, Menu } from 'antd'
import type { MenuProps } from 'antd'
import logo from '@/assets/img/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMenuRoutes, useRouteTitle } from '@/routes'
import { useAppDispatch } from '@/utils'
import { addItem } from '@/store/slice/config'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const IndexSider = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [subMenu, setSubMenu] = useState<string>('/' + pathname.split('/')[1])
  const dispatch = useAppDispatch()
  const [, titleInfo] = useRouteTitle()

  useEffect(() => {
    // 指定哪个菜单可以展开
    setSubMenu('/' + pathname.split('/')[1])
    // 切换导航栏数组items增加元素
    dispatch(addItem({ pathname, titleInfo }))
  }, [pathname])

  const menuRoutes = useMenuRoutes()
  const items = useMemo(() => (menuRoutes.map((item) => {
       let childrenArr
       if (item.children) {
         childrenArr = item.children
           .filter((item) => !item.isHide)
           .map((child) => {
             return getItem(child.title, child.path)
           })
       }
       return getItem(item.title, item.path, item.icon, childrenArr)
     })),[])

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Flex className='demo-logo-vertical' justify='center' align='center'>
        <img src={logo} alt='logo' width={32} />
        <h3 style={{ display: collapsed ? 'none' : 'block' }}>
          E-commence CRM
        </h3>
      </Flex>
      <Menu
        theme='dark'
        selectedKeys={[pathname]}
        openKeys={[subMenu]}
        onOpenChange={(openKeys:string[])=>{setSubMenu(openKeys[1])}}
        mode='inline'
        items={items}
        onClick={(e) => {
          if (e.key === '/') {
            setSubMenu('/')
          }
          navigate(e.key)
        }}
      />
    </Sider>
  )
}

export default IndexSider