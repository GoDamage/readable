import { SELECT_CATEGORY } from "../actions/types";

const initialState = { selectedCategory: "" };

export default function selectedCategory(
  state = initialState.selectedCategory,
  action
) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category;
    default:
      return state;
  }
}
