import { useEffect, useState } from 'react'
import { Button, Flex, Input, Select, Space, Table, Tag } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import { getSpuSaleAttrList } from '@/api/spu'
import { useMessage } from '@/utils'

type TProps = {
  value?:any
  onChange?: (v: any) => void
}

const SalesAttrList = (props: TProps) => {
  const {value, onChange} = props
  // 存储销售属性列表的状态
  const [spuSaleAttrList, setSpuSaleAttrList] = useState<any[]>([])
  const message = useMessage()

  useEffect(() => {
     if (value && spuSaleAttrList.length === 0) {
       setSpuSaleAttrList(JSON.parse(JSON.stringify(props.value)))
     }
  }, [value])

  useEffect(() => {
    if (spuSaleAttrList && spuSaleAttrList.some((item:any)=>item.isSelected)) {
      onChange?.(spuSaleAttrList)
    }
  }, [spuSaleAttrList])
  
  return (
    <Flex vertical gap='middle'>
      <Select
        mode='multiple'
        style={{ width: 300 }}
        placeholder='Please choose sales attribute'
        onChange={(e) => {
          setSpuSaleAttrList(
            spuSaleAttrList.map((item: any) => {
              if (e.includes(item.id)) {
                item.isSelected = true
              } else {
                item.isSelected = false
              }
              return item
            })
          )
        }}
        // 指定当前选中的条目，多选时为一个数组
        value={spuSaleAttrList
          .filter((item: any) => item.isSelected)
          .map((item: any) => item.id)}
        // options 属性必须是一个数组，每个元素是一个对象，并且对象需要至少包含以下两个属性：
        //  label: 选项中显示的文本内容, value: 选项对应的唯一值，用于标识和提交
        options={spuSaleAttrList.map((item: any) => {
          return {
            label: item.name,
            value: item.id
          }
        })}
      />
      <Table
        bordered={true}
        rowKey='id'
        pagination={false}
        columns={[
          {
            title: 'Number',
            align: 'center',
            width: 70,
            render(number, rows, index) {
              return index + 1
            }
          },
          {
            title: 'Attribute Name',
            align: 'center',
            width: 140,
            dataIndex: 'name'
          },
          {
            title: 'Attribute Value',
            // align: 'center',
            dataIndex: 'id',
            render(id, rows) {
              return (
                <Space>
                  {rows.valueArr.map((value: any) => (<Tag onClose={() => {
                        setSpuSaleAttrList(
                          spuSaleAttrList.map((item: any) => {
                            item.valueArr = item.valueArr.filter(
                              (info: any) => info.id !== value.id
                            )
                            return item
                          })
                        )
                      }}
                      key={value.id}
                      color='volcano'
                      closable
                    >
                      {value.name}
                    </Tag>
                  ))}
                  {rows.isAdd && (<Input
                      onPressEnter={(e: any) => {
                        // console.log('Input e', e)
                        // 输入框里必须有输入的内容
                        const name = e.target.value.trim()
                        if (name.length === 0) {
                          message.error('Please input your attribute value ~~')
                          return
                        }
                        // 输入框里的内容不能重复
                        if (
                          rows.valueArr.some((item: any) => item.name === name)
                        ) {
                          message.error(
                            'Duplicate attribute values ​​are not allowed ~~ '
                          )
                          return
                        }
                        setSpuSaleAttrList(
                          spuSaleAttrList.map((item: any) => {
                            if (item.id === id) {
                              item.valueArr.push({
                                id: Math.random().toString(36).slice(2),
                                name
                              })
                              item.isAdd = false
                            }
                            return item
                          })
                        )
                      }}
                      autoFocus
                      style={{ width: 180 }}
                    />
                  )}
                  {rows.isAdd || ( <Button onClick={() => {
                        setSpuSaleAttrList(
                          spuSaleAttrList.map((item: any) => {
                            if (item.id === id) {
                              item.isAdd = true
                            }
                            return item
                          })
                        )
                      }}
                      type='primary'
                      icon={<FileAddOutlined />}
                      shape='circle'
                    />
                  )}
                </Space>
              )
            }
          },
          {
            title: 'Operation',
            align: 'center',
            dataIndex: 'id',
            width: 100,
            render(id) {
              return (
                <Button
                  type='primary'
                  danger
                  onClick={() => {
                    setSpuSaleAttrList(
                      spuSaleAttrList.map((item: any) => {
                        if (item.id === id) {
                          item.isSelected = false
                        }
                        return item
                      })
                    )
                  }}
                >
                  Delete
                </Button>
              )
            }
          }
        ]}
        dataSource={spuSaleAttrList.filter((item: any) => item.isSelected)}
      />
    </Flex>
  )
}

export default SalesAttrList
