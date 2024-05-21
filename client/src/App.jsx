import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import Listing from './Pages/Listing';
import Search from './Pages/Search';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Profile from './Pages/ProfilePage';
import CreateListing from './Pages/CreateListing';
import EditListing from './Pages/EditListing';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/listing/:listingId' element={<Listing/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/sign-up' element={<SignUp />}/>
      <Route path='/sign-in' element={<SignIn />}/>
      <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/create-listing' element={<CreateListing/>}/>
      <Route path='/update-listing/:listingId' element={<EditListing/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
