import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'antd'
import { useAppDispatch } from '@/utils'
import { getOrderListAsync } from '@/store/slice/order'
import type { TStoreState } from '@/store'


const OrderList = () => {
  const dispatch = useAppDispatch()
  const { pageInfo } = useSelector((state: TStoreState) => state.config)
  const { orderList } = useSelector((state: TStoreState) => state.order)
  
  useEffect(() => {
    dispatch(getOrderListAsync(1,pageInfo.pageSize))
  }, [])
  
  return (
    <Table
      rowKey='_id'
      columns={[]}
      dataSource={orderList}
    />
  )
}

export default OrderList