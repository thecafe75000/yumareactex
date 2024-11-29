import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Table, Image } from 'antd'
import { useAppDispatch } from '@/utils'
import { getOrderListAsync } from '@/store/slice/order'
import type { TStoreState } from '@/store'


const OrderList = () => {
  const dispatch = useAppDispatch()
  const { pageInfo } = useSelector((state: TStoreState) => state.config)
  const { orderList } = useSelector((state: TStoreState) => state.order)
  // console.log('orderlist', orderList)
  const [key, setKey] = useState('')
  
  useEffect(() => {
    dispatch(getOrderListAsync(1,pageInfo.pageSize))
  }, [])
  
  return (
    <Table
      pagination={{
        ...pageInfo,
        onChange: (pageNo: number, pageSize: number) => {
          dispatch(getOrderListAsync(pageNo, pageSize))
        }
      }}
      bordered={true}
      rowKey='_id'
      expandable={{
        // 点击展开图标时触发的函数
        onExpand: (expanded, record:any) => {
          // console.log('expanded-record',expanded,record)
          if (expanded) {
             setKey(record._id)
          } else {
            setKey('')
          }
        },
        expandedRowRender: (record:any, index, indent, expanded) => {
          return (
            <Card>
              <Table
                bordered={true}
                pagination={false}
                rowKey='_id'
                columns={[
                  {
                    title: 'Product Name',
                    dataIndex: 'skuName',
                    align: 'center',
                    width: 400
                  },
                  {
                    title: 'Product Photo',
                    dataIndex: 'imgUrl',
                    align: 'center',
                    width: 60,
                    render(imgUrl) {
                      return <Image src={'/api/' + imgUrl} width={50} />
                    }
                  },
                  {
                    title: 'Price',
                    dataIndex: 'orderPrice',
                    align: 'center',
                    width: 60,
                    render(orderPrice: number) {
                      return '￥' + orderPrice.toFixed(2)
                    }
                  },
                  {
                    title: 'Purchase Quantity',
                    dataIndex: 'buyNum',
                    align: 'center',
                    width: 60
                  }
                ]}
                dataSource={record.orderDetailList}
              />
            </Card>
          )
        },
        expandedRowKeys:[key]
      }}
      columns={[
        {
          title: 'Order No',
          dataIndex: 'tradeNo',
          align: 'center',
          width: 220
        },
        {
          title: 'Destinataire',
          dataIndex: 'consignee',
          align: 'center'
        },
        {
          title: 'Cell Phone',
          dataIndex: 'consigneeTel',
          align: 'center'
        },
        {
          title: 'Livraison Adresse',
          dataIndex: 'deliveryAddress',
          align: 'center'
        },
        {
          title: 'Paid or Not',
          dataIndex: 'status',
          align: 'center',
          render(status) {
            return status === 0 ?'Not paid':'Paid'
          }
        },
        {
          title: 'Order Time',
          dataIndex: 'orderTime',
          align: 'center'
        }
      ]}
      dataSource={orderList}
    />
  )
}

export default OrderList