import React from 'react';

import styled from 'styled-components';

import Console from './Console';

function Background() {
  return (
    <StyledBackground>
      <Console />
    </StyledBackground>
  );
}

const StyledBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#6e45e2, #88d3ce);
`;

export default Background;
