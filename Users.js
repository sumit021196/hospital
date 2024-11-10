// src/components/Users.js
import React, { useEffect, useState } from 'react';
import { ref, get, child } from 'firebase/database';
import database from '../firebase';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'users'));

        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const usersList = Object.keys(usersData).map(key => ({
            id: key,
            ...usersData[key],
          }));
          setUsers(usersList);
        } else {
          setError("No users found.");
        }
      } catch (err) {
        setError("Failed to load users.");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {error ? <p>{error}</p> : (
        <ul>
          {users.map(user => (
            <li key={user.id}>User ID: {user.id}, Details: {JSON.stringify(user)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;
