import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Donut, DonutValue } from 'react-donut-component';
import { useAppDispatch, useAppSelector } from 'store';
import { useInterval } from 'hooks';
import { setPhase, setTimer, setType } from 'slices';

const TimerMain = () => {
  const {
    timer,
    isActive,
    isNotificationOn,
    isSoundOn,
    phase,
  } = useAppSelector(({ timer }) => timer);

  const [initialTime, setInitialTime] = useState(timer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const phaseLocal = localStorage.getItem('phase');
    if (phaseLocal) {
      const localParsed = JSON.parse(phaseLocal);
      dispatch(setPhase(localParsed));
    }
    const localTimer = localStorage.getItem('timer');
    if (localTimer) {
      const localParsed = JSON.parse(localTimer);
      dispatch(setTimer(localParsed));
    }

    if (
      !(
        'Notification' in window ||
        Notification.permission === 'denied' ||
        Notification.permission === 'default'
      )
    ) {
      console.log("Browser doesn't supports notifications");
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('phase', JSON.stringify(phase));
    dispatch(setType(phase === 8 ? 'big rest' : phase % 2 ? 'work' : 'rest'));
    setInitialTime(phase === 8 ? 15 : phase % 2 ? 25 : 5);
  }, [phase]);

  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify(timer));
    if (timer <= 0) {
      if (isNotificationOn) {
        new Notification('Current phase is done', {
          body: 'Your next phase is waiting for you',
          icon: 'logo512.png',
        });
      }
      if (isSoundOn) {
        const sound = new Audio(
          'https://soundbible.com//mp3/Ship_Bell-Mike_Koenig-1911209136.mp3'
        );
        sound.play();
      }
      dispatch(setPhase('increase'));
    }
  }, [timer, isNotificationOn]);

  useInterval(
    () => {
      dispatch(setTimer('decrease'));
    },
    isActive && timer > 0 ? 100 : null
  );

  return (
    <>
      <TimerMainContainer>
        <DonutElement
          linecap={'round'}
          strokeWidth={4}
          styleTrack={{
            stroke: '#3C4163',
          }}
          styleIndicator={{
            opacity: 0.5,
            stroke: phase % 2 ? '#9d88de' : '#FFAA5C',
          }}
        >
          <DonutVal showValue={false} symbol=" ">
            {timer * (100 / initialTime)}
          </DonutVal>
        </DonutElement>
      </TimerMainContainer>
      <LabelContainer>
        <Minutes>{timer}</Minutes>
        <Label>{timer <= 1 ? 'minute' : 'minutes'}</Label>
      </LabelContainer>
    </>
  );
};

const LabelContainer = styled.div`
  display: flex;
  position: absolute;
  top: 41.5%;
  transform: translateY(-50%);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.div`
  background: -webkit-linear-gradient(330.95deg, #d2d6ef 15.87%, #9299c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 1px 1px 1px rgba(38, 43, 70, 0.32);
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  letter-spacing: -0.02em;
`;

const Minutes = styled(Label)`
  font-size: 48px;
`;

const TimerMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 280px;
  background: linear-gradient(116.82deg, #494f74 0%, #3a3f5e 100%);
  mix-blend-mode: normal;
  box-shadow: -12px -12px 32px rgba(73, 80, 115, 0.72), 12px 12px 32px #2e334e,
    inset 2px 2px 2px rgba(83, 92, 136, 0.11);
  border-radius: 50%;
`;

const DonutElement = styled(Donut)`
  filter: drop-shadow(1px 1px 1px rgba(90, 97, 141, 0.81));
  background: linear-gradient(116.82deg, #494f74 0%, #3a3f5e 100%);
  mix-blend-mode: normal;
  box-shadow: -12px -12px 32px rgba(73, 80, 115, 0.72), 12px 12px 32px #2e334e,
    inset 2px 2px 2px rgba(83, 92, 136, 0.11);
`;

const DonutVal = styled(DonutValue)`
  margin-right: 13px;
  background: linear-gradient(330.95deg, #d2d6ef 15.87%, #9299c2 100%);
  text-shadow: 1px 1px 1px rgba(38, 43, 70, 0.32);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default TimerMain;
