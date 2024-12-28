import {  Flex } from 'antd'
import CategoryListRedux from '@/views/Product/components/CategoryListRedux'
import SpuTable from './components/SpuTable'
import SpuForm from './components/SpuForm'

const Spu = () => {
  return (
    <Flex vertical gap='middle'>
      <CategoryListRedux/>
      <SpuTable />
      <SpuForm/>
    </Flex>
  )
}

export default Spu
