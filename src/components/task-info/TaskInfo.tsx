import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'store';

const TaskInfo = () => {
  const { type, phase } = useAppSelector(({ timer }) => timer);
  return (
    <TaskInfoContainer>
      <TaskName>{type[0].toUpperCase() + type.slice(1)}</TaskName>
      <TaskList>
        {[...Array(8)].map((el, i) => (
          <TaskItem key={i} item={i + 1} phase={phase} />
        ))}
      </TaskList>
    </TaskInfoContainer>
  );
};

const TaskInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskName = styled.div`
  font-size: 26px;
  text-align: center;
  letter-spacing: -0.02em;
  background: linear-gradient(330.95deg, #d2d6ef 15.87%, #9299c2 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 1px 1px 1px rgba(38, 43, 70, 0.32);
  margin-right: 4px;
`;

const TaskList = styled.ul`
  display: flex;
  margin-top: 14px;
  & > * + * {
    margin-left: 8px;
  }
`;

type TaskItemProps = {
  phase: number;
  item: number;
};

const TaskItem = styled.li<TaskItemProps>`
  width: 12px;
  height: 12px;
  background: ${({ phase, item }) => {
    if (phase > item) {
      if (item % 2 === 0) {
        return 'linear-gradient(114.79deg, #FFAA5C 56.01%, #F29239 88.75%)';
      } else {
        return 'radial-gradient(129.43% 63.16% at 27.83% 4.57%, #612FF5 0%, #855CFF 100%)';
      }
    }
    return 'linear-gradient(135deg, #4f567f 10.94%, #2a304a 100%)';
  }};

  box-shadow: 2px 2px 4px rgba(50, 54, 83, 0.75),
    -2px -2px 4px rgba(78, 85, 124, 0.8);
  border-radius: 8px;
`;

export default TaskInfo;
