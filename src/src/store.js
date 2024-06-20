import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  id: "",
  createdAt: "",
};
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return {
        ...state,
        balance:
          state.balance - action.payload > 0
            ? state.balance - action.payload
            : state.balance,
      };
    case "account/requestLoan":
      if (state.loan > 0) return { ...state };
      return {
        ...state,
        loan: action.payload.loan,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return { ...state };
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.name,
        id: action.payload.id,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return { ...state };
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { loan: amount, purpose: purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(5000));
console.log(store.getState());

store.dispatch(withdraw(500));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a bike"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(name, nationalID) {
  return {
    type: "customer/create",
    payload: {
      name: name,
      id: nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(name) {
  return {
    type: "customer/updateName",
    payload: name,
  };
}

store.dispatch(createCustomer("Sriraj", 12345));

console.log(store.getState());

store.dispatch(updateName("Sunny"));

console.log(store.getState());
