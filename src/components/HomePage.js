import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPostsIfNeeded, fetchCategories } from "../actions";
import Post from "./Post";

class HomePage extends Component {
  static propTypes = {
    isFetchingCategories: PropTypes.bool.isRequired,
    categoryNames: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
    dispatch(fetchPostsIfNeeded("all"));
  }

  render() {
    const { categoryNames, items } = this.props;

    return (
      <div className="homepage">
        <div className="header">
          <h1>Readable</h1>
          <ul className="menu">
            {categoryNames.map(category => (
              <li>
                <Link to={`/category/${category.path}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <ul className="posts">
          {items.map(item => (
            <li key={item.id}>
              <Post postDetails={item} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories, postsByCategory } = state;
  const isFetchingCategories = categories["isFetching"] || true;
  const categoryNames = categories["names"] || {};
  const { isFetching, lastUpdated, items } = postsByCategory["all"] || {
    isFetching: true,
    items: []
  };
  return {
    isFetchingCategories,
    categoryNames,
    items,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(HomePage);
