import React, { useEffect } from 'react'
import { Layout } from 'antd'
import './index.less'
import IndexFooter from './subComponents/indexFooter'
import IndexContent from './subComponents/indexContent'
import IndexHeader from './subComponents/indexHeader/IndexHeader'
import IndexSider from './subComponents/indexSider/IndexSider'
import { getAdminInfoAsync } from '@/store/slice/admin'
import { useAppDispatch } from '@/utils'
import withAuth from '@/components/Hoc'


const Index: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAdminInfoAsync())
  },[])
  return (
    <Layout hasSider={true} style={{ minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <IndexSider/>
      <Layout>
        {/* 头部 */}
        <IndexHeader />
        {/* 主体 */}
        <IndexContent />
        {/* 底部 */}
        <IndexFooter />
      </Layout>
    </Layout>
  )
}

export default withAuth(Index)
