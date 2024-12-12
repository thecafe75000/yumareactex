import { useState } from 'react'
import { Flex } from 'antd'
import CategoryListCom from '@/views/Product/components/CategoryListCom'
import AttrTable from './components/AttrTable'
import AddAttributes from './components/AddAttributes'

const Attributes = () => {
  const [category1Id, setCategory1Id] = useState<string>('')
  const [category2Id, setCategory2Id] = useState<string>('')
  const [category3Id, setCategory3Id] = useState<string>('')

  // 是否点击了添加属性表单
  const [addAttrClick, setAddAttrClick] = useState<boolean>(false)
  
  return (
    <Flex vertical gap='middle'>
      {/* 三级联动 - 类别选择 */}
      <CategoryListCom
        setCategory1Id={setCategory1Id}
        setCategory2Id={setCategory2Id}
        setCategory3Id={setCategory3Id}
        // 当点击重置时执行
        onReset={() => {
          setAddAttrClick(false)
        }}
      />

      {/* 属性表单渲染 */}
      {addAttrClick || (
        <AttrTable
          category1Id={category1Id}
          category2Id={category2Id}
          category3Id={category3Id}
          setAddAttrClick={setAddAttrClick}
        />
      )}

      {/* 添加属性表单 */}
      {addAttrClick && <AddAttributes />}
    </Flex>
  )
}

export default Attributes
