import React, { useEffect, useReducer } from "react";
import client from "../api/client";
import { getCurrentUser } from "./actions/auth";
import { getCart } from "./actions/cart";
import authReducer, { defaultAuth } from "./reducers/authReducer";
import cartReducer, { defaultCart } from "./reducers/cartReducer";
import genericReducer, { defaultData } from "./reducers/genericReducer";
import collectionReducer, {
  defaultCollections,
} from "./reducers/collectionReducer";
const genericData = {
  error: null,
  loading: false,
  data: [],
};
export const GlobalContext = React.createContext({
  authState: defaultAuth,
  authDispatch: () => {},
  productState: defaultData,
  productDispatch: () => {},
  // productState: defaultData,
  cartegoryState: defaultData,
  cartegoryDispatch: () => {},
  collectionsState: defaultData,
  collectionsDispatch: () => {},
  cartState: defaultCart,
  cartDispatch: () => {},
  orderDispatch: () => {},
  orderState: defaultData,
  customerState: defaultData,
  customerDispatch: () => {},
  adminProductsState: defaultData,
  adminProductsDispatch: () => {},
  paymentState: defaultData,
  paymentDispatch: () => {},
});

export default function GlobalProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, defaultAuth);

  const [productState, productDispatch] = useReducer(
    genericReducer,
    defaultData
  );
  // const [productState, productDispatch] = useReducer(genericReducer, defaultData);

  // const [cartbadge, setCartbadge] = useState(0);
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultData);
  const [cartegoryState, cartegoryDispatch] = useReducer(
    genericReducer,
    defaultData
  );
  const [adminProductsState, adminProductsDispatch] = useReducer(
    genericReducer,
    defaultData
  );
  const [customerState, customerDispatch] = useReducer(
    genericReducer,
    defaultData
  );
  const [orderState, orderDispatch] = useReducer(genericReducer, defaultData);
  const [collectionsState, collectionsDispatch] = useReducer(
    genericReducer,
    defaultData
  );
  const [paymentState, paymentDispatch] = useReducer(
    genericReducer,
    defaultData
  );
  useEffect(() => {
    getCurrentUser(authDispatch);
    // getCart(cartDispatch);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const products = (await client.get("payment/products")).data;
  //     productDispatch({
  //       type: "FETCHED_DATA",
  //       payload: products.data,
  //     });
  //   })();
  // }, []);
  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        productState,
        productDispatch,
        cartState,
        cartDispatch,
        cartegoryDispatch,
        cartegoryState,
        collectionsState,
        collectionsDispatch,
        adminProductsState,
        adminProductsDispatch,
        customerDispatch,
        customerState,
        orderDispatch,
        orderState,
        paymentDispatch,
        paymentState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
