import React from 'react'

// 类型别名
 type IProps = {
   children: React.ReactElement 
 }

 const AuthCom: React.FC<IProps> = (props)=> {
   return props.children
 }

export default AuthCom 