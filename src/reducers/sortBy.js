import { SORT_POSTS_BY } from "../actions";

const initialState = {
  sortBy: ""
};

export default function sortBy(state = initialState.sortBy, action) {
  switch (action.type) {
    case SORT_POSTS_BY:
      return action.sortBy;
    default:
      return state;
  }
}
