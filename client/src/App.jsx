import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './components/Login'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Register from "./components/Ragister"

function App() {
  
  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
