import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const IndexContent = () => {
  const {Content} = Layout
  return (
    <Content style={{ margin: '5px' }}>
      <div
        style={{
          height: '100%',
          padding: 24,
          minHeight: 360,
          background: '#fff',
          borderRadius: 8
        }}
      >
        <Outlet/>
      </div>
    </Content>
  )
}

export default IndexContent