import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Button, Flex, Space, Table } from 'antd'
import { useAppDispatch } from '@/utils'
import type { TStoreState } from '@/store'
import { getSpuListAsync, useSelectorSpu } from '@/store/slice/spu'

const SpuTable = () => {
  const dispatch = useAppDispatch()
  const { pageInfo, categoryId } = useSelector((state: TStoreState) => state.config)
  const { spuList } = useSelectorSpu()

  useEffect(() => {
    const { category1Id, category2Id, category3Id } = categoryId
    dispatch(
      getSpuListAsync({ pageNo: 1, pageSize: pageInfo.pageSize, category1Id, category2Id, category3Id })
    )
  }, [categoryId])

  return (
    <Flex vertical gap='middle'>
      <Button
        // 非空字符串取反为false
        disabled={!categoryId.category3Id}
        type='primary'
        style={{ width: 200 }}
      >
        Add Spu
      </Button>
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
    </Flex>
  )
}

export default SpuTable
