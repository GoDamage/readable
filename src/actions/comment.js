import { api_url, headers } from "./api";
import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  REQUEST_COMMENT,
  RECEIVE_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  NEW_COMMENT,
  DELETE_COMMENT
} from "./types";

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

function receiveVoteComment(id, data, category) {
  return {
    type: VOTE_COMMENT,
    id,
    data,
    category
  };
}

function receiveEditComment(id, data) {
  return {
    type: EDIT_COMMENT,
    id,
    data
  };
}

function receiveNewComment(data) {
  return {
    type: NEW_COMMENT,
    data
  };
}

function receiveDeleteComment(data) {
  return {
    type: DELETE_COMMENT,
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

export function deleteComment(id) {
  return dispatch => {
    return fetch(`${api_url}/comments/${id}`, {
      method: "DELETE",
      headers: headers
    })
      .then(
        res => res.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => dispatch(receiveDeleteComment(data)));
  };
}
