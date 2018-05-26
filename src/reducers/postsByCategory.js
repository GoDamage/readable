import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  VOTE_POST,
  EDIT_POST,
  NEW_POST,
  DELETE_POST
} from "../actions/types";

const initialState = {
  posts: {
    isFetching: false,
    items: []
  }
};

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

export default function postsByCategory(state = {}, action) {
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
