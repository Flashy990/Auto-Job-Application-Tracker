import { Route, Routes } from 'react-router-dom'
import Home from './routes/Home';
import AuthLayout from './routes/auth/Layout';
import Signup from './routes/auth/Signup';
import Password from './routes/auth/Password';
import UserInfo from './routes/auth/UserInfo';
import Login from './routes/auth/Login';
import NotFound from './routes/error/NotFound';
import DashboardLayout from './routes/dashboard/Layout';
import Profile from './routes/dashboard/Profile';
import Applications from './routes/dashboard/Applications';
import ApplicationEdit from './routes/dashboard/ApplicationEdit';
import Settings from './routes/dashboard/Settings';
import SettingProfile from './routes/dashboard/settings/Profile';
import Privacy from './routes/dashboard/settings/Privacy';

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route element={<AuthLayout />}>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signup/password' element={<Password/>}/>
          <Route path='/signup/user-info' element={<UserInfo/>} />
          <Route path='/login' element={<Login/>}/>
        </Route> 
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path='user-profile' element={<Profile/>}/>
          <Route path='applications' element={<Applications/>}/>
          <Route path='edit-application/:id' element={<ApplicationEdit/>} />
          <Route path='settings' element={<Settings/>}>
            <Route path='profile' element={<SettingProfile/>}/>
            <Route path='privacy' element={<Privacy/>}/>
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
