import request from '@/axios/request'

export type TBody = {
  adminName: string,
  password: string
}

// 管理员admin登陆
export const postAdminLogin = (body: TBody) => {
  return request.post('/admin/login', body)
}

// 获取管理员admin信息
export const getAdminInfo = () => {
  return request.get('/adminList/info')
}