import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from "../actions/types";

const initialState = {
  categories: {
    isFetching: false,
    names: []
  }
};

export default function categories(state = initialState.categories, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        names: action.categories
      });
    default:
      return state;
  }
}
