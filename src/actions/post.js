import { api_url, headers } from "./api";
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST,
  RECEIVE_POST,
  VOTE_POST,
  SORT_POSTS_BY,
  EDIT_POST,
  NEW_POST,
  DELETE_POST
} from "./types";

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

function receiveVote(id, data, category) {
  return {
    type: VOTE_POST,
    id,
    data,
    category
  };
}

export function sortPostsBy(sortBy) {
  return {
    type: SORT_POSTS_BY,
    sortBy
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

function receiveNewPost(category, data) {
  return {
    type: NEW_POST,
    category,
    data
  };
}

function receiveDeletePost(category, data) {
  return {
    type: DELETE_POST,
    category,
    data
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

export function deletePost(id, category) {
  return dispatch => {
    return fetch(`${api_url}/posts/${id}`, {
      method: "DELETE",
      headers: headers
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receiveDeletePost(category, data)));
  };
}
