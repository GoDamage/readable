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
export const VOTE_COMMENT = "VOTE_COMMENT";

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

    return fetch("http://localhost:3001/categories", {
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
      category !== "all"
        ? `http://localhost:3001/${category}/posts`
        : "http://localhost:3001/posts";

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

    return fetch(`http://localhost:3001/posts/${id}`, {
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
    return fetch(`http://localhost:3001/posts/${id}`, {
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
  console.log("fetchng comments");
  return dispatch => {
    dispatch(requestComments(postid));

    return fetch(`http://localhost:3001/posts/${postid}/comments`, {
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
    return fetch(`http://localhost:3001/comments/${id}`, {
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
