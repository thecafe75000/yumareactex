import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Flex, Table, Image, Switch, Space, Form, Input } from 'antd'
import { EditOutlined, DeleteOutlined,PlusCircleOutlined, SearchOutlined, AntDesignOutlined  } from '@ant-design/icons'
import { useAppDispatch } from '@/utils'
import { getBrandsListAsync } from '@/store/slice/brands'
import type { TStoreState } from '@/store'
import TrademarkModal from './components/TrademarkModal'
import request from '@/axios/request'


const Trademark = () => {
  const dispatch = useAppDispatch()
  const { pageInfo } = useSelector((state: TStoreState) => state.config)
  const { brandsList } = useSelector((state: TStoreState) => state.brands)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [searchForm] = Form.useForm()

  // 控制modal的显示和隐藏
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(getBrandsListAsync(1,pageInfo.pageSize))
  }, [])
  
  return (
    <Flex vertical={true} gap='middle'>
      <Flex gap='middle'>
        <Button
          onClick={() => setIsModalOpen(true)}
          type='primary'
          icon={<PlusCircleOutlined />}
        >
          Add a product
        </Button>
        <Button
          disabled={selectedRowKeys.length === 0}
          type='primary'
          danger
          icon={<DeleteOutlined />}
          onClick={async () => {
            // 直接调用接口
            await request.delete('/product/trademarkBatchRemove', {
              data: selectedRowKeys
            })
            await dispatch(getBrandsListAsync(pageInfo.current, pageInfo.pageSize))
          }}
        >
          Batch Deletion
        </Button>

        <Form
          form={searchForm}
          layout='inline'
          name='basic'
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(body) => {
             dispatch(getBrandsListAsync(1, pageInfo.pageSize, body.keyword))
          }}
          autoComplete='off'
        >
          <Form.Item name='keyword'>
            <Input placeholder='Name of the brand' />
          </Form.Item>
          <Form.Item>
            <Button icon={<SearchOutlined />} type='primary' htmlType='submit'>
              Search
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => {
                // 重置表单
                searchForm.resetFields()
                dispatch(getBrandsListAsync(1, pageInfo.pageSize))
              }}
              icon={<AntDesignOutlined />}
              htmlType='reset'
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Flex>
      <Table
        rowSelection={{
          // 指定选中的Table里的那行
          selectedRowKeys,
          // onChange 接收一个参数, 该参数就是由选中的每一行的key组成的数组
          onChange: (keys: React.Key[]) => {
            setSelectedRowKeys(keys)
          }
        }}
        scroll={{ x: 1400 }}
        pagination={{
          ...pageInfo,
          onChange: (current, pageSize) => {
            dispatch(getBrandsListAsync(current, pageSize, searchForm.getFieldValue('keyword')))
          }
        }}
        rowKey='_id'
        columns={[
          {
            title: 'Number',
            align: 'center',
            dataIndex: '_id',
            render(id, row, index) {
              return (pageInfo.current - 1) * pageInfo.pageSize + index + 1
            }
          },
          {
            title: 'Brand Name',
            dataIndex: 'name',
            align: 'center'
          },
          {
            title: 'Brand Photo',
            dataIndex: 'img',
            align: 'center',
            render(imgUrl) {
              return <Image src={'/api/' + imgUrl} height={60} />
            }
          },
          {
            title: 'Sorting',
            dataIndex: 'sort',
            align: 'center'
          },
          {
            title: 'Show or Not',
            dataIndex: 'showFlag',
            align: 'center',
            render(showFlag, rows: any) {
              return (
                <Switch
                  onChange={() => {}}
                  checked={showFlag === 1 ? true : false}
                />
              )
            }
          },
          {
            title: 'Created Time',
            dataIndex: 'addTime',
            align: 'center'
          },
          {
            title: 'Modified Time',
            dataIndex: 'upTime',
            align: 'center'
          },
          {
            title: 'Operation',
            align: 'center',
            fixed: 'right',
            render() {
              return (
                <Space>
                  <Button icon={<EditOutlined />} type='primary'>
                    Edit
                  </Button>
                  <Button
                    icon={<DeleteOutlined />}
                    type='primary'
                    danger={true}
                  >
                    Delete
                  </Button>
                </Space>
              )
            }
          }
        ]}
        dataSource={brandsList}
      />
      <TrademarkModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Flex>
  )
}

export default Trademark