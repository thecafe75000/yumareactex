import React from 'react'
import { Layout, Flex, Breadcrumb, Dropdown, Avatar } from 'antd'
import { HomeOutlined, LoginOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/utils'
import { loginOut } from '@/store/slice/admin'
import { useSelector } from 'react-redux'
import type { TStoreState } from '@/store'


const IndexHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const adminInfo: any = useSelector((state: TStoreState) => state.admin)
  
  const { Header } = Layout
  
  const items = [
    {
      key: '1',
      label: <Link to='/'>Back to Home Page</Link>,
      icon: <HomeOutlined />
    },
    {
      key: '2',
      label: (
        <a
          onClick={(e) => {
            e.preventDefault()
            dispatch(loginOut())
            navigate('/login')
          }}
          href='/login'
        >
          Log Out
        </a>
      ),
      icon: <LoginOutlined />
    }
  ]

  return (
    <Header style={{ padding: '0 10px', background: '#fff' }}>
      <Flex justify='space-between' align='center'>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          Welcome back {adminInfo.info?.adminName}!
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()} href='/'>
              {
                adminInfo.info && (
                <Avatar src= {<img src={'/api' + adminInfo.info.avatar} alt='avatar' /> } />
              )}
            </a>
          </Dropdown>
        </div>
      </Flex>
    </Header>
  )
}

export default IndexHeader