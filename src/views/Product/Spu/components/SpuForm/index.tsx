import { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Select, Space, Upload, UploadFile } from 'antd'
import { getAllBrands } from '@/api/brands'
import { PlusOutlined } from '@ant-design/icons'
import SalesAttrList from '../SalesAttrList'

const SpuForm = () => {
  // 定义存储所有品牌列表的状态
  const [brandsList, setBrandsList] = useState([])
  // 存储的图片列表
   const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    // 获取所有品牌
    getAllBrands().then((value:any)=> {
      // console.log(value)
      const {trademarkList} = value
      setBrandsList(trademarkList)
    })
  },[])
  
  return (
    <Form
      name='spuForm'
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      style={{ minWidth: 600 }}
      initialValues={{
        sort: 0
      }}
      onFinish={(body) => {
        console.log('body', body)
        // 把数据转结构转成与对应接口文档里的数据结构一致
        body.imgs = body.imgs.fileList.map((img: any) => ({
          id: img.uid,
          url: img.response.url
        }))
      }}
      autoComplete='off'
    >
      <Form.Item
        label='Spu Name'
        name='name'
        rules={[{ required: true, message: 'Please input your Spu name!' }]}
      >
        <Input style={{ width: 180 }} autoComplete='off' />
      </Form.Item>
      <Form.Item
        label='Spu Brand'
        name='trademarkId'
        rules={[{ required: true, message: 'Please input your Spu brand!' }]}
      >
        <Select
          style={{ width: 180 }}
          // showSearch: 提供搜索功能
          showSearch
          placeholder='Select a Spu brand'
          filterOption={(input, option) =>
            // 空值合并运算符（??）是一个逻辑运算符
            // 当左侧的操作数为 null 或者 undefined 时返回其右侧操作数, 否则返回左侧操作数
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={brandsList.map((item: any) => ({
            label: item.name,
            value: item._id
          }))}
        />
      </Form.Item>
      <Form.Item
        label='Spu Description'
        name='description'
        rules={[
          { required: true, message: 'Please input your Spu description!' }
        ]}
      >
        <Input.TextArea style={{ width: 600 }} />
      </Form.Item>
      <Form.Item
        label='Spu Image'
        name='imgs'
        rules={[{ required: true, message: 'Please choose your Spu image!' }]}
      >
        <Upload
          name='yumaImg'
          action='/api/api/upload'
          headers={{
            token: localStorage.getItem('token') as string
          }}
          // 可同时上传多张图片
          multiple={true}
          listType='picture-card'
          fileList={fileList}
          // 图片预览功能
          onPreview={() => {}}
          onChange={(e: any) => {
            // console.log('e', e)
            setFileList(e.fileList)
          }}
        >
          <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>
      <Form.Item
        label='Sorting'
        name='sort'
        rules={[
          { required: true, message: 'Please choose your value of sorting!' }
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label='Spu Sales Attribute'
        name='spuSaleAttrList'
        rules={[
          { required: true, message: 'Please choose your sales attribute!' }
        ]}
      >
        <SalesAttrList/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default SpuForm
