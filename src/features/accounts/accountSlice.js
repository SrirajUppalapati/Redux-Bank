import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state, action) {
      state.loanPurpose = "";
      state.balance -= state.loan;
      state.loan = 0;
    },
  },
  convertingCurrency(state, action) {
    state.isLoading = true;
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();

    dispatch({ type: "account/deposit", payload: data.rates.USD });
  };
}

export default accountSlice.reducer;
// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };

//     case "account/withdraw":
//       return {
//         ...state,
//         balance: (state.balance = state.balance - action.payload),
//       };
//     case "account/requestLoan":
//       if (state.loan > 0) return { ...state };
//       return {
//         ...state,
//         balance: state.balance + action.payload.loan,
//         loan: action.payload.loan,
//         loanPurpose: action.payload.purpose,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: "",
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     default:
//       return { ...state };
//   }
// }

// function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async function (dispatch) {
//     dispatch({ type: "account/convertingCurrency" });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();

//     dispatch({ type: "account/deposit", payload: data.rates.USD });
//   };
// }

// function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { loan: amount, purpose: purpose },
//   };
// }

// function payLoan() {
//   return { type: "account/payLoan" };
// }

// export { payLoan, requestLoan, deposit, withdraw };
