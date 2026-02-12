import './App.css'
import Navbar from './assets/Components/Navbar/Navbar'
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './assets/Pages/Home/Home'
import Aboutus from './assets/Pages/Aboutus/Aboutus'
import Contact from './assets/Pages/Contact/Contact'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/aboutus' element={<Aboutus/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
        </Routes>
      </Router>
        </>
  )
}

export default App
