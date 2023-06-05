import { AuthProvider } from "./Auth.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";



import './App.css'
import Login from './Components/Login'
import Home from './Home'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* <PrivateRoute exact path="/" component={Home} /> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        {/* <Route exact path="/signup" component={SignUp} /> */}
      </Routes>
    </AuthProvider>
  )
}

export default App
