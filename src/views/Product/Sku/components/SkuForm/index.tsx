import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Button, Form, Select } from 'antd'
import type { TStoreState } from '@/store'
import { getSpuListByCategoryId } from '@/api/sku'


const SkuForm = () => {
  const { categoryId } = useSelector((state: TStoreState) => state.config)
  const [spuList, setSpuList] = useState([])
  const location = useLocation()
  const [form] = Form.useForm()

  useEffect(() => {
    if (categoryId.category3Id) {
      getSpuListByCategoryId(categoryId.category3Id).then((value: any) => {
        setSpuList(value.spuList)
        // 如果接收的参数中有spuId, 则将spuId的值作为spu列表的选中项
        if (location.state && location.state.spuId) {
          form.setFieldValue('spuId',location.state.spuId)
        }
      })
      // console.log('categoryId', categoryId)
    }
  },[])
  return (
    <Form
      name='skuForm'
      form={form}
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 22 }}
      style={{ minWidth: 600 }}
      onFinish={(body) => {
        console.log('body', body)
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
          style={{width:200}}
          placeholder='Choose Spu'
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={spuList.map((item: any) => {
            return {
              value: item._id,
              label: item.name
            }
          })}
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SkuForm
