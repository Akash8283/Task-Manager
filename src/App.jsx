import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Form from './pages/Form'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Form/>}/>
        <Route path='/edit/:id' element={<Form/>}/>
      </Routes>
    </>
  )
}

export default App
