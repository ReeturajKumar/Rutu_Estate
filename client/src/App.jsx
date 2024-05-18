import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Components/Pages/HomePage';
import AboutPage from './Components/Pages/AboutPage';
import ProfilePage from './Components/Pages/ProfilePage';
import SignIn from './Components/Pages/SignIn';
import SignUp from './Components/Pages/SignUp';
import Header from './Components/Header/Header';
import PrivateRoute from './Components/OAuth/PrivateRoute';
import CreateListing from './Components/Pages/CreateListing';
import EditListing from './Components/Pages/EditListing';
import NotFound from './Components/Pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/create-listing' element={<CreateListing/>}/>
      <Route path='/update-listing/:listingid' element={<EditListing/>}/>
      </Route>
      <Route path='/sign-up' element={<SignUp />}/>
      <Route path='/sign-in' element={<SignIn />}/>
      <Route path='*' element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}
