import { Flex } from 'antd'
import { useSelector } from 'react-redux'
import CategoryListRedux from '@/views/Product/components/CategoryListRedux'
import SpuTable from './components/SpuTable'
import SpuForm from './components/SpuForm'
import type { TStoreState } from '@/store'
import { useAppDispatch } from '@/utils'
import { useEffect } from 'react'
import { setIsAddSpuBtn } from '@/store/slice/config'

const Spu = () => {
  const { isAddSpuBtn } = useSelector((state: TStoreState) => state.config)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setIsAddSpuBtn(false))
  },[])

  return (
    <Flex vertical gap='middle'>
      <CategoryListRedux />
      {isAddSpuBtn || <SpuTable />}
      {isAddSpuBtn && <SpuForm />}
    </Flex>
  )
}

export default Spu
