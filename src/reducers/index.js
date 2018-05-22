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
  VOTE_POST,
  EDIT_POST,
  SORT_POSTS_BY,
  RECEIVE_COMMENTS,
  REQUEST_COMMENTS,
  VOTE_COMMENT
} from "../actions";

const initialState = {
  categories: {
    isFetching: false,
    names: []
  },
  selectedCategory: "",
  sortBy: "",
  posts: {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  post: {
    isFetching: false,
    post: {},
    isFetchingComments: false,
    comments: []
  },
  modal: {
    isOpen: false,
    type: "",
    data: {}
  }
};

function selectedCategory(state = initialState.selectedCategory, action) {
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
    case VOTE_POST:
    case EDIT_POST:
      return Object.assign({}, state, {
        items: state.items.map(
          item => (item.id === action.id ? action.data : item)
        )
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
    case VOTE_POST:
    case EDIT_POST:
      return Object.assign({}, state, {
        [action.category]: posts(state[action.category], action)
      });
    default:
      return state;
  }
}

function post(state = initialState.post, action) {
  switch (action.type) {
    case REQUEST_POST:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_POST:
      return Object.assign({}, state, { isFetching: false, post: action.data });
    case REQUEST_COMMENTS:
      return Object.assign({}, state, { isFetchingComments: true });
    case RECEIVE_COMMENTS:
      return Object.assign({}, state, {
        isFetchingComments: false,
        comments: action.data
      });
    case VOTE_POST:
    case EDIT_POST:
      return Object.assign({}, state, { post: action.data });
    case VOTE_COMMENT:
      return Object.assign({}, state, {
        comments: state.comments.map(
          comment => (comment.id === action.id ? action.data : comment)
        )
      });
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
