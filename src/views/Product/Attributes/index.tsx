import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAttributesListAsync } from '@/store/slice/attributes'
import { useAppDispatch } from '@/utils'
import type {TStoreState} from '@/store'
import { Button, Flex, Space, Table, Tag } from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import CategoryListCom from '@/views/Product/components/CategoryListCom'


const Attributes = () => {
  const dispatch = useAppDispatch()
  const { pageInfo } = useSelector((state: TStoreState) => state.config) as any
  const { attributesList } = useSelector((state: TStoreState) => state.attributes) as any

  useEffect(() => {
    dispatch(getAttributesListAsync({
      pageNo: 1,
      pageSize: pageInfo.pageSize
    }))
  },[])

  return (
    <Flex vertical gap='middle'>
      <CategoryListCom />
      <Table
        bordered={true}
        rowKey='_id'
        scroll={{
          x: 1600
        }}
        columns={[
          {
            title: 'Number',
            dataIndex: '_id',
            align: 'center',
            width: 90,
            render(id, row, index) {
              return (pageInfo.current - 1) * pageInfo.pageSize + index + 1
            }
          },
          {
            title: 'Attribute Name',
            dataIndex: 'name',
            align: 'center'
          },
          {
            title: 'Sorting',
            dataIndex: 'sort',
            align: 'center',
            width: 90
          },
          {
            title: 'Attribute Value Name',
            dataIndex: 'attrValueList',
            // align: 'center',
            width: 700,
            render(attrValueList) {
              return attrValueList
                .filter((item: any) => item.valueName)
                .map((item: any) => {
                  return (
                    <Tag key={item.id} color='#51c4d3'>
                      {item.valueName}
                    </Tag>
                  )
                })
            }
          },
          {
            title: 'Created Time',
            dataIndex: 'addTime',
            align: 'center'
          },
          {
            title: 'Updated Time',
            dataIndex: 'upTime',
            align: 'center'
          },
          {
            title: 'Operation',
            align: 'center',
            dataIndex: '_id',
            fixed: 'right',
            render() {
              return (
                <Space>
                  <Button icon={<EditFilled />} type='primary' shape='circle' />
                  <Button
                    icon={<DeleteFilled />}
                    type='primary'
                    danger
                    shape='circle'
                  />
                </Space>
              )
            }
          }
        ]}
        dataSource={attributesList}
      />
    </Flex>
  )
}

export default Attributes
