import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: #2c3e50; /* Updated background color */
  border-bottom: 1px solid #34495e; /* Updated border color */
  display: flex;
  align-items: center;
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  outline: none;
  margin-left: 5px;
`;

const Center = styled.div`
  text-align: center;
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 24px;
  margin: 0;
  color: #ecf0f1; /* Updated font color */
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const MenuItem = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-left: 20px;
  color: #ecf0f1; /* Updated font color */
  transition: color 0.3s;

  &:hover {
    color: #4CAF50; /* Color on hover */
  }
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo>EMPLOYEE_DB</Logo>
          </Link>
        </Left>
        
        <Right>
          {user ? (
            <>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <MenuItem>My Profile</MenuItem>
              </Link>
              <Link to="/list" style={{ textDecoration: 'none' }}>
                <MenuItem>Employees List</MenuItem>
              </Link>
             
              <Link to="/logout" style={{ textDecoration: 'none' }}>
                <MenuItem>Logout</MenuItem>
              </Link> 
            </>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
