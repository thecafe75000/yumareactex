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

// 根据ID修改用户账号的状态是否冻结 /user/list/:id/:state
export const putStateUserInfoById = (id:string, state:number) => {
  return request.put(`/user/list/${id}/${state}`, {
    data: {
      id,
      state
    }
  })
}