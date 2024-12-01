import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Space, Switch, Table, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, FileAddOutlined, PlusOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/utils'
import { getProductAllCategoryListAsync } from '@/store/slice/category'
import type { TStoreState } from '@/store'


const Category = () => {
  const dispatch = useAppDispatch()
  const { categoryList } = useSelector((state: TStoreState) => state.category)

  useEffect(() => {
    dispatch(getProductAllCategoryListAsync())
  }, [])

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Tooltip title='Add product category'>
        <Button icon={<PlusOutlined />} type='primary'>
          Add product category
        </Button>
      </Tooltip>
      <Table
        columns={[
          {
            title: 'Product Name',
            dataIndex: 'name',
            align: 'center'
          },
          {
            title: 'Level',
            dataIndex: 'catLevel',
            align: 'center'
          },
          {
            title: 'Sorting',
            dataIndex: 'sort',
            align: 'center'
          },
          {
            title: 'Created Time',
            dataIndex: 'addTime',
            align: 'center'
          },
          {
            title: 'Show or Not',
            dataIndex: 'showFlag',
            align: 'center',
            render(showFlag) {
              return (
                <Switch checked={showFlag===1}></Switch>
              )
            }
          },
          {
            title: 'Modified Time',
            dataIndex: 'upTime',
            align: 'center'
          },
          {
            title: 'Operation',
            align: 'center',
            render() {
              return (
                <Space>
                  <Button icon={<FileAddOutlined />}>+ a new subcategory</Button>
                  <Button icon={<EditOutlined />} type='primary'>Edit</Button>
                  <Button icon={<DeleteOutlined />} type='primary'danger={true}>Delete</Button>
                </Space>
              )
            }
          }
        ]}
        rowKey='_id'
        dataSource={categoryList}
      />
    </Space>
  )
}

export default Category
