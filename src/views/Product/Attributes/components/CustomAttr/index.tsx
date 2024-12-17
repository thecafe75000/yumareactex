import { useState } from 'react'
import { FileAddFilled } from '@ant-design/icons'
import { Button, Flex, Input, Table } from 'antd'
import { useMessage } from '@/utils'

type TProps = {
  attrName: string
}

const CustomAttr = (props: TProps) => {
  const { attrName } = props
  const message = useMessage()
 
  type TAttrValue = {
    id: string
    valueName: string
    attrId: string
    isInput: boolean
  }
  type TAttrValueList = TAttrValue[]
  const [attrValueList, setAttrValueList] = useState<TAttrValueList>([])
  
  return (
    <Flex vertical gap='middle'>
      <Button
        // 按钮可用条件：1-属性名字必须有 2-表格中不允许出现文本输入框
        disabled={attrName.length === 0 || attrValueList.some((v) => v.isInput)}
        style={{ width: 170 }}
        type='primary'
        icon={<FileAddFilled />}
        onClick={() => {
          setAttrValueList([
            ...attrValueList,
            {
              id: Math.random().toString(36).slice(2),
              valueName: '',
              attrId: '',
              isInput: true
            }
          ])
        }}
      >
        Add Attribute Value
      </Button>
      <Table
        bordered
        style={{ width: 800 }}
        pagination={false}
        rowKey='id'
        // 点击表的一行,点击行, record就是点击行的信息
        onRow={(record: TAttrValue) => {
          return {
            onClick: () => {
              setAttrValueList(
                attrValueList.map((item: TAttrValue) => {
                  if (item.id === record.id) {
                    item.isInput = true
                  }
                  return item
                })
              )
            }
          }
        }}
        columns={[
          {
            title: 'Number',
            align: 'center',
            render(id, row, index) {
              return index + 1
            }
          },
          {
            title: 'Attribute Value',
            align: 'center',
            width: 600,
            dataIndex: 'valueName',
            render(valueName, rows: TAttrValue) {
              if (rows.isInput) {
                return (
                  <Input
                    defaultValue={valueName}
                    onBlur={(e) => {
                      setAttrValueList(attrValueList.map((item: TAttrValue) => {
                          if (item.id === rows.id) {
                            item.isInput = false
                            item.valueName = e.target.value.trim()
                          }
                          return item
                        })
                      )
                    }}
                    onKeyUp={(e: any) => {
                      if (e.keyCode === 13) {
                        e.preventDefault()
                        // 如果没有写入内容, 那么删除改行
                        const valueName = e.target.value.trim()
                        if (!valueName) {
                          setAttrValueList(attrValueList.filter(item => item.id !== rows.id))
                          // 一定要有return, 没有内容的空行不会被删除，会留在原处
                          return
                        }
                        // 不允许内容重复,即不能输入相同的内容
                        if (attrValueList.some(item => item.valueName === valueName)) {
                          message.error('You can not input the same attribute value ~~')
                          return
                        }
                        setAttrValueList(
                          attrValueList.map((item: TAttrValue) => {
                            if (item.id === rows.id) {
                              item.isInput = false
                              item.valueName = e.target.value.trim()
                            }
                            return item
                          })
                        )
                      }
                    }}
                    autoFocus
                  />
                )
              }
              return valueName
            }
          },
          {
            title: 'Operation',
            align: 'center'
          }
        ]}
        dataSource={attrValueList}
      />
    </Flex>
  )
}

export default CustomAttr
