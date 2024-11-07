import React from 'react'

// 类型别名
 type IProps = {
   children: React.ReactElement 
 }

 const AuthCom: React.FC<IProps> = ({children})=> {
   return children
 }

export default AuthCom 