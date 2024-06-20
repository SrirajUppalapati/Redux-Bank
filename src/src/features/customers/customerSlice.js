const initialStateCustomer = {
  fullName: "",
  id: "",
  createdAt: "",
};
export default function customerReducer(state = initialStateCustomer, action) {
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

export { createCustomer, updateName };
