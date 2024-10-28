import React, { useEffect, useState } from 'react'
import User from './User';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then(response => {
            setUsers(response.data.user)
        })
    }, [filter])
  return (
    <div>
        <div className='my-2'>
        <input
            className="w-1/3 border border-gray-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-400 rounded-md p-2 outline-none transition duration-200 ease-in-out"
            onChange={(e) => setFilter(e.target.value)}
            type="text"
            placeholder="Search Users..."
        />
        </div>
        <div>
            {users.map(user => <User user={user}/>)}
        </div>
    </div>
  )
}

export default Users