import { useState } from 'react'
import { Button, Form, Input, InputNumber } from 'antd'
import CustomAttr from '../CustomAttr'

const AddAttributes = () => {
  const [attrName, setAttrName] = useState<string>('')

  return (
    <Form
      name='addAttr'
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 20 }}
      style={{ minWidth: 600 }}
      initialValues={{ attrValueList: 90 }}
      // 点击按钮submit会触发onFinish回调, 参数body则是表单收集到的数据
      onFinish={(body) => {
        console.log('body data', body)
      }}
      autoComplete='off'
    >
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
      <Form.Item
        label='Attribute Value'
        name='attrValueList'
        rules={[
          { required: true, message: "The sorting depends on number's size!" }
        ]}
      >
        <CustomAttr attrName={attrName} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 21, offset: 3 }}>
        <Button type='primary'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddAttributes
