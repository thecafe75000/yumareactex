import { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Space } from 'antd'
import CustomAttr from '../CustomAttr'
import request from '@/axios/request'
import { useMessage } from '@/utils'

const AddAttributes = (props:any) => {
  const { setAddAttrClick, attrInfo} = props
  const [attrName, setAttrName] = useState<string>('')
  const [form] = Form.useForm()
  const message = useMessage()

  useEffect(() => {
    if (attrInfo) {
      form.setFieldValue('name', attrInfo.name)
      form.setFieldValue('sort', attrInfo.sort)
      form.setFieldValue('attrValueList', attrInfo.attrValueList)
      form.setFieldValue('_id', attrInfo._id)
    }
  }, [attrInfo])

  return (
    <Form
      form={form}
      name='addAttr'
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 20 }}
      style={{ minWidth: 600 }}
      initialValues={{}}
      // 点击按钮submit会触发onFinish回调, 参数body则是表单收集到的数据
      onFinish={async (body) => {
        // console.log('body', body)
        // console.log('attrInfo', attrInfo)
        let result: any

        if (!attrInfo) {
          message.error('Attribute info is missing, please try it again')
        }

        // 如果有_id, 就修改，没有就提交
        if (body._id) {
          // 修改操作
          body.categoryId = attrInfo.categoryId 
          result = await request.put('/product/attr', body)
        } else {
          // 添加操作
          body.categoryId = attrInfo.category3Id
          result = await request.post('/product/attr', body)
          
        }
        setAddAttrClick(false)
        message.success(result.message)
      }}
      autoComplete='off'
    >
      <Form.Item name='_id' hidden>
        <Input />
      </Form.Item>
      <Form.Item
        label='Attribute Name'
        // name 的值参考接口文档
        name='name'
        rules={[{ required: true, message: 'Please input attribute name!' }]}
      >
        <Input
          style={{ width: 150 }}
          onChange={(e) => {
            setAttrName(e.target.value.trim())
          }}
        />
      </Form.Item>
      <Form.Item
        label='Sorting'
        name='sort'
        rules={[
          { required: true, message: "The sorting depends on number's size!" }
        ]}
      >
        <InputNumber style={{ width: 90 }} />
      </Form.Item>
      <Form.Item label='Attribute Value' name='attrValueList'>
        <CustomAttr attrName={attrName} name={ attrInfo?.name} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 3, span:19 }}>
        <Space size={30}>
          <Button
            type='primary'
            onClick={() => {
              // 提交表单通过表单实例form
              form.submit()
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              setAddAttrClick(false)
            }}
          >
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default AddAttributes
