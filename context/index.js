import React, { useEffect, useReducer } from "react";
import client from "../api/client";
import { getCurrentUser } from "./actions/auth";
import { getCart } from "./actions/cart";
import authReducer, { defaultAuth } from "./reducers/authReducer";
import cartReducer, { defaultCart } from "./reducers/cartReducer";
import genericReducer, { defaultData } from "./reducers/genericReducer";
const genericData = {
  error: null,
  loading: false,
  data: [],
};
export const GlobalContext = React.createContext({
  authState: defaultAuth,
  authDispatch: () => {},

  bankState: defaultData,

  cartState: defaultCart,
  cartDispatch: () => {},
});

export default function GlobalProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, defaultAuth);

  const [bankState, bankDispatch] = useReducer(genericReducer, defaultData);

  // const [cartbadge, setCartbadge] = useState(0);
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultData);
  useEffect(() => {
    getCurrentUser(authDispatch);
    getCart(cartDispatch);
  }, []);

  useEffect(() => {
    (async () => {
      const banks = (await client.get("payment/banks")).data;
      bankDispatch({
        type: "FETCHED_DATA",
        payload: banks.data,
      });
    })();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,

        bankState,

        cartState,
        cartDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
