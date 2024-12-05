import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Table, Image, Switch, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/utils'
import { getBrandsListAsync } from '@/store/slice/brands'
import type { TStoreState } from '@/store'


const Trademark = () => {
  const dispatch = useAppDispatch()
  const { pageInfo } = useSelector((state: TStoreState) => state.config)
  const { brandsList } = useSelector((state: TStoreState) => state.brands)

  useEffect(() => {
    dispatch(getBrandsListAsync(1,pageInfo.pageSize))
  }, [])
  
  return (
    <Table
      pagination={{
        ...pageInfo,
        onChange: (current, pageSize) => {
          dispatch(getBrandsListAsync(current, pageSize))
        }
      }}
      rowKey='_id'
      columns={[
        {
          title: 'Number',
          align: 'center',
          dataIndex: '_id',
          render(id, row, index) {
            return (pageInfo.current-1)*pageInfo.pageSize + index + 1
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
            return <Image src={'/api/' + imgUrl} width={60} />
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
                onChange={() => { }}
                checked={showFlag === 1? true : false}
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
          render() {
            return (
              <Space>
                <Button icon={<EditOutlined />} type="primary">Edit</Button>
                <Button icon={<DeleteOutlined />} type='primary' danger={true}>Delete</Button>
              </Space>
            )
          }
        }
      ]}
      dataSource={brandsList}
    />
  )
}

export default Trademark