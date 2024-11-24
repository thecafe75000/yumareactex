import request from '@/axios/request'

// 获取所有的用户列表
export const getUserList = (pageNo: number, pageSize: number, keyword?: string) => {
  return request.get('/user/list', {
    params: {
      pageNo,
      pageSize,
      keyword
    }
  })
}
