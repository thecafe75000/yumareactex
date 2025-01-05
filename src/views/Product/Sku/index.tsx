import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Flex } from 'antd'
import CategoryListRedux from '../components/CategoryListRedux'
import SkuTable from './components/SkuTable'
import SkuForm from './components/SkuForm'
import type { TStoreState } from '@/store'
import { useAppDispatch } from '@/utils'
import { setIsAddBtn } from '@/store/slice/config'

const Sku = () => {
  const { isAddBtn } = useSelector((state: TStoreState) => state.config)
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (location.state) {
      // 切换至添加sku表单
      dispatch(setIsAddBtn(true))
    }
  }, [])
  
  return (
    <Flex vertical gap='middle'>
      <CategoryListRedux />
      {isAddBtn || <SkuTable />}
      {isAddBtn && <SkuForm />}
    </Flex>
  )
}

export default Sku 