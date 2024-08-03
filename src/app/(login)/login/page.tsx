'use client';

import "./login.module.scss";
import { useEffect, useState } from "react";
import { UserInterface } from "@/models/User";

export default function Login() {
   const [users, setUsers] = useState<UserInterface[]>([]);
   console.log(users);
   useEffect(() => {
      const fetchUsers = async () => {
         const res = await fetch('/api/users');
         const data = await res.json();
         if (data.success) {
            setUsers(data.data);
         }
      }

      fetchUsers();
   }, [])

   return (
      <>
         <div className="test">
            {users.map((users) => (
               <li key={users._id}>{users.name}</li>
            ))}
         </div>
      </>
   )
}