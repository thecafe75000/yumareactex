import { useSelector } from 'react-redux'
import withAuth from '@/components/Hoc'
import type { TStoreState } from '@/store'

const Home = () => {
  const adminInfo: any = useSelector((state: TStoreState) => state.admin)
  
  return (
    <div style={{textAlign:'center'}}>
      <h3>{adminInfo.info?.adminName}</h3>
      {adminInfo.info.avatar && (
        <img height={200} src={'/api' + adminInfo.info.avatar} alt='' />
      )}
    </div>
  )
}

export default withAuth(Home)
