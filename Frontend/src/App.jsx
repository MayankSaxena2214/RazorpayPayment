import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home'
import PaymentSuccess from './pages/PaymentSuccess'
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/paymentsuccess" element={<PaymentSuccess/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App