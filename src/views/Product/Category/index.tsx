import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Button,
  Space,
  Switch,
  Table,
  Tooltip,
  Popconfirm
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useAppDispatch, useMessage } from '@/utils'
import { deteleProductCategoryAsync, getProductAllCategoryListAsync, putProductShowFlagAsync } from '@/store/slice/category'
import type { TStoreState } from '@/store'
import CategoryModal from './components/CategoryModal'


const Category = () => {
  const dispatch = useAppDispatch()
  const { categoryList } = useSelector((state: TStoreState) => state.category)
  const { loading } = useSelector((state: TStoreState) => state.config)
  const [key, setKey] = useState('')
  const message = useMessage()
  const [info, setInfo] = useState({})
  const [parentId, setParentId] = useState<string[]>([])
  const [modalTitle, setModalTitle] = useState<string>('Add product category') 
  // 控制对话框modal的显示与隐藏
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(getProductAllCategoryListAsync())
  }, [])

  const onChangeHandle = async (rows: any, isChecked: boolean) => {
    setKey(rows._id)
    await dispatch(putProductShowFlagAsync(rows._id, isChecked ? 1 : 0))
    // 数字2表示message在屏幕上停留的时间为2秒
    message.success((
      <>
        <span style={{color:'red'}}>put successfully {rows.name} at {isChecked ? 'display' : 'hide'} </span>
      </> 
    ),2)
    setKey('')
  }

  const buttonClick = () => {
    setInfo({})
    setParentId([])
    setIsModalOpen(true)
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
            // render函数第一个参数就是dataIndex的值,
            // 如果没有dataIndex, 第1个参数则是rows,是表单当前行整行的所有数据
            render(showFlag, rows: any) {
              return (
                // 第1种写法
                // <Switch
                //   onChange={(isChecked) => dispatch(putProductShowFlagAsync(rows._id, isChecked?1:0))}
                //   checked={showFlag === 1?true:false}
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
            render(rows) {
              // console.log('rows',rows)
              return (
                <Space>
                  {rows.catLevel === 3 || (
                    <Button
                      onClick={() => {
                        //  console.log('button-add rows', rows)
                        // form.setFieldValue('parentId', [...rows.ids, rows._id])
                        // setModalTitle('Add product category')
                        setParentId([...rows.ids, rows._id])
                        setIsModalOpen(true)
                      }}
                      icon={<FileAddOutlined />}
                    >
                      Add new subcategory
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setInfo(rows)
                      setIsModalOpen(true)
                    }}
                    icon={<EditOutlined />}
                    type='primary'
                  >
                    Edit
                  </Button>
                  <Popconfirm
                    title='Delete the info'
                    description='Are you sure to delete this info?'
                    onConfirm={() => {
                      dispatch(deteleProductCategoryAsync(rows._id))
                    }}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button
                      disabled={rows.children ? true : false}
                      icon={<DeleteOutlined />}
                      type='primary'
                      danger={true}
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </Space>
              )
            }
          }
        ]}
        rowKey='_id'
        dataSource={categoryList}
      />
      <CategoryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        info={info}
        parentId={parentId}
        modalTitle={modalTitle}
        setModalTitle={setModalTitle}
      />
    </Space>
  )
}

export default Category
