import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  phone: "",
  resetToken: "",
  code: "",
};

const resetPassSlice = createSlice({
  name: "resetPass",
  initialState,
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    addResetSession: (state, action) => {
      state.phone = action.payload.phone;
      state.resetToken = action.payload.resetToken;
    },
    removeEmail: (state) => {
      state.email = "";
      state.phone = "";
      state.resetToken = "";
    },
  },
});

export const { addEmail, addResetSession, removeEmail } =
  resetPassSlice.actions;
export default resetPassSlice.reducer;
