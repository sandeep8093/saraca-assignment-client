import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  text-align: center;
  margin: 20px;
  margin-top:100px;
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background-color: #566573;
  color: white;
`;

const TableRow = styled.tr`
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://saraca-server.onrender.com/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Container>
        <h1>Employees List</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Profile Summary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.profileSummary}</TableCell>
                <TableCell>
                  <Link
                    to={{
                      pathname: '/view-profile',
                      search: `?id=${user._id}`,
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button>View Profile</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default UserList;
