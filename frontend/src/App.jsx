import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import SendMoney from "./Pages/SendMoney";
import { ToastContainer } from 'react-toastify';
import Signin from './Pages/Signin';

function App() {

  return (
    <>
    <Router>
    <div>
      <ToastContainer/>
    <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </div>
  </Router>
  </>
  )
}

export default App
