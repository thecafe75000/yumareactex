import { useEffect, useState } from 'react'
import { Select, Space } from 'antd'

const AttrValueList = (props: any) => {
  const { attrList, onChange, value} = props
  // console.log('attrList', attrList)
    const [skuAttrValueList, setSkuAttrValueList] = useState({})
    
    useEffect(() => {
        if (Object.keys(skuAttrValueList).length > 0 && Object.keys(skuAttrValueList).length === attrList.length) {
            onChange(skuAttrValueList)
        }
    }, [skuAttrValueList])
    
  return (
    <Space wrap={true}>
      {
        attrList.map((item: any) => {
          let defaultValue
          if (value) {
            defaultValue = value[item._id]
          }
        return (
          <Space key={item._id}>
            <label style={{ fontWeight: 'bold' }} htmlFor={item._id}>
              {item.name}
            </label>
            <Select
              id={item._id}
              style={{ width: 200 }}
              placeholder={'Please choose' + item.name}
              defaultValue={defaultValue}
              onChange={(value) => {
                setSkuAttrValueList({
                  ...skuAttrValueList,
                  [item._id]: value
                })
              }}
              options={item.attrValueList.map((item: any) => {
                return {
                  label: item.valueName,
                  value: item.id
                }
              })}
            />
          </Space>
        )
      })}
    </Space>
  )
}

export default AttrValueList
