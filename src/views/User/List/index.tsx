import React, { useEffect } from 'react'
import { useAppDispatch } from '@/utils'
import { getUserListAsync } from '@/store/slice/user'

const UserList = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUserListAsync(1, 5)) // 为什么userList是一个空数组，state没有更新？
  },[])
  return (
    <div>Users List Page</div>
  )
}

export default UserList