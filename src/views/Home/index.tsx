import withAuth from '@/components/Hoc'

const Home = () => {
  return (
    <div>
      <h3>Home page</h3>
    </div>
  )
}

export default withAuth(Home)