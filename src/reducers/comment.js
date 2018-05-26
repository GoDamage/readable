import {
  RECEIVE_COMMENT,
  REQUEST_COMMENT,
  EDIT_COMMENT
} from "../actions/types";

const initialState = {
  comment: {
    isFetching: false,
    comment: {}
  }
};

export default function comment(state = initialState.comment, action) {
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
