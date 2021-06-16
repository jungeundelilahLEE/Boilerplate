import { combineReducers } from "redux"
import user_reducer from "./user_reducer" //! user reducer
// import comment from "./comment_reducer" //! comment reducer

const rootReducer = combineReducers({
    user_reducer,
    // commen
})

export default rootReducer;

//! store안에는 여러가지 reducer가 있을 수 있다.
//! reducer 안에서 하는 일은? 어떻게 state가 변하는지를 보여준 뒤, 
//! 변한 마지막 값을 return 해주는 것이 reducer이다.
//! 여러가지 reducer들을 combineReducers를 이용해서 rootReducer에서 하나로 합쳐준다.
//! 
//! 
//! 