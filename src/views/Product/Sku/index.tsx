import React from 'react'
import { Flex } from 'antd'
import CategoryListRedux from '../components/CategoryListRedux'

import SkuTable from './components/SkuTable'

const Sku  = () => {
  return (
    <Flex vertical gap='middle'>
      <CategoryListRedux />
      <SkuTable/>
    </Flex>
  )
}

export default Sku 