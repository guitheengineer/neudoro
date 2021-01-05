import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyles';
import { TimerMain } from './components/timer-main';
import { ControlButtons } from './components/control-buttons';
import { TaskInfo } from './components/task-info';

const App = () => (
  <>
    <GlobalStyle />
    <AppContainer>
      <Title>Neudoro</Title>
      <TimerMain />
      <TaskInfo />
      <ControlButtons />
    </AppContainer>
  </>
);

const AppContainer = styled.div`
  position: absolute;
  width: 100%;
  height: inherit;
  min-height: 570px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Title = styled.h4`
  font-size: 42px;
  font-weight: 300;
  background: linear-gradient(330.95deg, #d2d6ef 15.87%, #9299c2 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 1px 1px 1px rgba(38, 43, 70, 0.32);
  text-align: center;
  letter-spacing: -0.02em;
`;

export default App;
