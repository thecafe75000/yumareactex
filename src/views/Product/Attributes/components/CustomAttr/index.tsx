import { useEffect, useState } from 'react'
import { FileAddFilled } from '@ant-design/icons'
import { Button, Flex, Input, Table } from 'antd'
import { useMessage } from '@/utils'

 type TAttrValue = {
   id: string
   valueName: string
   attrId: string
   isInput: boolean
 }
type TAttrValueList = TAttrValue[]

type TProps = {
  attrName: string
  value?: any
  name?:any
  onChange?: (value: any) => void
}

const CustomAttr = (props: TProps) => {
  // 在Form.Item内不需要传任何东西，value和onChange直接被传入给了子组件
  // value 就是父组件的表单值
  const { attrName, value, name, onChange } = props
  const message = useMessage()
  const [attrValueList, setAttrValueList] = useState<TAttrValueList>([])

  // 封装函数
  // 参数 valueName 是用户输入的内容, id 是当前输入框对应的行的 id
  // valueName 会被用来和 attrValueList 中现有的 valueName 进行比较, 确保没有重复的内容被输入或提交
  const fn = (valueName: string, id: string) => {
    // 如果没有写入内容, 那么删除这行
    if (!valueName) {
      setAttrValueList(attrValueList.filter((item:TAttrValue) => item.id !== id))
      // 一定要有return, 没有内容的空行不会被删除，会留在原处
      return
    }
    // console.log('vName,vList', valueName, attrValueList)
    // 不允许内容重复,即不能输入相同的内容
    // item.id !== id:在更新 valueName 时，同一个输入框的 id 是唯一的,如果用户没有修改内容，这里不应该误判为重复（即不和自身进行比较）
    if (attrValueList.some((item:TAttrValue) => item.valueName === valueName && item.id !== id)) {
      message.error('You can not input the same attribute value ~~')
      return
    }
    
    setAttrValueList(
      attrValueList.map((item: TAttrValue) => {
        if (item.id === id) {
          item.valueName = valueName
          item.isInput = false
        }
        return item
      })
    )
  }

  // 使用父组件AddAttributes表单控件的表单值来初始化子组件里的表单
  useEffect(() => {
    if (value) {
      setAttrValueList(value)
    }
  }, [value]) 

  useEffect(() => {
    // 可选链操作符 ?.
    // 如果 onChange 是 null 或 undefined，即不存在onChange函数,会返回 undefined，不会调用函数，避免报错
    // 如果存在 onChange 函数，则调用它并传入 attrValueList 作为参数
    onChange?.(attrValueList)
  }, [attrValueList])

  return (
    <Flex vertical gap='middle'>
      <Button
        // 按钮可用条件：1-属性名字必须有 2-表格中不允许出现文本输入框
        disabled={!(name||attrName.length) || attrValueList.some((v:TAttrValue) => v.isInput)}
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
        // onRow函数:用于设置行属性
        // 点击表的一行,点击行, record就是点击的那行的信息
        onRow={(record: any) => {
          return {
            onClick: () => {
              setAttrValueList(JSON.parse(JSON.stringify(attrValueList)).map((item:any) => {
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
            render(valueName, rows:any) {
              if (rows.isInput) {
                return (
                  <Input
                    defaultValue={valueName}
                    onBlur={(e) => {
                      fn(e.target.value.trim(), rows.id)
                    }}
                    onKeyUp={(e: any) => {
                      if (e.keyCode === 13) {
                        fn(e.target.value.trim(), rows.id)
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
            dataIndex: 'id',
            align: 'center',
            // 参数 id 就是 dataIndex
            render(id) {
              return (
                <Button
                  onClick={(e) => {
                    // 阻止冒泡
                    e.stopPropagation()
                    // filter返回一个包含所有符合条件的元素的新数组，即保留所有 id 不等于指定 id 的元素
                    setAttrValueList(
                      attrValueList.filter((item: TAttrValue) => item.id !== id)
                    )
                  }}
                >
                  Delete
                </Button>
              )
            }
          }
        ]}
        dataSource={attrValueList}
      />
    </Flex>
  )
}

export default CustomAttr
