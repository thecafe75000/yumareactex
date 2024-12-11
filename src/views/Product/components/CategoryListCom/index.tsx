import { useEffect, useState } from 'react'
import { AntDesignOutlined } from '@ant-design/icons'
import { Button, Form, Select, SelectProps } from 'antd'
import { getCategoryListByParentId } from '@/api/category'

const CategoryListCom = () => {
  const [categoryListOne, setCategoryListOne] = useState<SelectProps['options'] >([])
  const [categoryListTwo, setCategoryListTwo] = useState<SelectProps['options'] >([])
  const [categoryListThree, setCategoryListThree] = useState<SelectProps['options']>([])
  const [disabled, setDisabled] = useState<boolean>(false)
  const [form] = Form.useForm()

  // 封装函数
  const getCategoryListForThreeLevels = async (callback:React.Dispatch<React.SetStateAction<SelectProps['options'] | undefined>>, parentId?:string) => {
     const value = await getCategoryListByParentId(parentId) as any
      // console.log('value by parentId', value)
     const valueForList = value.categoryList.map((item: any) => ({
        value: item._id,
        label: item.name
      }))
     callback(valueForList)
  }

  useEffect(() => {
    getCategoryListForThreeLevels(setCategoryListOne)
  },[])

  return (
    <Form layout='inline' form={form}>
      <Form.Item name='category1Id' style={{ width: 200 }}>
        <Select
          disabled={disabled}
          options={categoryListOne}
          onChange={(value) => {
            // 更改二级分类
            getCategoryListForThreeLevels(setCategoryListTwo, value)
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
            getCategoryListForThreeLevels(setCategoryListThree, value)
            // 清空三级选中的内容
            form.setFieldValue('category3Id', undefined)
          }}
          placeholder='Select a second level category'
        ></Select>
      </Form.Item>
      <Form.Item name='category3Id' style={{ width: 200 }}>
        <Select
          disabled={disabled}
          onChange={() => {
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
            setDisabled(false)
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
