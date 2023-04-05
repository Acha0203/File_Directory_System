import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { fileDirectorySystemActions } from '../store/fileDirectorySystem';

import type { FDSState } from '../types';

function CommandInput() {
  const dispatch = useDispatch();
  const inputCommand = useSelector((state: FDSState) => state.fileDirectorySystem.inputCommand);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fileDirectorySystemActions.setInputCommand(event.target.value));
  };

  const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(fileDirectorySystemActions.setInputCommandsList(inputCommand));
      dispatch(fileDirectorySystemActions.setInputCommand(''));
    }
  };

  return (
    <StyledConsoleInputWrapper>
      <StyledConsoleInput
        type='text'
        value={inputCommand}
        placeholder='Type any command'
        onChange={handleInputChange}
        onKeyDown={handleInputEnter}
      ></StyledConsoleInput>
    </StyledConsoleInputWrapper>
  );
}

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
    box-shadow: inset 2px 2px 2px 1px #707070d0;
  }
`;

export default CommandInput;
