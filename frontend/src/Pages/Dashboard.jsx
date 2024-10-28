import React, { useEffect, useState } from 'react'
import Users from '../components/Users'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Dashboard() {

  const[balance, setBalance] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/account/balance', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(response => setBalance(response.data.balance))
    .catch((error) =>
    {
      if (error.response) {
        toast.error(error.response.data.message); // Error message from backend
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    });
  })
  return (
    <div>
      <div>
        <div className='px-5 py-5'>
          <div className='flex justify-between'>
            <div className='text-xl font-bold text-sky-500 pb-7'>Money It</div>
            <div>Hello, User</div>
          </div>
          <div>Your balance: ${balance}</div>
          <Users/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard