import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DeleteFilled, EditFilled, FileAddFilled  } from '@ant-design/icons'
import { Button, Flex, Space, Table, Tag } from 'antd'
import { useAppDispatch } from '@/utils'
import type { TStoreState } from '@/store'
import { getAttributesListAsync } from '@/store/slice/attributes'

type TProps = {
  category1Id: string
  category2Id: string
  category3Id: string
  setAddAttrClick: React.Dispatch<React.SetStateAction<boolean>>
}
const AttrTable = (props: TProps) => {
  const { category1Id, category2Id, category3Id, setAddAttrClick } = props
  const { pageInfo } = useSelector((state: TStoreState) => state.config) as any
  const { attributesList } = useSelector((state: TStoreState) => state.attributes) as any

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      getAttributesListAsync({
        pageNo: 1,
        pageSize: pageInfo.pageSize,
        category1Id,
        category2Id,
        category3Id
      })
    )
  }, [category1Id, category2Id, category3Id])

  return (
    <Flex vertical gap='middle'>
      <Button
        disabled={category3Id === ''}
        icon={<FileAddFilled />}
        type='primary'
        style={{ width: 150 }}
        onClick={() => {
          setAddAttrClick(true)
        }}
      >
        Add attributes
      </Button>
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

export default AttrTable
