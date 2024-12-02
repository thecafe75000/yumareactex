import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Button,
  Form,
  Input,
  Space,
  Switch,
  Table,
  Tooltip,
  Modal,
  Cascader,
  InputNumber
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useAppDispatch, useMessage } from '@/utils'
import { getProductAllCategoryListAsync, postProductCategoryAsync, putProductShowFlagAsync } from '@/store/slice/category'
import type { TStoreState } from '@/store'


const Category = () => {
  const dispatch = useAppDispatch()
  const { categoryList } = useSelector((state: TStoreState) => state.category)
  const { loading } = useSelector((state: TStoreState) => state.config)
  const [key, setKey] = useState('')
  const message = useMessage()
  // 控制对话框modal的显示与隐藏
  const [isModelOpen, setIsModalOpen] = useState(false)
  // 获取表单实例
  const [form] = Form.useForm()
  const parentIdArr = useMemo(() => categoryList.map((item:any)=> {
    return {
      label: item.name,
      value: item._id,
      children: item.children.map((child:any) => {
        return {
          label: child.name,
          value: child._id
        }
      })
    }
  }), [categoryList])
  // console.log('parentidarr',parentIdArr)

  useEffect(() => {
    dispatch(getProductAllCategoryListAsync())
  }, [])

  const onChangeHandle = async (rows: any, isChecked: boolean) => {
    setKey(rows._id)
    await dispatch(putProductShowFlagAsync(rows._id, isChecked ? 1 : 0))
    // 数字2表示message在屏幕上停留的时间为2秒
    // message.success('put the info of '+ rows.name + ' at '+ (isChecked? 'display':'hide') + ' successfully', 2)
    message.success((
      <>
        <span style={{color:'red'}}>put successfully {rows.name} at {isChecked ? 'display' : 'hide'} </span>
      </> 
    ),2)
    setKey('')
  }

  const buttonClick = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    // 提交表单
    form.submit()
  }

  const handleCancel = () => {
    // 重置表单内容
    form.resetFields()
    setIsModalOpen(false)
  }

  const onFinish = async (body:any) => {
    body.showFlag = body.showFlag ? 1 : 0
    if (Array.isArray(body.parentId)) {
      body.parentId = body.parentId[body.parentId.length -1]
    }
    console.log('finish-body',body)
    await dispatch(postProductCategoryAsync(body))
    // 重置表单内容
    form.resetFields()
    setIsModalOpen(false)
    message.success('Add product category successfully!')
  }

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Tooltip title='Add product category'>
        <Button onClick={buttonClick} icon={<PlusOutlined />} type='primary'>
          Add product category
        </Button>
      </Tooltip>
      <Table
        columns={[
          {
            title: 'Product Name',
            dataIndex: 'name',
            align: 'center'
          },
          {
            title: 'Level',
            dataIndex: 'catLevel',
            align: 'center'
          },
          {
            title: 'Sorting',
            dataIndex: 'sort',
            align: 'center'
          },
          {
            title: 'Created Time',
            dataIndex: 'addTime',
            align: 'center'
          },
          {
            title: 'Show or Not',
            dataIndex: 'showFlag',
            align: 'center',
            render(showFlag, rows: any) {
              return (
                // 第1种写法
                // <Switch
                //   onChange={(isChecked) => dispatch(putProductShowFlagAsync(rows._id, isChecked?1:0))}
                //   checked={showFlag === 1}
                // ></Switch>

                // 第2种写法
                <Switch
                  loading={loading && key === rows._id}
                  onChange={(isChecked) => onChangeHandle(rows, isChecked)}
                  checked={showFlag === 1}
                ></Switch>
              )
            }
          },
          {
            title: 'Modified Time',
            dataIndex: 'upTime',
            align: 'center'
          },
          {
            title: 'Operation',
            align: 'center',
            render() {
              return (
                <Space>
                  <Button icon={<FileAddOutlined />}>
                    + a new subcategory
                  </Button>
                  <Button icon={<EditOutlined />} type='primary'>
                    Edit
                  </Button>
                  <Button
                    icon={<DeleteOutlined />}
                    type='primary'
                    danger={true}
                  >
                    Delete
                  </Button>
                </Space>
              )
            }
          }
        ]}
        rowKey='_id'
        dataSource={categoryList}
      />
      <Modal
        title='Add product category'
        maskClosable={false}
        open={isModelOpen}
        // closable={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name='basic'
          // 表单实例
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            sort: 0, // 排序的默认值
            showFlag: true
          }}
          onFinish={(body) => onFinish(body)}
          autoComplete='off'
        >
          <Form.Item
            label='Previous Category'
            // name 的值要看接口文档
            name='parentId'
          >
            <Cascader
              changeOnSelect
              options={parentIdArr}
              onChange={() => {}}
              placeholder='If this item is omitted, the top-level category is added'
            />
          </Form.Item>
          <Form.Item
            label='Category Name'
            // name 的值要看接口文档
            name='name'
            rules={[{ required: true, message: 'Please add a category!' }]}
          >
            <Input placeholder='Please add a category' />
          </Form.Item>
          <Form.Item label='Show or Not' name='showFlag'>
            <Switch defaultChecked={true} />
          </Form.Item>
          <Form.Item
            label='Sorting'
            // name 的值要看接口文档
            name='sort'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  )
}

export default Category
