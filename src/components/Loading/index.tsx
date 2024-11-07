import React from 'react'
import { Spin } from 'antd';
import './index.css'

const Loading = () => {
  return (
    <div className='spin'>
      <Spin />
    </div>
  )
 
}

export default Loading