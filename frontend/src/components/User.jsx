import React from 'react'
import { useNavigate } from "react-router-dom";
const User = ({user}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/send?id=" + user._id + "&name=" + user.firstName);
    }
  return (
    <div className='flex justify-between p-2'>
        <div className='flex'>
            <div className='border-2 h-7 w-7 rounded-full border-sky-900 text-center'>
            {user.firstName[0].toUpperCase()}
            </div>
            <div className='pl-5'>
            {user.firstName} {user.lastName}
            </div>
        </div>
        <div className='bg-green-400 border-2 p-2 rounded hover:bg-white hover:border-green-400'>
           <button onClick={handleClick}>Send Money</button> 
        </div>
    </div>
  )
}

export default User;