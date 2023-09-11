import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coneReducer from "./cone";
const rootReducer = combineReducers({
  cone: coneReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
