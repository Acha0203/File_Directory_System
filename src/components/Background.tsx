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
  background: linear-gradient(#e66465, #9198e5);
`;

export default Background;
