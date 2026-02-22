import './App.css'
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Home from './assets/Pages/Home/Home'
import Aboutus from './assets/Pages/Aboutus/Aboutus'
import Contact from './assets/Pages/Contact/Contact'
import Events from './assets/Pages/Events/Events'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/aboutus' element={<Aboutus/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/events' element={<Events/>}></Route>
        </Routes>
      </Router>
      <Analytics />
      <SpeedInsights />
        </>
  )
}

export default App
