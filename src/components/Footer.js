import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  bottom:0
`;

const FooterContainer = styled.div`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  text-align: center;
  width: 100%;
  max-width: 1490px; /* Adjusted max-width for better responsiveness */
  margin-top: auto; /* Push the footer to the bottom */
`;

const Footer = () => {
  return (
    <PageContainer>
      <FooterContainer>
        <p>&copy; 2024 Published By: Sandeep Kumar Nayak | Saraca-Assignment. All rights reserved.</p>
      </FooterContainer>
    </PageContainer>
  );
};

export default Footer;
