import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { ProductDeleteReducers, ProductDetailsReducers, ProductCreateReducers, ProductListReducers } from "./reducers/ProductListReducers"
import { cartReducer } from "./reducers/CartReducers"
import { UserDetailsReducers, UserListReducers, UserLoginReducers, UserRegisterReducers, UserUpdateProfileReducers, UserDeleteReducers, UserUpdateReducers } from "./reducers/UserReducers"
import { orderCreateReducers, OrderDetailsReducers, OrderMyListReducers, OrderPayReducers } from "./reducers/OrderReducers"
const reducer = combineReducers({
  productList: ProductListReducers,
  productDetails: ProductDetailsReducers,
  productDelete: ProductDeleteReducers,
  productCreate: ProductCreateReducers,
  cart: cartReducer,
  userLogin: UserLoginReducers,
  userRegister: UserRegisterReducers,
  userDetails: UserDetailsReducers,
  userUpdateProfile: UserUpdateProfileReducers,
  userList: UserListReducers,
  userUpdate: UserUpdateReducers,
  userDelete: UserDeleteReducers,
  createOrder: orderCreateReducers,
  orderDetails: OrderDetailsReducers,
  orderPay: OrderPayReducers,
  orderMyList: OrderMyListReducers,
})

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}
const initalState = {
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
