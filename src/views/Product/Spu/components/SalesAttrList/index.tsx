import React, { useEffect, useState } from 'react'
import { Button, Flex, Select, Table } from 'antd'
import { getSpuSaleAttrList } from '@/api/spu'

type TProps = {
  onChange?: (v: number) => void
}

const SalesAttrList = (props: TProps) => {
  // const { onChange } = props
  // 存储销售属性列表的状态
  const [spuSaleAttrList, setSpuSaleAttrList] = useState<any[]>([])

  useEffect(() => {
    getSpuSaleAttrList().then((value:any)=> {
      // console.log('spuValue',value)
      const { spuSaleAttrList } = value
      setSpuSaleAttrList(spuSaleAttrList)
    })
  }, [])
  
  return (
    <Flex vertical gap='middle'>
      <Select
        mode='tags'
        style={{ width: 300 }}
        placeholder='Please choose sales attribute'
        onChange={(e) => {
          setSpuSaleAttrList(spuSaleAttrList.map((item: any)=>{
            if (e.includes(item.id)) {
              item.isSelected = true
            } else {
              item.isSelected = false
            }
            return item
          }))
        }}
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
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: 'Operation',
            align: 'center',
            dataIndex: 'id',
            width: 100,
            render() {
              return (
                <Button type='primary' danger>
                  Delete
                </Button>
              )
            }
          }
        ]}
        dataSource={spuSaleAttrList.filter((item:any)=>item.isSelected)}
      />
    </Flex>
  )
}

export default SalesAttrList
