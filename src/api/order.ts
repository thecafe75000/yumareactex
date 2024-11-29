import request from '@/axios/request'

// 获取订单列表 /order/list?pageNo=1&pageSize=1
export const getOrderList = (pageNo: number, pageSize: number) => {
  return request.get('/order/list', {
    params: {
      pageNo,
      pageSize
    }
  })
}