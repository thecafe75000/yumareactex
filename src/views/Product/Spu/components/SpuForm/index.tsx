import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Form, Input, InputNumber, Select, Space, Upload, UploadFile } from 'antd'
import { getAllBrands } from '@/api/brands'
import { PlusOutlined } from '@ant-design/icons'
import SalesAttrList from '../SalesAttrList'
import {  postProductSpu, putProductSpu } from '@/api/spu'
import { useAppDispatch, useMessage } from '@/utils'
import type { TStoreState } from '@/store'
import { setIsAddBtn } from '@/store/slice/config'
import { getSpuSaleAttrList } from '@/api/spu'


const SpuForm = (props:any) => {
  const { spuInfo } = props
  // 定义存储所有品牌列表的状态
  const [brandsList, setBrandsList] = useState([])
  // 存储的图片列表
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [form] = Form.useForm()
  const message = useMessage()
  const dispatch = useAppDispatch()
  const {categoryId} = useSelector((state: TStoreState) => state.config)

  useEffect(() => {
    // 获取所有品牌
    getAllBrands().then((value:any)=> {
      // console.log(value)
      const {trademarkList} = value
      setBrandsList(trademarkList)
    })
  }, [])
  
  useEffect(() => {
    if (spuInfo) {
      // 深复制
      const copyFileList = JSON.parse(JSON.stringify(spuInfo.imgs)).map((item: any) => {
          item.response = {
            url: item.url
          }
          item.url = '/api/' + item.url
          item.uid = item.id
          item.name = item.id
          item.status = 'done'

          delete item.id
          return item
        }
      )
      form.setFieldValue('name', spuInfo.name)
      form.setFieldValue('_id', spuInfo._id)
      form.setFieldValue('trademarkId', spuInfo.trademarkId)
      form.setFieldValue('description', spuInfo.description)
      form.setFieldValue('sort', spuInfo.sort)
      form.setFieldValue('imgs', { fileList: copyFileList })
      // 设置销售属性
      form.setFieldValue('spuSaleAttrList', spuInfo.spuSaleAttrList)
      setFileList(copyFileList)
    } else {
      // 清空表单
      form.resetFields()
      getSpuSaleAttrList().then((value: any) => {
        // 设置销售属性
        form.setFieldValue('spuSaleAttrList',value.spuSaleAttrList.map((item: any) => {
            // item.id = item.id.toString()
            return item
          }))
      })
    }
  }, [spuInfo])
  
  return (
    <Form
      form={form}
      name='spuForm'
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      style={{ minWidth: 600 }}
      initialValues={{
        sort: 0
      }}
      onFinish={ async (body) => {
        // console.log('body', body)
        // 把数据结构转成与对应接口文档里的数据结构一致
        body.imgs = body.imgs.fileList.map((img: any) => ({
          id: img.uid,
          url: img.response.url
        }))
        let result: any
        // 有_id就是编辑表单, 否则就是给表单添加数据
        if (body._id) {
          body.categoryId = spuInfo.categoryId
          result = await putProductSpu(body)
        } else {
          body.categoryId = categoryId.category3Id
          // 提交表单数据
          result = await postProductSpu(body)
        }
       
        // 获取Spu列表信息以更新页面数据
        // await dispatch(getSpuListAsync({
        //     pageNo: 1,
        //     pageSize: pageInfo.pageSize,
        //     ...categoryId
        // }))
        dispatch(setIsAddBtn(false))
        message.success(result.message)
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
        rules={[{ required: true, message: 'Please choose your sales attribute!' }]}
      >
        <SalesAttrList/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button
            type='primary'
            onClick={(e) => {
              form.submit()
          }}>
            Submit
          </Button>
          <Button onClick={() => {
            dispatch(setIsAddBtn(false))
          }}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default SpuForm
