import React, { useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, useMessage } from '@/utils'
import { getUserListAsync, putStateUserInfoByIdAsync } from '@/store/slice/user'
import { Button, Form, Flex, Input, Table, Switch } from 'antd'
import { SearchOutlined, AntDesignOutlined } from '@ant-design/icons'
import type { TStoreState } from '@/store'

const UserList = () => {
  const dispatch = useAppDispatch()
  const message = useMessage()
  const { userList } = useSelector((state: TStoreState) => state.user)
  const { loading } = useSelector((state: TStoreState) => state.config)
  const { pageInfo } = useSelector((state: TStoreState) => state.config)
 
  
  useEffect(() => {
    dispatch(getUserListAsync(1, pageInfo.pageSize))
  }, [])

  const [searchForm] = Form.useForm()

  return (
    <Flex vertical={true} gap='middle'>
      <Form
        form={searchForm}
        layout='inline'
        name='basic'
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={(content) => {
          dispatch(getUserListAsync(1, pageInfo.pageSize, content.keyword))
        }}
        autoComplete='off'
      >
        <Form.Item name='keyword'>
          <Input
            placeholder='Your account, nickname or phone number'
            style={{ width: 300 }}
          />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} type='primary' htmlType='submit'>
            Search
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => {
            // 重置表单,  searchForm是表单实例
            searchForm.resetFields()
            dispatch(getUserListAsync(1, pageInfo.pageSize))
          }} icon={<AntDesignOutlined />} htmlType='reset'>
            Reset
          </Button>
        </Form.Item>
      </Form>
      <Table
        pagination={{
          ...pageInfo,
          // 分页器里可选择每页展示的数据条数和分几页来显示
          async onChange(current, pageSize) {
            // console.log('searchForm', searchForm.getFieldValue('keyword'))
            await dispatch(getUserListAsync(current, pageSize,searchForm.getFieldValue('keyword')))
          }
        }}
        loading={loading}
        bordered
        rowKey='_id'
        columns={[
          {
            align: 'center',
            title: 'Number',
            dataIndex: '_id',
            render(id, row, index) {
              return index + 1
            }
          },
          {
            align: 'center',
            title: 'Cell Phone',
            dataIndex: 'phone'
          },
          {
            align: 'center',
            title: 'Nickname',
            dataIndex: 'nickName'
          },
          {
            align: 'center',
            title: 'Locked or Not',
            dataIndex: 'status',
            render(status, row: any) {
              // status:1 未冻结  status:0 冻结
              return (
                <Switch
                  defaultChecked={status === 0}
                  onChange ={async () => {
                    // console.log('pageInfoCurrent',pageInfo.current)
                    // 调用更新状态的接口以更新数据
                    const result: any = await dispatch(putStateUserInfoByIdAsync(
                        row._id,
                        status === 0 ? 1 : 0,
                        pageInfo.current
                      )
                    )
                    await dispatch(getUserListAsync(pageInfo.current, pageInfo.pageSize, searchForm.getFieldValue('keyword')))
                    message.success(result.message)
                  }}
                />
              )
            }
          },
          {
            align: 'center',
            title: 'Registration Time',
            dataIndex: 'regTime'
          },
          {
            align: 'center',
            title: 'Last Login Time',
            dataIndex: 'loginTime'
          }
        ]}
        dataSource={userList}
      />
    </Flex>
  )
}

export default UserList