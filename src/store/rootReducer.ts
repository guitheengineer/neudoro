import { combineReducers } from "@reduxjs/toolkit";
import { timerSlice } from "../slices";

const rootReducer = combineReducers({
  timer: timerSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
