import { logout } from "../redux/apiCalls";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/language-communication-message-written_53876-127905.jpg?size=626&ext=jpg&ga=GA1.1.1942388.1698861392&semt=ais")
      center;
  left: 0;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 30px;
  background-color: white;
  ${mobile({ width: "75%" })}
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 30%;
  border: none;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:disabled {
    color: #2c3e50;
    cursor: not-allowed;
  }
  &:hover {
    background-color: 2c3e50;
  }

  /* Center the button */
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault();
        try {
            window.localStorage.clear();
            logout(dispatch)
            navigate('/'); 
          } catch (error) {
            console.error('Logout failed:', error);
          }
        
    };
  return (
    <Container>
      <Wrapper>
        <Title>Log Out</Title>
        <Form>
          <p>Come Back Soon, We will be missing you!!</p>
          <Button onClick={handleClick}>LOGOUT</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Logout;
