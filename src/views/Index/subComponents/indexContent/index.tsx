import React, { useEffect} from 'react'
import { Layout, Tabs } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useRouteTitle } from '@/routes'
import { useAppDispatch } from '@/utils'
import { addItem, delItem } from '@/store/slice/config'
import { useSelector } from 'react-redux'
import { TStoreState } from '@/store'

const IndexContent = () => {
  const { Content } = Layout
  const { pathname } = useLocation()
  const [, titleInfo] = useRouteTitle()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {items} = useSelector((state:TStoreState) =>state.config)

  useEffect(() => {
    dispatch(addItem({ pathname, titleInfo }))
  }, [pathname])
  
  const onChange = (activeKey:string) => {
    navigate(activeKey)
  }

  const onEdit = (activeKey: any) => {
    const index = items.findIndex(item => item.key === activeKey)
    if (pathname === activeKey) {
      navigate(items[index-1].key)
    }
    dispatch(delItem(index))
  }
  
  return (
    <Content style={{ margin: '5px' }}>
      <div
        style={{
          height: 'calc(100vh-116px)',
          padding: 5,
          background: '#fff',
          borderRadius: 8,
          overflowY:'auto'
        }}
      >
        <Tabs
          hideAdd
          type='editable-card'
          onChange={onChange}
          activeKey={pathname}
          onEdit={onEdit}
          items={items}
        />
        <Outlet />
      </div>
    </Content>
  )
}

export default IndexContent