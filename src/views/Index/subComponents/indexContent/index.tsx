import { Layout, Tabs } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/utils'
import { delItem } from '@/store/slice/config'
import { useSelector } from 'react-redux'
import { TStoreState } from '@/store'

const IndexContent = () => {
  const { Content } = Layout
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {items} = useSelector((state:TStoreState) =>state.config)
  
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
          minWidth:'1000px',
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