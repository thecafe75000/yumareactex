import { useEffect, useState } from 'react'
import { Table, Image, Button } from 'antd'
import { useMessage } from '@/utils'


const Imgs = (props: any) => {
  const { imgs,onChange,value } = props
  const message = useMessage()
 
  // 选中的图片
  const [defaultId, setDefaultId] = useState<string>()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  useEffect(() => {
    if (imgs && imgs.length > 0) {
      // 判断是否设置了表单的初始值
      if (value && value.length > 0) {
        // 修改
        setDefaultId(value.find((v: any) => v.default).id)
        setSelectedRowKeys(value.map((v:any)=>v.id))
      } else {
        // 添加
         setDefaultId(imgs[0].id)
         setSelectedRowKeys([imgs[0].id])
      }
    }
  }, [imgs])
  
  // 收集表单数据
  useEffect(() => {
    if (selectedRowKeys.length > 0) {
      onChange(imgs.filter((v: any) => selectedRowKeys.includes(v.id)).map((v: any) => {
        if (v.id === defaultId) {
          v.default = true
        }
        return v
      }))
    }
  },[selectedRowKeys])

  return (
    <Table
      style={{ width: 550 }}
      bordered
      rowKey='id'
      rowSelection={{
        selectedRowKeys: selectedRowKeys,
        onChange(keys) {
          // 禁止取消默认图片的选择
          if (keys.includes(defaultId as string)) {
            setSelectedRowKeys(keys)
          } else {
            message.error(
              'The default image cannot be cancelled, but you can set the image as a non-default image '
            )
          }
        }
      }}
      columns={[
        {
          title: 'Number',
          align: 'center',
          dataIndex: 'id',
          render(id, rows, index) {
            return index + 1
          }
        },
        {
          title: 'Image',
          align: 'center',
          dataIndex: 'url',
          render(url) {
            return <Image height={50} src={'/api/' + url} />
          }
        },
        {
          title: 'Operation',
          align: 'center',
          dataIndex: 'id',
          render(id, rows: any) {
            return rows.id === defaultId ? (
              <Button type='primary'>Default Image</Button>
            ) : (
                <Button type='primary' danger onClick={() => {
                  setDefaultId(id)
                  setSelectedRowKeys([id])
                  // if (!selectedRowKeys.includes(id)) {
                  //   setSelectedRowKeys([
                  //     ...selectedRowKeys,
                  //     id
                  //   ])
                  // }
              }}>
                Set Default Image
              </Button>
            )
          }
        }
      ]}
      dataSource={imgs}
    />
  )
}

export default Imgs
