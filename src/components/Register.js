import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Joi from 'joi';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://media.istockphoto.com/id/1406124833/vector/problems-in-communication-vector-concept.jpg?s=2048x2048&w=is&k=20&c=uil4cQgKS59fuebVQBGwH0kYdlKc-AoAkKt03JIkxts=")
    center;
  background-size: cover;
  margin-top:70px;
  width: 102%;
  
  font-family: 'Roboto', sans-serif;
`;

const Wrapper = styled.div`
  width: 80%;
  max-width: 500px;
  margin: 20px;
  padding: 40px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
`;

const Agreement = styled.p`
  font-size: 12px;
  margin: 20px 0;
  color: #888;
  text-align: center;
`;

const Button = styled.button`
  border: none;
  padding: 15px;
  background-color: #4CAF50;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-size: 18px;
  &:hover {
    background-color: #45a049;
  }
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0;
`;

const schema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  phone: Joi.string().required().pattern(new RegExp('^[0-9]{10}$')),
  imageUrl: Joi.string().required(),
  address: Joi.string(),
  profileSummary: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female', 'Others').required(),
});

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    imageUrl: "",
    address: "",
    profileSummary: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const validationResult = schema.validate(formData, { abortEarly: false });

      if (validationResult.error) {
        const newErrors = {};
        validationResult.error.details.forEach((detail) => {
          newErrors[detail.path[0]] = detail.message;
        });
        setErrors(newErrors);
        return;
      }

      await register(dispatch, formData);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  
  return (
    <>
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input
              type="text"
              name="name"
              placeholder="Username"
              onChange={handleChange}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

            <Input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}

            <Input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              onChange={handleChange}
            />
            {errors.imageUrl && <ErrorMessage>{errors.imageUrl}</ErrorMessage>}

            <Input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
            {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}

            <Input
              type="text"
              name="profileSummary"
              placeholder="Profile Summary"
              onChange={handleChange}
            />
            {errors.profileSummary && <ErrorMessage>{errors.profileSummary}</ErrorMessage>}

            <Select
              name="gender"
              onChange={handleChange}
            >
              <option value="" selected>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </Select>
            {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}

            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>

            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button onClick={handleClick} disabled={isFetching}>
                REGISTER
              </Button>
            </Link>
            
            <Link to="/login" style={{ textDecoration: 'none', marginTop: '10px' }}>
              LOG INTO EXISTING ACCOUNT
            </Link>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
