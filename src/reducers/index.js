import { combineReducers } from "redux";

import {
  SELECT_CATEGORY,
  INVALIDATE_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST,
  RECEIVE_POST,
  SORT_POSTS_BY
} from "../actions";

const initialState = {
  categories: {
    isFetching: false,
    names: []
  },
  category: "",
  sortBy: "",
  posts: {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  currentPost: {
    isFetching: false,
    post: {}
  }
};

function selectedCategory(state = initialState.category, action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category;
    default:
      return state;
  }
}

function categories(state = initialState.categories, action) {
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

function posts(state = initialState.posts, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
      return Object.assign({}, state, { didInvalidate: true });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function postsByCategory(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.category]: posts(state[action.category], action)
      });
    default:
      return state;
  }
}

function post(state = initialState.currentPost, action) {
  switch (action.type) {
    case REQUEST_POST:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_POST:
      return Object.assign({}, state, { isFetching: false, post: action.data });
    default:
      return state;
  }
}

function sortBy(state = initialState.sortBy, action) {
  switch (action.type) {
    case SORT_POSTS_BY:
      return action.sortBy;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  categories,
  postsByCategory,
  selectedCategory,
  sortBy,
  post
});

export default rootReducer;
