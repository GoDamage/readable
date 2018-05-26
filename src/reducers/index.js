import { combineReducers } from "redux";

import {
  SELECT_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST,
  RECEIVE_POST,
  VOTE_POST,
  EDIT_POST,
  NEW_POST,
  DELETE_POST,
  SORT_POSTS_BY,
  RECEIVE_COMMENTS,
  REQUEST_COMMENTS,
  RECEIVE_COMMENT,
  REQUEST_COMMENT,
  EDIT_COMMENT,
  NEW_COMMENT,
  VOTE_COMMENT,
  DELETE_COMMENT
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
    items: []
  },
  post: {
    isFetching: false,
    post: {},
    isFetchingComments: false,
    comments: []
  },
  comment: {
    isFetching: false,
    comment: {}
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
    case DELETE_POST:
      return Object.assign({}, state, {
        items: state.items.filter(item => item.id !== action.data.id)
      });
    case NEW_POST:
      return Object.assign({}, state, { items: [...state.items, action.data] });
    default:
      return state;
  }
}

function postsByCategory(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case VOTE_POST:
    case EDIT_POST:
    case NEW_POST:
    case DELETE_POST:
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
    case DELETE_POST:
      return Object.assign({}, state, {
        post: initialState.post.id === action.data.id ? {} : initialState.post
      });
    case VOTE_COMMENT:
    case EDIT_COMMENT:
      return Object.assign({}, state, {
        comments: state.comments.map(
          comment => (comment.id === action.id ? action.data : comment)
        )
      });
    case NEW_COMMENT:
      return Object.assign({}, state, {
        comments: [...state.comments, action.data]
      });
    case DELETE_COMMENT:
      return Object.assign({}, state, {
        comments: state.comments.filter(
          comment => comment.id !== action.data.id
        )
      });
    default:
      return state;
  }
}

function comment(state = initialState.comment, action) {
  switch (action.type) {
    case REQUEST_COMMENT:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_COMMENT:
      return Object.assign({}, state, {
        isFetching: false,
        comment: action.data
      });
    case EDIT_COMMENT:
      return Object.assign({}, state, { comment: {} });
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
  post,
  comment
});

export default rootReducer;
