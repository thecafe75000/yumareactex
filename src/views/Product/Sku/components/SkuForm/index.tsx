import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import type { TStoreState } from '@/store'
import { getSpuListByCategoryId } from '@/api/sku'
import { getAttrListByCategoryId } from '@/api/attributes'
import AttrValueList from '../AttrValueList'
import SaleAttrValueList from '../SaleAttrValueList'
import Imgs from '../Imgs'


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

  useEffect(() => {
    if (categoryId.category3Id) {
      getSpuListByCategoryId(categoryId.category3Id).then((value: any) => {
        setSpuList(value.spuList)
        // console.log('spuList',value.spuList)
        // 如果接收的参数中有spuId, 则将spuId的值作为spu列表的选中项
        if (location.state && location.state.spuId) {
          // console.log('spuId', location.state.spuId)
          form.setFieldValue('spuId', location.state.spuId)
          const spuInfo = value.spuList.find((v: any) => v._id === location.state.spuId)
          // SalesAttr 销售属性的各项值
          const spuSaleAttrList = spuInfo.spuSaleAttrList.filter((v: any) => v.isSelected)
          // console.log('sales', spuSaleAttrList)
          setSpuSaleAttrList(spuSaleAttrList)
          // 设置图片
          const imgList = spuInfo.imgs
          setImgs(imgList)
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
      onFinish={(body) => {
        console.log('body', body)
        body.categoryId = categoryId.category3Id
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
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SkuForm
