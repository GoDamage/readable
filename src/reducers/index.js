import { combineReducers } from "redux";
import selectedCategory from "./selectedCategory";
import categories from "./categories";
import postsByCategory from "./postsByCategory";
import post from "./post";
import comment from "./comment";
import sortBy from "./sortBy";

const rootReducer = combineReducers({
  categories,
  postsByCategory,
  selectedCategory,
  sortBy,
  post,
  comment
});

export default rootReducer;
