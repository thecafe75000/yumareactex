import React, { useEffect, useState } from 'react'
import { Button, Form, Select } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons'
import { getCategoryListByParentId } from '@/api/category'
import { useAppDispatch } from '@/utils'
import { setCategoryId, setIsAddBtn } from '@/store/slice/config'
import { useLocation } from 'react-router-dom'

const CategoryListRedux = () => {
  // 一级分类列表
  const [categoryListOne, setCategoryListOne] = useState<any[]>([])
  const [categoryListTwo, setCategoryListTwo] = useState<any[]>([])
  const [categoryListThree, setCategoryListThree] = useState<any[]>([])
  const [disabled, setDisabled] = useState<boolean>(false)
  const [form] = Form.useForm()

  // 封装函数：用于改变选择级别分类列表
  // 调用根据parentId的接口之后，将获取到的分类信息列表更新到状态中
  const updateCategoryListByParentId = (async (upFn:React.Dispatch<React.SetStateAction<any[]>>, parentId?:string) => {
    return getCategoryListByParentId(parentId).then((value: any) => {
      // console.log('value', value)
      upFn(value.categoryList.map((item: any) => {
          return {
            label: item.name,
            value: item._id
          }
        })
      )
    })
  })

  const dispatch = useAppDispatch()
  const location = useLocation()

  const init = async () => {
    // console.log('location ', location)
    // 获取一级分类列表
    await updateCategoryListByParentId(setCategoryListOne)
    if (location.state) {
      // 获取二级分类
      await updateCategoryListByParentId(setCategoryListTwo,location.state.category1Id)
      // 获取三级分类
      await updateCategoryListByParentId(setCategoryListThree,location.state.category2Id)
      form.setFieldValue('category1Id', location.state.category1Id)
      form.setFieldValue('category2Id', location.state.category2Id)
      form.setFieldValue('category3Id', location.state.category3Id)
      dispatch(setCategoryId({
        category1Id: location.state.category1Id,
        category2Id: location.state.category2Id,
        category3Id: location.state.category3Id
      }))
      // 不可点击分类选择框
      setDisabled(true)
      // 切换至添加sku表单
      dispatch(setIsAddBtn(true))
    }
  }
  
  useEffect(() => {
    init()
    // 清理函数, 确保每次进入该组件时，categoryId 都是从一个干净的状态开始，避免了之前状态对当前组件的影响
    return function () {
      dispatch(setCategoryId({}))
    }
  }, [])
  
  return (
    <Form form={form} layout='inline'>
      <Form.Item name='category1Id' style={{ width: 200 }}>
        <Select
          disabled={disabled}
          options={categoryListOne}
          placeholder='category list one here'
          // 获取二级分类：根据id找二级分类
          // 因为参数 e 具体指的是 Select 组件中被选中项的 value。这是 Ant Design 的 Select 组件默认的行为
          // 因此 e 的值就是item._id
          onChange={(e) => {
            updateCategoryListByParentId(setCategoryListTwo, e)
            // dispatch(setCategoryId({ propName: 'category1Id', value: e }))
            // console.log(form.getFieldsValue())
            dispatch(setCategoryId(form.getFieldsValue()))
            // 通过表单实例 form 清空选中的二级与三级分类选项
            form.setFieldValue('category2Id', undefined)
            form.setFieldValue('category3Id', undefined)
            // 清空三级分类列表
            setCategoryListThree([])
          }}
        />
      </Form.Item>
      <Form.Item name='category2Id' style={{ width: 200 }}>
        <Select
          disabled={disabled}
          options={categoryListTwo}
          placeholder='category list two here'
          // 获取三级分类
          onChange={(e) => {
            updateCategoryListByParentId(setCategoryListThree, e)
            dispatch(setCategoryId(form.getFieldsValue()))
            // 通过表单实例 form 清空选中的三级分类选项
            form.setFieldValue('category3Id', undefined)
          }}
        />
      </Form.Item>
      <Form.Item name='category3Id' style={{ width: 200 }}>
        <Select
          disabled={disabled}
          options={categoryListThree}
          placeholder='category list three here'
          onChange={(e) => {
            dispatch(setCategoryId(form.getFieldsValue()))
            setDisabled(true)
          }}
        />
      </Form.Item>
      <Form.Item style={{ width: 200 }}>
        <Button
          type='primary'
          icon={<AntDesignOutlined />}
          onClick={() => {
            form.resetFields()
            setCategoryListTwo([])
            setCategoryListThree([])
            dispatch(setCategoryId(form.getFieldsValue()))
            dispatch(setIsAddBtn(false))
            setDisabled(false)
          }}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CategoryListRedux