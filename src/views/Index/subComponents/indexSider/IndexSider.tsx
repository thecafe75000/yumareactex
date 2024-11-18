import React,{useState} from 'react'
import { Layout, Flex, Menu } from 'antd'
import {
  PieChartOutlined,
  UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import logo from '@/assets/img/logo.png'
import { useNavigate } from 'react-router-dom'

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

const items: MenuItem[] = [
  getItem('Home', '/', <PieChartOutlined />),
  getItem('Users', 'sub1', <UserOutlined />, [
    getItem('User-list', '/user/list'),
  ]),
]

const IndexSider = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
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
        defaultSelectedKeys={['1']}
        mode='inline'
        items={items}
        onClick={(e)=>{navigate(e.key)}}
      />
    </Sider>
  )
}

export default IndexSider