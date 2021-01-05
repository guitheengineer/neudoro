import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PomodoroTypes = 'work' | 'rest' | 'big rest';

type TimerState = {
  timer: number;
  phase: number;
  isActive: boolean;
  isNotificationOn: boolean;
  isSoundOn: boolean;
  type: PomodoroTypes;
};

const initialState: TimerState = {
  timer: 25,
  isActive: false,
  phase: 1,
  isNotificationOn: false,
  isSoundOn: true,
  type: 'work',
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimer(state, { payload }: PayloadAction<'decrease'>) {
      if (payload === 'decrease') {
        state.timer--;
      } else {
        state.timer = payload;
      }
    },
    setType(state, { payload }: PayloadAction<PomodoroTypes>) {
      state.type = payload;
    },
    setPhase(state, { payload }: PayloadAction<number | 'increase'>) {
      if (payload === 'increase') {
        state.isActive = false;
        state.phase++;
        if (state.phase === 9) {
          state.phase = 1;
          state.timer = 25;
        } else if (state.phase === 8) {
          state.timer = 15;
        } else if (state.phase % 2) {
          state.timer = 25;
        } else {
          state.timer = 5;
        }
      } else {
        state.phase = payload;
      }
    },
    setIsSoundOn(state, { payload }: PayloadAction<boolean | undefined>) {
      if (payload) {
        state.isSoundOn = payload;
      } else {
        state.isSoundOn = !state.isSoundOn;
      }
    },
    setIsNotificationOn(
      state,
      { payload }: PayloadAction<boolean | undefined>
    ) {
      if (payload === undefined) {
        state.isNotificationOn = !state.isNotificationOn;
      } else {
        state.isNotificationOn = payload;
      }
    },
    setIsActive(state, { payload }: PayloadAction<boolean | undefined>) {
      if (payload) {
        state.isActive = payload;
      } else {
        state.isActive = !state.isActive;
      }
    },
  },
});

export const {
  setIsActive,
  setIsNotificationOn,
  setIsSoundOn,
  setPhase,
  setTimer,
  setType,
} = timerSlice.actions;

export default timerSlice.reducer;
