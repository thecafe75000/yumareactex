import React, { useEffect } from 'react'
import { Button, Flex, Image, Space, Switch, Table } from 'antd'
import { useAppDispatch } from '@/utils'
import { getSkuListAsync, useSelectorSku } from '@/store/slice/sku'
import { useSelector } from 'react-redux'
import type { TStoreState } from '@/store'
import { FileAddOutlined } from '@ant-design/icons'
import { setIsAddBtn } from '@/store/slice/config'

const SkuTable = () => {
    const dispatch = useAppDispatch()
    const { pageInfo, categoryId } = useSelector((state: TStoreState) => state.config)
    const {skuList} = useSelectorSku()

    useEffect(() => {
      // 从后端获取skuList的数据
      dispatch(getSkuListAsync({
        pageNo: 1,
        pageSize: pageInfo.pageSize,
        ...categoryId
      }))
    }, [categoryId])
    
    return (
      <Flex vertical gap='middle'>
        <Button
          disabled={!categoryId.category3Id}
          icon={<FileAddOutlined />}
          type='primary' style={{ width: 200 }}
          onClick={() => {
            dispatch(setIsAddBtn(true))
          }}
        >Add Sku</Button>
        <Table
          scroll={{
            x: 1300
          }}
          pagination={{
            ...pageInfo,
            onChange(pageNo, pageSize) {
              dispatch(
                getSkuListAsync({
                  pageNo,
                  pageSize,
                  ...categoryId
                })
              )
            }
          }}
          bordered={true}
          rowKey='_id'
          columns={[
            {
              title: 'Number',
              width: 90,
              align: 'center',
              render(id, rows, index) {
                return (pageInfo.current - 1) * pageInfo.pageSize + index + 1
              }
            },
            {
              title: 'Sku Name',
              align: 'center',
              width: 400,
              ellipsis: true,
              dataIndex: 'fullName'
            },
            {
              title: 'Sales or Not',
              align: 'center',
              width: 120,
              dataIndex: 'isSale',
              render(isSale) {
                return <Switch checked={isSale} />
              }
            },
            {
              title: 'Sku Photo',
              align: 'center',
              dataIndex: 'defaultImg',
              render(imgUrl) {
                return <Image src={'/api/' + imgUrl} height={60} />
              }
            },
            {
              title: 'Price',
              align: 'center',
              dataIndex: 'price',
              render(price) {
                return '$ ' + price.toFixed(2)
              }
            },
            {
              title: 'Weight',
              align: 'center',
              dataIndex: 'weight',
              render(weight) {
                return weight.toFixed(2) + ' g'
              }
            },
            {
              title: 'Operation',
              align: 'center',
              dataIndex: '_id',
              fixed: 'right',
              render() {
                return (
                  <Space>
                    <Button
                      type='primary'
                      shape='circle'
                      style={{ width: 50, height: 50 }}
                    >
                      Edit
                    </Button>
                    <Button
                      type='primary'
                      danger
                      shape='circle'
                      style={{ width: 50, height: 50 }}
                    >
                      Delete
                    </Button>
                  </Space>
                )
              }
            }
          ]}
          dataSource={skuList}
        />
      </Flex>
    )
}

export default SkuTable