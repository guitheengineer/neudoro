import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { setIsActive, setIsNotificationOn, setIsSoundOn } from '../../slices';
import { useAppDispatch, useAppSelector } from '../../store';

const ControlButtons = () => {
  const [imgPlay, setImgPlay] = useState();
  const [imgNotification, setImgNotification] = useState();
  const [imgSound, setImgSound] = useState();

  const dispatch = useAppDispatch();
  const { isActive, isNotificationOn, isSoundOn } = useAppSelector(
    ({ timer }) => timer
  );

  useEffect(() => {
    const localNotification = localStorage.getItem('notification');
    if (localNotification) {
      const localParsed = JSON.parse(localNotification);
      dispatch(setIsNotificationOn(localParsed));
    }
    const localSound = localStorage.getItem('sound');
    if (localSound) {
      const localParsed = JSON.parse(localSound);
      dispatch(setIsSoundOn(localParsed));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notification', JSON.stringify(isNotificationOn));
    localStorage.setItem('sound', JSON.stringify(isSoundOn));
  }, [isNotificationOn, isSoundOn]);

  useEffect(() => {
    const importImage = async (
      state: any,
      condition: boolean,
      string1: string,
      string2: string
    ) => {
      const imgPath = await import(
        `assets/${condition ? string1 : string2}.png`
      );
      state(imgPath.default);
    };
    importImage(setImgPlay, isActive, 'pause', 'play');
    importImage(setImgSound, isSoundOn, 'sound', 'mute');
    importImage(
      setImgNotification,
      isNotificationOn,
      'notification',
      'nonotification'
    );
  }, [isActive, imgPlay, imgSound, isNotificationOn, isSoundOn]);

  return (
    <ControlButtonsContainer>
      <Button
        onClick={() => dispatch(setIsSoundOn())}
        model="sound"
        type="button"
      >
        <ImageSound src={imgSound} alt="mute" />
      </Button>
      <Button
        onClick={() => dispatch(setIsActive())}
        model="play"
        type="button"
      >
        <ImagePlay isActive={isActive} src={imgPlay} alt="play" />
      </Button>
      <Button
        onClick={() => dispatch(setIsNotificationOn())}
        model="notification"
        type="button"
      >
        <ImageNotification
          isNotificationOn={isNotificationOn}
          src={imgNotification}
          alt="notification"
        />
      </Button>
    </ControlButtonsContainer>
  );
};

type ImagePlayProps = {
  isActive: boolean;
};

const ImagePlay = styled.img<ImagePlayProps>`
  margin-left: ${({ isActive }) => (isActive ? '0' : '3px')};
`;

const ImageSound = styled.img`
  margin-left: 3px;
`;

type ImageNotificationOnProps = {
  isNotificationOn: boolean;
};

const ImageNotification = styled.img<ImageNotificationOnProps>`
  margin-bottom: 2px;
`;

const ControlButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 43px;
  }
`;

type ButtonProps = {
  model: 'sound' | 'play' | 'notification';
};

const Button = styled.button<ButtonProps>`
  display: flex;
  border-radius: ${({ model }) => (model === 'play' ? '22px' : '16px')};
  justify-content: center;
  align-items: center;
  width: ${({ model }) => (model === 'play' ? '66px' : '44px')};
  height: ${({ model }) => (model === 'play' ? '66px' : '44px')};
  background: linear-gradient(135deg, #424869 0%, #4a5178 100%);
  opacity: 0.95;
  box-shadow: -6px -6px 20px rgba(85, 93, 131, 0.56),
    8px 8px 18px rgba(54, 59, 87, 0.2),
    inset 1px 1px 1px rgba(38, 49, 105, 0.05),
    inset -1px -1px 4px rgba(83, 92, 136, 0.12);
`;

export default ControlButtons;
