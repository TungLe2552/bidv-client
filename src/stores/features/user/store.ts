import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser(state: any, action: PayloadAction) {
      const data: any  = action.payload;
      state.user = data;
      localStorage.setItem("user", data.email)
      return state;
    }
  },
  extraReducers: () => {}
});
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const { setUser } = actions;
// Extract and export each action creator by name
// Export the reducer, either as a default or named export
export default reducer;
