export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const INVALIDATE_CATEGORY = "INVALIDATE_CATEGORY";
export const REQUEST_CATEGORIES = "REQUEST_CATEGORIES";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const REQUEST_POST = "REQUEST_POST";
export const RECEIVE_POST = "RECEIVE_POST";
export const VOTE_POST = "VOTE_POST";

export const SORT_POSTS_BY = "SORT_POSTS_BY";

export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const REQUEST_COMMENT = "REQUEST_COMMENT";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";

export const EDIT_POST = "EDIT_POST";
export const NEW_POST = "NEW_POST";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const NEW_COMMENT = "NEW_COMMENT";

const api_url = "http://localhost:3001";

const headers = {
  Authorization: "qwertyuiop",
  "Content-Type": "application/json",
  Accept: "application/json"
};

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  };
}

export function invalidateCategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  };
}

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  };
}

function receiveCategories(data) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: data.categories.map(category => category)
  };
}

export function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories());

    return fetch(`${api_url}/categories`, {
      method: "GET",
      headers: headers
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receiveCategories(data)));
  };
}

function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  };
}

function receivePosts(category, data) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: data.map(post => post),
    receivedAt: Date.now()
  };
}

export function fetchPosts(category) {
  return dispatch => {
    dispatch(requestPosts(category));

    const url =
      category !== "all" ? `${api_url}/${category}/posts` : `${api_url}/posts`;

    return fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receivePosts(category, data)));
  };
}

function shouldFetchPosts(state, category) {
  const posts = state.postsByCategory[category];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      return dispatch(fetchPosts(category));
    } else {
      return Promise.resolve();
    }
  };
}

function requestPost(id) {
  return {
    type: REQUEST_POST,
    id
  };
}

function receivePost(id, data) {
  return {
    type: RECEIVE_POST,
    id,
    data
  };
}

export function fetchPost(id) {
  return dispatch => {
    dispatch(requestPost(id));

    return fetch(`${api_url}/posts/${id}`, {
      method: "GET",
      headers: headers
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receivePost(id, data)));
  };
}

function receiveVote(id, data, category) {
  return {
    type: VOTE_POST,
    id,
    data,
    category
  };
}

export function votePost(id, vote, category = "all") {
  const voteBody = JSON.stringify({ option: vote });
  return dispatch => {
    return fetch(`${api_url}/posts/${id}`, {
      body: voteBody,
      method: "POST",
      headers: headers
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receiveVote(id, data, category)));
  };
}

export function sortPostsBy(sortBy) {
  return {
    type: SORT_POSTS_BY,
    sortBy
  };
}

function requestComments(postid) {
  return {
    type: REQUEST_COMMENTS,
    postid
  };
}

function receiveComments(postid, data) {
  return {
    type: RECEIVE_COMMENTS,
    postid,
    data
  };
}

export function fetchComments(postid) {
  return dispatch => {
    dispatch(requestComments(postid));

    return fetch(`${api_url}/posts/${postid}/comments`, {
      method: "GET",
      headers: headers
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receiveComments(postid, data)));
  };
}

function requestComment(id) {
  return {
    type: REQUEST_COMMENT,
    id
  };
}

function receiveComment(id, data) {
  return {
    type: RECEIVE_COMMENT,
    id,
    data
  };
}

export function fetchComment(id) {
  return dispatch => {
    dispatch(requestComment(id));

    return fetch(`${api_url}/comments/${id}`, {
      method: "GET",
      headers: headers
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receiveComment(id, data)));
  };
}

function receiveVoteComment(id, data, category) {
  return {
    type: VOTE_COMMENT,
    id,
    data,
    category
  };
}

export function voteComment(id, vote) {
  const voteBody = JSON.stringify({ option: vote });
  return dispatch => {
    return fetch(`${api_url}/comments/${id}`, {
      body: voteBody,
      method: "POST",
      headers: headers
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receiveVoteComment(id, data)));
  };
}

function receiveEditPost(id, category, data) {
  return {
    type: EDIT_POST,
    id,
    category,
    data
  };
}

export function editPost(id, category, post) {
  const editBody = JSON.stringify(post);
  return dispatch => {
    return fetch(`${api_url}/posts/${id}`, {
      method: "PUT",
      headers: headers,
      body: editBody
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receiveEditPost(id, category, data)));
  };
}

function receiveNewPost(category, data) {
  return {
    type: NEW_POST,
    category,
    data
  };
}

export function newPost(category, post) {
  const postBody = JSON.stringify(post);
  return dispatch => {
    return fetch(`${api_url}/posts`, {
      method: "POST",
      headers: headers,
      body: postBody
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receiveNewPost(category, data)));
  };
}

function receiveEditComment(id, data) {
  return {
    type: EDIT_COMMENT,
    id,
    data
  };
}

export function editComment(id, comment) {
  const editBody = JSON.stringify(comment);
  return dispatch => {
    return fetch(`${api_url}/comments/${id}`, {
      method: "PUT",
      headers: headers,
      body: editBody
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receiveEditComment(id, data)));
  };
}

function receiveNewComment(data) {
  return {
    type: NEW_COMMENT,
    data
  };
}

export function newComment(comment) {
  const commentBody = JSON.stringify(comment);
  return dispatch => {
    return fetch(`${api_url}/comments`, {
      method: "POST",
      headers: headers,
      body: commentBody
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receiveNewComment(data)));
  };
}
