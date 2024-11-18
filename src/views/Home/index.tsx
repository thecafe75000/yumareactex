import { useSelector } from 'react-redux'
import withAuth from '@/components/Hoc'
import type { TStoreState } from '@/store'

const Home = () => {
  const { info } = useSelector((state: TStoreState) => state.admin) as any
  
  return (
    <div style={{textAlign:'center'}}>
      <h3>{info?.adminName}</h3>
      {
        info.avatar && <img height={200} src={'/api'+info.avatar} alt='' />
      }
    </div>
  )
}

export default withAuth(Home)
