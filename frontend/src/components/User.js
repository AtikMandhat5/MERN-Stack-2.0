import React, { useEffect, useState } from 'react';
import { getUsers } from '../service/users';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUserData = async () => {
    try {
      const result = await getUsers();
      setUsers(result);
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      {users?.length > 0 ? (
        <div className="card">
          <DataTable value={users}>
            <Column field="id" header="Id" />
            <Column field="name" header="Name" />
            <Column field="email" header="E-mail" />
            <Column field="created_at" header="created At" />
          </DataTable>
        </div>
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
};

export default User;
