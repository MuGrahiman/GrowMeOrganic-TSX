
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInComponent from './Components/SignComponetn.tsx'
import DataComponent from './Components/DataComponent.tsx'
import RouterProtector from './Components/RouterProtector.tsx'

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInComponent />} />
          <Route path='/data' element={<RouterProtector><DataComponent /></RouterProtector>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
