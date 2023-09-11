import { createSlice } from "@reduxjs/toolkit";
import coneService from "../services/cone.service";

const coneSlice = createSlice({
  name: "cone",
  initialState: {
    entities: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    coneRequested: (state) => {
      state.isLoading = true;
    },
    coneReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    coneRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    coneOut: (state) => {
      state.entities = null;
    },
  },
});

const { reducer: coneReducer, actions } = coneSlice;

const { coneRequested, coneReceved, coneRequestFiled } = actions;

export const createCone = (payload) => async (dispatch) => {
  dispatch(coneRequested());
  try {
    const data = await coneService.createcone(payload);
    dispatch(coneReceved({ params: { ...payload }, verticesCone: data }));
  } catch (error) {
    dispatch(coneRequestFiled(error.message));
  }
};

export const getCone = () => (state) => state.cone.entities;
export const getErrorCone = () => (state) => state.cone.error;
export const getConeLoadingStatus = () => (state) => state.cone.isLoading;
export default coneReducer;
