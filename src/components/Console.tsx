import React from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import CommandInput from './ui/CommandInput';

import type { FDSState } from '../types';

const Console = () => {
  const history = useSelector((state: FDSState) => state.fileDirectorySystem.history);

  const listItems = history.map((command): JSX.Element => {
    return (
      <div key={command.id}>
        <div>
          <StyledMagentaText>student </StyledMagentaText>
          <StyledYellowText>@ </StyledYellowText>
          <StyledLimeText>recursionist:</StyledLimeText>&nbsp;{command.command}
        </div>
        {command.tool !== '' && (
          <div>
            {command.isValid ? (
              <StyledResultText>
                <StyledCyanText>{command.tool}: </StyledCyanText>
                {command.result}
              </StyledResultText>
            ) : (
              <StyledRedText>
                {command.tool} error: {command.result}
              </StyledRedText>
            )}
          </div>
        )}
      </div>
    );
  });

  return (
    <StyledConsole>
      <StyledConsoleTitleBar>Command Line Echo</StyledConsoleTitleBar>
      <StyledConsoleBody>
        <StyledConsoleTexts>{listItems}</StyledConsoleTexts>
      </StyledConsoleBody>
      <CommandInput />
    </StyledConsole>
  );
};

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

const StyledConsoleTexts = styled.div`
  color: #fff;
  margin: 1rem;
`;

const StyledConsoleTitleBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.2rem;
  background-color: #303030;
  width: 100%;
  height: 3rem;
  border-radius: 10px 10px 0 0;
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

const StyledRedText = styled.span`
  color: red;
`;

const StyledYellowText = styled.span`
  color: yellow;
`;

const StyledResultText = styled.span`
  white-space: pre-wrap;
`;

export default Console;
