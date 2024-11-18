import { useDispatch, useSelector } from 'react-redux'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Flex, Input } from 'antd'
import { TDispatch, type TStoreState } from '@/store'
import { useNavigate } from 'react-router-dom'
import { useMessage } from '@/utils'
import { postAdminLoginAsync } from '@/store/slice/admin'
import type { TBody } from '@/api/admin'

const Login = () => {
  const message = useMessage()
  const navigate = useNavigate()
  const dispatch = useDispatch<TDispatch>()

  // 获取store中state里的数据
  const { loading } = useSelector((state: TStoreState) => state.config)

  const onFinish = async (body: TBody) => {
    const data: any = dispatch(postAdminLoginAsync(body))
    message.success(data.msg)
    navigate('/')
  }

  return (
    <Flex style={{ height: '100%' }} vertical justify='center' align='center'>
      <h2 style={{ color: '#592620', fontWeight: 'bold', fontSize: '30px' }}>
        Yuma Adminstrative Management System
      </h2>
      <Form
        name='login'
        style={{ width: 400, height: 400 }}
        onFinish={onFinish}
      >
        <Form.Item
          name='adminName'
          rules={[{ required: true, message: 'Please input your admin name' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder='admin name'
            autoComplete='current-adminName'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type='password'
            placeholder='password'
            autoComplete='current-password'
          />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} block type='primary' htmlType='submit'>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default Login
