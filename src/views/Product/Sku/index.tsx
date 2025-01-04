import React from 'react'
import { Flex } from 'antd'
import { useSelector } from 'react-redux'
import CategoryListRedux from '../components/CategoryListRedux'
import SkuTable from './components/SkuTable'
import SkuForm from './components/SkuForm'
import type { TStoreState } from '@/store'


const Sku = () => {
  const { isAddBtn } = useSelector((state: TStoreState) => state.config)
  return (
    <Flex vertical gap='middle'>
      <CategoryListRedux />
      {isAddBtn || <SkuTable />}
      {isAddBtn && <SkuForm />}
    </Flex>
  )
}

export default Sku 