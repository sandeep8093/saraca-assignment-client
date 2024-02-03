import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f2f2f2;
  font-family: 'Roboto', sans-serif;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  display: block; /* Center the button */
  margin: 0 auto;

  &:hover {
    background-color: #45a049;
  }
`;

const UpdateProfile = () => {
  const [updatedFields, setUpdatedFields] = useState({
    name: "",
    phone: "",
    address: "",
    profileSummary: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://saraca-server.onrender.com/api/get-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUpdatedFields({
          name: response.data.name,
          phone: response.data.phone,
          address: response.data.address,
          profileSummary: response.data.profileSummary
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`https://saraca-server.onrender.com/api/update-profile`, updatedFields, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/'); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setUpdatedFields({
      ...updatedFields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
   
      <Container>
      <FormContainer>
        <h1 style={{"text-align":"center"}}>Update Profile</h1>
        <form onSubmit={handleUpdate}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={updatedFields.name}
            onChange={handleChange}
          />
         <Input
            type="text"
            name="phone"
            placeholder="Phone"
            value={updatedFields.phone}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={updatedFields.address}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="profileSummary"
            placeholder="Profile Summary"
            value={updatedFields.profileSummary}
            onChange={handleChange}
          />
          <Button type="submit">Update Profile</Button>
        </form></FormContainer>
      </Container>
    </>
  );
};

export default UpdateProfile;