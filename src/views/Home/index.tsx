import withAuth from '@/components/Hoc'
import {Button} from 'antd'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <Button type='primary' onClick={handleClick}> Log out</Button>
  )
}

export default withAuth(Home)