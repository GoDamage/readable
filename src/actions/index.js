//import { getPosts } from "../utils/api";

/*export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";*/

export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const INVALIDATE_CATEGORY = "INVALIDATE_CATEGORY";
export const REQUEST_CATEGORIES = "REQUEST_CATEGORIES";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const REQUEST_POST = "REQUEST_POST";
export const RECEIVE_POST = "RECEIVE_POST";

export const SORT_POSTS_BY = "SORT_POSTS_BY";

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

    return (
      fetch("http://localhost:3001/categories", {
        method: "GET",
        headers: { Authorization: "qwertyuiop" }
      })
        .then(
          res => res.json(),
          error => console.log("An error occurred.", error)
        )
        //.then(data => console.log(data));
        .then(data => dispatch(receiveCategories(data)))
    );
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
      headers: { Authorization: "qwertyuiop" }
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
      headers: { Authorization: "qwertyuiop" }
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receivePost(id, data)));
  };
}

export function sortPostsBy(sortBy) {
  return {
    type: SORT_POSTS_BY,
    sortBy
  };
}
