import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { fileDirectorySystemActions } from '../store/fileDirectorySystem';

import type { FDSState } from '../types';

function CommandInput() {
  const dispatch = useDispatch();
  const inputCommand = useSelector((state: FDSState) => state.fileDirectorySystem.inputCommand);
  const history = useSelector((state: FDSState) => state.fileDirectorySystem.history);
  const [currentHistoryId, setCurrentHistoryId] = useState(0);
  const [historyId, setHistoryId] = useState(0);
  const [isBackward, setIsBackward] = useState(false);
  const [isForward, setIsForward] = useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(fileDirectorySystemActions.setInputCommand(event.target.value));
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (history[0].id <= -1) {
        dispatch(fileDirectorySystemActions.clearHistory());
      }
      dispatch(fileDirectorySystemActions.addHistory({ id: historyId, command: inputCommand }));
      dispatch(fileDirectorySystemActions.setInputCommand(''));
      setCurrentHistoryId(historyId);
      setHistoryId((prevHistoryId) => prevHistoryId + 1);
      setIsBackward(false);
      setIsForward(false);
    } else if (event.key === 'ArrowUp' && history.length > 0) {
      if (isBackward || isForward) {
        if (currentHistoryId > 0) {
          dispatch(
            fileDirectorySystemActions.setInputCommand(history[currentHistoryId - 1].command),
          );
          setCurrentHistoryId((prevHistoryId) => prevHistoryId - 1);
        } else {
          dispatch(fileDirectorySystemActions.setInputCommand(history[history.length - 1].command));
          setCurrentHistoryId(history.length - 1);
        }
      } else {
        dispatch(fileDirectorySystemActions.setInputCommand(history[currentHistoryId].command));
      }
      setIsBackward(true);
      setIsForward(false);
    } else if (event.key === 'ArrowDown' && history.length > 0) {
      if (isBackward || isForward) {
        if (currentHistoryId >= history.length - 1) {
          dispatch(fileDirectorySystemActions.setInputCommand(history[0].command));
          setCurrentHistoryId(0);
        } else {
          dispatch(
            fileDirectorySystemActions.setInputCommand(history[currentHistoryId + 1].command),
          );
          setCurrentHistoryId((prevHistoryId) => prevHistoryId + 1);
        }
      } else {
        dispatch(fileDirectorySystemActions.setInputCommand(history[0].command));
        setCurrentHistoryId(0);
      }
      setIsForward(true);
      setIsBackward(false);
    }

    return;
  }

  // useEffect(() => {
  //   console.log(history);
  //   console.log(historyId);
  //   console.log(currentHistoryId);
  //   console.log(history[currentHistoryId].command);
  //   console.log(inputCommand);
  //   console.log(isBackward);
  //   console.log(isForward);
  // }, [history, historyId, currentHistoryId, inputCommand, isBackward, isForward]);

  return (
    <StyledConsoleInputWrapper>
      <StyledConsoleInput
        type='text'
        value={inputCommand}
        placeholder='Type any command'
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
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
