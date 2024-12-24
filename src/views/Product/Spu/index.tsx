import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/utils'
import { getSpuListAsync, useSelectorSpu } from '@/store/slice/spu'
import type { TStoreState } from '@/store'
import { Button, Space, Table} from 'antd'

const Spu = () => {
  const dispatch = useAppDispatch()
  const { pageInfo } = useSelector((state: TStoreState) => state.config)
  const {spuList} = useSelectorSpu()

  useEffect(() => {
    dispatch(getSpuListAsync({pageNo:1, pageSize:pageInfo.pageSize}))
  }, [])

  return (
    <Table
      bordered={true}
      rowKey='_id'
      pagination={{
        ...pageInfo,
        onChange(current, pageSize) {
          dispatch(getSpuListAsync({ pageNo: current, pageSize }))
        }
      }}
      columns={[
        {
          title: 'Number',
          align: 'center',
          width: 70,
          render(id, row, index) {
            return (pageInfo.current - 1) * pageInfo.pageSize + index + 1
          }
        },
        {
          title: 'Spu Name',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: 'Spu Description',
          align: 'center',
          dataIndex: 'description'
        },
        {
          title: 'Operation',
          align: 'center',
          render() {
            return (
              <Space>
                <Button type='primary'>Edit</Button>
                <Button type='primary' danger>
                  Delete
                </Button>
              </Space>
            )
          }
        }
      ]}
      dataSource={spuList}
    />
  )
}

export default Spu
