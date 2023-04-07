import React, { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { MTools } from '../../model/intex';
import { fileDirectoryActions } from '../../store/fileDirectorySystem';

import type { FDSState } from '../../types';

const CommandInput = () => {
  const dispatch = useDispatch();
  const { inputCommand, history } = useSelector((state: FDSState) => state.fileDirectorySystem);
  const [currentHistoryId, setCurrentHistoryId] = useState(0);
  const [historyId, setHistoryId] = useState(0);
  const [direction, setDirection] = useState('none');

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(fileDirectoryActions.setInputCommand(event.target.value));
    },
    [dispatch],
  );

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (history[0].id <= -1) {
          dispatch(fileDirectoryActions.clearHistory());
        }
        dispatch(fileDirectoryActions.addHistory({ id: historyId, command: inputCommand }));
        dispatch(
          fileDirectoryActions.setInputCommand(
            MTools.evaluatedResultsStringFromParsedStringInputArray(
              MTools.commandLineParser(inputCommand),
            ),
          ),
        );
        setCurrentHistoryId(historyId);
        setHistoryId((prevHistoryId) => prevHistoryId + 1);
        setDirection('none');
      } else if (event.key === 'ArrowUp' && history.length > 0) {
        if (direction !== 'none') {
          if (currentHistoryId > 0) {
            dispatch(fileDirectoryActions.setInputCommand(history[currentHistoryId - 1].command));
            setCurrentHistoryId((prevHistoryId) => prevHistoryId - 1);
          } else {
            dispatch(fileDirectoryActions.setInputCommand(history[history.length - 1].command));
            setCurrentHistoryId(history.length - 1);
          }
        } else {
          dispatch(fileDirectoryActions.setInputCommand(history[currentHistoryId].command));
        }
        setDirection('backward');
      } else if (event.key === 'ArrowDown' && history.length > 0) {
        if (direction !== 'none') {
          if (currentHistoryId >= history.length - 1) {
            dispatch(fileDirectoryActions.setInputCommand(history[0].command));
            setCurrentHistoryId(0);
          } else {
            dispatch(fileDirectoryActions.setInputCommand(history[currentHistoryId + 1].command));
            setCurrentHistoryId((prevHistoryId) => prevHistoryId + 1);
          }
        } else {
          dispatch(fileDirectoryActions.setInputCommand(history[0].command));
          setCurrentHistoryId(0);
        }
        setDirection('forward');
      }

      return;
    },
    [history, dispatch, historyId, inputCommand, direction, currentHistoryId],
  );

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
};

const StyledConsoleInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
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
  background-color: #000;
  width: 90%;
  height: 2rem;
  border: 0;

  &:focus {
    box-shadow: inset 2px 2px 2px 1px #707070d0;
  }
`;

export default CommandInput;
