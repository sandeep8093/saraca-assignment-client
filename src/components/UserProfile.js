import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f2f2f2;
  padding: 40px;
  border-radius: 5px;
  width: 100%;
  max-width: 1450px; /* Adjusted max-width for better responsiveness */
  margin-top:60px;
  font-family: 'Roboto', sans-serif;
`;

const ProfileContent = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 1000px; /* Adjusted max-width for better responsiveness */
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  max-width: 70%;
  border-radius: 8px;
  margin-bottom: 20px;
  display: block; /* Center the image */
  margin-left: auto;
  margin-right: auto;
`;

const ProfileField = styled.div`
  margin-bottom: 20px;

  p {
    margin: 15px 100px;
    font-size: 18px;
    line-height: 1.6;
    color: #555;
    display: flex;
    align-items: center;
  }

  span {
    font-weight: bold;
    color: #566573; 
    margin-right: 8px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #FF3B3B;
`;

const UserProfile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const hasQueryParams = new URLSearchParams(location.search).toString() !== '';
  const dispatch = useDispatch();
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    
    try {
      await axios.delete(`https://saraca-server.onrender.com/api/delete-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.clear();
      logout(dispatch)
      navigate('/login'); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams(location.search).toString();
      const url = queryParams
        ? `https://saraca-server.onrender.com/api/get-profile?${queryParams}`
        : 'https://saraca-server.onrender.com/api/get-profile';
  
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUserProfile();
  }, [location.search]);

  return (
    <>
      <Container>
        <ProfileContent>
          <h1 style={{ "text-align": "center" }}>User Profile</h1>
          <ProfileImage
            src={user.imageUrl}
            alt={`${user.name}'s profile`}
          />
          <ProfileField>
            <p><span>User Name:</span> {user.name}</p>
            <p><span>Email:</span> {user.email}</p>
            <p><span>Joined:</span> {new Date(user.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><span>Profile Summary:</span> {user.profileSummary}</p>
            <p><span>Gender:</span> {user.gender}</p>
            <p><span>Phone Number:</span> {user.phone}</p>
            <p><span>Address:</span> {user.address}</p>
          </ProfileField>
          {!hasQueryParams && (
            <ButtonContainer>
              <Link to="/update-profile" style={{ textDecoration: 'none' }}>
                <Button>Update Profile</Button>
              </Link>
              <DeleteButton onClick={handleDelete}>Delete Profile</DeleteButton>
            </ButtonContainer>
          )}
        </ProfileContent>
      </Container>
    </>
  );
};

export default UserProfile;
