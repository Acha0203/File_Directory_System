import React, { useState } from 'react';

import styled from 'styled-components';

function Console() {
  const [inputCommandsList, setInputCommandsList] = useState<string[]>([]);
  const [inputCommand, setInputCommand] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCommand(event.target.value);
  };

  const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setInputCommandsList([...inputCommandsList, inputCommand]);
      setInputCommand('');
    }
  };

  const listItems = inputCommandsList.map((command, index): JSX.Element => {
    return (
      <div key={index}>
        <StyledCyanText>student </StyledCyanText>
        <StyledMagentaText>@ </StyledMagentaText>
        <StyledLimeText>recursionist:</StyledLimeText>&nbsp;{command}
      </div>
    );
  });

  return (
    <StyledConsole>
      <StyledConsoleTitleBar>Command Line Echo</StyledConsoleTitleBar>
      <StyledConsoleBody>
        <StyledConsoleTexts>{listItems}</StyledConsoleTexts>
      </StyledConsoleBody>
      <StyledConsoleInputWrapper>
        <StyledConsoleInput
          type='text'
          value={inputCommand}
          placeholder='Type any command'
          onChange={handleInputChange}
          onKeyDown={handleInputEnter}
        ></StyledConsoleInput>
      </StyledConsoleInputWrapper>
    </StyledConsole>
  );
}

const StyledConsole = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
`;

const StyledConsoleBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: #fff;
  background-color: #0000009b;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const StyledConsoleTexts = styled.p`
  color: #fff;
  margin: 1rem;
`;

const StyledConsoleTitleBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.2rem;
  background-color: #707070;
  width: 100%;
  height: 3rem;
  border-radius: 10px 10px 0 0;
`;

const StyledConsoleInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  width: 100%;
  height: 3rem;
  border-radius: 0 0 10px 10px;
`;

const StyledConsoleInput = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: #fff;
  font-size: 1.2rem;
  background-color: #000000;
  width: 90%;
  height: 2rem;
  border: 0;
  &:focus {
    border: 0;
    box-shadow: inner 0 0 4px #707070d0;
  }
`;

const StyledCyanText = styled.span`
  color: cyan;
`;

const StyledMagentaText = styled.span`
  color: magenta;
`;

const StyledLimeText = styled.span`
  color: Lime;
`;

export default Console;
