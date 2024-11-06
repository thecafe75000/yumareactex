import { NavLink } from 'react-router-dom'
import Router from '@/routes'


function App() {
  return (
    <div>
      <nav>
        <NavLink to={'/'}>首页</NavLink>
        <NavLink to={'/login'}>登陆</NavLink>
      </nav>
      <Router/>
    </div>
  );
}

export default App;
