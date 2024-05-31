import React from 'react';
import Chat from './chat.js';
import styled from 'styled-components';

const AppContainer = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: #40A578;
  color: white;
  padding: 20px;
`;

function App() {
  return (
    <AppContainer>
      <Header>
        <h1>Wassup</h1>
      </Header>
      <Chat />
    </AppContainer>
  );
}

export default App;
