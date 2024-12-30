import { useState } from 'react'
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
  const [spuInfo, setSpuInfo] = useState<any>(null)
  const [spuSaleAttrList, setSpuSaleAttrList] = useState([]) 

  useEffect(() => {
    dispatch(setIsAddSpuBtn(false))
  },[])

  return (
    <Flex vertical gap='middle'>
      <CategoryListRedux />
      {/* Spu列表的渲染 */}
      {isAddSpuBtn || (
        <SpuTable
          setSpuSaleAttrList={setSpuSaleAttrList}
          setSpuInfo={setSpuInfo}
        />
      )}
      {/* 添加Spu表单 */}
      {isAddSpuBtn && (
        <SpuForm spuInfo={spuInfo} setSpuSaleAttrList={setSpuSaleAttrList} />
      )}
    </Flex>
  )
}

export default Spu
