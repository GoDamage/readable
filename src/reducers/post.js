import {
  REQUEST_POST,
  RECEIVE_POST,
  RECEIVE_COMMENTS,
  REQUEST_COMMENTS,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
  EDIT_COMMENT,
  NEW_COMMENT,
  VOTE_COMMENT,
  DELETE_COMMENT
} from "../actions/types";

const initialState = {
  post: {
    isFetching: false,
    post: {},
    isFetchingComments: false,
    comments: []
  }
};

export default function post(state = initialState.post, action) {
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
