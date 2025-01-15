import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, Input, InputNumber, Select, Space } from 'antd'
import type { TStoreState } from '@/store'
import { getSpuListByCategoryId, postProductSku, putProductSku } from '@/api/sku'
import { getAttrListByCategoryId } from '@/api/attributes'
import AttrValueList from '../AttrValueList'
import SaleAttrValueList from '../SaleAttrValueList'
import Imgs from '../Imgs'
import { useAppDispatch, useMessage } from '@/utils'
import { setIsAddBtn } from '@/store/slice/config'


const SkuForm = () => {
  const { categoryId } = useSelector((state: TStoreState) => state.config)
  const [spuList, setSpuList] = useState([])
  const location = useLocation()
  const [form] = Form.useForm()
  const [attrList, setAttrList] = useState([])
  // SalesAttr 销售属性列表
  const [spuSaleAttrList, setSpuSaleAttrList] = useState([]) 
  // 图片
  const [imgs, setImgs] = useState([])
  const message = useMessage()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (categoryId.category3Id) {
      getSpuListByCategoryId(categoryId.category3Id).then((value: any) => {
        setSpuList(value.spuList)
        // console.log('spuList',value.spuList)
        // 如果接收的参数中有spuId, 则将spuId的值作为spu列表的选中项
        if (location.state && location.state.spuId) {
             form.setFieldValue('spuId', location.state.spuId)
             const spuInfo = value.spuList.find((v: any) => v._id === location.state.spuId)
             // SalesAttr 销售属性的各项值
             const spuSaleAttrList = spuInfo.spuSaleAttrList.filter((v: any) => v.isSelected)
             setSpuSaleAttrList(spuSaleAttrList)
             // 设置图片
             const imgList = spuInfo.imgs
             setImgs(imgList)
          if (location.state.rows) {
            // 修改
            form.setFieldValue('name', location.state.rows.name)
            form.setFieldValue('price', location.state.rows.price)
            form.setFieldValue('weight', location.state.rows.weight)
            form.setFieldValue('sort', location.state.rows.sort)
            form.setFieldValue('description', location.state.rows.description)
            // 平台属性
            form.setFieldValue('skuAttrValueList', location.state.rows.skuAttrValueList)
            // 销售属性
            form.setFieldValue('skuSaleAttrValueList', location.state.rows.skuSaleAttrValueList)
            form.setFieldValue('imgs', location.state.rows.imgs)
            if (!location.state.isAdd) {
               form.setFieldValue('_id', location.state.rows._id)
            }
          } 
        }
      })

      // 根据三级分类ID获取属性列表
      getAttrListByCategoryId(categoryId.category3Id).then((value: any) => {
        setAttrList(value.data)
      })
    }
  }, [categoryId.category3Id])

  return (
    <Form
      name='skuForm'
      form={form}
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 22 }}
      style={{ minWidth: 600 }}
      initialValues={{
        sort: 0
      }}
      onFinish={async (body) => {
        body.categoryId = categoryId.category3Id
        let result:any
        if (body._id) {
          // 修改
          result = await putProductSku(body)
        } else {
          // 提交表单
          result = await postProductSku(body)
        }
        message.success(result.message)
        dispatch(setIsAddBtn(false))
      }}
      autoComplete='off'
    >
      <Form.Item
        label='Choose Spu'
        name='spuId'
        rules={[{ required: true, message: 'Please choose Spu!' }]}
      >
        <Select
          showSearch
          style={{ width: 230 }}
          placeholder='Choose Spu'
          onChange={(spuId) => {
            const spuInfo = spuList.find((v: any) => v._id === spuId) as any
            // 销售属性
            const spuSaleAttrList = spuInfo.spuSaleAttrList.filter((v: any) => v.isSelected)
            setSpuSaleAttrList(spuSaleAttrList)
            // 设置图片
            setImgs(spuInfo.imgs)
          }}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={spuList.map((item: any) => ({
            value: item._id,
            label: item.name
          }))}
        />
      </Form.Item>
      <Form.Item name='_id' hidden>
        <Input/>
      </Form.Item>
      <Form.Item
        label='Sku Name'
        name='name'
        rules={[{ required: true, message: 'Please input Sku name' }]}
      >
        <Input style={{ width: 230 }} placeholder='Please input Sku name' />
      </Form.Item>
      <Form.Item
        label='Sku Price'
        name='price'
        rules={[{ required: true, message: 'Please input Sku price' }]}
      >
        <InputNumber
          style={{ width: 230 }}
          prefix='$'
          suffix='HKD'
          placeholder='Please input Sku price'
        />
      </Form.Item>
      <Form.Item
        label='Sku Weight'
        name='weight'
        rules={[{ required: true, message: 'Please input Sku weight' }]}
      >
        <InputNumber
          style={{ width: 230 }}
          suffix='g'
          placeholder='Please input Sku weight(g)'
        />
      </Form.Item>
      <Form.Item
        label='Description'
        name='description'
        rules={[{ required: true, message: 'Please input Sku description' }]}
      >
        <Input.TextArea
          style={{ width: 550 }}
          placeholder='Please input Sku description'
        />
      </Form.Item>
      <Form.Item
        label='Sorting'
        name='sort'
        rules={[{ required: true, message: 'Please input Sku sorting' }]}
      >
        <InputNumber
          style={{ width: 100 }}
          placeholder='Please input Sku sorting'
        />
      </Form.Item>
      <Form.Item
        label='Attributes'
        name='skuAttrValueList'
        rules={[
          { required: true, message: 'Please choose platform attributes' }
        ]}
      >
        <AttrValueList attrList={attrList} />
      </Form.Item>
      <Form.Item
        label='SalesAttr'
        name='skuSaleAttrValueList'
        rules={[{ required: true, message: 'Please choose sales attributes' }]}
      >
        <SaleAttrValueList spuSaleAttrList={spuSaleAttrList} />
      </Form.Item>
      <Form.Item
        label='Photo Choice'
        name='imgs'
        rules={[{ required: true, message: 'Please choose photo' }]}
      >
        <Imgs imgs={imgs} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button type='primary' danger htmlType='submit' onClick={() => {
            dispatch(setIsAddBtn(false))
            if (location.state) {
              navigate('/product/sku')
            }
          }}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default SkuForm
