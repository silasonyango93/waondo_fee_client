import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";
import { reducer as current_session } from "./modules/current_session";

// =============================================================
// The rootReducer object aggregates our earlier reducers into a
// single reducer that holds our entire immutable application
// (theme) state.
// =============================================================

const rootReducer = reduceReducers(
  combineReducers({
    current_session
  })
);

export default rootReducer;
