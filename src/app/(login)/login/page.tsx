'use client';

import "./login.module.scss";
import { useEffect, useState } from "react";
import { UserInterface } from "@/models/User";

export default function Login() {
   const [users, setUsers] = useState<UserInterface[]>([]);
   // useEffect(() => {
   //    const fetchUsers = async () => {
   //       const res = await fetch('/api/users');
   //       const data = await res.json();
   //       if (data.success) {
   //          setUsers(data.data);
   //       }
   //    }

   //    fetchUsers();
   // }, [])

   console.log("hi");

   return (
      <main>
         <p>This is the login page</p>
         <div className="test">
            {users.map((users) => (
               <li key={users._id}>{users.name}</li>
            ))}
         </div>
      </main>
   )
}