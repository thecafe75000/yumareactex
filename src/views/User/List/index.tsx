import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/utils'
import { getUserListAsync } from '@/store/slice/user'
import { Table, Switch } from 'antd'
import type { TStoreState } from '@/store'


const UserList = () => {
  const dispatch = useAppDispatch()
  const {userList} = useSelector((state:TStoreState) => state.user)

  useEffect(() => {
    dispatch(getUserListAsync(1, 5)) 
  },[])
  return (
    <Table
      bordered
      rowKey='_id'
      columns={[
        {
          align: 'center',
          title: 'Number',
          dataIndex: '_id',
          render(id, row, index) {
            return index + 1
          }
        },
        {
          align: 'center',
          title: 'Cell Phone',
          dataIndex: 'phone'
        },
        {
          align: 'center',
          title: 'Nickname',
          dataIndex: 'nickName'
        },
        {
          align: 'center',
          title: 'Locked or Not',
          dataIndex: 'status',
          render(status) {
            // status:1 未冻结  status:0 冻结
            return <Switch defaultChecked={status === 0} />
          }
        },
        {
          align: 'center',
          title: 'Registration Time',
          dataIndex: 'regTime'
        },
        {
          align: 'center',
          title: 'Last Login Time',
          dataIndex: 'loginTime'
        }
      ]}
      dataSource={userList}
    />
  )
}

export default UserList