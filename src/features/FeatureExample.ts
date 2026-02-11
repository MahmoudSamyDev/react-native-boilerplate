import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {}

const initialState: ExampleState = {};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setExampleData(state, action: PayloadAction<string>) {
      // Example reducer logic
    },
  },
});

export const { setExampleData } = exampleSlice.actions;
