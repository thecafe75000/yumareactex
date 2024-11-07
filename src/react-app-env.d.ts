/// <reference types="react-scripts" />
// 让less模块化生效
declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}