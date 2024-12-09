import React, { useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Modal, Form, Input, Switch, InputNumber, Upload} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { TStoreState } from '@/store'
import { useAppDispatch, useMessage } from '@/utils'
import { setLoading } from '@/store/slice/config'
import { addNewBrandAsync } from '@/store/slice/brands'


const TrademarkModal = (props:any) => {
  const { isModalOpen, setIsModalOpen } = props
  const { loading} = useSelector((state: TStoreState) => state.config)
  // 存储上传的图片
  const [imageUrl, setImageUrl] = useState('')
  const message = useMessage()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleOk = () => {
    form.submit()
    // setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields() 
  }

  return (
    <Modal
      title='Add a brand'
      maskClosable={false}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          sort: 0,
          showFlag: 1
        }}
        // 参数body是表单的内容
        onFinish={async (body) => {
          // console.log('body', body)
          // Ant Design 中存在的message 是一个全局对象，用于显示消息,为了避免变量名冲突写成message:responseMessage
          const { message: responseMessage } = (await dispatch(addNewBrandAsync(body))) as any
          setIsModalOpen(false)
          // 清空表单
          form.resetFields() 
          message.success(responseMessage)
        }}
        autoComplete='off'
      >
        <Form.Item
          label='Brand Name'
          name='name'
          rules={[{ required: true, message: 'Please input your brand name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Brand Logo'
          name='img'
          rules={[{ required: true, message: 'Please input your brand logo!' }]}
          valuePropName='logoimg'
          getValueFromEvent={(info) => {
            if (info.file.status === 'done') {
              // 如果文件已经上传完毕, 则将响应体中的属性url作为收集的表单数据
               return info.file.response.url
            }
          }}
        >
          <Upload
            name='yumaImg' // name是发送到后台的文件参数名,参考接口文档里对应的字段
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            // action指图片要提交到哪里, 即图片上传的地址, 参考接口文档里上传图片的接口地址
            action='/api/api/upload'
            // 设置上传的请求头,根据接口文档说明, 这里需要上传token
            headers={{
              token: localStorage.getItem('token') as string
            }}
            //  beforeUpload函数是上传文件之前的钩子，参数为上传的文件,返回false则是停止上传
            // 参数file是上传文件的信息
            beforeUpload={(file) => {
              // console.log('file', file)
              const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png'
              if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!')
              }
              const isLt2M = file.size / 1024 / 1024 < 10
              if (!isLt2M) {
                message.error('Image must smaller than 10MB!')
              }
              return isJpgOrPng && isLt2M
            }}
            // 限制上传文件数量，当为1时, 则始终用最新上传的文件替换当前文件
            maxCount={1}
            // 文件上传中, 完成, 失败都会调用onChange函数
            onChange={(info: any) => {
              // console.log('upload info', info)
              // 如果正在上传文件
              if (info.file.status === 'uploading') {
                dispatch(setLoading(true))
                return
              }
              // 如果文件已经上传完毕
              if (info.file.status === 'done') {
                dispatch(setLoading(false))
                if (info.file.response.ok === 1) {
                  setImageUrl(info.file.response.url)
                } else if (info.file.response.ok === -1) {
                  message.error(info.file.response.msg)
                } else if (info.file.response.ok === -2) {
                  message.error(info.file.response.msg)
                  navigate('/login')
                }
              }
            }}
          >
            {imageUrl ? (
              <img
                src={'/api/' + imageUrl}
                alt='avatar'
                style={{ width: '100%' }}
              />
            ) : (
              <button style={{ border: 0, background: 'none' }} type='button'>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label='Show or Not'
          name='showFlag'
          valuePropName='checked'
          getValueFromEvent={(e) => {
            return e ? 1 : 0
          }}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label='Sorting'
          name='sort'
          rules={[{ required: true, message: 'Please input your sorting!' }]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TrademarkModal