import React from 'react';

import styled from 'styled-components';

function Console() {
  return (
    <>
      <StyledConsoleBody>
        <StyledConsoleTitleBar>Command Line Echo</StyledConsoleTitleBar>
        Hello World!!
      </StyledConsoleBody>
    </>
  );
}

const StyledConsoleBody = styled.div`
  display: flex-column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #00000082;
  width: 80%;
  height: 80%;
`;

const StyledConsoleTitleBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #707070;
  width: 100%;
  height: 2rem;
`;

export default Console;
