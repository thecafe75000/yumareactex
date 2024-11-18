import React from 'react'
import { Layout } from 'antd'

const IndexFooter = () => {
  const {Footer} = Layout
  return (
    <Footer style={{ padding: 10, textAlign: 'center' }}>
      Hifromparis ©{new Date().getFullYear()} Created by agence Hifromparis
    </Footer>
  )
}

export default IndexFooter