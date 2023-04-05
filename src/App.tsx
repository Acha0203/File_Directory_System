import React from 'react';

import styled from 'styled-components';

import './App.css';

function App() {
  return (
    <div>
      <StyledHello>Hello, world!</StyledHello>
    </div>
  );
}

const StyledHello = styled.h1`
  color: red;
`;

export default App;
