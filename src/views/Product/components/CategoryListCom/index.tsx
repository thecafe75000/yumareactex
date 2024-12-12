import { useEffect, useState } from 'react'
import { AntDesignOutlined } from '@ant-design/icons'
import { Button, Form, Select, SelectProps } from 'antd'
import { getCategoryListByParentId } from '@/api/category'

type TProps = {
  setCategory1Id: React.Dispatch<React.SetStateAction<string>>
  setCategory2Id: React.Dispatch<React.SetStateAction<string>>
  setCategory3Id: React.Dispatch<React.SetStateAction<string>>
  onReset:()=> void
}

const CategoryListCom = (props: TProps) => {
  const { setCategory1Id, setCategory2Id, setCategory3Id, onReset} = props
  const [categoryListOne, setCategoryListOne] = useState<SelectProps['options']>([])
  const [categoryListTwo, setCategoryListTwo] = useState<SelectProps['options']>([])
  const [categoryListThree, setCategoryListThree] = useState<SelectProps['options']>([])
  const [disabled, setDisabled] = useState<boolean>(false)
  const [form] = Form.useForm()

  // 封装函数
  const getCategoryListForThreeLevels = async (callback: React.Dispatch<React.SetStateAction<SelectProps['options'] | undefined>>,
    parentId?: string
  ) => {
    const value = (await getCategoryListByParentId(parentId)) as any
    // console.log('value by parentId', value)
    const valueForList = value.categoryList.map((item: any) => ({
      label: item.name, // 转换为 Ant Design 组件Select里options 所需的 label
      value: item._id // 转换为 Ant Design 组件Select里options 所需的 value
    }))
    callback(valueForList)
  }

  useEffect(() => {
    getCategoryListForThreeLevels(setCategoryListOne)
  }, [])

  return (
    <Form layout='inline' form={form}>
      <Form.Item name='category1Id' style={{ width: 200 }}>
        <Select
          disabled={disabled}
          // options 是下拉框里的列表选项
          options={categoryListOne}
          // onChange函数的参数value就是categoryList里的_id的值
          onChange={(value) => {
            // console.log('value1', value)
            // console.log('list1', categoryListOne)
            // 更改二级分类
            getCategoryListForThreeLevels(setCategoryListTwo, value)
            // 更新一级状态
            setCategory1Id(value)
            setCategory2Id('')
            setCategory3Id('')
            // 清空二级和三级选中的内容
            form.setFieldValue('category2Id', undefined)
            form.setFieldValue('category3Id', undefined)
          }}
          placeholder='Select a first level category'
        ></Select>
      </Form.Item>
      <Form.Item name='category2Id' style={{ width: 200 }}>
        <Select
          disabled={disabled}
          options={categoryListTwo}
          onChange={(value) => {
            // console.log('value2', value)
            getCategoryListForThreeLevels(setCategoryListThree, value)
            // 更新二级状态
            setCategory2Id(value)
            setCategory3Id('')
            // 清空三级选中的内容
            form.setFieldValue('category3Id', undefined)
          }}
          placeholder='Select a second level category'
        ></Select>
      </Form.Item>
      <Form.Item name='category3Id' style={{ width: 200 }}>
        <Select
          disabled={disabled}
          onChange={(value) => {
            // console.log('value3', value)
            // 更新三级状态
            setCategory3Id(value)
            setDisabled(true)
          }}
          options={categoryListThree}
          placeholder='Select a third level category'
        ></Select>
      </Form.Item>
      <Form.Item>
        <Button
          onClick={() => {
            // 清空表单
            form.resetFields()
            // 清空表单同时也要清空二级和三级的选项内容
            setCategoryListTwo([])
            setCategoryListThree([])

            // 同时也要重置父级的状态
            setCategory1Id('')
            setCategory2Id('')
            setCategory3Id('')
            setDisabled(false)
            onReset()
          }}
          type='primary'
          icon={<AntDesignOutlined />}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CategoryListCom
