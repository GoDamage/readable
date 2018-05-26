import { api_url, headers } from "./api";
import {
  SELECT_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES
} from "./types";

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
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
