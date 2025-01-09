
import { useEffect, useState } from 'react'
import { Table, Image, Button } from 'antd'

const Imgs = (props: any) => {
  const { imgs } = props
  // 选中的图片
  const [images, setImages] = useState<any[]>([])
  // 
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  useEffect(() => {
    if (imgs && imgs.length > 0) {
      const defaultImg = imgs[0]
      defaultImg.default = true
      setSelectedRowKeys([defaultImg.id])
      setImages([defaultImg])
    }
  },[imgs])

  return (
    <Table
      style={{ width: 550 }}
      bordered
      rowKey='id'
      rowSelection={{
        selectedRowKeys: selectedRowKeys
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
            return rows.default ? (
              <Button type='primary'>Default Image</Button>
            ) : (
              <Button type='primary' danger>
                Set Default
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
