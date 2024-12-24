import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DeleteFilled, EditFilled, FileAddFilled  } from '@ant-design/icons'
import { Button, Flex, Space, Table, Tag} from 'antd'
import { useAppDispatch } from '@/utils'
import type { TStoreState } from '@/store'
import { getAttributesListAsync } from '@/store/slice/attributes'
import request from '@/axios/request'


type TProps = {
  category1Id: string | undefined
  category2Id: string | undefined
  category3Id: string | undefined
  setAddAttrClick: React.Dispatch<React.SetStateAction<boolean>>
  setAttrInfo: any
}
const AttrTable = (props: TProps) => {
  const { category1Id, category2Id, category3Id, setAddAttrClick, setAttrInfo } = props
  const { pageInfo } = useSelector((state: TStoreState) => state.config) 
  const { attributesList } = useSelector((state: TStoreState) => state.attributes) 
 
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAttributesListAsync({
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
      {/* 添加属性的按钮 */}
      <Button
        disabled={category3Id === undefined}
        icon={<FileAddFilled />}
        type='primary'
        style={{ width: 150 }}
        onClick={() => {
          setAddAttrClick(true)
          setAttrInfo({category3Id, attributesList:[], sort:'',name:''})
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
            // dataIndex: '_id',
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
            align: 'center',
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
            // render函数的参数分别为当前单元格的值，当前行数据，行索引
            render(_id, rows: any) {
              return (
                <Space>
                  <Button
                    icon={<EditFilled />}
                    type='primary'
                    shape='circle'
                    onClick={() => {
                      setAddAttrClick(true)
                      setAttrInfo({...rows })
                    }}
                  />
                  <Button
                    icon={<DeleteFilled />}
                    type='primary'
                    danger
                    shape='circle'
                    onClick={async () => {
                      await request.delete(`/product/attr/${_id}`)
                      dispatch(
                        getAttributesListAsync({
                          pageNo: 1,
                          pageSize: pageInfo.pageSize,
                          category1Id,
                          category2Id,
                          category3Id
                        })
                      )
                    }}
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
