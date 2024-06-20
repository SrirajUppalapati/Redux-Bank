import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  id: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(name, id) {
        return { payload: { name, id, createdAt: new Date().toISOString() } };
      },
      reducer(state, action) {
        state.fullName = action.payload.name;
        state.id = action.payload.id;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/create":
//       return {
//         ...state,
//         fullName: action.payload.name,
//         id: action.payload.id,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return { ...state };
//   }
// }

// function createCustomer(name, nationalID) {
//   return {
//     type: "customer/create",
//     payload: {
//       name: name,
//       id: nationalID,
//       createdAt: new Date().toISOString(),
//     },
//   };
// }

// function updateName(name) {
//   return {
//     type: "customer/updateName",
//     payload: name,
//   };
// }

// export { createCustomer, updateName };
