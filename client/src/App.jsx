import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Components/Pages/HomePage';
import AboutPage from './Components/Pages/AboutPage';
import ProfilePage from './Components/Pages/ProfilePage';
import SignIn from './Components/Pages/SignIn';
import SignUp from './Components/Pages/SignUp';
import Header from './Components/Header/Header';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  )
}
